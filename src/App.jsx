import { useState, useEffect } from "react"
import Navbar from './Sections/Navbar'; // Adjust import path if needed
import Hero from "./Sections/Hero"
import Profile from "./Sections/Profile"
import Projects from "./Sections/Projects"
import Contact from "./Sections/Contact"
function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, 
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <main className={`relative h-full w-full transition-colors duration-1000 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      
      {/* GLOBAL NAVBAR HUD */}
      <Navbar isDarkMode={isDarkMode} activeSection={activeSection} />

      <section id="home" className="min-h-screen">
        <Hero isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </section>

      <section id="about" className="w-full border-b border-white/10 relative z-10">
        <Profile isDarkMode={isDarkMode} />
      </section>

      <section id="work" className={`w-full border-b transition-colors duration-1000 ${isDarkMode ? 'bg-[#050505] border-white/10 text-white' : 'bg-[#fafafa] border-black/10 text-slate-900'}`}>
        <Projects isDarkMode={isDarkMode} />
      </section>

      <section id="contact" className={`flex items-center justify-center h-screen w-full transition-colors duration-1000 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
        <Contact isDarkMode={isDarkMode} />
      </section>
    </main>
  );
}

export default App;