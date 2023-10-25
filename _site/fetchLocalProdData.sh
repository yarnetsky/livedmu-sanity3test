#!/bin/bash
# This script fetches data from the production Sanity dataset and saves it to a local file

# usage: flags get passed on to the data check in the last step
# only usable flag is -m for machine readable output for data check

#sfUrl="https://q4arnlta.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22story%22%5D%7B%0A%20%20%22slug%22%3A%20slug.current%2C%0A%20%20%22gender%22%3A%20array%3A%3Aunique(array%3A%3Acompact(featured%5B%5D-%3EdemographicInformation.gender))%2C%0A%20%20%22raceOrEthnicity%22%3A%20array%3A%3Aunique(array%3A%3Acompact((featured%5B%5D-%3EdemographicInformation.race%5B%5D)))%2C%0A%20%20%22thumbImage%22%3A%20coalesce(featured%5B0%5D-%3EmainImage.asset-%3Eurl%2C%20storyGallery.images%5B0%5D.asset-%3Eurl%2C%20mainImage.asset-%3Eurl)%2C%0A%20%20%22bestImage%22%3A%20coalesce(mainImage.asset-%3Eurl%2C%20storyGallery.images%5B0%5D.asset-%3Eurl%2C%20featured%5B0%5D-%3EmainImage.asset-%3Eurl)%2C%0A%20%20%2F%2F%22bestImageMetadata%22%3A%20coalesce(mainImage%2C%20storyGallery.images%5B0%5D%2C%20featured%5B0%5D-%3Eimage)%2C%0A%20%20%22theme%22%3A%20array%3A%3Aunique(array%3A%3Acompact(theme%5B%5D-%3Etitle))%2C%0A%20%20%22status%22%3A%20array%3A%3Aunique(array%3A%3Acompact(featured%5B%5D-%3EdemographicInformation.status%5B%5D))%2C%0A%20%20%22featuredPerson%22%3A%20featured%5B%5D%2C%0A%20%20%22featuredDemographics%22%3A%20featured%5B0%5D-%3EdemographicInformation%2C%0A%20%20%22featuredMiamiInfo%22%3A%20featured%5B0%5D-%3EmiamiInformation%2C%0A%20%20%22personalNames%22%3A%20featured%5B%5D-%3EpersonalNames%2C%0A%20%20%22briefBio%22%3A%20array%3A%3Ajoin(string%3A%3Asplit(body%2C%22%20%22)%5B0..100%5D%2C%22%20%22)%2B'...'%2C%0A%20%20%2F%2F%22featuredMajor%22%3A%20featured%5B0%5D-%3EmiamiInformation%5B%5D-%3EmiamiEducation%5B%5D-%3Emajor.title%20%2C%0A%20%20title%2C%0A%20%20duration%2C%0A%20%20location%2C%0A%20%20storyType%2C%0A%20%20decades%2C%0A%7D"
sfUrl="https://q4arnlta.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%20%3D%3D%20%22story%22%5D%7B%0A%20%20%22slug%22%3A%20slug.current%2C%0A%20%20%22gender%22%3A%20array%3A%3Aunique(array%3A%3Acompact(featured%5B%5D-%3EdemographicInformation.gender))%2C%0A%20%20%22raceOrEthnicity%22%3A%20array%3A%3Aunique(array%3A%3Acompact((featured%5B%5D-%3EdemographicInformation.race%5B%5D)))%2C%0A%20%20%22thumbImage%22%3A%20coalesce(featured%5B0%5D-%3EmainImage.asset-%3Eurl%2C%20storyGallery.images%5B0%5D.asset-%3Eurl%2C%20mainImage.asset-%3Eurl)%2C%0A%20%20%22bestImage%22%3A%20coalesce(mainImage.asset-%3Eurl%2C%20storyGallery.images%5B0%5D.asset-%3Eurl%2C%20featured%5B0%5D-%3EmainImage.asset-%3Eurl)%2C%0A%20%20%22bestImageCaption%22%3A%20coalesce(mainImage.caption%2C%20storyGallery.images%5B0%5D.caption%2C%20featured%5B0%5D-%3EmainImage.caption)%2C%0A%20%20%22theme%22%3A%20array%3A%3Aunique(array%3A%3Acompact(theme%5B%5D-%3Etitle))%2C%0A%20%20%22status%22%3A%20array%3A%3Aunique(array%3A%3Acompact(featured%5B0%5D-%3EmiamiInformation.status%5B%5D))%2C%0A%20%20%22featuredPerson%22%3A%20featured%5B%5D%2C%0A%20%20%22featuredDemographics%22%3A%20featured%5B0%5D-%3EdemographicInformation%2C%0A%20%20%22featuredMiamiInfo%22%3A%20featured%5B0%5D-%3EmiamiInformation%2C%0A%20%20%22personalNames%22%3A%20featured%5B%5D-%3EpersonalNames%2C%0A%20%20%22briefBio%22%3A%20coalesce(array%3A%3Ajoin(string%3A%3Asplit(body%2C%22%20%22)%5B0..100%5D%2C%22%20%22)%2B'...'%2Carray%3A%3Ajoin(string%3A%3Asplit(featured%5B0%5D-%3Ebio%2C%22%20%22)%5B0..100%5D%2C%22%20%22)%2B'...')%2C%0A%20%20title%2C%0A%20%20duration%2C%0A%20%20location%2C%0A%20%20storyType%2C%0A%20%20decades%2C%0A%20%20descriptiveTitle%2C%0A%7D"
mainUrl="https://q4arnlta.api.sanity.io/v2021-10-21/data/query/production?query=*"

curl $sfUrl > _data/story-finder.json
curl $mainUrl > _data/all-data.json
curl $sfUrl > assets/js/FacetFilter/data/story-finder.json
curl $mainUrl > assets/js/FacetFilter/data/all-data.json

# check for tabs in the body field of all stories
./check-for-bad-data.sh $1