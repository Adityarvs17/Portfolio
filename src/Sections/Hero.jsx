import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import FlowField from '../Components/orb/FlowField'
import NodeNetwork from '../Components/orb/NodeNetwork' 
import RightLanyard from '../Components/orb/DualLanyard'
import Navbar from './Navbar'

const Hero = ({ isDarkMode, setIsDarkMode }) => {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const cloudRef = useRef(null);
  const nodeRef = useRef(null);

  // 🚀 OPTIMIZATION 1: Smooth Parallax Engine via requestAnimationFrame
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const requestRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Just record the target, don't manipulate the DOM here
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const animateParallax = () => {
      // Lerp (smoothly interpolate) towards the target
      current.current.x += (mouse.current.x - current.current.x) * 0.05;
      current.current.y += (mouse.current.y - current.current.y) * 0.05;

      const { x, y } = current.current;

      // translate3d forces the browser to use the GPU for these layers
      if (bgRef.current) bgRef.current.style.transform = `translate3d(${x * 5}px, ${y * 5}px, 0)`;
      if (nodeRef.current) nodeRef.current.style.transform = `translate3d(${x * 15}px, ${y * 15}px, 0)`;
      if (cloudRef.current) cloudRef.current.style.transform = `translate3d(${x * 25}px, ${y * 25}px, 0)`;

      requestRef.current = requestAnimationFrame(animateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: 0.8, staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.4, ease: [0.2, 0.65, 0.3, 0.9] } }
  };

  return (
    <div 
      ref={heroRef} 
      className={`relative w-full min-h-screen overflow-hidden flex flex-col justify-center px-12 transition-colors duration-1000 ${isDarkMode ? 'bg-[#050505]' : 'bg-[#fafafa]'}`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Removed CSS transitions from these divs because the JS rAF loop handles the smoothness now */}
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
           <FlowField isDarkMode={isDarkMode} />
        </div>

        <div ref={cloudRef} className="absolute inset-0 will-change-transform">
            {/* 🚀 OPTIMIZATION 2: Removed blur-[150px] and replaced with pure radial gradients */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              style={{ willChange: 'transform, opacity' }}
              className={`absolute top-[10%] right-[5%] w-[60vw] h-[60vw] rounded-full mix-blend-screen transition-colors duration-1000 ${
                isDarkMode 
                  ? 'bg-[radial-gradient(circle,rgba(8,145,178,0.15)_0%,rgba(0,0,0,0)_70%)]' 
                  : 'bg-[radial-gradient(circle,rgba(203,213,225,0.5)_0%,rgba(0,0,0,0)_70%)]'
              }`} 
            />
            <motion.div 
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              style={{ willChange: 'transform, opacity' }}
              className={`absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen transition-colors duration-1000 ${
                isDarkMode 
                  ? 'bg-[radial-gradient(circle,rgba(30,58,138,0.15)_0%,rgba(0,0,0,0)_70%)]' 
                  : 'bg-[radial-gradient(circle,rgba(228,228,231,0.6)_0%,rgba(0,0,0,0)_70%)]'
              }`} 
            />
        </div>

        <div ref={nodeRef} className="absolute inset-0 will-change-transform">
           <NodeNetwork isDarkMode={isDarkMode} />
        </div>
      </div>

      <motion.div 
        className="relative z-10 max-w-3xl pl-4 pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
          <div className={`w-6 h-0.5 transition-colors duration-1000 ${isDarkMode ? 'bg-[#7dd3fc]/60' : 'bg-[#0369a1]/60'}`}></div>
          <p className={`hero-top-label tracking-[0.4em] text-sm transition-colors duration-1000 ${isDarkMode ? 'text-[#7dd3fc]/80' : 'text-[#0369a1]/80'}`}>
            FULL STACK + AI ENGINEER
          </p>
        </motion.div>
        
        <motion.h1 
          variants={itemVariants} 
          style={{ textShadow: isDarkMode ? '0 0 25px rgba(255,255,255,0.12)' : '0 0 25px rgba(0,0,0,0.05)' }}
          className={`hero-title text-8xl md:text-[9rem] font-bold uppercase tracking-tighter mb-4 transition-colors duration-1000 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
        >
          Aditya
        </motion.h1>
        
        <motion.p variants={itemVariants} className={`hero-role tracking-[0.3em] mb-8 ml-2 transition-colors duration-1000 ${isDarkMode ? 'text-[#a1a1aa]' : 'text-slate-500'}`}>
          FULL STACK DEVELOPER
        </motion.p>
        
        <motion.p variants={itemVariants} className={`hero-description max-w-lg ml-2 text-lg leading-relaxed transition-colors duration-1000 ${isDarkMode ? 'text-white/85' : 'text-slate-700/85'}`}>
          Building immersive full-stack applications, intelligent AI systems 
          and interactive digital experiences with React, Node.js, 
          JavaScript, and more.
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 2 }}
        className="absolute bottom-12 left-16 flex flex-col items-center z-20 pointer-events-none"
      >
        <div className={`w-px h-16 relative overflow-hidden transition-colors duration-1000 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
          <motion.div 
            animate={{ y: ["-100%", "200%"] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className={`absolute top-0 left-0 w-full h-1/2 transition-colors duration-1000 ${isDarkMode ? 'bg-linear-to-b from-transparent to-white/50' : 'bg-linear-to-b from-transparent to-black/50'}`}
          />
        </div>
      </motion.div>

      {/* 🚀 OPTIMIZATION 3: Radial gradient instead of blur for the lanyard shadow */}
      <div 
        className="absolute right-[10%] top-1/4 w-75 h-75 rounded-full pointer-events-none z-0 transition-opacity duration-1000"
        style={{
          background: isDarkMode 
            ? 'radial-gradient(circle, rgba(0,255,255,0.06) 0%, rgba(0,0,0,0) 70%)' 
            : 'radial-gradient(circle, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0) 70%)',
        }}
      />

      <RightLanyard onToggle={() => setIsDarkMode(!isDarkMode)} />
    </div>
  )
}

export default Hero