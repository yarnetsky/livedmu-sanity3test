# Quick Start
+ You must have Ruby, Jekyll, and NPM installed
+ Clone this repo
+ run `npm install` under this repo's root
+ run `bundle install` then `bundle exec jekyll serve`. It should be working now. 
+ If you are seeing "bootstrap error import vendor/mixin" message, jump to "Troble Shooting Q1"

# download latest datafiles

run these scripts in the command line while in whatever branch you want updated with new data...
- `./fetchLocalProdData.sh` to download data files.
- `node makeStories.js` to build markdown files for the stories.

# Sanity installation

`npx -y @sanity/cli init --project q4arnlta --dataset boldly-creative`

To get started, `cd` to the path then run `npx @sanity/cli start`

# Troble Shooting
1. "Bootstrap error import vendor/mixin":
    
    Go to 'node_modules/bootstrap/scss/_mixins.scss', in line 6, change `@import "vendor/rfs;"` to `@import "../../rfs/scss.scss";`

# Plug-in documentation

## Github Workflow plugins

These are critical pieces for our Github Action workflow to snag our Sanity API data and dump the JSON file into our _Data folder.

+ [Fetch API Data](https://github.com/marketplace/actions/fetch-api-data)
+ [Deploy to Github Pages](https://github.com/marketplace/actions/deploy-to-github-pages)

## Sanity plugins

+ [Media Library](https://www.sanity.io/plugins/sanity-plugin-media-library)
+ [Vision](https://www.sanity.io/docs/the-vision-plugin): for testing GROQ queries

## Files dictating which dataset we're reading from...

+ .github/workflows/main.yml = workflows for saving data to our site
+ studio/sanity.json for which dataset we're entering
