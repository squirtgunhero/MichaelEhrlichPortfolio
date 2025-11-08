import { motion } from 'motion/react';
import { useState, useEffect, useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagneticText } from './MagneticText';
import { getVisualGenerationImages, urlFor, type VisualGenerationImage } from '../lib/sanity';

export const VisualGenerationLabSection = memo(function VisualGenerationLabSection() {
  const [visualProjects, setVisualProjects] = useState<VisualGenerationImage[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchImages() {
      try {
        const data = await getVisualGenerationImages();
        // Show only one image per platform (the first/most recent one)
        const uniquePlatforms = new Map<string, VisualGenerationImage>();
        data.forEach((image) => {
          const platform = image.platform.toLowerCase();
          if (!uniquePlatforms.has(platform)) {
            uniquePlatforms.set(platform, image);
          }
        });
        setVisualProjects(Array.from(uniquePlatforms.values()));
      } catch (error) {
        console.error('Error fetching visual generation images:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);
  return (
    <section id="visual-generation-lab" className="relative py-32 bg-white">
      {/* Diagonal shimmer gradient - barely visible */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.02, 0.04, 0.02] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, rgba(208, 230, 255, 0.08) 50%, transparent 60%)',
          }}
          animate={{
            x: ['-100%', '200%'],
            y: ['-100%', '200%'],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>

      <div className="container mx-auto px-12 max-w-[1400px] relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-32"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-[9px] tracking-[0.45em] uppercase mb-8"
            style={{ 
              color: '#999', 
              fontWeight: 300,
              letterSpacing: '0.45em'
            }}
          >
            Synthetic Imagery
          </motion.p>

          <MagneticText strength={0.06} range={200}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.4 }}
              className="text-[42px] tracking-tighter mb-8"
              style={{ 
                color: '#111', 
                fontWeight: 200,
                letterSpacing: '-0.015em',
                lineHeight: '1.1'
              }}
            >
              VISUAL GENERATION LAB
            </motion.h2>
          </MagneticText>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="text-[14px] tracking-wide max-w-xl mx-auto mb-20"
            style={{ 
              color: '#666', 
              fontWeight: 300,
              letterSpacing: '0.06em'
            }}
          >
            Explorations in Generative Imagery and Spatial Design
          </motion.p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 lg:gap-24 max-w-[1200px] mx-auto mt-20">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[16/9] bg-slate-50 rounded-sm" />
                <div className="mt-4 h-3 bg-slate-50 rounded w-24" />
                <div className="mt-2 h-2 bg-slate-50 rounded w-32" />
              </div>
            ))}
          </div>
        )}

        {/* No Content State */}
        {!loading && visualProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-sm">No visual generation projects yet</p>
            <p className="text-slate-300 text-xs mt-2">
              Add images in{' '}
              <a 
                href="https://michael-ehrlich.sanity.studio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-slate-400"
              >
                Sanity Studio
              </a>
            </p>
          </div>
        )}

        {/* 2x2 Grid with breathing margins */}
        {!loading && visualProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 lg:gap-24 max-w-[1200px] mx-auto mt-20">
            {visualProjects.map((project, index) => (
              <VisualTile key={project._id} project={project} index={index} navigate={navigate} />
            ))}
          </div>
        )}
      </div>

      {/* Diffuse skylight effect at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
    </section>
  );
});

interface VisualTileProps {
  project: VisualGenerationImage;
  index: number;
  navigate: (path: string) => void;
}

const VisualTile = memo(function VisualTile({ project, index, navigate }: VisualTileProps) {
  // Generate optimized image URL from Sanity - 16:9 aspect ratio to match AI Film Lab
  const imageUrl = urlFor(project.image)
    .width(1600)
    .height(900)
    .fit('crop')
    .crop('center')
    .format('webp')
    .quality(85)
    .url();
  const [isHovered, setIsHovered] = useState(false);
  const [shimmerPhase, setShimmerPhase] = useState(0);
  const tileRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Idle shimmer animation - every 25-30s with slight variation per tile
  useEffect(() => {
    const shimmerInterval = 25000 + index * 1250;
    const interval = setInterval(() => {
      setShimmerPhase(prev => prev + 1);
    }, shimmerInterval);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <motion.div
      ref={tileRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 1.2,
        delay: index * 0.02, // 20ms stagger
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/gallery/${project.platform.toLowerCase()}`)}
    >
      {/* Aluminum reflection beneath */}
      <motion.div
        className="absolute -inset-12 -z-10 blur-3xl opacity-0"
        style={{
          background: 'radial-gradient(circle at 50% 60%, rgba(216, 216, 216, 0.12), transparent 65%)',
        }}
        animate={{
          opacity: isHovered ? 0.5 : shimmerPhase ? 0.08 : 0.04,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1] 
        }}
      />

      {/* Main tile container */}
      <motion.div
        className="relative bg-white rounded-sm aspect-[16/9]"
        style={{
          boxShadow: isHovered
            ? '0 16px 48px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.03)'
            : '0 2px 8px rgba(0, 0, 0, 0.015), 0 1px 4px rgba(0, 0, 0, 0.01)',
          overflow: 'visible',
        }}
        animate={{
          y: isHovered ? -4 : 0,
        }}
        transition={{
          duration: 0.28,
          ease: [0.33, 1, 0.68, 1], // cubic ease
        }}
      >
        {/* Frosted glass border with thin graphite outline */}
        <div className="absolute inset-0 rounded-sm pointer-events-none z-20">
          <motion.div 
            className="absolute inset-0 rounded-sm border backdrop-blur-sm"
            style={{
              borderColor: 'rgba(17, 17, 17, 0.08)',
            }}
            animate={{
              borderColor: isHovered 
                ? 'rgba(17, 17, 17, 0.12)' 
                : 'rgba(17, 17, 17, 0.08)',
            }}
            transition={{ duration: 0.28 }}
          />
          
          {/* Subtle gradient overlay for depth */}
          <motion.div
            className="absolute inset-0 rounded-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 40%, rgba(208,230,255,0.06) 100%)',
            }}
            animate={{
              opacity: isHovered ? 0.7 : 0.4,
            }}
            transition={{ duration: 0.28 }}
          />
        </div>

        {/* Image container */}
        <div className="relative w-full h-full overflow-hidden rounded-sm bg-gradient-to-br from-[#fafafa] to-[#f5f5f5]">
          {/* Main image */}
          <motion.img
            ref={imageRef}
            src={imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{
              filter: 'grayscale(0.05) contrast(0.98)',
            }}
            animate={{
              scale: project.is3D && isHovered ? 1.05 : 1,
              rotate: project.is3D && isHovered ? 2 : 0,
            }}
            transition={{ 
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
          />

          {/* Motion blur effect for animated projects (currently not in Sanity schema) */}
          {false && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                filter: 'blur(20px)',
              }}
              animate={{
                x: isHovered ? ['0%', '100%'] : '0%',
                opacity: isHovered ? [0, 0.3, 0] : 0,
              }}
              transition={{ 
                duration: 1.2, 
                repeat: isHovered ? Infinity : 0,
                ease: 'easeInOut'
              }}
            />
          )}

          {/* Inner glow on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 60%)',
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.28 }}
          />

          {/* Shimmer effect for idle state */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{
              opacity: shimmerPhase && !isHovered ? [0, 0.15, 0] : 0,
            }}
            transition={{
              duration: 2.5,
              ease: 'easeInOut'
            }}
            style={{
              background: 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
            }}
          />
        </div>

        {/* Label - bottom center */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 px-6 py-5 pb-6 bg-gradient-to-t from-white via-white/98 to-white/70 rounded-b-sm text-center"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0.95,
          }}
          transition={{ duration: 0.28 }}
        >
          <motion.p
            className="text-[8px] uppercase"
            style={{
              fontWeight: 500,
              color: '#111',
              letterSpacing: '0.02em',
            }}
            animate={{
              opacity: isHovered ? 1 : 0.9,
              y: isHovered ? -1 : 0,
            }}
            transition={{ duration: 0.28 }}
          >
            {project.platform.toUpperCase()}
          </motion.p>
          
          {project.subtitle && (
            <motion.p
              className="text-[12px] mt-1"
              style={{
                fontWeight: 300,
                color: '#999',
                letterSpacing: '0.02em',
                fontStyle: 'italic',
              }}
              animate={{
                opacity: isHovered ? 0.9 : 0.6,
              }}
              transition={{ duration: 0.28 }}
            >
              {project.subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Bottom accent line - electric blue hint */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(208, 230, 255, 0.3) 50%, transparent 100%)',
          }}
          animate={{
            opacity: isHovered ? 0.6 : 0.2,
          }}
          transition={{ duration: 0.28 }}
        />
      </motion.div>

      {/* Cursor distortion ripple effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-sm pointer-events-none z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, 0.15, 0],
            scale: [0.8, 1.2, 1.4],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeOut'
          }}
          style={{
            background: 'radial-gradient(circle at center, rgba(208, 230, 255, 0.2), transparent 70%)',
          }}
        />
      )}
    </motion.div>
  );
});

