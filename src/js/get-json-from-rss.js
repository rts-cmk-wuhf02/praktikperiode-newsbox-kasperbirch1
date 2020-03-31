window.addEventListener('DOMContentLoaded', (event) => {
    // getRssCategory 
    function getRssCategory(category) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.nytimes.com/services/xml/rss/nyt/${category}.xml`)
                .then((response) => {
                    return response.text();
                }).then((data) => {
                    const parser = new DOMParser();
                    const srcDOM = parser.parseFromString(data, "application/xml");
                    const jsonData = xml2json(srcDOM);
                    resolve(jsonData)
                }).catch(err => {
                    reject(console.log("FEJL:", err));
                })
        })
    }
    /* categoryArray */
    const categoryArray = ["Books", "Economy", "Music", "Sports"]
    /* get data */
    categoryArray.forEach(category => {
        getRssCategory(category).then((data) => {
            console.log("data", data);
            /* variabler for category */
            const container = document.getElementById("news-container");
            const categoryTemplate = document.querySelector(".category-template");
            const categoryClone = categoryTemplate.content.cloneNode(true);
            /* Erstatter categoryClone data */
            categoryClone.querySelector("h3").innerText = category
            /* foreach der printer aticlers  */
            data.rss.channel.item.forEach(element => {
                // console.log(category, element);
                /* variabler for article */
                const articleTemplate = document.querySelector(".article-template");
                const articleClone = articleTemplate.content.cloneNode(true);
                /* Erstatter articleClone data */
                articleClone.querySelector("h2").innerText = element.title
                articleClone.querySelector("p").innerText = element.description
                /* FEJL */
                articleClone.querySelector("img").src = element['media:content'].attributes.url
                /* FEJL */
                /* Tilføjer articleClone til categoryClone */
                categoryClone.querySelector(".article-container").appendChild(articleClone);
            });
            /* Tilføjer categoryClone til container */
            container.appendChild(categoryClone);
        })
    });
});

// console.log(category, element['media:content'].attributes.url);


/* BTN TOGLE */
// const btn = categoryClone.querySelector(".fa-chevron-down")
// btn.addEventListener("click", (e) => {
//     console.log("e.target", e.target);

//     categoryClone.querySelectorAll(".article-container").style.display = "none";
// })
/* BTN TOGLE */