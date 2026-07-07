import {
  Mail,
  Globe,
  FileText,
} from "lucide-react";

import ContactCard from "../Components/orb/ContactCard";

const Contact = () => {
  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-8 md:px-20 bg-black"
    >
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-400/5 blur-[180px] rounded-full"></div>

      {/* Background Text */}
      <h1
        className="
        absolute
        top-20
        left-1/2
        -translate-x-1/2
        text-[10rem]
        md:text-[13rem]
        font-black
        uppercase
        text-white/[0.03]
        select-none
        pointer-events-none
        whitespace-nowrap
      "
      >
        CONTACT
      </h1>

      <div className="relative z-10 w-full max-w-6xl">

        {/* Heading */}

        <div className="text-center">

          <p className="hero-top-label text-cyan-300 mb-5">
            CONTACT
          </p>

          <h2 className="hero-title text-5xl md:text-6xl text-white mb-6">
            Let's Build Something
          </h2>

          <p className="hero-description text-white/70 max-w-2xl mx-auto">
            Have an exciting idea, internship opportunity,
            or just want to say hello?
            I'd love to hear from you.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-3 gap-8 mt-20">

          <ContactCard
            icon={<Mail size={24} />}
            title="Email"
            value="adityarvs18@email.com"
            link="mailto:adityarvs18@email.com"
          />

          <ContactCard
            icon={<Globe size={24} />}
            title="LinkedIn"
            value="Shanmukha Aditya"
            link="https://www.linkedin.com/in/shanmukha-aditya-rallapalli-0096b12a5/"
          />

          <ContactCard
            icon={<FileText size={24} />}
            title="Resume"
            value="Download Resume"
            link="/resume.pdf"
          />

        </div>

        {/* Footer */}

        <div className="mt-24 pt-10 border-t border-white/10 text-center">

          <h3 className="text-white font-medium">
            Designed & Developed by Aditya
          </h3>

          <p className="text-cyan-300 mt-2">
            Open to Opportunities
          </p>

          <p className="text-white/40 mt-3">
            © 2026
          </p>

        </div>

      </div>
    </section>
  );
};

export default Contact;