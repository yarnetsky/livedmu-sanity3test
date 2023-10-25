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
            title: '— Ohio Institutions —',
            value: null,
          },
          {
            title: 'Case Western Reserve University',
            value: 'Case Western Reserve University',
          },
          {
            title: 'Central State University',
            value: 'Central State University',
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
            title: 'Ohio State University',
            value: 'Ohio State University',
          },
          {
            title: 'University of Cincinnati',
            value: 'University of Cincinnati',
          },
          {
            title: 'Walsh University',
            value: 'Walsh University',
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
            title: 'Xavier University',
            value: 'Xavier University',
          },
          {
            title: '— Out-of-State Institutions —',
            value: null,
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
            title: 'Louisiana State University',
            value: 'Louisiana State University',
          },
          {
            title: 'Morgan State University',
            value: 'Morgan State University',
          },
          {
            title: 'Northeastern Illinois University',
            value: 'Northeastern Illinois University',
          },
          {
            title: 'Penn State University',
            value: 'Penn State University',
          },
          {
            title: 'Philippine Normal School',
            value: 'Philippine Normal School',
          },
          {
            title: 'Reformed Theological Seminary',
            value: 'Reformed Theological Seminary',
          },
          {
            title: "St. Augustine's University",
            value: "St. Augustine's University",
          },
          {
            title: 'Syracuse University',
            value: 'Syracuse University',
          },
          {
            title: 'Tohoku Gakuin University',
            value: 'Tohoku Gakuin University',
          },
          {
            title: 'University of California at Los Angeles',
            value: 'University of California at Los Angeles',
          },
          {
            title: 'University of Chicago',
            value: 'University of Chicago',
          },
          {
            title: 'University of Utah',
            value: 'University of Utah',
          },
          {
            title: 'University of Wisconsin-Madison',
            value: 'University of Wisconsin-Madison',
          },
          {
            title: 'Western Illinois University',
            value: 'Western Illinois University',
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
          { title: 'J.D.', value: 'J.D.' },
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
