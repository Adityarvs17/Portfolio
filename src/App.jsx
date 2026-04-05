import PillNav from './Sections/Navbar';
import Hero from "./Sections/Hero"
import About from "./Sections/About"
import DualLanyard from "./Components/orb/DualLanyard"
import { useState, useEffect } from "react"

// 1. MOVE THIS OUTSIDE THE COMPONENT! 
// Now its memory reference never changes, preventing GSAP from rebuilding on scroll.
const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' }
];

function App() {
  const [theme, setTheme] = useState("dark");
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
    <main className="relative bg-black h-full w-full">
      <div className="bg-grain"></div>
      <div className="absolute inset-0 bg-grid z-0"></div>

      <PillNav 
        items={NAV_ITEMS} // 2. PASS THE STABLE ARRAY HERE
        activeHref={activeSection} 
        baseColor="#000000"
        pillColor="#ffffff"
        hoverCircleColor="#6366f1"
      />

      <DualLanyard 
        onToggleLight={() => setTheme("light")} 
        onToggleDark={() => setTheme("dark")} 
      />

      <section id="home" className="min-h-screen">
        <Hero theme={theme} />
      </section>

      <section id="about" className="flex items-center justify-center h-screen w-full border-b border-white/10">
        <h1 className="text-8xl font-bold uppercase tracking-tighter text-white">
          <About />
        </h1>
      </section>

      <section id="work" className="flex items-center justify-center h-screen w-full bg-neutral-950 border-b border-white/10">
        <h1 className="text-8xl font-bold uppercase tracking-tighter text-white">
          Work
        </h1>
      </section>

      <section id="contact" className="flex items-center justify-center h-screen w-full border-b border-white/10">
        <h1 className="text-8xl font-bold uppercase tracking-tighter text-white">
          Contact
        </h1>
      </section>
    </main>
  );
}

export default App;
