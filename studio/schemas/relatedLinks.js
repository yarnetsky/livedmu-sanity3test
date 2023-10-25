export default {
  name: 'relatedLinks',
  title: 'Related Links',
  type: 'document',
  preview: {
    select: {
      title: 'urlTitle',
      subtitle: 'featuredURL',
    },
  },
  fields: [
    {
      name: 'urlTitle',
      title: 'Link Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'urlSlug',
      title: 'Link Slug',
      type: 'slug',
      options: {
        source: 'urlTitle',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Featured Link',
      name: 'featuredURL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'linkDescription',
      title: 'Link description',
      type: 'markdown',
    },
    {
      name: 'linkImage',
      title: 'Link image',
      type: 'mainImage',
    },
    {
      name: 'publish',
      title: 'Publish',
      type: 'boolean',
    },
  ],
};
