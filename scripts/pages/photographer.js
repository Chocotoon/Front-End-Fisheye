//Mettre le code JavaScript lié à la page photographer.html



// Récupération de l'ID dans l'url pour générer le contenu de la page associé au photographe
let params = new URLSearchParams(window.location.search);
let photographId = params.get("id");

// Elements du DOM
const photographersSection = document.querySelector(".photograph-header");
const gallerie = document.querySelector(".gallerie");
const formHeader = document.querySelector("#contact_modal .modal");


// Affichage des éléments concernant le photographe

async function getPhotographerData() {
    const response = await fetch("./data/photographers.json");
    const data = await response.json();
    const photograph = data.photographers.find(photograph => photograph.id == photographId);
    return photograph;
}


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


// Gestion de la lightbox
let galerieLightbox = [];
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox img');
const lightboxVideo = document.querySelector('.lightbox video');
const closeLightboxBtn = document.querySelector('.lightbox__close');
const lightboxContainer = document.querySelector(".lightbox__container");
const arrowRight = document.querySelector(".lightbox__next");
arrowRight.addEventListener("click", slideRight);
const arrowLeft = document.querySelector(".lightbox__prev");
arrowLeft.addEventListener("click", slideLeft);
const lightboxTitre = document.querySelector(".lightbox__title");
closeLightboxBtn.addEventListener('click', closeLightbox)


// On génère le contenu media grâce à la factory et aux objets Image et Video
getMediaData(photographId)
    .then(mediaData => {
        const mediaFactory = new MediaFactory();

        for (i = 0; i < mediaData.length; i++) {
            const media = mediaData[i];
            const mediaInstance = mediaFactory.createMedia(media);
            const mediaThumb = mediaInstance.createMediaThumbnail();
            galerieLightbox.push(media.image ? media.image : media.video);
            gallerie.appendChild(mediaThumb);
            
        }
        
        console.log(galerieLightbox)
        const galerieMediaDOM = document.querySelectorAll(".gallerie img");
        galerieMediaDOM.forEach((mediaDOM, index) => {
            mediaDOM.addEventListener('click', () => {
                currentIndex = index;
                console.log(currentIndex)
                lightbox.style.display = 'block';
                lightboxImg.src = `././assets/photos/${photographId}/${galerieLightbox[currentIndex]}`;
                lightboxVideo.src = `././assets/photos/${photographId}/${galerieLightbox[currentIndex]}`;
                lightboxImg.setAttribute("alt", mediaData[currentIndex].title);
                
                lightboxTitre.style.position = "absolute";
                lightboxTitre.textContent = mediaData[currentIndex].title; 
                lightboxContainer.appendChild(lightboxTitre)
            });
        })
        
    })
    .catch(error => {
        console.error(error);
    });


function closeLightbox() {
        lightbox.style.display = "none";
        lightboxTitre.textContent = ""; 
    }

    
function slideRight() {
    currentIndex++;
    if (currentIndex === galerieLightbox.length) {
        currentIndex = 0;
    }
    lightboxImg.src = `././assets/photos/${photographId}/${galerieLightbox[currentIndex]}`;
    lightboxVideo.src = `././assets/photos/${photographId}/${galerieLightbox[currentIndex]}`;
    lightboxImg.removeAttribute("alt");
    lightboxImg.setAttribute("alt", mediaData[currentIndex].title);
    lightboxTitre.textContent = "";
    lightboxTitre.textContent = mediaData[currentIndex].title;
}

function slideLeft() {
    currentIndex--;
    if (currentIndex === -1) {
        currentIndex = galerieLightbox.length - 1;
    }
    lightboxImg.src = `././assets/photos/${photographId}/${galerieLightbox[currentIndex]}`;
    lightboxVideo.src = `././assets/photos/${photographId}/${galerieLightbox[currentIndex]}`;
    lightboxImg.removeAttribute("alt");
    lightboxImg.setAttribute("alt", mediaData[currentIndex].title);
    lightboxTitre.textContent = "";
    lightboxTitre.textContent = mediaData[currentIndex].title;
}



// Gestion du bouton filtre
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