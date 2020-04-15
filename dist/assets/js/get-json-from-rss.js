"use strict";

window.addEventListener('DOMContentLoaded', function (event) {
  /* categoryArray */
  var categoryArray = ["Books", "Economy", "Music", "Sports"];
  /* kalder functioner efter hianden */

  categoryArray.forEach(function (category) {
    printCategories(category).then(function (data) {
      GetCategoryArticles(data);
    });
  });
  /* tilføjer addEventListener til alle .category-div */

  var btns = document.querySelectorAll(".category-div");
  btns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var category = e.target.parentElement.getAttribute('data-category');
      console.log("clicket", category);
      document.querySelector("ul[data-category=".concat(category, "]")).classList.toggle("hidden");
    });
  }); ///////////////////////////////////////////////////////////////////////////////////////

  /* printCategories */

  function printCategories(category) {
    return new Promise(function (resolve, reject) {
      // console.log("data", data.rss.channel);
      var container = document.getElementById("news-container");
      var categoryTemplate = document.querySelector(".category-template");
      var categoryClone = categoryTemplate.content.cloneNode(true);
      /* Erstatter categoryClone data */

      categoryClone.querySelector("h3").innerText = category;
      /* setAttribute */

      categoryClone.querySelector(".category-div").setAttribute("data-category", category);
      categoryClone.querySelector("ul").setAttribute("data-category", category);
      /* Tilføjer categoryClone til container */

      container.appendChild(categoryClone);
      resolve(category);
    });
  } ///////////////////////////////////////////////////////////////////////////////////////

  /* GetCategoryArticles */


  function GetCategoryArticles(category) {
    var categoryVariable = category;
    fetch("https://api.nytimes.com/services/xml/rss/nyt/".concat(category, ".xml")).then(function (response) {
      return response.text();
    }).then(function (data) {
      var parser = new DOMParser();
      var srcDOM = parser.parseFromString(data, "application/xml");
      var jsonData = xml2json(srcDOM);
      return jsonData;
    }).then(function (data) {
      /* foreach der printer aticlers  */
      data.rss.channel.item.forEach(function (element) {
        // console.log(category, element);
        var articleTemplate = document.querySelector(".article-template");
        var articleClone = articleTemplate.content.cloneNode(true);
        /* Erstatter articleClone data */

        articleClone.querySelector("h2").innerText = element.title;
        articleClone.querySelector("p").innerText = element.description;
        /* tjek om der er billede eller ej */
        // articleClone.querySelector("img").src = element['media:content'].attributes.url || "/assets/images/avatar.jpg"

        /* Tilføjer articleClone til categoryClone */

        document.querySelector("ul[data-category=\"".concat(categoryVariable, "\"]")).appendChild(articleClone);
      });
    })["catch"](function (err) {
      console.log("fetch catch:", err);
    });
  }
});