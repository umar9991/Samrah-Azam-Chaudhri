import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location === "/";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    ...(isHome
      ? [
          { name: "Projects", href: "#projects" },
          { name: "Articles", href: "#articles" },
          { name: "Contact", href: "#contact" },
        ]
      : [
          { name: "Projects", href: "/#projects" },
          { name: "Articles", href: "/#articles" },
          { name: "Contact", href: "/#contact" },
        ]),
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHashLink = (hash: string) => {
    setIsOpen(false);
    setLocation("/");
    window.location.hash = hash;
    setTimeout(() => {
      const el = document.querySelector(`#${hash}`);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLetsTalkClick = () => {
    setIsOpen(false);
    if (isHome) {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      setLocation("/");
      window.location.hash = "contact";
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleHomeClick = () => {
    setIsOpen(false);
    if (isHome) {
      window.history.replaceState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setLocation("/");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {isHome ? (
          <button type="button" onClick={handleHomeClick} className="text-2xl font-bold font-heading text-primary relative z-50 bg-transparent border-none cursor-pointer">
            SAMRAH<span className="text-secondary">.</span>
          </button>
        ) : (
          <Link href="/" className="text-2xl font-bold font-heading text-primary relative z-50">
            SAMRAH<span className="text-secondary">.</span>
          </Link>
        )}

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-semibold tracking-wide text-foreground hover:text-secondary transition-colors uppercase"
              >
                {link.name}
              </a>
            ) : link.href.startsWith("/#") ? (
              <button
                key={link.name}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleHashLink(link.href.replace("/#", ""));
                }}
                className="text-sm font-semibold tracking-wide text-foreground hover:text-secondary transition-colors uppercase bg-transparent border-none cursor-pointer"
              >
                {link.name}
              </button>
            ) : link.name === "Home" ? (
              <button
                key={link.name}
                type="button"
                onClick={handleHomeClick}
                className="text-sm font-semibold tracking-wide text-foreground hover:text-secondary transition-colors uppercase bg-transparent border-none cursor-pointer"
              >
                {link.name}
              </button>
            ) : (
              <Link key={link.name} href={link.href} className="text-sm font-semibold tracking-wide text-foreground hover:text-secondary transition-colors uppercase">
                {link.name}
              </Link>
            )
          )}
          <button
            type="button"
            onClick={isHome ? () => handleNavClick("#contact") : handleLetsTalkClick}
            className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
          >
            Let's Talk
          </button>
        </div>

        <button
          className="md:hidden relative z-50 p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full bg-white shadow-xl flex flex-col items-center py-24 gap-6 md:hidden"
            >
              {navLinks.map((link) =>
                link.href.startsWith("#") ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-lg font-bold text-foreground hover:text-secondary"
                  >
                    {link.name}
                  </a>
                ) : link.href.startsWith("/#") ? (
                  <button
                    key={link.name}
                    type="button"
                    onClick={() => handleHashLink(link.href.replace("/#", ""))}
                    className="text-lg font-bold text-foreground hover:text-secondary bg-transparent border-none cursor-pointer"
                  >
                    {link.name}
                  </button>
                ) : link.name === "Home" ? (
                  <button
                    key={link.name}
                    type="button"
                    onClick={handleHomeClick}
                    className="text-lg font-bold text-foreground hover:text-secondary bg-transparent border-none cursor-pointer"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link key={link.name} href={link.href} className="text-lg font-bold text-foreground hover:text-secondary" onClick={() => setIsOpen(false)}>
                    {link.name}
                  </Link>
                )
              )}
              <button
                type="button"
                onClick={handleLetsTalkClick}
                className="mt-2 px-6 py-3 bg-primary text-white text-base font-bold rounded-full shadow-lg hover:bg-primary/90 transition-all"
              >
                Let's Talk
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
