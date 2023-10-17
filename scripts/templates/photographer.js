function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `././assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const location = document.createElement('p');
        location.innerText = `${city} , ${country}`;
        location.classList.add("ville");
        const description = document.createElement("p");
        description.innerText = tagline;
        description.style.fontSize = "10px";
        const prix = document.createElement("p");
        prix.innerText = `${price} €`;
        prix.classList.add("prix");
        const link = document.createElement("a");
        link.setAttribute("href", `photographer.html?id=${id}`)
        link.setAttribute("alt", name)
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(link)
        article.appendChild(location);
        article.appendChild(description);
        article.appendChild(prix);
        return (article);
    }
    return { name, portrait, city, country, tagline, price, id, getUserCardDOM };
}