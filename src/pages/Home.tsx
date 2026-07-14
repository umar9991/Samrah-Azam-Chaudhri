import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, BookOpen, Send } from "lucide-react";

import { api } from "@shared/routes";
import type { InsertContact } from "@shared/schema";
import { useProjects } from "@/hooks/use-projects";
import { useArticles } from "@/hooks/use-articles";
import { useContactSubmit } from "@/hooks/use-contact";
import { GALLERY_EVENTS } from "@/data/static-data";

import { Navigation } from "@/components/Navigation";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { EventSlider } from "@/components/EventSlider";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";

export default function Home() {
  const [heroImgError, setHeroImgError] = useState(false);
  const { data: projects, isLoading: projectsLoading } = useProjects();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const { data: articles, isLoading: articlesLoading } = useArticles();
  const contactMutation = useContactSubmit();

  const form = useForm<InsertContact>({
    resolver: zodResolver(api.contact.submit.input),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <div className="min-h-screen bg-background selection:bg-secondary selection:text-primary">
      <Navigation />

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Website-related background: subtle logo watermark */}
        <div className="absolute inset-0 -z-10 bg-background" aria-hidden />
        <img
          src="/logos/international-business.png"
          alt=""
          className="absolute inset-0 -z-10 w-full h-full object-contain object-center opacity-[0.07] pointer-events-none"
          style={{ maxWidth: "min(70vw, 600px)", maxHeight: "min(70vh, 500px)", margin: "auto" }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-background/70 to-transparent pointer-events-none -z-10" />

        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-primary text-sm font-bold tracking-wider mb-4 border border-secondary/20">
                OFFICIAL WEBSITE
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-primary leading-tight">
                Samrah <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">Azam Chaudhri</span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-lg leading-relaxed border-l-4 border-secondary pl-6">
              International Management Consultant, Corporate Trainer & Entrepreneur
            </p>

            <p className="text-base text-muted-foreground/80 max-w-md">
              Director/CEO, Vigo Consulting Private Limited
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button  
                asChild
                size="lg"
                className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 h-12 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <a href="/about">About</a>
              </Button>
              <Button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                size="lg"
                className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 h-12 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                View Projects
              </Button>
              <Button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-primary text-primary hover:bg-primary/5 px-8 h-12 text-base font-semibold"
              >
                Contact
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-4 border-white bg-white">
              <div className="w-full aspect-4/3 p-8 flex flex-col justify-between bg-linear-to-br from-white via-white to-secondary/10">
                <div>
                  <p className="text-xs font-extrabold tracking-widest text-primary/70 uppercase">Initiatives</p>
                  <h3 className="mt-2 text-2xl font-bold font-heading text-primary leading-tight">
                    Projects that drive impact
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A snapshot of organizations and ventures.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4 items-center">
                  {[
                    { src: "/logos/vigo-consulting.png", alt: "Vigo Consulting Private Limited" },
                    { src: "/logos/vigo-entrepreneurship.png", alt: "Vigo Entrepreneurship Centre" },
                    { src: "/logos/humanity-indeed.png", alt: "Humanity Indeed" },
                    { src: "/logos/kids-nest.png", alt: "Kids Nest Pakistan" },
                    { src: "/logos/womens-health-care.png", alt: "Women's Health Care Pakistan Forum" },
                    { src: "/logos/international-business.png", alt: "International Business Project" },
                  ].map((logo) => (
                    <div
                      key={logo.src}
                      className="h-16 rounded-xl border border-border/60 bg-white/80 shadow-sm flex items-center justify-center p-3"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        loading="lazy"
                        decoding="async"
                        className="max-h-full max-w-full object-contain"
                        onError={() => setHeroImgError(true)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 top-1/4 bg-white p-4 rounded-xl shadow-xl border border-border/50 flex items-center gap-3"
              >
                <div className="bg-secondary/20 p-2 rounded-lg text-primary"><Award size={24} /></div>
                <div>
                  <p className="text-xs text-muted-foreground font-bold uppercase">Experience</p>
                  <p className="font-bold text-primary">15+ Years</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-8 bottom-1/3 bg-white p-4 rounded-xl shadow-xl border border-border/50 flex items-center gap-3"
              >
                <div className="bg-secondary/20 p-2 rounded-lg text-primary"><Users size={24} /></div>
                <div>
                  <p className="text-xs text-muted-foreground font-bold uppercase">Clients</p>
                  <p className="font-bold text-primary">Global Reach</p>
                </div>
              </motion.div>
            </div>
            <div className="absolute inset-0 bg-secondary/20 rounded-2xl blur-3xl -z-10 translate-y-10 scale-95" />
          </motion.div>
        </div>
      </section>

      {/* PROJECTS & INITIATIVES SECTION - Now Combined with Events */}
      <section id="projects" className="section-padding bg-muted/30">
        <div className="container-custom">
          <SectionHeader title="Projects, Initiatives & Events" subtitle="A showcase of ventures, organizations, and professional achievements." />

          {projectsLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary w-10 h-10" />
            </div>
          ) : (
            <>
              {/* Slider View - Unified Projects & Events */}
              <div className="mb-12">
                <EventSlider
                  slides={
                    projects?.map((project) => ({
                      id: project.id,
                      imageUrl: project.imageUrl || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=675&fit=crop",
                      title: project.title,
                      description: project.description,
                      facebookUrl: project.facebookUrl,
                      appUrl: project.appUrl,
                      appLabel: project.appLabel,
                      category: project.category,
                    })) || []
                  }
                  autoPlayInterval={5000}
                />
              </div>

              {/* Grid View - Additional Details */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-primary mb-8 text-center">All Initiatives</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects?.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* GALLERY & EVENTS SECTION */}
      <section id="gallery" className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader title="Gallery & Professional Events" subtitle="Professional milestones, training sessions, and academic achievements." />

          <EventSlider
            slides={GALLERY_EVENTS}
            autoPlayInterval={5000}
          />
        </div>
      </section>

      {/* ARTICLES SECTION */}
      <section id="articles" className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader title="Articles & Publications" subtitle="Sharing knowledge and insights on management and entrepreneurship." />

          {articlesLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-primary w-8 h-8" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {articles?.map((article, idx) => (
                <motion.a
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <div className="shrink-0 w-12 h-12 bg-secondary/20 text-primary rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">{article.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span>{article.platform}</span>
                      {article.publishedAt && (
                        <>
                          <span>•</span>
                          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" size={18} />
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section-padding bg-muted/50 relative">
        <div className="container-custom">
          <SectionHeader title="Get In Touch" subtitle="Let's discuss how we can collaborate and create impact together." />

          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-border/50 p-8 md:p-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-semibold">Name <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" className="h-12 bg-muted/20 border-border focus:border-primary focus:ring-primary/10 rounded-xl" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-semibold">Email <span className="text-destructive">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" className="h-12 bg-muted/20 border-border focus:border-primary focus:ring-primary/10 rounded-xl" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold">Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Collaboration Opportunity" className="h-12 bg-muted/20 border-border focus:border-primary focus:ring-primary/10 rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold">Message <span className="text-destructive">*</span></FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How can I help you?"
                          className="min-h-[150px] bg-muted/20 border-border focus:border-primary focus:ring-primary/10 rounded-xl resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full h-14 text-lg rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  {contactMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
