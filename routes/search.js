var express = require('express');
var router = express.Router();
var request = require('request');
// var querystring = require('querystring');

router.post('/', function(req, res) {
  // Search request
  var term = req.body.text.replace(/wikibot /g, ''),
    // Wikipedia api url
    qs = {
      action: 'query',
      exintro: '',
      explaintext: '',
      format: 'json',
      prop: 'extracts',
      redirects: '',
      titles: term
    },
    url = 'https://en.wikipedia.org/w/api.php',

    // Respond with first entry snippet in json
    finishSearch = function(item) {
      res.end(JSON.stringify({text: item}));
    };
  // Send request to wikipedia api
  request.get(url, { qs: qs }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      var pages = data.query.pages;
      // The returned JSON has a dynamic wikipedia page id as the key
      // Only one result is returned, so we retrieve it without knowing the key
      var wiki = pages[Object.keys(pages)[0]].extract;

      if(wiki) {
        finishSearch(wiki);
      } else {
        finishSearch('Sorry, no information was found.');
      }
    } else {
      finishSearch('There was an error with your search, please try again later.');
    }
  });
});

module.exports = router;
