import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FlowField from '../Components/orb/FlowField';

const projectsData = [
  {
    id: '01',
    title: 'Movie Bookings Platform',
    description: 'A full-stack web application for browsing and booking movie tickets with real-time seat selection.',
    stack: ['React', 'Node', 'MongoDB', 'Express'],
    layout: 'image-left',
  },
  {
    id: '02',
    title: 'Cloud Infrastructure Management System',
    description: 'A cloud-native deployment architecture built on AWS with scalability, monitoring and automated deployment.',
    stack: ['AWS', 'EC2', 'S3', 'Lambda'],
    layout: 'image-right',
  },
  {
    id: '03',
    title: 'Emotion Classification AI',
    description: 'Real-time emotion detection using machine learning and computer vision techniques.',
    stack: ['Python', 'Tensorflow', 'OpenCV', 'ML'],
    layout: 'image-left',
  }
];

const Projects = ({ isDarkMode }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const railHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full min-h-screen py-32 overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 mix-blend-screen">
         <FlowField isDarkMode={isDarkMode} />
      </div>
      <div className="w-full max-w-7xl mx-auto px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-32 text-left"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-4 h-px ${isDarkMode ? 'bg-cyan-400' : 'bg-cyan-600'}`}></div>
            <p className={`text-xs font-bold tracking-[0.3em] uppercase ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
              PROJECT ARCHIVE
            </p>
          </div>
          <h2 className={`text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Built Systems
          </h2>
        </motion.div>

        <div className="relative pl-0 md:pl-16">
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-0.5 bg-white/5">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.6)] origin-top"
              style={{ height: railHeight }}
            />
          </div>
          <div className="flex flex-col gap-40">
            {projectsData.map((project) => {
              const isImageLeft = project.layout === 'image-left';

              return (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                  <div className={`absolute top-1/2 -translate-y-1/2 text-[15rem] font-black tracking-tighter pointer-events-none select-none z-[-1] transition-colors duration-1000 ${
                    isImageLeft ? '-left-12' : '-right-12'
                  } ${isDarkMode ? 'text-white/5' : 'text-black/5'}`}>
                    {project.id}
                  </div>
                  <div className={`col-span-1 lg:col-span-7 order-1 ${isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="group overflow-hidden rounded-2xl relative">
                      <div className={`absolute inset-0 z-10 transition-colors duration-500 pointer-events-none ${
                        isDarkMode ? 'bg-white/5 border border-white/10 group-hover:border-cyan-500/30' : 'bg-black/5 border border-black/10 group-hover:border-cyan-600/30'
                      } backdrop-blur-[2px] rounded-2xl`} />
                      <div className="aspect-16/10 w-full overflow-hidden rounded-2xl bg-slate-900/50">
                         <div className="w-full h-full transform transition-transform duration-700 group-hover:scale-[1.03] bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.1)_0%,rgba(0,0,0,0.5)_100%)] flex items-center justify-center">
                            <span className={`text-xs tracking-[0.3em] font-bold ${isDarkMode ? 'text-white/20' : 'text-white/40'}`}>
                              [ PROJECT PREVIEW ]
                            </span>
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className={`col-span-1 lg:col-span-5 flex flex-col justify-center order-2 ${isImageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="mb-6">
                      <span className={`text-sm font-bold tracking-widest mb-2 block ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>
                        {project.id}
                      </span>
                      <h3 className={`text-4xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {project.title}
                      </h3>
                    </div>
                    <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-white/60' : 'text-slate-600'}`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-10">
                      {project.stack.map(tech => (
                        <span 
                          key={tech} 
                          className={`text-xs font-semibold px-4 py-2 rounded-full cursor-default transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-white/5 text-white/80 border border-white/10 hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(0,255,255,0.2)]' 
                              : 'bg-black/5 text-slate-700 border border-black/10 hover:border-cyan-600 hover:shadow-[0_0_10px_rgba(0,200,255,0.15)]'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-8">
                      <a href="#" className={`text-xs font-bold tracking-[0.2em] group flex items-center gap-2 transition-colors duration-300 ${isDarkMode ? 'text-white hover:text-cyan-400' : 'text-slate-900 hover:text-cyan-600'}`}>
                        VIEW SYSTEM 
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </a>
                      <a href="#" className={`text-xs font-bold tracking-[0.2em] group flex items-center gap-2 transition-colors duration-300 ${isDarkMode ? 'text-white/50 hover:text-cyan-400' : 'text-slate-500 hover:text-cyan-600'}`}>
                        SOURCE CODE
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;