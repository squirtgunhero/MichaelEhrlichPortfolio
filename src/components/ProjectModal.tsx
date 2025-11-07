import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description?: string;
  details?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  triggerElement?: HTMLElement | null;
}

export function ProjectModal({ project, isOpen, onClose, triggerElement }: ProjectModalProps) {
  if (!project) return null;

  // Get the position of the trigger element for zoom origin
  const getTriggerPosition = () => {
    if (!triggerElement) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const rect = triggerElement.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  const triggerPos = getTriggerPosition();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-white/95 z-[100]"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.3,
              x: triggerPos.x - window.innerWidth / 2,
              y: triggerPos.y - window.innerHeight / 2,
              filter: 'blur(10px)',
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              filter: 'blur(0px)',
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              x: triggerPos.x - window.innerWidth / 2,
              y: triggerPos.y - window.innerHeight / 2,
              filter: 'blur(10px)',
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-8 pointer-events-none"
          >
            <div className="max-w-6xl w-full pointer-events-auto">
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                onClick={onClose}
                className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-slate-800/10 backdrop-blur-sm hover:bg-slate-800/20 transition-colors duration-300 z-10"
              >
                <X size={20} strokeWidth={1.5} className="text-slate-800" />
              </motion.button>

              <motion.div
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-sm shadow-2xl overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-[16/9] overflow-hidden relative">
                  <motion.div
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
                </div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="p-12"
                >
                  <p className="text-xs tracking-[0.3em] uppercase text-slate-400 mb-4">
                    {project.category}
                  </p>
                  
                  <h2 className="text-4xl md:text-5xl text-slate-800 tracking-tight mb-8">
                    {project.title}
                  </h2>

                  <div className="space-y-6">
                    <p className="text-slate-600 leading-relaxed tracking-wide text-lg">
                      {project.description || 'A carefully crafted digital experience that blends minimalism with purposeful interaction. Every element breathes with intention, creating an atmosphere of quiet wonder.'}
                    </p>

                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="h-px bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 my-8 origin-left"
                    />

                    <p className="text-slate-500 leading-relaxed">
                      {project.details || 'This project explores the intersection of form and function, where aesthetic restraint meets technological precision. The result is an interface that feels both timeless and forward-thinking.'}
                    </p>

                    <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-slate-200/50">
                      {[
                        { label: 'Role', value: 'Design & Development' },
                        { label: 'Year', value: '2025' },
                        { label: 'Status', value: 'Live' },
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                          className="text-center"
                        >
                          <p className="text-xs tracking-[0.2em] uppercase text-slate-400 mb-2">
                            {item.label}
                          </p>
                          <p className="text-slate-700">{item.value}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
