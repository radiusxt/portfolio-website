"use client";

import { useEffect, useRef } from "react";
import styles from "./Starfield.module.scss";

interface Star {
  x: number;
  y: number;
  z: number;
  hue: number;
}

interface StarfieldProps {
  count?: number;
  speed?: number;
  multi?: boolean;
}

// Depth at which a star is considered "arrived" and gets respawned.
// Keeps the 1/z projection from blowing up as z approaches 0.
const MIN_Z = 40;

/* Starfield Background */
export function Starfield({ count = 600, speed = 150, multi }: StarfieldProps) {
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

    // Projects a star's world x/y at depth z onto screen coordinates.
    const project = (x: number, y: number, z: number) => {
      const k = 128 / z;
      return { px: x * k + centerX, py: y * k + centerY };
    };

    // Creates a star at depth z.
    // Picks its screen position uniformly at random first
    // then back-solves the world x/y that would project there.
    // This is what keeps stars spread evenly across the canvas.
    const makeStar = (z: number): Star => {
      const screenX = Math.random() * width;
      const screenY = Math.random() * height;
      const k = 128 / z;
      return {
        x: (screenX - centerX) / k,
        y: (screenY - centerY) / k,
        z,
        hue: Math.random() * 360,
      };
    };

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

      // Spread initial stars across the full depth range so the first
      // frame doesn't look like every star just spawned at once.
      for (let i = 0; i < count; i++) {
        stars.push(makeStar(MIN_Z + Math.random() * (width - MIN_Z)));
      }
    };

    const tick = (time: number) => {
      // Clamp dt to 0.05s so longer gaps between frames so returning from
      // a backgrounded tab can't yank every star forward at once.
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
      lastTime = time;
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        star.z -= speed * dt;
        
        // Star has reached the camera (or gone past MIN_Z) so send it
        // back to the far plane and start its journey again.
        // This is what creates the "continuous stream of stars" effect.
        if (star.z <= MIN_Z) {
          Object.assign(star, makeStar(width));
        }

        const { px, py } = project(star.x, star.y, star.z);

        if (px < 0 || px >= width || py < 0 || py >= height) {
          continue;
        }
        
        // Used to scale size and alpha so stars grow
        // and brighten as they get closer.
        // Clamps to [0, 1] to accomodate viewport resize.
        const depthRatio = Math.max(0, Math.min(1, 1 - star.z / width));
        const size = 1.5 * depthRatio;
        const alpha = 0.7 + 0.3 * depthRatio;

        if (multi) {
          ctx.fillStyle = `hsl(${star.hue}, 100%, 50%)`;
        } else {
          ctx.fillStyle = "white";
        }
        
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(tick);
    };

    // Reset lastTime when the tab regains visibility so the next tick
    // computes dt from "now", not from a stale pre-hidden timestamp.
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        lastTime = 0;
      }
    };

    resize();
    init();

    // Handle reduced motion setting
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animationId = requestAnimationFrame(tick);
    }
    
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [count, speed, multi]);

  return <canvas className={styles.canvas} ref={canvasRef} aria-hidden />;
}
