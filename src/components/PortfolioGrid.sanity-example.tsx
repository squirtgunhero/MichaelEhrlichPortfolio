/**
 * SANITY-INTEGRATED VERSION OF PORTFOLIO GRID
 * 
 * This is an example showing how to integrate Sanity CMS with your existing PortfolioGrid.
 * 
 * To use this:
 * 1. Add content in Sanity Studio (npm run studio)
 * 2. Replace the contents of PortfolioGrid.tsx with this file
 * 3. Delete this example file
 */

import { motion, useMotionValue, useTransform } from 'motion/react';
import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { ProjectModal } from './ProjectModal';
import { sharedMouseTracker } from '../utils/performance';
import { getPortfolioProjects, urlFor, type PortfolioProject } from '../lib/sanity';

export const PortfolioGrid = memo(function PortfolioGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const projectRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  // Sanity CMS integration
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from Sanity on mount
  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getPortfolioProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const handleProjectClick = useCallback((project: PortfolioProject, id: string) => {
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

  // Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 px-12 max-w-[1800px] mx-auto relative">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/3] bg-slate-100 rounded-lg" />
            <div className="mt-6 h-6 bg-slate-100 rounded w-3/4" />
            <div className="mt-3 h-4 bg-slate-100 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-600">{error}</p>
        <p className="text-sm text-slate-400 mt-2">
          Make sure Sanity is configured and you've added content in the Studio
        </p>
      </div>
    );
  }

  // No projects state
  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-600">No projects yet</p>
        <p className="text-sm text-slate-400 mt-2">
          Add your first project in <a href="http://localhost:3333" target="_blank" rel="noopener noreferrer" className="underline">Sanity Studio</a>
        </p>
      </div>
    );
  }

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
            key={project._id}
            project={project}
            index={index}
            isHovered={hoveredId === project._id}
            onHover={setHoveredId}
            onClick={handleProjectClick}
            cursorPos={cursorPos}
            ref={(el) => (projectRefs.current[project._id] = el)}
          />
        ))}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={{
            title: selectedProject.title,
            category: selectedProject.category,
            image: urlFor(selectedProject.image).width(1200).url(),
            description: selectedProject.description || 'No description available',
          }}
          triggerElement={triggerElement}
        />
      )}
    </>
  );
});

interface ProjectTileProps {
  project: PortfolioProject;
  index: number;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (project: PortfolioProject, id: string) => void;
  cursorPos: { x: number; y: number };
}

const ProjectTile = memo(
  React.forwardRef<HTMLDivElement, ProjectTileProps>(
    ({ project, index, isHovered, onHover, onClick, cursorPos }, ref) => {
      const tileRef = useRef<HTMLDivElement | null>(null);
      const [tileCenter, setTileCenter] = useState({ x: 0, y: 0 });

      useEffect(() => {
        if (!tileRef.current) return;
        const rect = tileRef.current.getBoundingClientRect();
        setTileCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });

        const handleResize = () => {
          if (!tileRef.current) return;
          const rect = tileRef.current.getBoundingClientRect();
          setTileCenter({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

      const distance = isHovered
        ? Math.sqrt(
            Math.pow(cursorPos.x - tileCenter.x, 2) + Math.pow(cursorPos.y - tileCenter.y, 2)
          )
        : 0;

      const maxDistance = 200;
      const magnetStrength = Math.max(0, 1 - distance / maxDistance);

      const offsetX = isHovered ? (cursorPos.x - tileCenter.x) * magnetStrength * 0.15 : 0;
      const offsetY = isHovered ? (cursorPos.y - tileCenter.y) * magnetStrength * 0.15 : 0;

      // Generate optimized image URL from Sanity
      const imageUrl = urlFor(project.image)
        .width(800)
        .height(600)
        .fit('crop')
        .format('webp')
        .quality(85)
        .url();

      return (
        <motion.div
          ref={(node) => {
            tileRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => onHover(project._id)}
          onMouseLeave={() => onHover(null)}
          onClick={() => onClick(project, project._id)}
          className="group cursor-pointer relative"
        >
          <motion.div
            animate={{
              x: offsetX,
              y: offsetY,
            }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 20,
              mass: 0.5,
            }}
          >
            {/* Project image container */}
            <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-slate-50">
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <img
                  src={imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-slate-900/0 via-slate-900/0 to-slate-900/40"
                animate={{
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Magnetic glow effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${cursorPos.x - (tileCenter.x - 200)}px ${
                    cursorPos.y - (tileCenter.y - 200)
                  }px, rgba(148, 163, 184, 0.1) 0%, transparent 50%)`,
                }}
                animate={{
                  opacity: isHovered ? magnetStrength : 0,
                }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Project info */}
            <motion.div className="mt-6">
              <motion.h3
                className="text-2xl font-light tracking-tight text-slate-900"
                animate={{
                  x: isHovered ? 4 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {project.title}
              </motion.h3>

              <motion.p
                className="mt-2 text-sm font-light tracking-wide text-slate-500 uppercase"
                animate={{
                  x: isHovered ? 4 : 0,
                  opacity: isHovered ? 0.7 : 1,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {project.category}
              </motion.p>
            </motion.div>

            {/* Hover indicator */}
            <motion.div
              className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-slate-400"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isHovered ? 1 : 0,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </motion.div>
        </motion.div>
      );
    }
  )
);

ProjectTile.displayName = 'ProjectTile';

