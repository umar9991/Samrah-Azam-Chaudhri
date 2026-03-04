import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-heading">
              SAMRAH<span className="text-secondary">.</span>
            </h2>
            <p className="text-white/70 leading-relaxed max-w-sm">
              Empowering businesses and individuals through strategic consulting, training, and impactful social initiatives.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/in/samrah-azam-chaudhri-3615284a?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://www.facebook.com/share/1Bzk4Df4Mo/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-6 lg:col-span-2">
            <h3 className="text-xl font-bold font-heading text-secondary">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="shrink-0 mt-1 text-secondary" size={18} />
                <span>Islamabad, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="shrink-0 text-secondary" size={18} />
                <a href="mailto:contact@samrahazam.com" className="hover:text-white transition-colors">contact@samrahazam.com</a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone className="shrink-0 text-secondary" size={18} />
                <span>+92 304 5024774</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-heading text-secondary">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-white/70 hover:text-secondary transition-colors">Home</a></li>
              <li><a href="/about" className="text-white/70 hover:text-secondary transition-colors">About</a></li>
              <li><a href="/#projects" className="text-white/70 hover:text-secondary transition-colors">Projects</a></li>
              <li><a href="/#articles" className="text-white/70 hover:text-secondary transition-colors">Articles</a></li>
              <li><a href="/#contact" className="text-white/70 hover:text-secondary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {currentYear} Samrah Azam Chaudhri. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Designed with excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}
