import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Navigation } from '../components/Navigation';
import { HeroBackground } from '../components/HeroBackground';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';
import { AmbientLight } from '../components/AmbientLight';
import { MagneticText } from '../components/MagneticText';
import { AIFilmLabSection } from '../components/AIFilmLabSection';
import { VisualGenerationLabSection } from '../components/VisualGenerationLabSection';
import { throttle } from '../utils/performance';

export function HomePage() {
  const [activeSection, setActiveSection] = useState('hero');
  const [wordIndex, setWordIndex] = useState(0);
  const words = ['Invisible', 'Impossible', 'Unique', 'Bespoke'];
  const { scrollYProgress } = useScroll();
  
  // Motion transforms - these are already optimized by Framer Motion
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  // Cycle through words every 4 seconds (slower for better performance)
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    // Throttled scroll handler for better performance
    const handleScroll = throttle(() => {
      const sections = ['hero', 'work', 'ai-film-lab', 'visual-generation-lab', 'about', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    }, 100);

    window.addEventListener('scroll', handleScroll as any);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll as any);
  }, []);

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Additional transforms for hero section
  const heroTextY1 = useTransform(scrollYProgress, [0, 0.2], [0, -20]);
  const heroTextY2 = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
  const heroTextY3 = useTransform(scrollYProgress, [0, 0.2], [0, -10]);

  return (
    <div className="bg-white min-h-screen relative">
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <motion.div style={{ y: y }} className="absolute inset-0">
          <HeroBackground />
        </motion.div>
        
        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 text-center px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className="text-xs tracking-[0.5em] uppercase text-slate-400 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.2 }}
              style={{ y: heroTextY1 }}
            >
              Portfolio 2025
            </motion.p>

            <MagneticText strength={0.12} range={150}>
              <motion.h1
                className="text-6xl md:text-8xl text-slate-800 tracking-tighter mb-8 leading-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ y: heroTextY2 }}
              >
                Designing
                <br />
                <span className="text-slate-400">
                  the{' '}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="inline-block"
                    >
                      {words[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.h1>
            </MagneticText>

            <motion.p
              className="text-slate-500 max-w-md mx-auto leading-relaxed tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.8 }}
              style={{ y: heroTextY3 }}
            >
              Where minimalism meets surrealism. Crafting digital experiences
              that exist between dream and precision.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Subtle reflection at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-white/60 to-transparent backdrop-blur-sm" />
      </section>

      {/* Work Section */}
      <section id="work" className="min-h-screen py-32 relative bg-white">
        <AmbientLight delay={0.2} />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
        >
          <div className="text-center mb-24">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-[10px] tracking-[0.3em] uppercase mb-4"
              style={{ color: '#a0a0a0', fontWeight: 400 }}
            >
              Portfolio
            </motion.p>
            <MagneticText strength={0.12} range={160}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="text-5xl md:text-7xl tracking-tight"
                style={{ color: '#0a0a0a', fontWeight: 200 }}
              >
                Selected Works
              </motion.h2>
            </MagneticText>
          </div>

          <PortfolioGrid />
        </motion.div>
      </section>

      {/* AI Film Lab Section */}
      <AIFilmLabSection />

      {/* Visual Generation Lab Section */}
      <VisualGenerationLabSection />

      {/* About Section */}
      <section id="about" className="min-h-screen py-32 relative flex items-center">
        <AmbientLight delay={0.3} />
        <motion.div
          initial={{ scale: 0.98 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-200px' }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <AboutSection />
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-32 relative flex items-center">
        <AmbientLight delay={0.4} />
        <motion.div
          initial={{ scale: 0.98 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-200px' }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <ContactSection />
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-16 text-center border-t border-slate-200/50"
      >
        <p className="text-xs tracking-[0.3em] uppercase text-slate-400">
          © 2025 — Crafted with intention
        </p>
      </motion.footer>
    </div>
  );
}

