import { useEffect, useRef } from "react";
import logo from "@/assets/kavasam-logo.png.asset.json";

/** Lightweight canvas globe: dotted sphere, graticule, animated network arcs. */
export function Globe() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const css = getComputedStyle(document.documentElement);
    const navy = css.getPropertyValue("--navy").trim();
    const tech = css.getPropertyValue("--tech").trim();
    const gold = css.getPropertyValue("--gold").trim();

    const N = 900;
    const pts: [number, number][] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      pts.push([Math.asin(y), Math.PI * (3 - Math.sqrt(5)) * i]);
    }
    const nodes: [number, number][] = Array.from({ length: 14 }, (_, i) => [
      ((i * 37) % 120 - 60) * (Math.PI / 180),
      ((i * 83) % 360) * (Math.PI / 180),
    ]);
    const arcs: [number, number][] = Array.from({ length: 10 }, (_, i) => [i, (i * 5 + 3) % nodes.length]);

    let raf = 0;
    let rot = 0;
    let size = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      size = canvas.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const tilt = 0.35;
    const project = (lat: number, lon: number) => {
      const x = Math.cos(lat) * Math.sin(lon + rot);
      let y = Math.sin(lat);
      let z = Math.cos(lat) * Math.cos(lon + rot);
      const y2 = y * Math.cos(tilt) - z * Math.sin(tilt);
      z = y * Math.sin(tilt) + z * Math.cos(tilt);
      y = y2;
      const r = size * 0.42;
      return { x: size / 2 + x * r, y: size / 2 - y * r, z };
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, size, size);
      const c = size / 2, r = size * 0.42;
      const g = ctx.createRadialGradient(c, c, r * 0.6, c, c, r * 1.15);
      g.addColorStop(0, "transparent");
      g.addColorStop(0.85, `color-mix(in oklab, ${tech} 14%, transparent)`);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);

      ctx.strokeStyle = `color-mix(in oklab, ${navy} 14%, transparent)`;
      ctx.lineWidth = 0.6;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        for (let lon = 0; lon <= 360; lon += 6) {
          const p = project((lat * Math.PI) / 180, (lon * Math.PI) / 180);
          if (p.z < 0) { ctx.moveTo(p.x, p.y); continue; }
          ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      for (let lon = 0; lon < 360; lon += 30) {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 6) {
          const p = project((lat * Math.PI) / 180, (lon * Math.PI) / 180);
          if (p.z < 0) { started = false; continue; }
          if (!started) { ctx.moveTo(p.x, p.y); started = true; } else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      for (const [lat, lon] of pts) {
        const p = project(lat, lon);
        if (p.z < 0) continue;
        ctx.fillStyle = `color-mix(in oklab, ${navy} ${Math.round(18 + p.z * 40)}%, transparent)`;
        ctx.fillRect(p.x, p.y, 1.4, 1.4);
      }

      arcs.forEach(([a, b], i) => {
        const A = nodes[a], B = nodes[b];
        if (!A || !B) return;
        ctx.beginPath();
        let vis = 0;
        const steps = 40;
        for (let s = 0; s <= steps; s++) {
          const k = s / steps;
          const lat = A[0] + (B[0] - A[0]) * k;
          const lon = A[1] + (B[1] - A[1]) * k;
          const p = project(lat, lon);
          const lift = 1 + Math.sin(Math.PI * k) * 0.12;
          const x = c + (p.x - c) * lift, y = c + (p.y - c) * lift;
          if (p.z < 0) continue;
          vis++;
          if (vis === 1) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `color-mix(in oklab, ${i % 3 === 0 ? gold : tech} 45%, transparent)`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
        // travelling pulse
        const k = ((t / 4000 + i * 0.17) % 1);
        const p = project(A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k);
        if (p.z > 0) {
          const lift = 1 + Math.sin(Math.PI * k) * 0.12;
          ctx.fillStyle = i % 3 === 0 ? gold : tech;
          ctx.beginPath();
          ctx.arc(c + (p.x - c) * lift, c + (p.y - c) * lift, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      for (const [lat, lon] of nodes) {
        const p = project(lat, lon);
        if (p.z < 0) continue;
        ctx.fillStyle = gold;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      rot += 0.0012;
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    if (reduce) draw(0);
    else raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[620px]">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="absolute inset-[22%] rounded-full bg-background/70 blur-2xl" aria-hidden="true" />
      <img
        src={logo.url}
        alt="KAVASAM emblem"
        className="animate-logo-pulse absolute left-1/2 top-1/2 w-[38%] -translate-x-1/2 -translate-y-1/2 mix-blend-multiply"
        style={{ translate: "-50% -50%" }}
      />
    </div>
  );
}
