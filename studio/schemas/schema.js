// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// We import object and document schemas
import blockContent from './blockContent';
import theme from './theme';
import localSubjects from './localSubjects';
import post from './post';
import author from './author';
import story from './story';
import person from './person';
import gallery from './gallery';
import mainImage from './mainImage';
import contentdm from './contentdm';
import kaltura from './kaltura';
import transcript from './transcript';
import organization from './organization';
import demographics from './demographics';
import storyMetadata from './storyMetadata';
import miamiProfile from './miamiProfile';
import miamiEducation from './miamiEducation';
import miamiEmployment from './miamiEmployment';
import personName from './personName';
import major from './major';
import featuredLinks from './featuredLinks';
import relatedLinks from './relatedLinks';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    story,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    person,
    organization,
    gallery,
    mainImage,
    theme,
    localSubjects,
    blockContent,
    transcript,
    kaltura,
    contentdm,
    demographics,
    miamiProfile,
    miamiEducation,
    miamiEmployment,
    storyMetadata,
    major,
    personName,
    featuredLinks,
    relatedLinks,
  ]),
});
