import React from 'react';
import { motion } from 'framer-motion';
import TechStack from '../Components/orb/Profile/TechStack';
import CodingStats from '../Components/orb/Profile/CodingStats';
import ExperienceTimeline from '../Components/orb/Profile/ExpTimeline';
import FlowField from '../Components/orb/FlowField'; // Imported for the tiny background drift

const Profile = ({ isDarkMode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.2, 0.65, 0.3, 0.9] } 
    }
  };

  return (
    // 1. TRANSITION FADE BETWEEN SECTIONS
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      viewport={{ margin: "-10%" }}
      className="relative w-full overflow-hidden"
    >
      {/* 4. TINY AMOUNT OF BACKGROUND MOTION (Clamped to 30% opacity) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen">
         <FlowField isDarkMode={isDarkMode} />
      </div>
      <div className="w-full max-w-7xl mx-auto px-8 pt-24 pb-32 min-h-screen flex flex-col justify-center relative z-10 text-left -translate-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 w-full">
          
          <motion.div 
            className="col-span-1 lg:col-span-5 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <div className={`w-4 h-px ${isDarkMode ? 'bg-cyan-400' : 'bg-cyan-600'}`}></div>
              <p className={`text-xs font-bold tracking-[0.3em] uppercase ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                SYSTEM PROFILE
              </p>
            </motion.div>

            <motion.h2 
              variants={itemVariants} 
              className={`text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
            >
              Who I Am
            </motion.h2>

            <motion.p 
              variants={itemVariants} 
              className={`text-lg normal-case tracking-normal leading-relaxed mb-12 max-w-md ${isDarkMode ? 'text-white/70' : 'text-slate-600'}`}
            >
              Full Stack Developer focused on building scalable web applications, 
              AI-powered systems, and immersive digital experiences.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className={`group relative p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
                isDarkMode 
                  ? 'bg-white/5 border border-white/10 hover:border-cyan-400/30 hover:bg-white/10' 
                  : 'bg-black/5 border border-black/10 hover:border-cyan-600/30 hover:bg-black/10'
              }`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-cyan-500/10 to-transparent pointer-events-none" />
              
              <p className={`text-sm font-bold tracking-widest uppercase mb-1 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                2023 — 2027
              </p>
              <h3 className={`text-xl font-bold normal-case tracking-normal mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                B.Tech Computer Science
              </h3>
              <p className={`normal-case tracking-normal ${isDarkMode ? 'text-white/50' : 'text-slate-500'}`}>
                Gayatri Vidya Parishad College of Engineering
              </p>
            </motion.div>
          </motion.div>

          {/* --- RIGHT SIDE: TECH STACK & EXPERIENCE (60%) --- */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-6 relative justify-center">
            
            {/* 3. FAINT CYAN GLOW BEHIND RIGHT CARDS ONLY */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none rounded-full blur-[100px] z-[-1] transition-colors duration-1000 ${
              isDarkMode 
                ? 'bg-[radial-gradient(circle,rgba(8,145,178,0.12)_0%,rgba(0,0,0,0)_60%)]' 
                : 'bg-[radial-gradient(circle,rgba(8,145,178,0.05)_0%,rgba(0,0,0,0)_60%)]'
            }`} />

            <TechStack isDarkMode={isDarkMode} />
            <CodingStats isDarkMode={isDarkMode} />
            <ExperienceTimeline isDarkMode={isDarkMode} />
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default Profile;