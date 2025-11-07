import { motion } from 'motion/react';
import { Mail, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { MagneticElement } from './MagneticElement';
import { MagneticText } from './MagneticText';

export function ContactSection() {
  const [emailHovered, setEmailHovered] = useState(false);
  const [messageHovered, setMessageHovered] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-12 text-center">
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
          Let's Connect
        </motion.p>

        <MagneticText strength={0.15} range={180}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-4xl md:text-5xl text-slate-800 tracking-tight mb-16 leading-tight"
          >
            Begin a conversation
          </motion.h2>
        </MagneticText>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8"
        >
          <MagneticElement strength={0.25}>
            <motion.a
              href="mailto:hello@portfolio.com"
              onMouseEnter={() => setEmailHovered(true)}
              onMouseLeave={() => setEmailHovered(false)}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              className="group relative flex items-center gap-4 px-12 py-5 rounded-full bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-2xl shadow-slate-900/20 overflow-hidden"
            >
              {/* Liquid ripple effect */}
              {emailHovered && (
                <motion.div
                  className="absolute inset-0 bg-gradient-radial from-white/20 via-transparent to-transparent"
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              )}
              <Mail size={18} strokeWidth={1.5} />
              <span className="tracking-wider relative z-10">Email</span>
              <motion.div
                animate={{ x: emailHovered ? 4 : 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                →
              </motion.div>
            </motion.a>
          </MagneticElement>

          <MagneticElement strength={0.25}>
            <motion.a
              href="#"
              onMouseEnter={() => setMessageHovered(true)}
              onMouseLeave={() => setMessageHovered(false)}
              whileHover={{ scale: 1.05, y: -4 }}
              transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
              className="group relative flex items-center gap-4 px-12 py-5 rounded-full bg-white border border-slate-200 text-slate-800 shadow-2xl shadow-black/5 overflow-hidden"
            >
              {/* Liquid ripple effect */}
              {messageHovered && (
                <motion.div
                  className="absolute inset-0 bg-gradient-radial from-slate-200/60 via-transparent to-transparent"
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              )}
              <MessageCircle size={18} strokeWidth={1.5} />
              <span className="tracking-wider relative z-10">Message</span>
            </motion.a>
          </MagneticElement>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-24 flex items-center justify-center gap-12"
        >
          {['LinkedIn', 'Twitter', 'Dribbble'].map((platform, index) => (
            <MagneticElement key={platform} strength={0.15}>
              <motion.a
                href="#"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                whileHover={{ y: -2 }}
                className="text-xs tracking-[0.3em] uppercase text-slate-400 hover:text-slate-700 transition-colors duration-500"
              >
                {platform}
              </motion.a>
            </MagneticElement>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
