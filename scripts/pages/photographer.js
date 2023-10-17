//Mettre le code JavaScript lié à la page photographer.html

let params = new URLSearchParams(window.location.search);
let photographId = params.get("id");
const photographersSection = document.querySelector(".photograph-header");

async function getPhotographerData() {
    const response = await fetch("./data/photographers.json");
    const data = await response.json();
    const photograph = data.photographers.find(photograph => photograph.id == photographId);
    console.log(photograph);
    return photograph;
}
getPhotographerData().then((photograph) => {
    const photographersSection = document.querySelector(".photograph-header");
    photographerTemplate(photograph);
    const photographerModel = photographerTemplate(photograph);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
})

function photographerTemplate(photograph) {
    const { name, portrait, city, country, tagline, price, id } = photograph;

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