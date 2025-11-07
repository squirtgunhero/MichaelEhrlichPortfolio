import { motion } from 'motion/react';
import { MagneticText } from './MagneticText';

export function AboutSection() {
  return (
    <div className="max-w-4xl mx-auto px-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="text-xs tracking-[0.4em] uppercase text-slate-400 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Philosophy
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="space-y-8"
        >
          <MagneticText strength={0.1} range={120}>
            <p className="text-slate-600 leading-relaxed tracking-wide text-lg">
              Design is not about filling space—it's about creating room for thought.
              Each element exists with purpose, breathing in silence, revealing meaning
              through absence as much as presence.
            </p>
          </MagneticText>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto max-w-xs"
          />

          <p className="text-slate-500 leading-relaxed tracking-wide">
            A fusion of minimalist precision and surrealist atmosphere—where every
            interaction feels deliberate, every transition sacred. This is design
            that whispers rather than shouts.
          </p>
        </motion.div>

        {/* Stats or minimal info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          className="grid grid-cols-3 gap-16 mt-24 pt-16 border-t border-slate-200/50"
        >
          {[
            { value: '50+', label: 'Projects' },
            { value: '8', label: 'Years' },
            { value: '∞', label: 'Possibilities' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <motion.p
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1.4 + index * 0.1 }}
                className="text-3xl text-slate-700 mb-2"
              >
                {stat.value}
              </motion.p>
              <p className="text-xs tracking-[0.3em] uppercase text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
