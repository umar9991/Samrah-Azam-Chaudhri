import { useState } from "react";
import { type Project } from "@shared/schema";
import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const Placeholder = () => (
  <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
    <span className="text-4xl font-bold text-primary/10 select-none">Project</span>
  </div>
);

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = project.imageUrl && !imgError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl border bg-card hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 ${project.isFeatured ? 'col-span-1 md:col-span-2 lg:col-span-2 border-secondary/30 ring-1 ring-secondary/20' : 'border-border'}`}
    >
      {/* Background/Image Area - logos use object-contain to avoid blur from scaling */}
      <div className={`relative h-48 ${project.isFeatured ? 'md:h-64' : ''} overflow-hidden bg-white`}>
        {showImage ? (
          <img 
            src={project.imageUrl!} 
            alt={project.title} 
            className="w-full h-full object-contain p-3 transition-transform duration-700 group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
        ) : (
          <Placeholder />
        )}
        
        {project.isFeatured && (
          <div className="absolute top-4 right-4 bg-secondary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
            <Star size={12} fill="currentColor" /> Featured
          </div>
        )}
        
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-foreground px-3 py-1 rounded-full text-xs font-medium border border-border/50">
          {project.category}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 font-heading group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
          {project.description}
        </p>
        
        {project.facebookUrl && (
          <a
            href={project.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors"
          >
            Visit Facebook Page <ExternalLink size={16} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
