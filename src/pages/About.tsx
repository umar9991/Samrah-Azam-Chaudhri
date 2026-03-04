import { motion } from "framer-motion";
import { Award, Users, BookOpen, HandHeart, Globe, Palette } from "lucide-react";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const roles = [
  { title: "Director / CEO", org: "VIGO Business Consulting Private Limited", icon: Award },
  { title: "Co-Founder", org: "Cherished Foundation", icon: HandHeart },
  { title: "President", org: "Center of Entrepreneurship", icon: Users },
  { title: "Global Advisor", org: "Global Chamber", icon: Globe },
  { title: "Advisory Board", org: "ISCEA", icon: BookOpen },
  { title: "Floral Art Society", org: "Art & Creative Expression", icon: Palette },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background selection:bg-secondary selection:text-primary">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 text-sm text-muted-foreground"
          >
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">About</span>
          </motion.nav>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-primary text-sm font-bold tracking-wider mb-4 border border-secondary/20">
              ABOUT
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-heading text-primary leading-tight">
              Samrah <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">Azam Chaudhri</span>
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl">
              International Management Consultant, Corporate Trainer & Entrepreneur
            </p>
          </motion.header>

          {/* Bio */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="prose prose-lg max-w-none mb-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  I am Samrah Azam Chaudhri, a multifaceted professional serving as an International Management Consultant, Corporate Trainer, and Entrepreneur. I hold the position of Director and CEO at <strong className="text-primary">VIGO Business Consulting Private Limited</strong>, where we drive business transformation and impact-focused global management training and development consulting.
                </p>
                <p>
                  My commitment to social impact led me to co-found the <strong className="text-primary">Cherished Foundation</strong>, dedicated to uplifting underprivileged communities. As President of the <strong className="text-primary">Center of Entrepreneurship</strong>, I mentor the next generation of business leaders and support innovation ecosystems.
                </p>
                <p>
                  I serve as a Global Advisor at the <strong className="text-primary">Global Chamber</strong> and on the <strong className="text-primary">ISCEA Advisory Board</strong>. My work spans consulting, education, and community initiatives—including ventures in women’s health, education, design, and the arts—blending strategic leadership with a focus on sustainable impact.
                </p>
              </div>
              <div className="bg-muted/30 rounded-2xl p-8 border border-border/50">
                <h3 className="text-lg font-bold text-foreground mb-6">Leadership & Roles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {roles.map((role, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + idx * 0.05 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <div className="w-10 h-10 shrink-0 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                        <role.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{role.title}</p>
                        <p className="text-xs text-muted-foreground">{role.org}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-6">Explore initiatives and get in touch.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/#projects">
                <button className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">
                  View Projects & Initiatives
                </button>
              </Link>
              <Link href="/#contact">
                <button className="px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-colors">
                  Contact
                </button>
              </Link>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
