import React, { useEffect, useState, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

// Custom component to handle the animated counting
const Counter = ({ from, to, duration }) => {
  const [count, setCount] = useState(from);
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          setCount(Math.floor(value));
        }
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView]);

  return <span ref={nodeRef}>{count}</span>;
};

const CodingStats = ({ isDarkMode }) => {
  return (
    <div className={`p-8 rounded-3xl relative overflow-hidden transition-colors duration-1000 ${
        isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'
      }`}>
      
      {/* Blinking Status Indicator */}
      <div className="flex items-center gap-3 mb-8">
        <div className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.5)]' : 'bg-cyan-500'}`}></div>
        <h3 className={`text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-white/80' : 'text-slate-700'}`}>
          Competitive Programmer
        </h3>
      </div>

      {/* Grid Layout for Stats */}
      <div className="grid grid-cols-2 gap-8">
        {/* LeetCode */}
        <div>
          <p className={`text-[10px] tracking-[0.2em] uppercase mb-2 ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>LeetCode</p>
          <h4 className={`text-5xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <Counter from={0} to={700} duration={2} />+
          </h4>
          <p className={`text-xs mt-2 font-medium tracking-wide ${isDarkMode ? 'text-cyan-400/80' : 'text-cyan-600/80'}`}>Problems Solved</p>
        </div>

        {/* CodeChef */}
        <div>
          <p className={`text-[10px] tracking-[0.2em] uppercase mb-2 ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>CodeChef</p>
          <h4 className={`text-5xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <Counter from={0} to={2} duration={2} />★
          </h4>
          <p className={`text-xs mt-2 font-medium tracking-wide ${isDarkMode ? 'text-cyan-400/80' : 'text-cyan-600/80'}`}>Highest Rating</p>
        </div>
      </div>
    </div>
  );
};

export default CodingStats;