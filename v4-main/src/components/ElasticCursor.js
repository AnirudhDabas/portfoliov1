import React, { useEffect, useRef } from 'react';

const ElasticCursor = () => {
  const ref = useRef(null);

  useEffect(() => {
    document.body.style.cursor = 'none';

    const move = (e) => {
      if (!ref.current) return;
      ref.current.style.left = `${e.clientX}px`;
      ref.current.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '20px',
        height: '20px',
        background: 'red',
        borderRadius: '50%',
        zIndex: 9999999999,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

export default ElasticCursor;
