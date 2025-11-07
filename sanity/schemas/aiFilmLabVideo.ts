import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'aiFilmLabVideo',
  title: 'AI Film Lab Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Video Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Runway Gen-3', value: 'runway' },
          { title: 'Google Veo', value: 'veo' },
          { title: 'OpenAI Sora', value: 'sora' },
          { title: 'Kling AI', value: 'kling' },
          { title: 'Pika Labs', value: 'pika' },
          { title: 'Luma Ray 2', value: 'luma' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'e.g., "Dream Machine", "Parallel Thoughts"',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Alternative to uploading file - link to external video',
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'orderRank',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Order, Ascending',
      name: 'orderAsc',
      by: [{ field: 'orderRank', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      platform: 'platform',
      media: 'thumbnailImage',
    },
    prepare(selection) {
      const { title, platform } = selection;
      return {
        ...selection,
        subtitle: platform,
      };
    },
  },
});

