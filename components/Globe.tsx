"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useRouter } from "next/navigation";

type Project = {
  slug: string;
  name: string;
  country: string;
  city: string;
  lat: number;
  lon: number;
  status: string;
};

function latLonToVec3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

export default function Globe() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const hoveredPinRef = useRef<THREE.Mesh | null>(null);
  const cursorRef = useRef({ x: 0, y: 0 });

  const [hovered, setHovered] = useState<Project | null>(null);
  const [, forceTick] = useState(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;

    // ---------- Scene ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070f);

    const radius = 5;

    // ---------- Camera ----------
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 14;

    // ---------- Renderer ----------
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // ---------- Lights ----------
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(10, 10, 10);
    scene.add(dir);

    const amb = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(amb);

    // ---------- Globe ----------
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load("/earth.jpg");

    const globeGeometry = new THREE.SphereGeometry(radius, 40, 40);
    const globeMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);

    // Türkiye tarafına yakın başlat
    globe.rotation.y = -0.9;
    globe.rotation.x = 0.2;

    scene.add(globe);

    // ---------- Pins ----------
    const pinGeometry = new THREE.SphereGeometry(0.18, 16, 16);
    const pins: THREE.Mesh[] = [];
    const pinToProject = new Map<number, Project>();

    // Hover/click için
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(999, 999);

    // Drag rotate
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    const rotateSpeed = 0.005;
    const autoRotateSpeed = 0.0005;

    // Projects fetch
    (async () => {
      try {
        const res = await fetch("/projects.json", { cache: "no-store" });
        const projects: Project[] = await res.json();
        if (disposed) return;

        for (const p of projects) {
          const pos = latLonToVec3(p.lat, p.lon, radius).multiplyScalar(1.02);

          const pinMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
          const pin = new THREE.Mesh(pinGeometry, pinMaterial);

          pin.position.copy(pos);
          globe.add(pin);

          pins.push(pin);
          pinToProject.set(pin.id, p);
        }
      } catch (e) {
        console.error("projects.json load error:", e);
      }
    })();

    // ---------- Events ----------
    const updateMouse = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      cursorRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onPointerDown = (e: PointerEvent) => {
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

      if (isDragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;

        lastX = e.clientX;
        lastY = e.clientY;

        globe.rotation.y += dx * rotateSpeed;
        globe.rotation.x += dy * rotateSpeed;
        globe.rotation.x = Math.max(-1.2, Math.min(1.2, globe.rotation.x));

        // Drag sırasında hover/raycast yapmıyoruz (akıcı olsun)
        return;
      }

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(pins, false);

      if (hits.length > 0) {
        const obj = hits[0].object as THREE.Mesh;

        if (hoveredPinRef.current && hoveredPinRef.current !== obj) {
          hoveredPinRef.current.scale.set(1, 1, 1);
        }

        obj.scale.set(1.6, 1.6, 1.6);
        hoveredPinRef.current = obj;

        const proj = pinToProject.get(obj.id) || null;
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
      // Click anında son mouse konumuyla raycast
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(pins, false);
      if (!hits.length) return;

      const obj = hits[0].object as THREE.Mesh;
      const proj = pinToProject.get(obj.id);

      if (proj?.slug) {
        router.push(`/projects/${proj.slug}`); // aynı sekme
      }
    };

    renderer.domElement.style.cursor = "grab";
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("click", onClick);

    // ---------- Resize ----------
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ---------- Animation ----------
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      if (!isDragging) {
        globe.rotation.y += autoRotateSpeed;
      }

      renderer.render(scene, camera);
    };
    animate();

    // ---------- Cleanup ----------
    return () => {
      disposed = true;

      window.removeEventListener("resize", onResize);

      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("click", onClick);

      cancelAnimationFrame(raf);

      // dispose pins materials
      for (const pin of pins) {
        (pin.material as THREE.Material).dispose();
      }

      pinGeometry.dispose();
      globeGeometry.dispose();
      globeMaterial.dispose();

      earthTexture.dispose();

      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [router]);

  // Hover kartı için UI’ı hafif hafif güncelle (pointermove ile React’i boğma)
  useEffect(() => {
    const id = window.setInterval(() => forceTick((v) => v + 1), 40);
    return () => window.clearInterval(id);
  }, []);

  const cardLeft = cursorRef.current.x + 16;
  const cardTop = cursorRef.current.y + 16;

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: "100%",
          touchAction: "none", // mobilde sürükleme düzgün olsun
        }}
      />

      {hovered && (
        <div
          style={{
            position: "absolute",
            left: cardLeft,
            top: cardTop,
            padding: 12,
            borderRadius: 12,
            background: "rgba(255,255,255,0.10)",
            backdropFilter: "blur(10px)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.15)",
            pointerEvents: "none",
            maxWidth: 320,
          }}
        >
          <div style={{ fontSize: 14, opacity: 0.9 }}>
            {hovered.city}, {hovered.country}
          </div>
          <div style={{ fontWeight: 800, marginTop: 4 }}>{hovered.name}</div>
          <div style={{ fontSize: 12, marginTop: 6, opacity: 0.85 }}>
            Status: {hovered.status}
          </div>
        </div>
      )}
    </div>
  );
}