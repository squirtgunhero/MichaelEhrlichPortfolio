import { motion, useMotionValue, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { ProjectModal } from './ProjectModal';
import { sharedMouseTracker } from '../utils/performance';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
}

const projects: Project[] = [
  { id: 1, title: 'Ethereal Commerce', category: 'E-Commerce Platform', image: 'minimal ecommerce' },
  { id: 2, title: 'Quantum Design', category: 'Brand Identity', image: 'modern branding' },
  { id: 3, title: 'Nexus Interface', category: 'UI/UX Design', image: 'minimalist interface' },
  { id: 4, title: 'Void Architecture', category: 'Digital Experience', image: 'architecture minimal' },
  { id: 5, title: 'Luminous Systems', category: 'Digital Product', image: 'minimal product design' },
  { id: 6, title: 'Silent Mono', category: 'Creative Direction', image: 'monochrome design' },
];

export const PortfolioGrid = memo(function PortfolioGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const projectRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const handleProjectClick = useCallback((project: Project, id: number) => {
    setSelectedProject(project);
    setTriggerElement(projectRefs.current[id]);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 700);
  }, []);

  useEffect(() => {
    // Use shared mouse tracker
    const unsubscribe = sharedMouseTracker.subscribe((x, y) => {
      setCursorPos({ x, y });
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {/* Idle gradient sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatDelay: 12,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-100/30 via-transparent to-slate-50/20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-12 max-w-[1800px] mx-auto relative">
        {projects.map((project, index) => (
          <ProjectTile
            key={project.id}
            project={project}
            index={index}
            isHovered={hoveredId === project.id}
            onHover={() => setHoveredId(project.id)}
            onLeave={() => setHoveredId(null)}
            onClick={() => handleProjectClick(project, project.id)}
            ref={(el) => { projectRefs.current[project.id] = el; }}
            cursorPos={cursorPos}
          />
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        triggerElement={triggerElement}
      />
    </>
  );
});

interface ProjectTileProps {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  cursorPos: { x: number; y: number };
}

const ProjectTile = motion(
  React.forwardRef<HTMLDivElement, ProjectTileProps>(
    ({ project, index, isHovered, onHover, onLeave, onClick, cursorPos }, ref) => {
      const tileRef = useRef<HTMLDivElement>(null);
      const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

      useEffect(() => {
        if (!tileRef.current || !isHovered) {
          setParallaxOffset({ x: 0, y: 0 });
          return;
        }

        const rect = tileRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (cursorPos.x - centerX) / rect.width;
        const deltaY = (cursorPos.y - centerY) / rect.height;

        setParallaxOffset({
          x: deltaX * 8,
          y: deltaY * 8,
        });
      }, [cursorPos, isHovered]);

      return (
        <motion.div
          ref={(el) => {
            if (typeof ref === 'function') {
              ref(el);
            } else if (ref) {
              ref.current = el;
            }
            tileRef.current = el;
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 1,
            delay: index * 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group cursor-pointer relative"
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          onClick={onClick}
        >
          {/* Levitating tile with shadow */}
          <motion.div
            className="relative bg-gradient-to-br from-[#fafafa] to-[#f8f8f8] rounded-sm overflow-hidden"
            animate={{
              y: isHovered ? -3 : 0,
              scale: isHovered ? 1.01 : 1,
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              boxShadow: isHovered
                ? '0 12px 40px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04)'
                : '0 2px 8px rgba(0, 0, 0, 0.03)',
            }}
          >
            {/* Cursor glow effect */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className="absolute w-48 h-48 rounded-full bg-gradient-radial from-white/60 via-slate-100/30 to-transparent blur-3xl"
                  style={{
                    left: `${parallaxOffset.x + 50}%`,
                    top: `${parallaxOffset.y + 50}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </motion.div>
            )}

            {/* Image container with aspect ratio */}
            <div className="aspect-[4/3] overflow-hidden relative">
              {/* Main image */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: isHovered ? 0.2 : 1,
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Blurred reflection overlay */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  style={{
                    filter: 'blur(20px) brightness(1.1)',
                    transform: 'scale(1.1)',
                  }}
                />
                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/60" />
              </motion.div>

              {/* Glassy highlight */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent"
                animate={{
                  opacity: isHovered ? 0.8 : 0.3,
                }}
                transition={{ duration: 0.6 }}
              />
            </div>

            {/* Content container */}
            <div className="relative p-8 bg-gradient-to-b from-[#fafafa] to-white">
              {/* Category - small caps */}
              <motion.p
                className="text-[10px] tracking-[0.25em] uppercase mb-3"
                style={{
                  fontWeight: 400,
                  color: '#a0a0a0',
                  letterSpacing: '0.25em',
                }}
                animate={{
                  opacity: isHovered ? 0.5 : 0.7,
                  y: isHovered ? -2 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                {project.category}
              </motion.p>

              {/* Title - drifts upward on hover */}
              <motion.h3
                className="text-[#0a0a0a] tracking-tight"
                style={{
                  fontWeight: 300,
                  fontSize: '1.5rem',
                  lineHeight: '1.3',
                }}
                animate={{
                  y: isHovered ? -8 : 0,
                  opacity: isHovered ? 1 : 0.9,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {project.title}
              </motion.h3>

              {/* View indicator */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isHovered ? 0.6 : 0,
                  y: isHovered ? 0 : 10,
                }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mt-4 flex items-center gap-2"
              >
                <div className="w-6 h-px bg-gradient-to-r from-slate-400 to-transparent" />
                <span
                  className="text-[11px] tracking-[0.2em] uppercase"
                  style={{ color: '#888', fontWeight: 400 }}
                >
                  View
                </span>
              </motion.div>
            </div>

            {/* Bottom edge highlight */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d0d0d0]/30 to-transparent" />
          </motion.div>

          {/* Ambient glow beneath tile */}
          <motion.div
            className="absolute -inset-4 -z-10 rounded-lg blur-2xl"
            style={{
              background: 'radial-gradient(circle at center, rgba(200, 200, 200, 0.15), transparent 70%)',
            }}
            animate={{
              opacity: isHovered ? 0.8 : 0,
              scale: isHovered ? 1.1 : 0.9,
            }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>
      );
    }
  )
);

ProjectTile.displayName = 'ProjectTile';
