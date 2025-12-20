import React, { useEffect, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const SIZE = 16;

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

  /* ✅ FORCE VISIBILITY */
  background: rgba(100, 255, 218, 0.12);
border: 1px solid rgba(100, 255, 218, 1);

  /* ❌ REMOVE blend mode (THIS WAS KILLING IT) */
  /* mix-blend-mode: difference; */

  will-change: transform;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ElasticCursor = () => {
  const ref = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    pos.current.x = window.innerWidth / 2;
    pos.current.y = window.innerHeight / 2;
    target.current = { ...pos.current };

    const move = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const setX = gsap.quickSetter(ref.current, 'x', 'px');
    const setY = gsap.quickSetter(ref.current, 'y', 'px');
    const setSX = gsap.quickSetter(ref.current, 'scaleX');
    const setSY = gsap.quickSetter(ref.current, 'scaleY');

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;
      const speed = Math.min(Math.sqrt(dx * dx + dy * dy) / 150, 0.2);

      setX(pos.current.x);
      setY(pos.current.y);
      setSX(1 + speed);
      setSY(1 - speed);
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return <Cursor ref={ref} />;
};

export default ElasticCursor;
