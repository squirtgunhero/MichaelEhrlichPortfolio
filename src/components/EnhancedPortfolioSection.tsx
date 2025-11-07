import { motion } from 'motion/react';
import { PortfolioGrid } from './PortfolioGrid';
import { MagneticText } from './MagneticText';

export function EnhancedPortfolioSection() {
  return (
    <section className="relative py-40 bg-gradient-to-b from-white via-[#fafafa] to-white overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(248, 248, 248, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(248, 248, 248, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(248, 248, 248, 0.4) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2 }}
        className="text-center mb-28 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Overline */}
          <p
            className="text-[10px] tracking-[0.3em] uppercase mb-6"
            style={{
              color: '#a0a0a0',
              fontWeight: 400,
              fontFamily: 'var(--font-portfolio)',
            }}
          >
            Portfolio
          </p>

          {/* Main heading */}
          <MagneticText strength={0.1} range={180}>
            <h2
              className="text-6xl md:text-7xl lg:text-8xl tracking-tight mb-6"
              style={{
                color: '#0a0a0a',
                fontWeight: 200,
                fontFamily: 'var(--font-portfolio)',
                lineHeight: 1.1,
              }}
            >
              Selected Works
            </h2>
          </MagneticText>

          {/* Underline accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-px bg-gradient-to-r from-transparent via-[#d0d0d0] to-transparent max-w-xs mx-auto mt-8"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 text-sm tracking-wide max-w-md mx-auto"
            style={{
              color: '#888',
              fontWeight: 300,
              fontFamily: 'var(--font-portfolio)',
            }}
          >
            A curated collection of digital experiences — each one designed with
            precision, minimal intervention, and quiet intention.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Portfolio grid */}
      <div className="relative z-10">
        <PortfolioGrid />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
