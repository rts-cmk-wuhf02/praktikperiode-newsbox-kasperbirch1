/* get data */
categoryArray.forEach(category => {
    getRssCategory(category)
        .then((data) => {
            /* variabler for category */
            const container = document.getElementById("news-container");
            const categoryTemplate = document.querySelector(".category-template");
            const categoryClone = categoryTemplate.content.cloneNode(true);
            /* Erstatter categoryClone data */
            categoryClone.querySelector("h3").innerText = category
            /* setAttribute */
            categoryClone.querySelector(".fa-chevron-down").setAttribute('data-category', category)
            /* Tilføjer categoryClone til container */
            container.appendChild(categoryClone);
            return data
        })
        .then((data) => {
            /* foreach der printer aticlers  */
            data.rss.channel.item.forEach((element, index) => {
                // console.log(category, element);
                /* variabler for article */
                const articleTemplate = document.querySelector(".article-template");
                const articleClone = articleTemplate.content.cloneNode(true);
                /* Erstatter articleClone data */
                articleClone.querySelector("h2").innerText = element.title
                articleClone.querySelector("p").innerText = element.description
                // articleClone.querySelector("img").src = element['media:content'].attributes.url
                /* Tilføjer articleClone til categoryClone */
                // document.querySelectorAll(".article-container")[index].appendChild(articleClone);
            });
        })



});

categoryArray.forEach(category => {
    getRssCategory(category)
        .then((data) => { printCategories(data) })
        .then((data) => { printArticles(data) })
});



// console.log(category, element['media:content'].attributes.url);
/* BTN TOGLE */
// const btn = categoryClone.querySelector(".fa-chevron-down")
// btn.addEventListener("click", (e) => {
//     console.log("e.target", e.target);

//     categoryClone.querySelectorAll(".article-container").style.display = "none";
// })
/* BTN TOGLE */



///////////////////////////////////////////////////




