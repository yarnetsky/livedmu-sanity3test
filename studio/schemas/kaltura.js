export default {
  name: 'kaltura',
  title: 'Kaltura',
  type: 'document',
  fields: [
    {
      name: 'kalturaTitle',
      title: 'Video file title',
      type: 'string',
    },
    {
      name: 'citationTitle',
      title: 'Video title for citation',
      type: 'string',
    },
    {
      name: 'kalturaId',
      title: 'Kaltura ID',
      type: 'string',
    },
    {
      name: 'kalturaEmbedCode',
      title: 'Kaltura Embed Code',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
};
