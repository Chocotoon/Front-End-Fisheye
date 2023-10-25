//Mettre le code JavaScript lié à la page photographer.html



// Récupération de l'ID dans l'url pour générer le contenu de la page associé au photographe
let params = new URLSearchParams(window.location.search);
let photographId = params.get("id");

// Elements du DOM
const photographersSection = document.querySelector(".photograph-header");
const gallerie = document.querySelector(".gallerie");
const formHeader = document.querySelector("#contact_modal .modal");

async function getPhotographerData() {
    const response = await fetch("./data/photographers.json");
    const data = await response.json();
    const photograph = data.photographers.find(photograph => photograph.id == photographId);
    console.log(photograph);
    return photograph;
}

// Affichage des éléments concernant le photographe
getPhotographerData().then((photograph) => {
    const photographersSection = document.querySelector(".photograph-header");
    photographerTemplate(photograph);
    const photographerModel = photographerTemplate(photograph);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
    const photographName = document.createElement("h3");
    photographName.innerText = photograph.name;
    formHeader.appendChild(photographName);
})

// Réécriture du template pour l'adapter aux besoins de la page
function photographerTemplate(photograph) {
    const { name, portrait, city, country, tagline, price, id } = photograph;

    const picture = `././assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const photographerButton = document.querySelector(".contact_button");
        const article = document.createElement('article');
        const photographerDiv = document.createElement('div');
        photographerDiv.classList.add('photographer_info')
        const aside = document.createElement('aside');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        const h1 = document.createElement('h1');
        h1.textContent = name;
        const location = document.createElement('p');
        location.innerText = `${city} , ${country}`;
        location.classList.add("ville");
        const description = document.createElement("p");
        description.innerText = tagline;
        description.style.fontSize = "18px";
        const prix = document.createElement("p");
        prix.innerText = `${price} € / jour`;
        prix.classList.add("prix");
        photographerDiv.appendChild(h1);
        article.appendChild(img);
        photographerDiv.appendChild(location);
        photographerDiv.appendChild(description);
        article.appendChild(photographerDiv);
        article.appendChild(aside);
        aside.appendChild(prix);
        article.appendChild(photographerButton);
        return (article);
    }
    return { name, portrait, city, country, tagline, price, id, getUserCardDOM };

}

// Fonction servant à récupérer les médias du photographe grâce à l'ID
async function getMediaData() {
    const response = await fetch("./data/photographers.json");
    const data = await response.json();
    const media = data.media.filter(media => media.photographerId == photographId);
    return media;
}

// On génère le contenu media grâce à la factory et aux objets Image eet Video
getMediaData(photographId)
    .then(mediaData => {

        const mediaFactory = new MediaFactory();

        mediaData.forEach(media => {
            const mediaInstance = mediaFactory.createMedia(media);
            const mediaThumb = mediaInstance.createMediaThumbnail();
            gallerie.appendChild(mediaThumb);
        });
    })
    .catch(error => {
        console.error(error);
    });

const btnFiltre = document.querySelector(".filtre button");
const filtreIcon = document.querySelector(".filtre button i");
btnFiltre.addEventListener("click", filtreToggle);

function filtreToggle() {
    if (btnFiltre.getAttribute("aria-expanded") === "false") {
        btnFiltre.setAttribute("aria-expanded", "true")
        filtreIcon.classList.remove("fa-chevron-down");
        filtreIcon.classList.add("fa-chevron-up");
    }
    window.onclick = function (event) {
        if (event.target != btnFiltre) {
            btnFiltre.setAttribute("aria-expanded", "false");
            filtreIcon.classList.remove("fa-chevron-up");
            filtreIcon.classList.add("fa-chevron-down");
        }
    }
}