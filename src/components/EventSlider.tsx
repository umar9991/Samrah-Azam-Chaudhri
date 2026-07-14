import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

export interface EventSlide {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  facebookUrl?: string;
  appUrl?: string | null;
  appLabel?: string | null;
  category?: string;
}

interface EventSliderProps {
  slides: EventSlide[];
  autoPlayInterval?: number;
}

export function EventSlider({ slides, autoPlayInterval = 4000 }: EventSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let newIndex = prev + newDirection;
      if (newIndex < 0) {
        newIndex = slides.length - 1;
      } else if (newIndex >= slides.length) {
        newIndex = 0;
      }
      return newIndex;
    });
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) {
      const timer = setTimeout(() => setIsAutoPlaying(true), 2000);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full max-w-md mx-auto group">
      {/* Main Slider Container */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-muted/30 border border-border/50 shadow-lg">
        <div className="relative w-full h-80 bg-black">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
              }}
              drag="x"
              dragElastic={1}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0"
            >
              <img
                src={slides[currentIndex].imageUrl}
                alt={slides[currentIndex].title}
                className="w-full h-full object-contain bg-black"
                loading="lazy"
                decoding="async"
              />
              
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Event Title and Description */}
              <div className="absolute inset-0 flex flex-col justify-end p-3 md:p-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="space-y-3"
                >
                  {slides[currentIndex].category && (
                    <div className="inline-flex w-fit">
                      <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full border border-white/30">
                        {slides[currentIndex].category}
                      </span>
                    </div>
                  )}
                  <h3 className="text-lg md:text-xl font-bold font-heading text-white leading-tight">
                    {slides[currentIndex].title}
                  </h3>
                  {slides[currentIndex].description && (
                    <p className="text-xs md:text-sm text-white/90 max-w-xl line-clamp-2">
                      {slides[currentIndex].description}
                    </p>
                  )}
                  {(slides[currentIndex].appUrl || slides[currentIndex].facebookUrl) && (
                    <motion.a
                      href={slides[currentIndex].appUrl || slides[currentIndex].facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      className="inline-flex items-center gap-2 text-white hover:text-secondary transition-colors text-sm font-semibold mt-2"
                    >
                      {slides[currentIndex].appUrl
                        ? (slides[currentIndex].appLabel || "Open App")
                        : "Learn More"}{" "}
                      <ExternalLink size={16} />
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full ${
              index === currentIndex
                ? "bg-primary w-3 h-3 md:w-4 md:h-4"
                : "bg-primary/30 hover:bg-primary/50 w-2 h-2 md:w-3 md:h-3"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <span className="font-semibold text-primary">{currentIndex + 1}</span> / {slides.length}
      </div>
    </div>
  );
}
