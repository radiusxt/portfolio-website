"use client";

import { useEffect, useRef } from "react";
import styles from "./Starfield.module.scss";

interface Star {
  x: number;
  y: number;
  z: number;
}

interface StarfieldProps {
  starCount?: number;
  speed?: number;
}

const MIN_Z = 40;

export function Starfield({ starCount = 900, speed = 150 }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let animationId = 0;
    let lastTime = 0;

    const stars: Star[] = [];

    // Spawn at a given depth, but choose the SCREEN position uniformly
    // at random first, then back-solve world x/y so the star actually
    // appears at that screen position — avoids the center-clustering
    // that comes from picking world x/y and letting projection squash
    // far-away stars toward the middle.
    const makeStarAtDepth = (z: number): Star => {
      const screenX = Math.random() * width;
      const screenY = Math.random() * height;
      const k = 4096 / z;
      return {
        x: (screenX - centerX) / k,
        y: (screenY - centerY) / k,
        z,
      };
    };

    // Used only on init, so the very first frame already has stars
    // spread across every depth, not all freshly spawned at max z.
    const makeStarAnyDepth = (): Star =>
      makeStarAtDepth(MIN_Z + Math.random() * (width - MIN_Z));

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;
      centerX = width / 2;
      centerY = height / 2;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      stars.length = 0;

      for (let i = 0; i < starCount; i++) {
        stars.push(makeStarAnyDepth());
      }
    };

    resize();
    init();

    const tick = (time: number) => {
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        star.z -= speed * dt;

        if (star.z <= MIN_Z) {
          const fresh = makeStarAtDepth(width); // reborn at the far plane
          star.x = fresh.x;
          star.y = fresh.y;
          star.z = fresh.z;
        }

        const k = 4096 / star.z;
        const px = star.x * k + centerX;
        const py = star.y * k + centerY;

        if (px < 0 || px >= width || py < 0 || py >= height) continue;

        const depthRatio = 1 - star.z / width;
        const size = depthRatio * 1.2;
        const alpha = 0.3 + depthRatio * 0.7;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(tick);
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {
      animationId = requestAnimationFrame(tick);
    }

    const handleResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", handleResize);

    // Reset lastTime when the tab regains visibility so the next tick
    // computes dt from "now," not from a stale pre-hidden timestamp.
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        lastTime = 0;
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [starCount, speed]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
