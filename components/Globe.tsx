"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/site/LanguageProvider";
import { getProjectContent, projects, type Project } from "@/lib/projects";

function latLonToVec3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

export default function Globe({
  lockRegion = false,
}: {
  lockRegion?: boolean;
}) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { locale } = useLanguage();
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cameraDistanceRef = useRef(11.5);

  const hoveredPinRef = useRef<THREE.Object3D | null>(null);

  const [hovered, setHovered] = useState<Project | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animationId = 0;
    cameraDistanceRef.current = isExpanded ? 8.4 : 11.5;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5eee2);

    const radius = 5;
    const focusRotationY = -2.2;
    const focusRotationX = 0.34;
    const minRotationY = -2.7;
    const maxRotationY = -1.85;
    const minRotationX = 0.05;
    const maxRotationX = 0.72;

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = cameraDistanceRef.current;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(12, 8, 10);
    scene.add(dir);

    const amb = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(amb);

    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      "/earth.jpg",
      undefined,
      undefined,
      (err) => console.error("earth texture load error", err)
    );

    const globeGeometry = new THREE.SphereGeometry(radius, 40, 40);
    const globeMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.88,
      metalness: 0.04,
    });

    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globe.rotation.y = focusRotationY;
    globe.rotation.x = focusRotationX;
    scene.add(globe);

    const atmosphereGeometry = new THREE.SphereGeometry(radius * 1.06, 40, 40);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x8bc8f7,
      transparent: true,
      opacity: 0.14,
      side: THREE.BackSide,
    });

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    globe.add(atmosphere);

    const markerHeadGeometry = new THREE.SphereGeometry(0.028, 14, 14);
    const markerStemGeometry = new THREE.CylinderGeometry(0.0045, 0.0045, 0.24, 8);
    const interactivePins: THREE.Mesh[] = [];
    const pinToProject = new Map<number, Project>();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(999, 999);

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    const rotateSpeed = 0.005;
    const autoRotateSpeed = lockRegion ? 0 : 0.00018;
    const minCameraDistance = 7.4;
    const maxCameraDistance = 13.4;

    for (const project of projects) {
      const surface = latLonToVec3(project.lat, project.lon, radius);
      const normal = surface.clone().normalize();
      const anchor = surface.clone().multiplyScalar(1.012);
      const markerGroup = new THREE.Group();

      markerGroup.position.copy(anchor);
      markerGroup.lookAt(anchor.clone().add(normal));

      const stemMaterial = new THREE.MeshStandardMaterial({
        color: 0xd62d2d,
        emissive: 0x8a1111,
        emissiveIntensity: 0.18,
        metalness: 0.08,
        roughness: 0.45,
      });
      const stem = new THREE.Mesh(markerStemGeometry, stemMaterial);
      stem.rotation.x = Math.PI / 2;
      stem.position.z = 0.12;

      const headMaterial = new THREE.MeshStandardMaterial({
        color: 0xe03c3c,
        emissive: 0xa11717,
        emissiveIntensity: 0.24,
        metalness: 0.06,
        roughness: 0.35,
      });
      const head = new THREE.Mesh(markerHeadGeometry, headMaterial);
      head.position.z = 0.245;

      markerGroup.add(stem);
      markerGroup.add(head);
      globe.add(markerGroup);

      head.userData.markerGroup = markerGroup;
      stem.userData.markerGroup = markerGroup;

      interactivePins.push(stem, head);
      pinToProject.set(stem.id, project);
      pinToProject.set(head.id, project);
    }

    const updateMouse = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();

      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const applyZoom = (delta: number) => {
      cameraDistanceRef.current = Math.max(
        minCameraDistance,
        Math.min(maxCameraDistance, cameraDistanceRef.current + delta)
      );
      camera.position.z = cameraDistanceRef.current;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (lockRegion) {
        updateMouse(e);
        return;
      }

      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      renderer.domElement.style.cursor = "grabbing";
      updateMouse(e);
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      renderer.domElement.style.cursor = "grab";
      updateMouse(e);
    };

    const onPointerMove = (e: PointerEvent) => {
      updateMouse(e);

      if (lockRegion) {
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(interactivePins, false);

        if (hits.length > 0) {
          const target = hits[0].object as THREE.Mesh;
          const markerGroup = (target.userData.markerGroup as THREE.Group) || target;

          if (hoveredPinRef.current && hoveredPinRef.current !== markerGroup) {
            hoveredPinRef.current.scale.set(1, 1, 1);
          }

          markerGroup.scale.set(1.28, 1.28, 1.28);
          hoveredPinRef.current = markerGroup;

          const proj = pinToProject.get(target.id) || null;
          setHovered(proj);

          renderer.domElement.style.cursor = "pointer";
        } else {
          if (hoveredPinRef.current) {
            hoveredPinRef.current.scale.set(1, 1, 1);
            hoveredPinRef.current = null;
          }

          setHovered(null);
          renderer.domElement.style.cursor = "default";
        }

        return;
      }

      if (isDragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;

        lastX = e.clientX;
        lastY = e.clientY;

        globe.rotation.y += dx * rotateSpeed;
        globe.rotation.x += dy * rotateSpeed;
        globe.rotation.y = Math.max(minRotationY, Math.min(maxRotationY, globe.rotation.y));
        globe.rotation.x = Math.max(minRotationX, Math.min(maxRotationX, globe.rotation.x));
        return;
      }

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(interactivePins, false);

      if (hits.length > 0) {
        const target = hits[0].object as THREE.Mesh;
        const markerGroup = (target.userData.markerGroup as THREE.Group) || target;

        if (hoveredPinRef.current && hoveredPinRef.current !== markerGroup) {
          hoveredPinRef.current.scale.set(1, 1, 1);
        }

        markerGroup.scale.set(1.28, 1.28, 1.28);
        hoveredPinRef.current = markerGroup;

        const proj = pinToProject.get(target.id) || null;
        setHovered(proj);

        renderer.domElement.style.cursor = "pointer";
      } else {
        if (hoveredPinRef.current) {
          hoveredPinRef.current.scale.set(1, 1, 1);
          hoveredPinRef.current = null;
        }

        setHovered(null);
        renderer.domElement.style.cursor = "grab";
      }
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(interactivePins, false);
      if (!hits.length) return;

      const obj = hits[0].object as THREE.Mesh;
      const proj = pinToProject.get(obj.id);

      if (proj?.slug) {
        router.push(`/projects/${proj.slug}`);
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      applyZoom(e.deltaY > 0 ? 0.45 : -0.45);
    };

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    renderer.domElement.style.cursor = lockRegion ? "default" : "grab";
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("click", onClick);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isDragging) {
        globe.rotation.y += autoRotateSpeed;
        globe.rotation.y = Math.max(minRotationY, Math.min(maxRotationY, globe.rotation.y));
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onResize);

      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("click", onClick);
      renderer.domElement.removeEventListener("wheel", onWheel);

      cancelAnimationFrame(animationId);

      for (const pin of interactivePins) {
        if ("material" in pin) {
          const material = pin.material;
          if (Array.isArray(material)) {
            for (const item of material) {
              item.dispose();
            }
          } else {
            material.dispose();
          }
        }
      }

      markerHeadGeometry.dispose();
      markerStemGeometry.dispose();
      globeGeometry.dispose();
      globeMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      earthTexture.dispose();

      renderer.dispose();
      cameraRef.current = null;

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [isExpanded, lockRegion, router]);

  const cardLeft = tooltipPosition.x + 16;
  const cardTop = tooltipPosition.y + 16;
  const hoveredContent = hovered ? getProjectContent(hovered, locale) : null;

  const handleZoomIn = () => {
    if (!cameraRef.current) return;
    cameraDistanceRef.current = Math.max(7.4, cameraDistanceRef.current - 0.55);
    cameraRef.current.position.z = cameraDistanceRef.current;
  };

  const handleZoomOut = () => {
    if (!cameraRef.current) return;
    cameraDistanceRef.current = Math.min(13.4, cameraDistanceRef.current + 0.55);
    cameraRef.current.position.z = cameraDistanceRef.current;
  };

  const handleResetView = () => {
    if (!cameraRef.current) return;
    cameraDistanceRef.current = isExpanded ? 8.4 : 11.5;
    cameraRef.current.position.z = cameraDistanceRef.current;
  };

  return (
    <div
      style={
        isExpanded
          ? {
              position: "fixed",
              inset: 24,
              zIndex: 90,
              borderRadius: 28,
              overflow: "hidden",
              border: "1px solid rgba(23,40,59,0.12)",
              boxShadow: "0 35px 120px rgba(23,40,59,0.24)",
              background: "#fff9f0",
            }
          : { width: "100%", height: "100%", position: "relative" }
      }
    >
      {isExpanded && (
        <button
          type="button"
          onClick={() => setIsExpanded(false)}
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(247,242,232,0.72)",
            border: "none",
            cursor: "zoom-out",
            zIndex: 0,
          }}
          aria-label="Close expanded globe"
        />
      )}
      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: "100%",
          touchAction: "none",
          position: "relative",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          right: 18,
          top: 18,
          display: "flex",
          gap: 8,
          zIndex: 2,
        }}
      >
        <button
          type="button"
          onClick={handleZoomIn}
          style={{
            borderRadius: 999,
            border: "1px solid rgba(23,40,59,0.12)",
            background: "rgba(255,255,255,0.9)",
            color: "#17283b",
            width: 40,
            height: 40,
            fontSize: 20,
            cursor: "pointer",
          }}
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          style={{
            borderRadius: 999,
            border: "1px solid rgba(23,40,59,0.12)",
            background: "rgba(255,255,255,0.9)",
            color: "#17283b",
            width: 40,
            height: 40,
            fontSize: 20,
            cursor: "pointer",
          }}
          aria-label="Zoom out"
        >
          -
        </button>
        <button
          type="button"
          onClick={handleResetView}
          style={{
            borderRadius: 999,
            border: "1px solid rgba(23,40,59,0.12)",
            background: "rgba(255,255,255,0.9)",
            color: "#17283b",
            minWidth: 52,
            height: 40,
            fontSize: 12,
            padding: "0 14px",
            cursor: "pointer",
          }}
          aria-label="Reset globe view"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => setIsExpanded((value) => !value)}
          style={{
            borderRadius: 999,
            border: "1px solid rgba(23,40,59,0.12)",
            background: "rgba(255,255,255,0.9)",
            color: "#17283b",
            minWidth: 46,
            height: 40,
            fontSize: 14,
            padding: "0 14px",
            cursor: "pointer",
          }}
          aria-label={isExpanded ? "Shrink globe" : "Expand globe"}
        >
          {isExpanded ? "Kapat" : "Büyüt"}
        </button>
      </div>

      {hovered && hoveredContent && (
        <div
          style={{
            position: "absolute",
            left: cardLeft,
            top: cardTop,
            padding: 12,
            borderRadius: 12,
            background: "rgba(255,255,255,0.94)",
            backdropFilter: "blur(10px)",
            color: "#17283b",
            border: "1px solid rgba(23,40,59,0.12)",
            pointerEvents: "none",
            maxWidth: 320,
            boxShadow: "0 18px 60px rgba(23,40,59,0.18)",
            zIndex: 3,
          }}
        >
          <div style={{ fontSize: 14, opacity: 0.9 }}>
            {hoveredContent.city}, {hoveredContent.country}
          </div>
          <div style={{ fontWeight: 800, marginTop: 4 }}>{hoveredContent.name}</div>
          <div style={{ fontSize: 12, marginTop: 6, opacity: 0.7 }}>
            {hoveredContent.category}
          </div>
          <div style={{ fontSize: 12, marginTop: 6, opacity: 0.85 }}>
            {locale === "tr" ? "Durum" : "Status"}: {hoveredContent.status}
          </div>
        </div>
      )}
    </div>
  );
}
