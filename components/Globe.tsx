"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Project = {
  slug: string;
  name: string;
  country: string;
  city: string;
  lat: number;
  lon: number;
  status: string;
};

type Region = "all" | "turkiye" | "gulf";

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
  const hoveredPinRef = useRef<THREE.Mesh | null>(null);

  const [hovered, setHovered] = useState<Project | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [region, setRegion] = useState<Region>("all");

  // region state'i effect içine taşımak için ref
  const regionRef = useRef<Region>("all");
  useEffect(() => {
    regionRef.current = region;
  }, [region]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- Scene ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070f);
    const radius = 5;

    // --- Camera ---
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 14;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // --- Lights ---
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(10, 10, 10);
    scene.add(dir);

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    // --- Globe ---
    const loader = new THREE.TextureLoader();
    const earthTexture = loader.load("/earth.jpg");

    const globeGeometry = new THREE.SphereGeometry(radius, 64, 64);
    const globeMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 1,
      metalness: 0,
    });

    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // Başlangıç: Türkiye tarafı
    globe.rotation.y = -0.9;
    globe.rotation.x = 0.2;

    // --- Pins ---
    const pinGeometry = new THREE.SphereGeometry(0.18, 18, 18);
    const pins: THREE.Mesh[] = [];
    const pinToProject = new Map<number, Project>();

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2(999, 999);

    // Drag rotate
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    const rotateSpeed = 0.005;

    // Idle auto rotate
    const autoRotateSpeed = 0.0008;

    // Smooth rotate target
    const targetRot = { x: globe.rotation.x, y: globe.rotation.y };
    const rotLerp = 0.06;

    // Pulse
    let t = 0;

    let disposed = false;

    // Load projects
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
        console.error("❌ projects.json fetch error:", e);
      }
    })();

    // Region -> target rotation mapping
    const setTargetForRegion = (r: Region) => {
      // bunlar “gözle ayarlanmış” değerler. İstersen sonra milimetrik ayar yaparız.
      if (r === "turkiye") {
        targetRot.y = -0.9;
        targetRot.x = 0.2;
      } else if (r === "gulf") {
        targetRot.y = -0.35;
        targetRot.x = 0.15;
      } else {
        // all
        targetRot.y = -0.7;
        targetRot.x = 0.15;
      }
    };

    // pointer events
    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      renderer.domElement.style.cursor = "grabbing";
      renderer.domElement.setPointerCapture(e.pointerId);
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      renderer.domElement.style.cursor = "grab";
      renderer.domElement.releasePointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      // cursor position (HTML card için)
      const rectCanvas = renderer.domElement.getBoundingClientRect();
      setCursor({
        x: e.clientX - rectCanvas.left,
        y: e.clientY - rectCanvas.top,
      });

      // Drag rotate
      if (isDragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;

        lastX = e.clientX;
        lastY = e.clientY;

        globe.rotation.y += dx * rotateSpeed;
        globe.rotation.x += dy * rotateSpeed;

        globe.rotation.x = Math.max(-1.2, Math.min(1.2, globe.rotation.x));

        // Drag bitince “hedef rotasyon” globe’un şu anki hali olsun, snap olmasın
        targetRot.x = globe.rotation.x;
        targetRot.y = globe.rotation.y;
      }

      // Hover raycast
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseNDC.set(x, y);

      raycaster.setFromCamera(mouseNDC, camera);
      const hits = raycaster.intersectObjects(pins, false);

      if (hits.length) {
        const obj = hits[0].object as THREE.Mesh;

        if (hoveredPinRef.current && hoveredPinRef.current !== obj) {
          hoveredPinRef.current.scale.set(1, 1, 1);
        }

        obj.scale.set(1.6, 1.6, 1.6);
        hoveredPinRef.current = obj;

        const proj = pinToProject.get(obj.id) || null;
        setHovered(proj);

        renderer.domElement.style.cursor = isDragging ? "grabbing" : "pointer";
      } else {
        if (hoveredPinRef.current) {
          hoveredPinRef.current.scale.set(1, 1, 1);
          hoveredPinRef.current = null;
        }
        setHovered(null);
        renderer.domElement.style.cursor = isDragging ? "grabbing" : "grab";
      }
    };

    const onClick = () => {
      raycaster.setFromCamera(mouseNDC, camera);
      const hits = raycaster.intersectObjects(pins, false);
      if (!hits.length) return;

      const obj = hits[0].object as THREE.Mesh;
      const proj = pinToProject.get(obj.id);

      if (proj?.slug) {
        window.location.href = `/projects/${proj.slug}`;
      }
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("click", onClick);

    // Resize
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      // pulse time
      t += 0.03;

      // region hedefini sürekli güncel tut (butona basınca ref değişiyor)
        //setTargetForRegion(regionRef.current);

      // kullanıcı sürüklemiyorsa:
      if (!isDragging) {
        // idle dönme (çok yavaş)
        globe.rotation.y += autoRotateSpeed;

        // smooth region rotasyonuna yaklaş (idle dönmeye rağmen yavaşça hedefe yapışır)
        globe.rotation.x += (targetRot.x - globe.rotation.x) * rotLerp;
        globe.rotation.y += (targetRot.y - globe.rotation.y) * rotLerp;
      }

      // pins pulse (hover edilen pin hariç)
      const pulse = 1 + Math.sin(t) * 0.06;
      for (const pin of pins) {
        if (hoveredPinRef.current && pin.id === hoveredPinRef.current.id) continue;
        pin.scale.set(pulse, pulse, pulse);
      }

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      disposed = true;

      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);

      cancelAnimationFrame(raf);

      hoveredPinRef.current = null;

      globeGeometry.dispose();
      globeMaterial.dispose();
      pinGeometry.dispose();

      for (const pin of pins) {
        (pin.material as THREE.Material).dispose();
      }

      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  // hover kartı mouse’u takip etsin: canvas içinde konum
  const cardLeft = Math.min(cursor.x + 16, window.innerWidth - 360);
  const cardTop = Math.min(cursor.y + 16, window.innerHeight - 160);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Üst panel */}
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          zIndex: 10,
          display: "flex",
          gap: 8,
          padding: 8,
          borderRadius: 14,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.10)",
          backdropFilter: "blur(10px)",
          color: "white",
        }}
      >
        <button
          onClick={() => setRegion("all")}
          style={{
            padding: "8px 12px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.12)",
            background: region === "all" ? "rgba(255,255,255,0.14)" : "transparent",
            color: "white",
            cursor: "pointer",
          }}
        >
          All
        </button>
        <button
          onClick={() => setRegion("turkiye")}
          style={{
            padding: "8px 12px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.12)",
            background: region === "turkiye" ? "rgba(255,255,255,0.14)" : "transparent",
            color: "white",
            cursor: "pointer",
          }}
        >
          Türkiye
        </button>
        <button
          onClick={() => setRegion("gulf")}
          style={{
            padding: "8px 12px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.12)",
            background: region === "gulf" ? "rgba(255,255,255,0.14)" : "transparent",
            color: "white",
            cursor: "pointer",
          }}
        >
          Gulf
        </button>
      </div>

      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

      {/* Hover card */}
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
            border: "1px solid rgba(255,255,255,0.14)",
            maxWidth: 320,
            pointerEvents: "none",
            zIndex: 9,
          }}
        >
          <div style={{ fontSize: 14, opacity: 0.9 }}>
            {hovered.city}, {hovered.country}
          </div>
          <div style={{ fontSize: 18, fontWeight: 900, marginTop: 4 }}>
            {hovered.name}
          </div>
          <div style={{ fontSize: 13, opacity: 0.85, marginTop: 6 }}>
            Status: {hovered.status}
          </div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>
            Click to open project
          </div>
        </div>
      )}
    </div>
  );
}