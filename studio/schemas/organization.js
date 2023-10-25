export default {
  name: 'organization',
  title: 'Organization',
  type: 'document',
  fields: [
    {
      name: 'orgName',
      title: 'Organization Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'orgName',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Local Subjects',
      name: 'localSubjects',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'localSubjects' } }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'markdown',
    },
    {
      name: 'contentdm',
      title: 'ContentDM-IIIF details',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'contentdm' } }],
    },
  ],
  preview: {
    select: {
      title: 'orgName',
      media: 'image',
    },
  },
};
