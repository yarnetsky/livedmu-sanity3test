export default {
  title: 'Demographics',
  name: 'demographics',
  type: 'object',
  fields: [
    {
      title: 'Gender',
      name: 'gender',
      type: 'string',
      options: {
        list: [
          { title: 'Female', value: 'Female' },
          { title: 'Male', value: 'Male' },
          { title: 'Nonbinary', value: 'Nonbinary' },
          { title: 'Other', value: 'Other' },
        ],
      },
    },
    {
      title: 'Race/Ethnicity',
      name: 'race',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'grid',
        list: [
          { title: 'Black/African American', value: 'Black/African American' },
          {
            title: 'American Indian, Alaskan Native',
            value: 'American Indian, Alaskan Native',
          },
          { title: 'Asian American', value: 'Asian American' },
          { title: 'Asian (Chinese)', value: 'Asian (Chinese)' },
          { title: 'Asian (Filipina)', value: 'Asian (Filipina)' },
          { title: 'Asian (Japanese)', value: 'Asian (Japanese)' },
          { title: 'Hispanic/Latinx', value: 'Hispanic/Latinx' },
          {
            title: 'Native Hawaiian, Pacific Islander',
            value: 'Native Hawaiian, Pacific Islander',
          },
          { title: 'White/Caucasian', value: 'White/Caucasian' },
          { title: 'Other', value: 'Other' },
        ],
      },
    },
    {
      name: 'birthYear',
      title: 'Birth Year',
      type: 'date',
      options: {
        dateFormat: 'YYYY',
      },
    },
    {
      name: 'deathYear',
      title: 'Death Year',
      type: 'date',
      options: {
        dateFormat: 'YYYY',
      },
    },
  ],
};
