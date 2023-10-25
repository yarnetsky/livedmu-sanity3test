export default {
  name: 'contentdm',
  title: 'ContentDM-IIIF',
  type: 'document',
  fields: [
    {
      name: 'contentdmTitle',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'contentdmItem',
      title: 'ContentDM Related Item',
      type: 'string',
    },
    {
      name: 'contentdmManifest',
      title: 'ContentDM IIIF Manifest',
      type: 'string',
    },
    {
      name: 'contentdmImage',
      title: 'ContentDM Image',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
};
