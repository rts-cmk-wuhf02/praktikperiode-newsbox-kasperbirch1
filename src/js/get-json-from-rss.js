window.addEventListener('DOMContentLoaded', (event) => {
    /* categoryArray */
    const categoryArray = ["Books", "Economy", "Music", "Sports"]
    /* kalder functioner efter hianden */
    categoryArray.forEach(category => {
        printCategories(category)
            .then(data => { GetCategoryArticles(data) })
    });

    /* tilføjer addEventListener til alle .category-div */
    const btns = document.querySelectorAll(".category-div")
    btns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const category = e.target.parentElement.getAttribute('data-category')
            console.log("clicket", category);
            document.querySelector(`ul[data-category=${category}]`).classList.toggle("hidden")
        })
    });


    ///////////////////////////////////////////////////////////////////////////////////////
    /* printCategories */
    function printCategories(category) {
        return new Promise((resolve, reject) => {
            // console.log("data", data.rss.channel);
            const container = document.getElementById("news-container");
            const categoryTemplate = document.querySelector(".category-template");
            const categoryClone = categoryTemplate.content.cloneNode(true);
            /* Erstatter categoryClone data */
            categoryClone.querySelector("h3").innerText = category
            /* setAttribute */
            categoryClone.querySelector(".category-div").setAttribute("data-category", category);
            categoryClone.querySelector("ul").setAttribute("data-category", category);
            /* Tilføjer categoryClone til container */
            container.appendChild(categoryClone);
            resolve(category)
        })
    }
    ///////////////////////////////////////////////////////////////////////////////////////
    /* GetCategoryArticles */
    function GetCategoryArticles(category) {
        const categoryVariable = category
        fetch(`https://api.nytimes.com/services/xml/rss/nyt/${category}.xml`)
            .then((response) => {
                return response.text();
            }).then((data) => {
                const parser = new DOMParser();
                const srcDOM = parser.parseFromString(data, "application/xml");
                const jsonData = xml2json(srcDOM);
                return jsonData
            }).then(data => {
                /* foreach der printer aticlers  */
                data.rss.channel.item.forEach((element) => {
                    // console.log(category, element);
                    const articleTemplate = document.querySelector(".article-template");
                    const articleClone = articleTemplate.content.cloneNode(true);
                    /* Erstatter articleClone data */
                    articleClone.querySelector("h2").innerText = element.title
                    articleClone.querySelector("p").innerText = element.description
                    /* tjek om der er billede eller ej */
                    // articleClone.querySelector("img").src = element['media:content'].attributes.url || "/assets/images/avatar.jpg"
                    /* Tilføjer articleClone til categoryClone */
                    document.querySelector(`ul[data-category="${categoryVariable}"]`).appendChild(articleClone);
                });
            }).catch(err => {
                console.log("fetch catch:", err);
            })
    }
});




