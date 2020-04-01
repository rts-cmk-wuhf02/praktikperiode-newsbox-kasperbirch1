"use strict";

window.addEventListener('DOMContentLoaded', function (event) {
  /* categoryArray */
  var categoryArray = ["Books", "Economy", "Music", "Sports"];
  /* kalder functioner efter hianden */

  categoryArray.forEach(function (category) {
    printCategories(category);
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

  /* tilføjer addEventListener til alle .category-div */


  var btns = document.querySelectorAll(".category-div");
  btns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var category = e.target.parentElement.getAttribute('data-category');
      GetCategoryArticles(category);
    });
  });

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
/* getRssArticles */
// function getRssArticles(category) {
//     const categoryVariable = category
//     return new Promise((resolve, reject) => {
//         fetch(`https://api.nytimes.com/services/xml/rss/nyt/${category}.xml`)
//             .then((response) => {
//                 return response.text();
//             }).then((data) => {
//                 const parser = new DOMParser();
//                 const srcDOM = parser.parseFromString(data, "application/xml");
//                 const jsonData = xml2json(srcDOM);
//                 return jsonData
//             })
//             .then((data) => {
//                 // console.log("testdata", data);
//                 /* foreach der printer aticlers  */
//                 data.rss.channel.item.forEach((element, index) => {
//                     // console.log(category, element);
//                     /* variabler for article */
//                     const articleTemplate = document.querySelector(".article-template");
//                     const articleClone = articleTemplate.content.cloneNode(true);
//                     /* Erstatter articleClone data */
//                     articleClone.querySelector("h2").innerText = element.title
//                     articleClone.querySelector("p").innerText = element.description
//                     articleClone.querySelector("img").src = element['media:content'].attributes.url
//                     /* Tilføjer articleClone til categoryClone */
//                     document.querySelectorAll(".article-container")[index].appendChild(articleClone);
//                 });
//             })
//     })
// }