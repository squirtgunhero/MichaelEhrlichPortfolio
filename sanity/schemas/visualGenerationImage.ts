import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'visualGenerationImage',
  title: 'Visual Generation Lab Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Image Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Midjourney', value: 'midjourney' },
          { title: 'Nano Banana', value: 'nano-banana' },
          { title: 'DALL·E', value: 'dalle' },
          { title: 'Meshy', value: 'meshy' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'e.g., "Dream Logic", "Spatial Composition"',
    }),
    defineField({
      name: 'image',
      title: 'Generated Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'is3D',
      title: 'Is 3D Model?',
      type: 'boolean',
      description: 'Check if this is a 3D model (for Meshy)',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'prompt',
      title: 'Generation Prompt',
      type: 'text',
      rows: 4,
      description: 'The AI prompt used to generate this image',
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
      media: 'image',
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

