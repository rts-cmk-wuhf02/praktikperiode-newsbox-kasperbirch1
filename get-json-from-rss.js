let Feed = require('rss-to-json')

window.addEventListener('DOMContentLoaded', (event) => {
    /* categoryArray */
    const categoryArray = ["Books", "Economy", "Music", "Sports"]
    /* get data */
    categoryArray.forEach((category, index) => {
        Feed.load(`https://api.nytimes.com/services/xml/rss/nyt/${category}.xml`, function (err, rss) {
            console.log(category, rss);

            /* variabler */
            const container = document.getElementById("news-container");
            const categoryTemplate = document.querySelector(".category-template");
            const clone = categoryTemplate.content.cloneNode(true);
            /* Erstatter data */
            clone.querySelector("h3").textContent = category
            /* add article  */
            rss.items.forEach(item => {
                // console.log(category, "item", item);
                /*  print articles */
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
            });
            /* Tilføjer clone */
            container.appendChild(clone);

        })
    });

});