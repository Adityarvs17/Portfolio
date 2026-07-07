import React, { useState } from 'react';
import { motion } from 'framer-motion';

const techData = {
  Frontend: ['React', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript'],
  Backend: ['Node.js', 'Express'],
  Database: ['MongoDB', 'MySQL'],
  Cloud: ['AWS']
};

const TechStack = ({ isDarkMode }) => {
  const [activeBg, setActiveBg] = useState('TECH STACK');

  return (
    <div className={`p-8 rounded-3xl relative overflow-hidden transition-colors duration-1000 min-h-87.5 flex flex-col justify-between ${
        isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'
      }`}>

      {/* Massive Faint Background Text */}
      <div className={`absolute -bottom-6 right-0 text-[6rem] font-black uppercase tracking-tighter pointer-events-none select-none transition-all duration-500 whitespace-nowrap overflow-hidden ${
        isDarkMode ? 'text-white opacity-[0.03]' : 'text-black opacity-[0.03]'
      }`}>
        {activeBg}
      </div>

      <h3 className={`text-2xl font-bold uppercase tracking-widest mb-8 relative z-10 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        Tech Stack
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 relative z-10">
        {Object.entries(techData).map(([category, skills]) => (
          <div key={category}>
            <p className={`text-[10px] uppercase tracking-[0.2em] mb-3 ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>
              {category}
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <motion.span
                  key={skill}
                  onHoverStart={() => setActiveBg(category)}
                  onHoverEnd={() => setActiveBg('TECH STACK')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`cursor-pointer text-xs font-semibold px-4 py-2 rounded-full transition-colors duration-300 normal-case tracking-normal ${
                    isDarkMode 
                      ? 'bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 text-white/80 border border-white/5 hover:border-cyan-500/30'
                      : 'bg-black/5 hover:bg-cyan-600/10 hover:text-cyan-700 text-slate-700 border border-black/5 hover:border-cyan-600/20'
                  }`}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;