export default {
  name: 'links',
  title: 'Featured Links',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
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
    },
    {
      name: 'body',
      title: 'Body',
      type: 'markdown',
    },
    {
      name: 'linkImage',
      title: 'Link image',
      type: 'mainImage',
    },
    {
      title: 'Site location',
      name: 'siteLocation',
      type: 'string',
      options: {
        list: [{ title: 'Front page', value: 'front' }],
      },
    },
    {
      name: 'publish',
      title: 'Publish',
      type: 'boolean',
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
  ],
};
