# Integrating Sanity Data into Components

Here's how to update your components to use Sanity CMS data instead of hardcoded content.

## 📂 Portfolio Grid Component

### Before (Hardcoded):
```typescript
const projects = [
  {
    title: 'Fintech Commerce',
    category: 'fintech-commerce',
    image: '/placeholder-image.jpg',
  },
  // More hardcoded projects...
];
```

### After (Sanity CMS):
```typescript
import { useState, useEffect } from 'react';
import { getPortfolioProjects, urlFor, type PortfolioProject } from '../lib/sanity';

export function PortfolioGrid() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getPortfolioProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  return (
    <div className="grid">
      {projects.map((project) => (
        <div key={project._id}>
          <img 
            src={urlFor(project.image).width(800).url()} 
            alt={project.title}
          />
          <h3>{project.title}</h3>
          <p>{project.category}</p>
        </div>
      ))}
    </div>
  );
}
```

## 🎬 AI Film Lab Section

### After (Sanity CMS):
```typescript
import { useState, useEffect } from 'react';
import { getAIFilmLabVideos, urlFor, type AIFilmLabVideo } from '../lib/sanity';

export function AIFilmLabSection() {
  const [videos, setVideos] = useState<AIFilmLabVideo[]>([]);

  useEffect(() => {
    async function fetchVideos() {
      const data = await getAIFilmLabVideos();
      setVideos(data);
    }
    fetchVideos();
  }, []);

  return (
    <section>
      {videos.map((video) => {
        // Use videoFile URL if uploaded, otherwise use videoUrl
        const videoSrc = video.videoFile || video.videoUrl;
        const thumbnailUrl = urlFor(video.thumbnailImage).width(800).url();
        
        return (
          <div key={video._id}>
            <video src={videoSrc} poster={thumbnailUrl} />
            <h3>{video.title}</h3>
            <p>{video.platform} {video.subtitle && `/ ${video.subtitle}`}</p>
          </div>
        );
      })}
    </section>
  );
}
```

## 🎨 Visual Generation Lab Section

### After (Sanity CMS):
```typescript
import { useState, useEffect } from 'react';
import { getVisualGenerationImages, urlFor, type VisualGenerationImage } from '../lib/sanity';

export function VisualGenerationLabSection() {
  const [images, setImages] = useState<VisualGenerationImage[]>([]);

  useEffect(() => {
    async function fetchImages() {
      const data = await getVisualGenerationImages();
      setImages(data);
    }
    fetchImages();
  }, []);

  return (
    <section>
      <div className="grid grid-cols-2 gap-8">
        {images.map((item) => {
          const imageUrl = urlFor(item.image)
            .width(800)
            .height(800)
            .url();
          
          return (
            <div key={item._id} data-is-3d={item.is3D}>
              <img src={imageUrl} alt={item.title} />
              <h3>{item.title}</h3>
              <p className="text-xs uppercase tracking-wide">
                {item.platform} {item.subtitle && `/ ${item.subtitle}`}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

## 🔄 Loading States

Add elegant loading states that match your design:

```typescript
function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-200 rounded-lg" />
      <div className="mt-4 h-4 bg-gray-200 rounded w-3/4" />
      <div className="mt-2 h-3 bg-gray-200 rounded w-1/2" />
    </div>
  );
}

// In your component:
if (loading) {
  return (
    <div className="grid grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <LoadingSkeleton key={i} />
      ))}
    </div>
  );
}
```

## 🖼️ Image URL Builder Options

Sanity's `urlFor()` helper has many options:

```typescript
// Resize
urlFor(image).width(800).height(600).url()

// Quality
urlFor(image).quality(90).url()

// Format
urlFor(image).format('webp').url()

// Crop/Fit
urlFor(image).fit('crop').crop('center').url()

// Auto format & quality
urlFor(image).auto('format').url()

// Combine
urlFor(image)
  .width(1200)
  .height(800)
  .fit('crop')
  .format('webp')
  .quality(85)
  .url()
```

## 📱 Responsive Images

```typescript
<img
  src={urlFor(image).width(800).url()}
  srcSet={`
    ${urlFor(image).width(400).url()} 400w,
    ${urlFor(image).width(800).url()} 800w,
    ${urlFor(image).width(1200).url()} 1200w
  `}
  sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
  alt={project.title}
/>
```

## 🎯 Best Practices

1. **Always handle loading states** - your CMS data is async
2. **Handle errors gracefully** - network might fail
3. **Optimize images** - use `.format('webp').quality(85)`
4. **Cache when possible** - consider React Query or SWR
5. **Show placeholders** - match your minimalist aesthetic

## 🚀 Optional: Real-time Updates

Want live updates when you change content? Add this:

```bash
npm install @sanity/preview-kit
```

Then your components can subscribe to real-time changes!

---

Ready to integrate? Just update your components following these patterns! 🎨

