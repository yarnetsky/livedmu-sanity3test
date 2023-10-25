/*
GROQ query:
*[_type=="story" && seeAlso  != null] {
    "slug": slug.current,
    "seeAlso": seeAlso[]->slug.current
}
*/

const fetch = require('node-fetch');
let queryUrl =
  'https://q4arnlta.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D%22story%22%20%26%26%20seeAlso%20%20!%3D%20null%5D%20%7B%0A%20%20%20%20%22slug%22%3A%20slug.current%2C%0A%20%20%20%20%22seeAlso%22%3A%20seeAlso%5B%5D-%3Eslug.current%0A%7D';

(async () => {
  let data = await get_request(queryUrl);
  console.log(data.result);
  data.result.forEach((entry) => {
    if (entry.hasOwnProperty('seeAlso') && Array.isArray(entry.seeAlso)) {
      entry.seeAlso.forEach((sa) => {
        let linkBack = doesEntryLinkBack(sa, entry.slug, data.result);
        // let linkBack = 'unknown';
        if (!linkBack) {
          console.log(entry.slug + ' missing linkback from: ' + sa);
        }
        // console.log('- ' + sa + ' - ' + linkBack);
      });
    }
  });
})();

async function get_request(url) {
  const res = await fetch(url);
  const data = await res.json(); //assuming data is json
  return data;
}

function doesEntryLinkBack(target, linkBackVal, data) {
  let targetEntry = data.filter((e) => e.slug == target)[0];
  if (targetEntry != undefined) {
    return targetEntry.seeAlso.includes(linkBackVal);
  }
  return false;
}
