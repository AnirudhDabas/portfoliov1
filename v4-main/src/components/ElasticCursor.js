import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const SIZE = 28;

const Cursor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${SIZE}px;
  height: ${SIZE}px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  opacity: 0;

  background: rgba(100, 255, 218, 0.12);
  border: 1.5px solid rgba(100, 255, 218, 0.9);
  backdrop-filter: blur(6px);
  mix-blend-mode: difference;

  will-change: transform;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ElasticCursor = () => {
  const ref = useRef(null);

  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const setters = useRef({});
  const [enabled, setEnabled] = useState(false);

  /* ---------- mount safely ---------- */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!window.matchMedia('(max-width: 768px)').matches) {
      setEnabled(true);
    }

    pos.current.x = window.innerWidth / 2;
    pos.current.y = window.innerHeight / 2;
    target.current = { ...pos.current };
  }, []);

  /* ---------- GSAP setters ---------- */
  useLayoutEffect(() => {
    if (!ref.current) return;

    setters.current = {
      x: gsap.quickSetter(ref.current, 'x', 'px'),
      y: gsap.quickSetter(ref.current, 'y', 'px'),
      sx: gsap.quickSetter(ref.current, 'scaleX'),
      sy: gsap.quickSetter(ref.current, 'scaleY'),
      o: gsap.quickSetter(ref.current, 'opacity'),
    };
  }, []);

  /* ---------- mouse tracking ---------- */
  useEffect(() => {
    if (!enabled) return;

    const move = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      setters.current.o?.(1);
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [enabled]);

  /* ---------- animation loop ---------- */
  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      const stretch = Math.min(speed / 150, 0.2);

      setters.current.x(pos.current.x);
      setters.current.y(pos.current.y);
      setters.current.sx(1 + stretch);
      setters.current.sy(1 - stretch);
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [enabled]);

  if (!enabled) return null;
  return <Cursor ref={ref} />;
};

export default ElasticCursor;
