import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'portfolioProject',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Fintech Commerce', value: 'fintech-commerce' },
          { title: 'Quantum Design', value: 'quantum-design' },
          { title: 'Neural Interface', value: 'neural-interface' },
          { title: 'Void Architecture', value: 'void-architecture' },
          { title: 'Luminous Systems', value: 'luminous-systems' },
          { title: 'Silent Mono', value: 'silent-mono' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'details',
      title: 'Project Details',
      type: 'array',
      of: [{ type: 'block' }],
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
      category: 'category',
      media: 'image',
    },
    prepare(selection) {
      const { title, category } = selection;
      return {
        ...selection,
        subtitle: category,
      };
    },
  },
});

