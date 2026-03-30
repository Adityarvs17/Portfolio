import React from "react";
import Navbar from "./Sections/Navbar";
import Hero from "./Sections/Hero"
import About from "./Sections/About"
import DualLanyard from "./Components/orb/DualLanyard"
import {useState} from "react"
function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <main className="relative bg-black ...">
   <div className="bg-grain"></div>
   <div className="absolute inset-0 bg-grid z-0"></div>

    <Navbar />
    <DualLanyard 
        onToggleLight={() => setTheme("light")} 
        onToggleDark={() => setTheme("dark")} 
      />
    <section id="home">
        <Hero theme={theme} />
    </section>
      <section id="about" className="flex items-center justify-center h-screen w-full border-b border-white/10">
        <h1 className="text-8xl font-bold uppercase tracking-tighter text-white">
          <About />
        </h1>
      </section>

      <section id="exp" className="flex items-center justify-center h-screen w-full bg-neutral-950 border-b border-white/10">
        <h1 className="text-8xl font-bold uppercase tracking-tighter text-white">
          Experience
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
