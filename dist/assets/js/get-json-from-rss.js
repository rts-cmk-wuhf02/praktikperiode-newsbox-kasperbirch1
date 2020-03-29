"use strict";

var Feed = require('rss-to-json');

window.addEventListener('DOMContentLoaded', function (event) {
  console.log('DOM fully loaded and parsed');
  var newsOverview = document.getElementById("news-overview");
  var categoryTemplate = document.getElementById("category-template");
  console.log("categoryTemplate", categoryTemplate);

  function getData(category) {
    Feed.load("https://api.nytimes.com/services/xml/rss/nyt/".concat(category, ".xml"), function (err, rss) {
      console.log(category, rss);
    });
  }

  getData("Dance");
  getData("Africa");
});