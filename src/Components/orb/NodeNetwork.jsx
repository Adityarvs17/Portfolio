import React, { useEffect, useRef } from 'react';

const NodeNetwork = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  const themeRef = useRef(isDarkMode);

  useEffect(() => {
    themeRef.current = isDarkMode;
  }, [isDarkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const particles = [];
    const particleCount = 20; 
    const connectionDistance = 180; 
    
    const resize = () => {
      canvas.width = window.innerWidth * 0.5; 
      canvas.height = window.innerHeight * 0.6; 
    };
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15, 
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 1.0 + 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = themeRef.current;
      const nodeColor = isDark ? '0, 255, 255' : '100, 116, 139';

      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const pulse = Math.sin(Date.now() * 0.001 + p.pulsePhase) * 0.5 + 0.5;
        const nodeAlpha = isDark ? 0.3 + (pulse * 0.6) : 0.4 + (pulse * 0.4);

        ctx.fillStyle = `rgba(${nodeColor}, ${nodeAlpha})`; 
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(${nodeColor}, ${opacity * 0.15})`; 
            ctx.lineWidth = 0.4; 
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 right-0 pointer-events-none z-0"
      style={{
        maskImage: 'radial-gradient(ellipse at top right, black 40%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at top right, black 40%, transparent 70%)'
      }}
    />
  );
};

export default NodeNetwork;