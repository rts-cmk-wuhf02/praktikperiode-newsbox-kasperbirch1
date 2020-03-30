"use strict";

window.addEventListener('DOMContentLoaded', function (event) {
  // getRssCategory 
  function getRssCategory(category) {
    fetch("https://api.nytimes.com/services/xml/rss/nyt/".concat(category, ".xml")).then(function (response) {
      return response.text();
    }).then(function (data) {
      var parser = new DOMParser();
      var srcDOM = parser.parseFromString(data, "application/xml");
      var jsonData = xml2json(srcDOM);
      return jsonData;
    }).then(function (data) {
      console.log("Data.rss.channel", data.rss.channel);
      var _data$rss$channel = data.rss.channel,
          title = _data$rss$channel.title,
          link = _data$rss$channel.link;
      /* variabler */

      var container = document.getElementById("news-container");
      var categoryTemplate = document.querySelector(".category-template");
      var clone = categoryTemplate.content.cloneNode(true);
      /* Erstatter data */

      clone.querySelector("h3").innerHTML = category;
      /* Tilføjer clone */

      container.appendChild(clone);
    });
  }
  /* categoryArray */


  var categoryArray = ["Books", "Economy", "Music", "Sports"];
  /* get data */

  categoryArray.forEach(function (category) {
    getRssCategory(category);
  });
});
/* add article  */

clone.querySelector("#article-container").innerHTML += "\n                <li>\n                    <article class=\"border-b p-4 flex justify-between\">\n                        <img class=\"m-2 h-16 w-16 object-cover rounded-full\" src=".concat(item.media.content[0].url[0], " alt=").concat(item.title, ">\n                        <div class=\"\">\n                            <h2 class=\"font-medium\">").concat(item.title, "</h2>\n                            <p class=\"text-themeblue\">").concat(item.description, "</p>\n                        </div>\n                    </article>\n                </li> ");