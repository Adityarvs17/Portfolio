import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const iconTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);

  const socials = [
    { name: "Instagram", href: "https://www.instagram.com/aditya__1718_/" },
    { name: "Linkedin", href: "https://www.linkedin.com/in/shanmukha-aditya-rallapalli-0096b12a5/" },
    { name: "GitHub", href: "https://github.com/Adityarvs17" },
  ];

  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 right-0 z-998 flex flex-col justify-between h-screen w-[50vw] max-w-150 py-20 pl-28 pr-10 bg-white/5 backdrop-blur-md border-l border-white/20 text-white/90 shadow-2xl"
      >
        <div className="flex flex-col gap-y-4 text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-tighter">
          {["home", "services", "about", "work", "contact"].map(
            (section, index) => (
              <div key={index} ref={(el) => (linksRef.current[index] = el)}>
                <Link
                  className="transition-all duration-300 cursor-pointer hover:text-white hover:translate-x-3 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] block"
                  to={`${section}`}
                  smooth
                  offset={0}
                  duration={2000}
                  onClick={toggleMenu}
                >
                  {section}
                </Link>
              </div>
            )
          )}
        </div>
        
        <div
          ref={contactRef}
          className="flex flex-col gap-8 md:flex-row text-sm md:text-base justify-between"
        >
          <div className="font-light">
            <p className="tracking-wider text-white/40 uppercase text-xs mb-2">E-mail</p>
            <p className="tracking-widest lowercase text-pretty hover:text-blue transition-colors cursor-pointer">
              adityarvs18@gmail.com
            </p>
          </div>
          <div className="font-light">
            <p className="tracking-wider text-white/40 uppercase text-xs mb-2">Social Media</p>
            <div className="flex flex-col md:flex-row gap-x-6 gap-y-2">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="leading-loose tracking-widest uppercase hover:text-white hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] transition-all duration-300"
                >
                  {"{ "}
                  {social.name}
                  {" }"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Burger Button - Kept exactly as is */}
      <div
        className="fixed z-999 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10 mix-blend-difference border border-white/20"
        onClick={toggleMenu}
        style={
          showBurger
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
      >
        <span
          ref={topLineRef}
          className="block w-6 md:w-8 h-0.5 bg-white rounded-full origin-center"
        ></span>
        <span
          ref={bottomLineRef}
          className="block w-6 md:w-8 h-0.5 bg-white rounded-full origin-center"
        ></span>
      </div>
    </>
  );
};

export default Navbar;