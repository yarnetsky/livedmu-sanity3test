// mainImage.js
export default {
  name: 'mainImage',
  type: 'image',
  title: 'Main Image',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: `Describe the image for people who can't see it`,
      isHighlighted: true,
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      description: `Text that's displayed with the image`,
      isHighlighted: true,
    },
    {
      name: 'cropOverride',
      type: 'string',
      title: 'Crop Override',
      description: `we'll enter format this needs soon`,
    },
  ],
  options: {
    hotspot: true,
  },
};
