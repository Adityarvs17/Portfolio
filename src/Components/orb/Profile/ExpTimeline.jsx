import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExperienceTimeline = ({ isDarkMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`p-8 rounded-3xl relative overflow-hidden transition-all duration-1000 ${
        isDarkMode ? 'bg-white/5 border border-white/10 hover:bg-white/10' : 'bg-black/5 border border-black/10 hover:bg-black/10'
      }`}>
      <h3 className={`text-2xl font-bold uppercase tracking-widest mb-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        Experience
      </h3>

      <div className="relative pl-6 border-l-2 border-cyan-500/30">
        {/* Glowing Timeline Dot */}
        <div className={`absolute -left-2.25 top-2 w-4 h-4 rounded-full transition-shadow duration-500 ${
          isDarkMode ? 'bg-cyan-400' : 'bg-cyan-500'} ${isHovered ? 'shadow-[0_0_15px_rgba(0,255,255,0.6)]' : ''}`
        } />

        {/* Interactive Experience Node */}
        <motion.div
          layout
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer"
        >
          <motion.p layout className={`text-sm font-bold tracking-widest mb-1 uppercase ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
            2026
          </motion.p>
          <motion.h4 layout className={`text-xl font-bold mb-1 normal-case tracking-normal ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Winter Internship
          </motion.h4>
          <motion.p layout className={`mb-4 normal-case tracking-normal font-medium ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
            IIT Ropar
          </motion.p>

          {/* Hidden Tech Stack Reveal */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <p className={`text-xs uppercase tracking-widest mb-3 mt-2 ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>
                  Technologies Used:
                </p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'Python', 'Machine Learning'].map(tech => (
                    <span key={tech} className={`text-xs font-medium px-3 py-1.5 rounded-full ${isDarkMode ? 'bg-white/10 text-white/80' : 'bg-black/10 text-slate-700'}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;