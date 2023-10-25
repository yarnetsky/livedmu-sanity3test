/* 
Reads the `all-data.json` file and creates a .md file for each story in the `_stories` folder.
Does not overwrite existing files.
Run with `node makeStories.js`
*/
let content = require('./_data/all-data.json');
let fs = require('fs');
let path = require('path');
let _ = require('lodash');

let stories = content.result.filter((item) => item._type === 'story');
stories.forEach((story) => {
  if (
    story.title != 'undefined' &&
    story.slug != 'undefined' &&
    story.storyType != 'undefined'
  ) {
    let output = `---
title: ${story.title}
permalink: /stories/${story.slug.current}
layout: ${_.camelCase(story.storyType.toLowerCase())}
---`;

    // if file doesn't already exist, create it
    if (
      !fs.existsSync(
        path.join(__dirname, '_stories', story.slug.current + '.md')
      )
    ) {
      fs.writeFileSync(
        path.join(__dirname, '_stories', story.slug.current + '.md'),
        output
      );
      console.log('File created: ' + story.slug.current + '.md');
    } else {
      console.log('File already exists: ' + story.slug.current + '.md');
    }
  }
});
