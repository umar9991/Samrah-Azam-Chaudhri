import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
}

export function SectionHeader({ title, subtitle, alignment = "center" }: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${alignment === "center" ? "text-center" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 relative inline-block">
          {title}
          <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-secondary/0 via-secondary to-secondary/0 opacity-50"></span>
        </h2>
        {subtitle && (
          <p className="mt-4 text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  );
}
