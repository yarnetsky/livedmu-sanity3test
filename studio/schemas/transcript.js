export default {
  name: 'transcript',
  title: 'Transcript',
  type: 'object',
  fields: [
    {
      name: 'transcripts',
      type: 'array',
      title: 'transcripts',
      of: [
        {
          name: 'transcriptFile',
          type: 'file',
          title: 'Transcript File',
          fields: [
            {
              name: 'transcriptTitle',
              type: 'string',
              title: 'Transcript Title-Description',
            },
            {
              name: 'transcriptText',
              title: 'Transcript text',
              type: 'blockContent',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    },
  ],
  preview: {
    select: {
      images: 'transcripts',
      image: 'transcripts.0',
    },
  },
};
