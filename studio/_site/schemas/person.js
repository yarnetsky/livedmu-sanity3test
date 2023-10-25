export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Display Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'personalNames',
      title: 'Personal Names',
      type: 'personName',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Primary Image',
      type: 'mainImage',
    },
    {
      title: 'Person Type',
      name: 'personType',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'grid',
        list: [
          { title: 'Story Subject', value: 'Story Subject' },
          { title: 'Interviewee', value: 'Interviewee' },
          { title: 'Interviewer', value: 'interviewer' },
          { title: 'Editor', value: 'Editor' },
          { title: 'Assistant Editor', value: 'Assistant Editor' },
          { title: 'Author', value: 'Author' },
          { title: 'Photographer', value: 'Photographer' },
          { title: 'Producer', value: 'Producer' },
          { title: 'Director', value: 'Director' },
          { title: 'Production Assistant', value: 'Production Assistant' },
        ],
      },
    },
    {
      name: 'miamiInformation',
      title: 'Miami Profile',
      type: 'miamiProfile',
    },
    {
      name: 'demographicInformation',
      title: 'Demographic Information',
      type: 'demographics',
    },
    {
      title: 'Local Subjects',
      name: 'localSubjects',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'localSubjects' } }],
    },
    {
      name: 'bio',
      title: 'Brief Bio',
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
      title: 'name',
      media: 'image',
    },
  },
};
