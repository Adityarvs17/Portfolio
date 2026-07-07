import React, { useEffect, useRef } from 'react';

const FlowField = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  const themeRef = useRef(isDarkMode);

  useEffect(() => {
    themeRef.current = isDarkMode;
  }, [isDarkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // REDUCED BY 40% (Was 800, now 450)
    const particleCount = 450; 

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
        // REDUCED SPEED for ghost-like float
        baseSpeed: Math.random() * 0.2 + 0.1, 
      });
    }

    const draw = (time) => {
      const isDark = themeRef.current;
      
      // Slightly darker trail fade to kill ribbon length
      ctx.fillStyle = isDark ? 'rgba(5, 5, 5, 0.08)' : 'rgba(250, 250, 250, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const speedMultiplier = isDark ? 1 : 1.5;

      particles.forEach((p) => {
        const angle = Math.sin(p.x * 0.002 + time * 0.0005) * 2 + Math.cos(p.y * 0.002 + time * 0.0005) * 2;

        p.vx = Math.cos(angle) * (p.baseSpeed * speedMultiplier);
        p.vy = Math.sin(angle) * (p.baseSpeed * speedMultiplier);

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // REDUCED OPACITY & SIZE for energy trace look
        ctx.fillStyle = isDark ? 'rgba(0, 200, 255, 0.15)' : 'rgba(148, 163, 184, 0.2)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 0.5, 0, Math.PI * 2); 
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw(0);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default FlowField;