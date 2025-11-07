import { motion } from 'motion/react';
import { useState, useEffect, useRef, memo } from 'react';
import { MagneticText } from './MagneticText';

interface FilmProject {
  id: string;
  platform: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
}

const filmProjects: FilmProject[] = [
  { 
    id: 'runway', 
    platform: 'Runway', 
    title: 'Gen-3 Alpha Turbo',
    videoUrl: 'https://via.placeholder.com/800x450/1a1a1a/666666?text=Runway+Gen-3',
    thumbnailUrl: 'https://via.placeholder.com/800x450/1a1a1a/666666?text=Runway'
  },
  { 
    id: 'veo', 
    platform: 'Veo', 
    title: 'Dream Machine',
    videoUrl: 'https://via.placeholder.com/800x450/1a1a1a/666666?text=Veo+2',
    thumbnailUrl: 'https://via.placeholder.com/800x450/1a1a1a/666666?text=Veo'
  },
  { 
    id: 'sora', 
    platform: 'Sora', 
    title: 'Parallel Thoughts',
    videoUrl: 'https://via.placeholder.com/800x450/1a1a1a/666666?text=Sora',
    thumbnailUrl: 'https://via.placeholder.com/800x450/1a1a1a/666666?text=Sora'
  },
  { 
    id: 'kling', 
    platform: 'Kling', 
    title: 'Synthetic Dreams',
    videoUrl: 'https://via.placeholder.com/800x450/1a1a1a/666666?text=Kling+1.6',
    thumbnailUrl: 'https://via.placeholder.com/800x450/1a1a1a/666666?text=Kling'
  },
  { 
    id: 'pika', 
    platform: 'Pika', 
    title: 'Fluid Motion',
    videoUrl: 'https://via.placeholder.com/800x450/1a1a1a/666666?text=Pika+2.0',
    thumbnailUrl: 'https://via.placeholder.com/800x450/1a1a1a/666666?text=Pika'
  },
  { 
    id: 'luma', 
    platform: 'Luma', 
    title: 'Ray 2',
    videoUrl: 'https://via.placeholder.com/800x450/1a1a1a/666666?text=Luma+Ray+2',
    thumbnailUrl: 'https://via.placeholder.com/800x450/1a1a1a/666666?text=Luma'
  },
];

export const AIFilmLabSection = memo(function AIFilmLabSection() {
  return (
    <section id="ai-film-lab" className="relative py-32 bg-white">
      {/* Ambient gradient drift */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-slate-100/30 via-transparent to-slate-100/30"
          animate={{
            x: ['-10%', '10%', '-10%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>

      <div className="container mx-auto px-12 max-w-[1600px] relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-24"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
            className="text-[9px] tracking-[0.4em] uppercase mb-6"
            style={{ 
              color: '#a0a0a0', 
              fontWeight: 300,
              letterSpacing: '0.4em'
            }}
          >
            Experimental Cinema
          </motion.p>

          <MagneticText strength={0.08} range={180}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="text-5xl md:text-7xl tracking-tighter mb-6"
              style={{ 
                color: '#0a0a0a', 
                fontWeight: 200,
                letterSpacing: '-0.02em'
              }}
            >
              AI FILM LAB
            </motion.h2>
          </MagneticText>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-sm tracking-wide max-w-2xl mx-auto"
            style={{ 
              color: '#666', 
              fontWeight: 300,
              letterSpacing: '0.05em'
            }}
          >
            Explorations in Generative Video and Synthetic Cinematography
          </motion.p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative">
          {filmProjects.map((project, index) => (
            <FilmTile key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom ambient glow */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-50/40 to-transparent pointer-events-none" />
    </section>
  );
});

interface FilmTileProps {
  project: FilmProject;
  index: number;
}

const FilmTile = memo(function FilmTile({ project, index }: FilmTileProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [idlePulse, setIdlePulse] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tileRef = useRef<HTMLDivElement>(null);

  // Idle animation - subtle brightness shift every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIdlePulse(prev => (prev + 1) % 2);
    }, 15000 + index * 2000); // Stagger by index

    return () => clearInterval(interval);
  }, [index]);

  // Auto-play video on hover
  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {
          // Handle autoplay restrictions
        });
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered]);

  return (
    <motion.div
      ref={tileRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 1.2,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Halo reflection beneath */}
      <motion.div
        className="absolute -inset-8 -z-10 rounded-xl blur-3xl opacity-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(100, 100, 100, 0.08), transparent 70%)',
        }}
        animate={{
          opacity: isHovered ? 0.6 : idlePulse ? 0.15 : 0.1,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Main tile container */}
      <motion.div
        className="relative bg-white rounded-sm overflow-hidden"
        style={{
          boxShadow: isHovered
            ? '0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 20px rgba(0, 0, 0, 0.04)'
            : '0 4px 12px rgba(0, 0, 0, 0.02), 0 2px 6px rgba(0, 0, 0, 0.01)',
        }}
        animate={{
          y: isHovered ? -4 : 0,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Frosted glass border */}
        <div className="absolute inset-0 rounded-sm pointer-events-none z-10">
          <div className="absolute inset-0 rounded-sm border border-slate-200/40 backdrop-blur-sm" />
          <motion.div
            className="absolute inset-0 rounded-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(255,255,255,0.2) 100%)',
            }}
            animate={{
              opacity: isHovered ? 0.6 : 0.3,
            }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Video container */}
        <div className="aspect-[16/9] relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
          {/* Video element */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={project.videoUrl}
            poster={project.thumbnailUrl}
            loop
            muted
            playsInline
          />

          {/* Soft inner glow overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.1) 100%)',
            }}
            animate={{
              opacity: isHovered ? 0.8 : 0.4,
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Light from beneath effect on hover */}
          <motion.div
            className="absolute bottom-0 inset-x-0 h-1/3 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'linear-gradient(to top, rgba(255,255,255,0.3), transparent)',
            }}
          />
        </div>

        {/* Content overlay */}
        <div className="relative px-6 py-5 bg-gradient-to-b from-white/95 to-white backdrop-blur-sm">
          {/* Platform label */}
          <motion.p
            className="text-[9px] tracking-[0.3em] uppercase mb-2"
            style={{
              fontWeight: 400,
              color: '#999',
              letterSpacing: '0.3em',
            }}
            animate={{
              opacity: isHovered ? 0.6 : 0.8,
              y: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            {project.platform}
          </motion.p>

          {/* Title */}
          <motion.h3
            className="text-base tracking-tight"
            style={{
              fontWeight: 300,
              color: '#0a0a0a',
              fontStyle: 'italic',
              fontSize: '15px',
            }}
            animate={{
              y: isHovered ? -4 : 0,
              opacity: isHovered ? 1 : 0.85,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {project.title}
          </motion.h3>

          {/* View indicator on hover */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: isHovered ? 0.5 : 0,
              y: isHovered ? 0 : 8,
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-3 flex items-center gap-2"
          >
            <div className="w-4 h-px bg-gradient-to-r from-slate-300 to-transparent" />
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ color: '#999', fontWeight: 400 }}
            >
              Play
            </span>
          </motion.div>
        </div>

        {/* Bottom edge highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent" />
      </motion.div>
    </motion.div>
  );
});

