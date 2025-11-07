import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Initialize Sanity client
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // Set to false for fresh data
  apiVersion: '2024-01-01',
});

// Helper for generating image URLs
const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Type definitions for your content
export interface PortfolioProject {
  _id: string;
  _type: 'portfolioProject';
  title: string;
  slug: { current: string };
  category: string;
  image: any;
  description?: string;
  details?: any[];
  orderRank: number;
}

export interface AIFilmLabVideo {
  _id: string;
  _type: 'aiFilmLabVideo';
  title: string;
  platform: string;
  subtitle?: string;
  videoFile?: { asset: { url: string } };
  videoUrl?: string;
  thumbnailImage: any;
  description?: string;
  orderRank: number;
}

export interface VisualGenerationImage {
  _id: string;
  _type: 'visualGenerationImage';
  title: string;
  platform: string;
  subtitle?: string;
  image: any;
  is3D: boolean;
  description?: string;
  prompt?: string;
  orderRank: number;
}

// Query helpers
export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  return client.fetch(
    `*[_type == "portfolioProject"] | order(orderRank asc) {
      _id,
      _type,
      title,
      slug,
      category,
      image,
      description,
      details,
      orderRank
    }`
  );
}

export async function getAIFilmLabVideos(): Promise<AIFilmLabVideo[]> {
  return client.fetch(
    `*[_type == "aiFilmLabVideo"] | order(orderRank asc) {
      _id,
      _type,
      title,
      platform,
      subtitle,
      "videoFile": videoFile.asset->url,
      videoUrl,
      thumbnailImage,
      description,
      orderRank
    }`
  );
}

export async function getVisualGenerationImages(): Promise<VisualGenerationImage[]> {
  return client.fetch(
    `*[_type == "visualGenerationImage"] | order(orderRank asc) {
      _id,
      _type,
      title,
      platform,
      subtitle,
      image,
      is3D,
      description,
      prompt,
      orderRank
    }`
  );
}

