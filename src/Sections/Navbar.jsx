import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ isDarkMode, activeSection }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navItems = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'WORK', href: '#work' },
    { name: 'CONTACT', href: '#contact' }
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1 }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-1000 flex gap-2 px-6 py-3 rounded-full transition-colors duration-1000"
      style={{
        backdropFilter: 'blur(12px)',
        background: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
        border: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)'
      }}
    >
      {navItems.map((item, index) => {
        const isActive = activeSection === item.href;
        
        return (
          <a
            key={item.name}
            href={item.href}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative px-5 py-2 text-sm font-medium tracking-widest transition-colors duration-300 z-10 ${
              isActive 
                ? (isDarkMode ? 'text-cyan-400' : 'text-cyan-600') 
                : (isDarkMode ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-slate-900')
            }`}
          >
            {hoveredIndex === index && (
              <motion.div
                layoutId="nav-hover-pill"
                className={`absolute inset-0 rounded-full -z-10 ${
                  isDarkMode ? 'bg-white/10' : 'bg-black/5'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {item.name}
          </a>
        );
      })}
    </motion.nav>
  );
};

export default Navbar;