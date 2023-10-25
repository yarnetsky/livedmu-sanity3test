import AssetSource from 'part:sanity-plugin-media-library/asset-source';

export default {
  name: 'story',
  title: 'Story',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'descriptiveTitle',
      title: 'Descriptive Title',
      description:
        'Story-telling summary of the story. Can be used as a teaser for Read More',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      description:
        'customize story url here or click generate for automated slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'storyType',
      title: 'Story Type',
      type: 'string',
      options: {
        list: [
          { title: 'Biography', value: 'Biography' },
          { title: 'Documentary', value: 'Documentary' },
          { title: 'Oral History', value: 'Oral History' },
        ],
      },
    },
    {
      name: 'featured',
      title: 'Person(s) Featured',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'person' } }],
    },
    {
      name: 'author',
      title: 'Author-Interviewer-Creation Team',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'person' } }],
    },
    {
      name: 'body',
      title: 'Story or Story Description',
      description: 'This is the primary text of the story',
      type: 'markdown',
    },
    {
      name: 'theme',
      title: 'Theme',
      description: 'Primary story categorization',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'theme' } }],
    },
    {
      name: 'localSubjects',
      title: 'Local Subjects',
      description: 'Tag story with all relevant subjects',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'localSubjects' } }],
    },
    {
      name: 'seeAlso',
      title: 'Related Articles',
      description:
        'Allows for links to specific articles (as opposed to the broad categories and subjects above)',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'story' } }],
    },
    {
      name: 'learnMore',
      title: 'Learn More',
      description: 'External links related to the story',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'relatedLinks' } }],
    },
    {
      name: 'decades',
      title: 'Decades covered',
      description: 'Check every decade in the story',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'grid',
        list: [
          { title: '1900s', value: '1900s' },
          { title: '1910s', value: '1910s' },
          { title: '1920s', value: '1920s' },
          { title: '1930s', value: '1930s' },
          { title: '1940s', value: '1940s' },
          { title: '1950s', value: '1950s' },
          { title: '1960s', value: '1960s' },
          { title: '1970s', value: '1970s' },
          { title: '1980s', value: '1980s' },
          { title: '1990s', value: '1990s' },
          { title: '2000s', value: '2000s' },
          { title: '2010s', value: '2010s' },
          { title: '2020s', value: '2020s' },
        ],
      },
    },
    {
      name: 'mainImage',
      title: 'Hero or Primary Image',
      type: 'mainImage',
    },
    {
      name: 'storyGallery',
      title: 'Story Gallery',
      type: 'gallery',
    },
    {
      name: 'productionCredits',
      title: 'Production Credits',
      type: 'markdown',
    },
    {
      name: 'publishedAt',
      title: 'Publication/Release Date',
      type: 'date',
    },
    {
      name: 'interviewDate',
      title: 'Interview Date',
      type: 'date',
    },
    {
      name: 'duration',
      title: 'Duration',
      description: 'Duration of the interview or documentary. hh:mm',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Related Location',
      type: 'string',
    },
    {
      name: 'kaltura',
      title: 'Kaltura details',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'kaltura' } }],
    },
    {
      name: 'contentdm',
      title: 'ContentDM-IIIF details',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'contentdm' } }],
    },
    {
      name: 'transcriptLink',
      title: 'Transcription Download Link',
      type: 'string',
    },
    {
      name: 'citations',
      title: 'Citations',
      type: 'markdown',
    },

    {
      name: 'storyMetadata',
      title: 'Story Metadata',
      type: 'storyMetadata',
    },
  ],

  preview: {
    select: {
      title: 'title',
      person: 'person.name',
      media: 'image',
    },
    prepare(selection) {
      const { person } = selection;
      return Object.assign({}, selection, {
        subtitle: person && `by ${person}`,
      });
    },
  },
};
