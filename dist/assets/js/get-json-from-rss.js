"use strict";

window.addEventListener('DOMContentLoaded', function (event) {
  // getRssCategory 
  function getRssCategory(category) {
    return new Promise(function (resolve, reject) {
      fetch("https://api.nytimes.com/services/xml/rss/nyt/".concat(category, ".xml")).then(function (response) {
        return response.text();
      }).then(function (data) {
        var parser = new DOMParser();
        var srcDOM = parser.parseFromString(data, "application/xml");
        var jsonData = xml2json(srcDOM);
        resolve(jsonData);
      })["catch"](function (err) {
        reject(console.log("FEJL:", err));
      });
    });
  }
  /* categoryArray */


  var categoryArray = ["Books", "Economy", "Music", "Sports"];
  /* get data */

  categoryArray.forEach(function (category) {
    getRssCategory(category).then(function (data) {
      console.log("data", data);
      /* variabler for category */

      var container = document.getElementById("news-container");
      var categoryTemplate = document.querySelector(".category-template");
      var categoryClone = categoryTemplate.content.cloneNode(true);
      /* Erstatter categoryClone data */

      categoryClone.querySelector("h3").innerText = category;
      /* foreach der printer aticlers  */

      data.rss.channel.item.forEach(function (element) {
        // console.log(category, element);

        /* variabler for article */
        var articleTemplate = document.querySelector(".article-template");
        var articleClone = articleTemplate.content.cloneNode(true);
        /* Erstatter articleClone data */

        articleClone.querySelector("h2").innerText = element.title;
        articleClone.querySelector("p").innerText = element.description;
        /* FEJL */

        articleClone.querySelector("img").src = element['media:content'].attributes.url;
        /* FEJL */

        /* Tilføjer articleClone til categoryClone */

        categoryClone.querySelector(".article-container").appendChild(articleClone);
      });
      /* Tilføjer categoryClone til container */

      container.appendChild(categoryClone);
    });
  });
}); // console.log(category, element['media:content'].attributes.url);

/* BTN TOGLE */
// const btn = categoryClone.querySelector(".fa-chevron-down")
// btn.addEventListener("click", (e) => {
//     console.log("e.target", e.target);
//     categoryClone.querySelectorAll(".article-container").style.display = "none";
// })

/* BTN TOGLE */