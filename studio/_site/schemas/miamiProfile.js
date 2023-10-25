export default {
  title: 'Miami Profile',
  name: 'miamiProfile',
  type: 'object',
  fields: [
    {
      title: 'Miami Status',
      name: 'status',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'grid',
        list: [
          { title: 'Student', value: 'Student' },
          { title: 'Staff', value: 'Staff' },
          { title: 'Faculty', value: 'Faculty' },
          { title: 'Community Member', value: 'Community Member' },
        ],
      },
    },
    {
      title: 'Miami Education',
      name: 'miamiEducation',
      type: 'array',
      of: [{ type: 'miamiEducation' }],
    },
    {
      title: 'Miami Employment',
      name: 'miamiEmployment',
      type: 'array',
      of: [{ type: 'miamiEmployment' }],
    },
  ],
};
