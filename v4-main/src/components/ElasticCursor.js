import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const CURSOR_SIZE = 40;

const CursorBlob = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${CURSOR_SIZE}px;
  height: ${CURSOR_SIZE}px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  opacity: 0; /* fade in after first move */

  background: rgba(100, 255, 218, 0.12);
  border: 1.5px solid rgba(100, 255, 218, 0.8);
  mix-blend-mode: difference;
  will-change: transform;

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ------------------ helpers ------------------ */

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

/* ------------------ component ------------------ */

const ElasticCursor = () => {
  const blobRef = useRef(null);

  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const rotation = useRef(0);
  const setters = useRef({});
  const [enabled, setEnabled] = useState(false);

  /* ✅ Enable cursor AFTER mount (fixes first-load invisibility) */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) setEnabled(true);

    pos.current.x = window.innerWidth / 2;
    pos.current.y = window.innerHeight / 2;
  }, []);

  /* GSAP setters */
  useLayoutEffect(() => {
    if (!blobRef.current) return;

    setters.current = {
      x: gsap.quickSetter(blobRef.current, 'x', 'px'),
      y: gsap.quickSetter(blobRef.current, 'y', 'px'),
      r: gsap.quickSetter(blobRef.current, 'rotate', 'deg'),
      sx: gsap.quickSetter(blobRef.current, 'scaleX'),
      sy: gsap.quickSetter(blobRef.current, 'scaleY'),
      o: gsap.quickSetter(blobRef.current, 'opacity'),
    };
  }, []);

  /* Mouse tracking */
  useEffect(() => {
    if (!enabled) return;

    const onMove = (e) => {
      const { clientX: x, clientY: y } = e;

      const dx = x - pos.current.x;
      const dy = y - pos.current.y;

      vel.current.x = dx;
      vel.current.y = dy;

      gsap.to(pos.current, {
        x,
        y,
        duration: 0.6,
        ease: 'expo.out',
      });

      setters.current.o?.(1); // fade in on first movement
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [enabled]);

  /* Animation ticker */
  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      const vx = vel.current.x;
      const vy = vel.current.y;

      const speed = Math.sqrt(vx * vx + vy * vy);
      const cappedSpeed = Math.min(speed, 25);

      /* ---- stretch (CLAMPED) ---- */
      const stretch = clamp(cappedSpeed / 60, 0, 0.25);

      let scaleX = 1 + stretch;
      let scaleY = 1 - stretch * 0.6;

      /* ---- snap back when slow ---- */
      if (speed < 0.5) {
        scaleX = 1;
        scaleY = 1;
      }

      /* ---- rotation (LERPED) ---- */
      const targetRot = (Math.atan2(vy, vx) * 180) / Math.PI;
      rotation.current += (targetRot - rotation.current) * 0.15;

      setters.current.x?.(pos.current.x);
      setters.current.y?.(pos.current.y);
      setters.current.r?.(rotation.current);
      setters.current.sx?.(scaleX);
      setters.current.sy?.(scaleY);
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [enabled]);

  if (!enabled) return null;

  return <CursorBlob ref={blobRef} />;
};

export default ElasticCursor;
