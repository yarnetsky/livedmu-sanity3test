import major from './major';

export default {
  title: 'Miami Education',
  name: 'miamiEducation',
  type: 'object',
  preview: {
    select: {
      title: 'major.0.title',
      subtitle: 'graduationYear',
    },
  },
  fields: [
    {
      title: 'Major',
      name: 'major',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'major' } }],
    },
    {
      title: 'Graduation Year',
      name: 'graduationYear',
      type: 'date',
      options: {
        dateFormat: 'YYYY',
      },
    },
    {
      title: 'Institution',
      name: 'educationInstitution',
      type: 'string',
      options: {
        list: [
          {
            title: 'Miami University',
            value: 'Miami University',
          },
          {
            title: 'Ohio College for Women',
            value: 'Ohio College for Women',
          },
          {
            title: 'Ohio State Normal School',
            value: 'Ohio State Normal School',
          },
          {
            title: 'Western College for Women',
            value: 'Western College for Women',
          },
          {
            title: 'Case Western Reserve University',
            value: 'Case Western Reserve University',
          },
          {
            title: 'Cleveland State University',
            value: 'Cleveland State University',
          },
          {
            title: 'Ohio University',
            value: 'Ohio University',
          },
          {
            title: 'University of Cincinnati',
            value: 'University of Cincinnati',
          },
          {
            title: 'Western Reserve University',
            value: 'Western Reserve University',
          },
          {
            title: 'Wright State University',
            value: 'Wright State University',
          },
          {
            title: 'American University',
            value: 'American University',
          },
          {
            title: 'Boston University',
            value: 'Boston University',
          },
          {
            title: 'Columbia University',
            value: 'Columbia University',
          },
          {
            title: 'Howard University',
            value: 'Howard University',
          },
          {
            title: 'Northeastern Illinois University',
            value: 'Northeastern Illinois University',
          },
          {
            title: 'University of Chicago',
            value: 'University of Chicago',
          },
          {
            title: 'University of Wisconsin-Madison',
            value: 'University of Wisconsin-Madison',
          },
        ],
      },
    },
    {
      title: 'Degree',
      name: 'degree',
      type: 'string',
      options: {
        list: [
          { title: 'A.A.', value: 'A.A.' },
          { title: 'A.S.', value: 'A.S.' },
          { title: 'B.A.', value: 'B.A.' },
          { title: 'B.F.A.', value: 'B.F.A.' },
          { title: 'B.S.', value: 'B.S.' },
          { title: 'M.A.', value: 'M.A.' },
          { title: 'M.B.A.', value: 'M.B.A.' },
          { title: 'M.Ed.', value: 'M.Ed.' },
          { title: 'MLIS', value: 'MLIS' },
          { title: 'M.S.', value: 'M.S.' },
          { title: 'M.S.W.', value: 'M.S.W.' },
          { title: 'Ed.D.', value: 'Ed.D.' },
          { title: 'Ph.D.', value: 'Ph.D.' },
          { title: 'Diploma', value: 'Diploma' },
          { title: 'Other', value: 'Other' },
        ],
      },
    },
    {
      title: 'Other Degree Name',
      name: 'otherDegree',
      type: 'string',
    },
  ],
};
