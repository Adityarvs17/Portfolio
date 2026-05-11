import React from 'react';
import GridDistortion from '../Components/orb/GridDistortion';
import BlurText from '../Components/orb/BlurText';
import image from '../assets/images/pawel-czerwinski-IXgSpDrxsgM-unsplash.jpg';
const Hero = ({theme}) => {
  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      <div className="absolute z-0 overflow-hidden" style={{ inset: '-20px' }}>
        <GridDistortion
          imageSrc={image}
          grid={11}
          mouse={0.22}
          strength={0.17}
          relaxation={0.9}
        />
      </div>
      <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none"></div>
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center pointer-events-none">
        <BlurText text="ADITYA" delay={200} animateBy="letters" direction='top' className={`text-7xl md:text-9xl lg:text-[12rem] font-bold uppercase
           tracking-tighter mb-4 mix-blend-overlay ${theme==='dark'?'text-white':'text-black'}`} />
        <BlurText text="Full Stack Developer" delay={50} animateBy="words"  direction="bottom"
          className={`text-xl font-light tracking-[0.5em] uppercase md:text-2xl ${theme === 'dark' ? 'text-white/80' : 'text-black/60'}`}
        />
      </div>

    </section>
  );
};

export default Hero;