import { motion } from 'motion/react';
import { Circle, Square, Triangle, User } from 'lucide-react';
import { useState } from 'react';
import { MagneticElement } from './MagneticElement';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const navItems = [
    { id: 'hero', icon: Circle, label: 'Home' },
    { id: 'work', icon: Square, label: 'Work' },
    { id: 'about', icon: Triangle, label: 'About' },
    { id: 'contact', icon: User, label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-12 px-8 py-4 rounded-full bg-white/40 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/5"
    >
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        
        return (
          <MagneticElement key={item.id} strength={0.2}>
            <motion.button
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setIsHovered(item.id)}
              onMouseLeave={() => setIsHovered(null)}
              className="relative flex flex-col items-center gap-3 group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
            >
              <Icon
                className="transition-all duration-700 ease-out"
                size={20}
                strokeWidth={1}
                style={{
                  color: isActive ? '#1a1a1a' : '#94a3b8',
                  transform: isHovered === item.id ? 'scale(1.2) rotate(90deg)' : 'scale(1) rotate(0deg)',
                }}
              />
              
              <motion.span
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: isHovered === item.id ? 0.6 : 0,
                  height: isHovered === item.id ? 'auto' : 0,
                }}
                transition={{ duration: 0.5 }}
                className="absolute top-full mt-2 text-xs tracking-widest text-slate-800/60 whitespace-nowrap overflow-hidden"
              >
                {item.label}
              </motion.span>

              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-2 w-1 h-1 rounded-full bg-gradient-to-r from-slate-400 to-slate-600"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          </MagneticElement>
        );
      })}
    </motion.nav>
  );
}
