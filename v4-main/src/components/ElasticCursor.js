import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const CURSOR_SIZE = 48;

const CursorBlob = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  
  background: rgba(100, 255, 218, 0.15); /* your green */
  border: 1.5px solid rgba(100, 255, 218, 0.8);
  mix-blend-mode: difference;

  @media (max-width: 768px) {
    display: none;
  }
`;

function getScale(dx, dy) {
  const dist = Math.sqrt(dx * dx + dy * dy);
  return Math.min(dist / 600, 0.35);
}

function getAngle(dx, dy) {
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

function getHoverRect(el) {
  if (!el) return null;
  if (el.classList?.contains('cursor-hover')) {
    return el.getBoundingClientRect();
  }
  return el.closest?.('.cursor-hover')?.getBoundingClientRect() || null;
}

const ElasticCursor = () => {
  const blobRef = useRef(null);

  // 🚨 SSR-safe refs (NO window usage here)
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const setters = useRef({});
  const [enabled, setEnabled] = useState(true);

  /* Initialize cursor position AFTER mount */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    pos.current.x = window.innerWidth / 2;
    pos.current.y = window.innerHeight / 2;
  }, []);

  /* GSAP setters */
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (!blobRef.current) return;

    setters.current = {
      x: gsap.quickSetter(blobRef.current, 'x', 'px'),
      y: gsap.quickSetter(blobRef.current, 'y', 'px'),
      r: gsap.quickSetter(blobRef.current, 'rotate', 'deg'),
      sx: gsap.quickSetter(blobRef.current, 'scaleX'),
      sy: gsap.quickSetter(blobRef.current, 'scaleY'),
    };
  }, []);

  /* Mouse tracking */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      setEnabled(false);
      return;
    }

    const onMove = (e) => {
      const { clientX: x, clientY: y } = e;

      const dx = x - pos.current.x;
      const dy = y - pos.current.y;

      vel.current.x = dx * 1.2;
      vel.current.y = dy * 1.2;

      gsap.to(pos.current, {
        x,
        y,
        duration: 1.2,
        ease: 'elastic.out(1, 0.45)',
      });

      const hoverRect = getHoverRect(e.target);

      if (hoverRect && blobRef.current) {
        gsap.to(blobRef.current, {
          width: hoverRect.width + 16,
          height: hoverRect.height + 16,
          borderRadius: 10,
          duration: 0.8,
          ease: 'elastic.out(1, 0.35)',
        });
      } else if (blobRef.current) {
        gsap.to(blobRef.current, {
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          borderRadius: CURSOR_SIZE,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
        });
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* Animation ticker */
  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      const s = getScale(vel.current.x, vel.current.y);
      const r = getAngle(vel.current.x, vel.current.y);

      setters.current.x?.(pos.current.x);
      setters.current.y?.(pos.current.y);
      setters.current.r?.(r);
      setters.current.sx?.(1 + s);
      setters.current.sy?.(1 - s * 1.5);
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [enabled]);

  if (!enabled) return null;

  return <CursorBlob ref={blobRef} />;
};

export default ElasticCursor;
