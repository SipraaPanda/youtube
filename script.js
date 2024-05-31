const apikey = `61f0940c1248433b89904b7b941510ca`;
const blogcontainer = document.getElementById('blogcontainer');
const searchfield = document.getElementById('searchinput');
const searchbtn = document.getElementById('searchbutton');

async function fetchrandomnews() {
    try {
        const apiurl = `https://newsapi.org/v2/top-headlines?country=US&pageSize=30&apikey=${apikey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        console.log(data);
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

async function fetchrandomnewsquery(query) {
    try {
        const apiurl = `https://newsapi.org/v2/everything?q=${query}&pageSize=30&apikey=${apikey}`;
        const response = await fetch(apiurl);
        const data = await response.json();
        console.log(data);
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

function displayblogarticle(articles) {
    blogcontainer.innerHTML = "";
    articles.forEach((article) => {
        const blogcard = document.createElement("div");
        blogcard.classList.add("blogcard");

        const img = document.createElement("img");
        img.src = article.urlToImage || "default-image.jpg"; // Default image in case urlToImage is null
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncateddescription = article.description && article.description.length > 30 ? article.description.slice(0, 30) + "..." : (article.description || "No description available");
        description.textContent = truncateddescription;

        blogcard.appendChild(img);
        blogcard.appendChild(title);
        blogcard.appendChild(description);
        blogcard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
        blogcontainer.appendChild(blogcard);
    });
}

searchbtn.addEventListener("click", async () => {
    const query = searchfield.value?.trim(); // Use optional chaining to avoid undefined error
    if (query) {
        try {
            const articles = await fetchrandomnewsquery(query);
            displayblogarticle(articles);
        } catch (error) {
            console.log("error", error);
        }
    }
});

(async () => {
    try {
        const articles = await fetchrandomnews();
        displayblogarticle(articles);
    } catch (error) {
        console.error("Fetching error", error);
    }
})();
