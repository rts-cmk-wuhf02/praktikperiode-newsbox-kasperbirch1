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
      // console.log("Data.rss.channel.item", data.rss.channel.item);

      /* variabler */
      var container = document.getElementById("news-container");
      /* variabler */

      var categoryTemplate = document.querySelector(".category-template");
      var categoryClone = categoryTemplate.content.cloneNode(true);
      /* variabler */

      var articleTemplate = document.querySelector(".article-template");
      var articleClone = articleTemplate.content.cloneNode(true);
      /* Erstatter categoryClone data */

      categoryClone.querySelector("h3").innerText = category;
      /* Erstatter articleClone data */

      data.rss.channel.item.forEach(function (element) {// articleClone.querySelector("h2").innerText = category
      });
      /* Tilføjer articleClone til categoryClone */

      categoryClone.querySelector("#article-container").appendChild(articleClone);
      /* Tilføjer categoryClone til container */

      container.appendChild(categoryClone);
    });
  }
  /* categoryArray */


  var categoryArray = ["Books", "Economy", "Music", "Sports"];
  /* get data */

  categoryArray.forEach(function (category) {
    getRssCategory(category);
  });
});
/* add article
clone.querySelector("#article-container").innerHTML += `
                <li>
                    <article class="border-b p-4 flex justify-between">
                        <img class="m-2 h-16 w-16 object-cover rounded-full" src=${item.media.content[0].url[0]} alt=${item.title}>
                        <div class="">
                            <h2 class="font-medium">${item.title}</h2>
                            <p class="text-themeblue">${item.description}</p>
                        </div>
                    </article>
                </li> `
 */