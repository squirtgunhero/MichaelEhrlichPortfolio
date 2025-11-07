import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVisualGenerationImages, urlFor, type VisualGenerationImage } from '../lib/sanity';
import { MagneticText } from '../components/MagneticText';
import { CustomCursor } from '../components/CustomCursor';

export function PlatformGalleryPage() {
  const { platform } = useParams<{ platform: string }>();
  const [images, setImages] = useState<VisualGenerationImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlatformImages() {
      try {
        const allImages = await getVisualGenerationImages();
        // Filter by platform
        const filtered = allImages.filter(
          (img) => img.platform.toLowerCase() === platform?.toLowerCase()
        );
        setImages(filtered);
      } catch (error) {
        console.error('Error fetching platform images:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPlatformImages();
  }, [platform]);

  return (
    <div className="min-h-screen bg-white">
      <CustomCursor />
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-8 left-8 z-50"
      >
        <Link
          to="/"
          className="text-sm tracking-wide uppercase text-slate-400 hover:text-slate-800 transition-colors duration-300 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Portfolio
        </Link>
      </motion.div>

      {/* Header */}
      <section className="relative py-32 bg-white">
        <div className="container mx-auto px-12 max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-20"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="text-[9px] tracking-[0.45em] uppercase mb-8"
              style={{
                color: '#999',
                fontWeight: 300,
                letterSpacing: '0.45em',
              }}
            >
              Visual Generation Lab
            </motion.p>

            <MagneticText strength={0.06} range={200}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.4 }}
                className="text-[52px] tracking-tighter mb-8"
                style={{
                  color: '#111',
                  fontWeight: 200,
                  letterSpacing: '-0.015em',
                  lineHeight: '1.1',
                }}
              >
                {platform?.toUpperCase()}
              </motion.h1>
            </MagneticText>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.7 }}
              className="text-[14px] tracking-wide max-w-xl mx-auto"
              style={{
                color: '#666',
                fontWeight: 300,
                letterSpacing: '0.06em',
              }}
            >
              {images.length} {images.length === 1 ? 'image' : 'images'} generated with {platform}
            </motion.p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-[1400px] mx-auto">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[16/9] bg-slate-50 rounded-sm" />
                  <div className="mt-4 h-3 bg-slate-50 rounded w-32" />
                </div>
              ))}
            </div>
          )}

          {/* No Content State */}
          {!loading && images.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 text-sm">No images found for {platform}</p>
              <Link
                to="/"
                className="text-slate-500 text-xs mt-4 inline-block underline hover:text-slate-800"
              >
                Return to homepage
              </Link>
            </div>
          )}

          {/* Gallery Grid */}
          {!loading && images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-[1400px] mx-auto">
              {images.map((image, index) => (
                <GalleryImage key={image._id} image={image} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

interface GalleryImageProps {
  image: VisualGenerationImage;
  index: number;
}

function GalleryImage({ image, index }: GalleryImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = urlFor(image.image)
    .width(1600)
    .height(900)
    .fit('crop')
    .crop('center')
    .format('webp')
    .quality(85)
    .url();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main image container */}
      <motion.div
        className="relative bg-white rounded-sm aspect-[16/9] overflow-hidden"
        style={{
          boxShadow: isHovered
            ? '0 16px 48px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.03)'
            : '0 2px 8px rgba(0, 0, 0, 0.015), 0 1px 4px rgba(0, 0, 0, 0.01)',
        }}
        animate={{
          y: isHovered ? -4 : 0,
        }}
        transition={{
          duration: 0.28,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        {/* Border */}
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
        </div>

        {/* Image */}
        <motion.img
          src={imageUrl}
          alt={image.title}
          className="w-full h-full object-cover"
          style={{
            filter: 'grayscale(0.05) contrast(0.98)',
          }}
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Inner glow on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 60%)',
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.28 }}
        />
      </motion.div>

      {/* Title and subtitle below */}
      {(image.title || image.subtitle) && (
        <motion.div
          className="mt-4"
          animate={{
            opacity: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.28 }}
        >
          {image.title && (
            <p
              className="text-[11px] uppercase mb-1"
              style={{
                fontWeight: 500,
                color: '#111',
                letterSpacing: '0.02em',
              }}
            >
              {image.title}
            </p>
          )}
          {image.subtitle && (
            <p
              className="text-[12px]"
              style={{
                fontWeight: 300,
                color: '#999',
                letterSpacing: '0.02em',
                fontStyle: 'italic',
              }}
            >
              {image.subtitle}
            </p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

