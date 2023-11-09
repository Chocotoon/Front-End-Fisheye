//Mettre le code JavaScript lié à la page photographer.html



// Récupération de l'ID dans l'url pour générer le contenu de la page associé au photographe
let params = new URLSearchParams(window.location.search);
let photographId = params.get("id");

// Elements du DOM
const photographersSection = document.querySelector(".photograph-header");
const gallerie = document.querySelector(".gallerie");
const formHeader = document.querySelector("#contact_modal .modal");


// Gestion de la lightbox

let galerieLightbox = [];

function setLightbox() {

    lightbox = document.querySelector('.lightbox');
    lightboxImg = document.querySelector('.lightbox img');
    lightboxVideo = document.querySelector('.lightbox video');
    lightboxContainer = document.querySelector(".lightbox__container");
    lightboxTitre = document.querySelector(".lightbox__title");
    const closeLightboxBtn = document.querySelector('.lightbox__close');
    const arrowRight = document.querySelector(".lightbox__next");
    arrowRight.addEventListener("click", slideRight);
    const arrowLeft = document.querySelector(".lightbox__prev");
    arrowLeft.addEventListener("click", slideLeft);
    closeLightboxBtn.addEventListener('click', closeLightbox)

}

setLightbox();

// Affichage de la lightbox

function displayLightboxContent(index) {

    const target = event.target;
    currentIndex = index;
    lightbox.style.display = 'block';
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.focus();
    mainContent.setAttribute("aria-hidden", "true");
    imgID = target.getAttribute("data-id");
    imgName = galerieLightbox.find(element => element.id == imgID);
    lightboxImg.src = `././assets/photos/${photographId}/${imgName.image}`;
    lightboxVideo.src = `././assets/photos/${photographId}/${imgName.video}`;

    if (!galerieLightbox[currentIndex].image) {
        lightboxImg.style.display = "none";
        lightboxVideo.style.display = "block";
        lightboxVideo.setAttribute("tabindex", "0");
        lightboxImg.removeAttribute("tabindex")
    }
    else if (!galerieLightbox[currentIndex].video) {
        lightboxVideo.style.display = "none";
        lightboxImg.style.display = "block";
        lightboxImg.setAttribute("tabindex", "0");
        lightboxVideo.removeAttribute("tabindex")
    }

    lightboxImg.setAttribute("alt", imgName.title);
    lightboxTitre.textContent = imgName.title;
    lightboxContainer.appendChild(lightboxTitre);
}


// Fonctions de navigation dans la lightbox

function closeLightbox() {
    lightbox.style.display = "none";
    lightboxTitre.textContent = "";
    lightbox.setAttribute("aria-hidden", "true");
    mainContent.setAttribute("aria-hidden", "false");
}

function slideUpdate() {
    lightboxImg.src = `././assets/photos/${photographId}/${galerieLightbox[currentIndex].image}`;
    lightboxVideo.src = `././assets/photos/${photographId}/${galerieLightbox[currentIndex].video}`;
    lightboxImg.removeAttribute("alt");
    lightboxImg.setAttribute("alt", galerieLightbox[currentIndex].title);
    lightboxTitre.textContent = "";
    lightboxTitre.textContent = galerieLightbox[currentIndex].title;
    if (!galerieLightbox[currentIndex].image) {
        lightboxImg.style.display = "none";
        lightboxVideo.style.display = "block"
    }
    else if (!galerieLightbox[currentIndex].video) {
        lightboxVideo.style.display = "none";
        lightboxImg.style.display = "block"
    }

}
function slideRight() {
    currentIndex++;
    if (currentIndex === galerieLightbox.length) {
        currentIndex = 0;
    }

    slideUpdate()

}

function slideLeft() {
    currentIndex--;
    if (currentIndex === -1) {
        currentIndex = galerieLightbox.length - 1;
    }

    slideUpdate()

}

// Gestion de la navigation au clavier de la lightbox

lightbox.addEventListener("keydown", keybordLightbox)

function keybordLightbox(e) {
    if (e.key === "Tab" && lightbox.style.display === "block") {
        const focusableElements = lightbox.querySelectorAll('button, .lightbox__container video, .lightbox__container img');
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (lastElement.matches(":focus")) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
    if (e.key === "Escape" && lightbox.style.display === "block") {
        closeLightbox();
    }
    if (e.key === "ArrowRight" && lightbox.style.display === "block") {
        slideRight();
    }

    if (e.key === "ArrowLeft" && lightbox.style.display === "block") {
        slideLeft();
    }
};



// Gestion du bouton filtre
const btnFiltre = document.querySelector(".filtre button");
const filtreIcon = document.querySelector(".filtre button .fa-solid");
const filtreListElements = document.querySelectorAll("ul li");
const btnList = document.querySelector(".filtre ul")
const btnFiltreText = document.querySelector(".filtre button span[aria-label='filtre by']");
btnFiltre.addEventListener("click", filtreToggle);

// Navigation aux flèches du bouton
function navigationFiltreBtnArrow(event, index) {
    if (event.key === "ArrowDown") {
        event.preventDefault()
        event.target.blur();
        const nextIndex = index + 1;
        if (nextIndex < filtreListElements.length) {
            filtreListElements[nextIndex].focus();
        } else {
            btnFiltre.setAttribute("aria-expanded", "false");
            filtreIcon.classList.remove("fa-chevron-up");
            filtreIcon.classList.add("fa-chevron-down");
            const firstGallerieImage = document.querySelector(".media_thumbnail img, .media_thumbnail video");
            firstGallerieImage.focus();
        }
    } else if (event.key === "ArrowUp") {
        event.preventDefault()
        event.target.blur();
        const prevIndex = index - 1;
        if (prevIndex >= 0) {
            filtreListElements[prevIndex].focus();
        } else {
            btnFiltre.setAttribute("aria-expanded", "false");
            filtreIcon.classList.remove("fa-chevron-up");
            filtreIcon.classList.add("fa-chevron-down");
            const contactButton = document.querySelector(".contact_button");
            contactButton.focus();
        }
    }
}

for (let i = 0; i < filtreListElements.length; i++) {
    filtreListElements[i].addEventListener('keydown', (event) => {
        navigationFiltreBtnArrow(event, i);
    });
}


function filtreToggle() {
    if (btnFiltre.getAttribute("aria-expanded") === "false") {
        btnFiltre.setAttribute("aria-expanded", "true");
        btnFiltre.setAttribute("aria-hidden", "true");
        btnList.setAttribute("aria-hidden", "false");
        filtreIcon.classList.remove("fa-chevron-down");
        filtreIcon.classList.add("fa-chevron-up");
        filtreListElements[0].focus();
    }
    window.onclick = function (event) {
        if (event.target != btnFiltre) {
            btnFiltre.setAttribute("aria-expanded", "false");
            btnFiltre.setAttribute("aria-hidden", "false");
            btnFiltre.setAttribute("aria-hidden", "true")
            filtreIcon.classList.remove("fa-chevron-up");
            filtreIcon.classList.add("fa-chevron-down");
        }
    }
}

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
        const section = document.createElement('section');
        const photographerDiv = document.createElement('div');
        photographerDiv.classList.add('photographer_info')
        const aside = document.querySelector('.likes_price');
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
        const prix = document.querySelector(".prix");
        prix.innerText = `${price} € / jour`;
        photographerDiv.appendChild(h1);
        section.appendChild(img);
        photographerDiv.appendChild(location);
        photographerDiv.appendChild(description);
        section.appendChild(photographerDiv);
        aside.appendChild(prix);
        section.appendChild(photographerButton);
        return (section);
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

// On génère le contenu media grâce à la factory et aux objets Image et Video
getMediaData(photographId)
    .then(mediaData => {
        sortedData = mediaData.sort(function (a, b) {
            return a.likes - b.likes;
        })
        const mediaFactory = new MediaFactory();
        let mediaLikes = 0;

        for (i = 0; i < sortedData.length; i++) {
            const media = sortedData[i];
            mediaLikes = mediaLikes + media.likes;
            const mediaInstance = mediaFactory.createMedia(media);
            const mediaThumb = mediaInstance.createMediaThumbnail();

            galerieLightbox.push(media);
            gallerie.appendChild(mediaThumb);
        }

        // Gestion du nombre total de likes 

        totalLikes = document.querySelector(".total_likes");
        totalLikes.innerHTML = `${mediaLikes} <span class="fa-solid fa-heart"></span>`;
        totalLikes.innerHTML = "";
        totalLikes.innerHTML = `${mediaLikes} <span class="fa-solid fa-heart"></span>`;
        const mediaIndivLikes = document.querySelectorAll(".media_likes");
        mediaIndivLikes.forEach(element => {
            element.addEventListener("click", function () {
                if (element.classList.contains("active")) {
                    mediaLikes += 1;
                    totalLikes.innerHTML = `${mediaLikes} <span class="fa-solid fa-heart"></span>`;
                }
                else {
                    mediaLikes -= 1
                    totalLikes.innerHTML = `${mediaLikes} <span class="fa-solid fa-heart"></span>`;
                }
            });
        });

        const aside = document.querySelector(".likes_price");
        aside.appendChild(totalLikes);


        // On génère le contenu de la lightbox
        const galerieMediaDOM = document.querySelectorAll(".media_thumbnail img, .media_thumbnail video");
        galerieMediaDOM.forEach((mediaDOM, index) => {
            mediaDOM.addEventListener('click', () => {

                currentIndex = index;
                displayLightboxContent(index)

            });
        })
        galerieMediaDOM.forEach((mediaDOM, index) => {
            mediaDOM.addEventListener('keydown', function (event) {
                if (event.keyCode === 13 || event.keyCode === 32) {

                    currentIndex = index;
                    displayLightboxContent(index)

                }
            });
        })

        // Navigation aux flèches dans la galerie 
        const galerieFocusable = document.querySelectorAll(".media_thumbnail img, .media_thumbnail video, .media_likes button");

        function navigationGaleryArrow(event, index) {
            if (event.key === "ArrowRight") {
                event.target.blur();
                const nextIndex = index + 1;
                if (nextIndex < galerieFocusable.length) {
                    galerieFocusable[nextIndex].focus();
                } else {
                    galerieFocusable[0].focus();
                }
            } else if (event.key === "ArrowLeft") {
                event.target.blur();
                const prevIndex = index - 1;
                if (prevIndex >= 0) {
                    galerieFocusable[prevIndex].focus();
                } else {
                    galerieFocusable[galerieFocusable.length - 1].focus();
                }
            }
        }

        for (let i = 0; i < galerieFocusable.length; i++) {
            galerieFocusable[i].addEventListener('keydown', (event) => {
                navigationGaleryArrow(event, i);
            });
        }


    })
    .catch(error => {
        console.error(error);
    });



// Tri des medias en fonction du filtre 

getMediaData(photographId)
    .then(mediaData => {
        for (i = 0; i < filtreListElements.length; i++) {
            filtreListElements[i].addEventListener("keydown", function (e) {
                if (e.key === "Tab" && btnFiltre.getAttribute("aria-expanded") === "true") {
                    const lastElement = filtreListElements[filtreListElements.length - 1];

                    if (document.activeElement === lastElement) {
                        btnFiltre.setAttribute("aria-expanded", "false");
                        filtreIcon.classList.remove("fa-chevron-up");
                        filtreIcon.classList.add("fa-chevron-down");
                    }
                }

                else if (e.key === "Enter" || e.keyCode === 32) {
                    value = e.target.getAttribute("option");
                    sortedData = mediaData.sort(function (a, b) {
                        if (value === "Date") {
                            aDate = new Date(a.date)
                            bDate = new Date(b.date)
                            if (aDate < bDate) {
                                return -1;
                            }
                            if (aDate > bDate) {
                                return 1;
                            }
                            return 0;
                        }

                        else if (value === "Popularite") {
                            return a.likes - b.likes;
                        }

                        else if (value === "Titre") {
                            let nameA = a.title.toUpperCase();
                            let nameB = b.title.toUpperCase();
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }
                            return 0;
                        };
                    });
                    btnFiltreText.innerText = `${value}`
                    btnFiltre.setAttribute("aria-expanded", "false");
                    filtreIcon.classList.remove("fa-chevron-up");
                    filtreIcon.classList.add("fa-chevron-down");


                    gallerie.innerHTML="";
                    setLightbox();
                    lightbox.addEventListener("keydown", keybordLightbox);
                    gallerie.addEventListener("click", (event) => {
                        event.preventDefault();
                    })
                }

                const mediaFactory = new MediaFactory();
                let mediaLikes = 0;
                galerieLightbox = [];
                for (i = 0; i < sortedData.length; i++) {
                    const media = sortedData[i];
                    mediaLikes = mediaLikes + media.likes;
                    const mediaInstance = mediaFactory.createMedia(media);
                    const mediaThumb = mediaInstance.createMediaThumbnail();
                    galerieLightbox.push(media);
                    gallerie.appendChild(mediaThumb);
                }

                const galerieMediaDOM = document.querySelectorAll(".media_thumbnail img, .media_thumbnail video");
                galerieMediaDOM.forEach((mediaDOM, index) => {
                    mediaDOM.addEventListener('click', () => {
                        currentIndex = index;
                        displayLightboxContent(index);

                    });

                    mediaDOM.addEventListener('keydown', (event) => {
                        if (event.keyCode === 13 || event.keyCode === 32) {
                            currentIndex = index;
                            displayLightboxContent(index);

                        }
                    });

                    // Navigation aux flèches dans la galerie 
                    const galerieFocusable = document.querySelectorAll(".media_thumbnail img, .media_thumbnail video, .media_likes button");

                    function navigationGaleryArrow(event, index) {
                        if (event.key === "ArrowRight") {
                            event.target.blur();
                            const nextIndex = index + 1;
                            if (nextIndex < galerieFocusable.length) {
                                galerieFocusable[nextIndex].focus();
                            } else {
                                galerieFocusable[0].focus();
                            }
                        } else if (event.key === "ArrowLeft") {
                            event.target.blur();
                            const prevIndex = index - 1;
                            if (prevIndex >= 0) {
                                galerieFocusable[prevIndex].focus();
                            } else {
                                galerieFocusable[galerieFocusable.length - 1].focus();
                            }
                        }
                    }

                    for (let i = 0; i < galerieFocusable.length; i++) {
                        galerieFocusable[i].addEventListener('keydown', (event) => {
                            navigationGaleryArrow(event, i);
                        });
                    }
                })

                /*************************************************** * Gestion des likes ********************************/

                totalLikes = document.querySelector(".total_likes");
                totalLikes.innerHTML = `${mediaLikes} <span class="fa-solid fa-heart"></span>`;
                totalLikes.innerHTML = "";
                totalLikes.innerHTML = `${mediaLikes} <span class="fa-solid fa-heart"></span>`;
                const mediaIndivLikes = document.querySelectorAll(".media_likes");
                mediaIndivLikes.forEach(element => {
                    element.addEventListener("click", function () {
                        if (element.classList.contains("active")) {
                            mediaLikes += 1;
                            totalLikes.innerHTML = `${mediaLikes} <span class="fa-solid fa-heart"></span>`;
                        }
                        else {
                            mediaLikes -= 1
                            totalLikes.innerHTML = `${mediaLikes} <span class="fa-solid fa-heart"></span>`;
                        }
                    });
                });
            })
        }
    });


// Tri des medias en fonction du filtre
getMediaData(photographId)

    .then(mediaData => {
        filtreListElements.forEach(element => {

            element.addEventListener("click", function () {

                value = element.getAttribute("option");
                sortedData = mediaData.sort(function (a, b) {
                    if (value === "Date") {
                        aDate = new Date(a.date)
                        bDate = new Date(b.date)
                        if (aDate < bDate) {
                            return -1;
                        }
                        if (aDate > bDate) {
                            return 1;
                        }
                        return 0;
                    }

                    else if (value === "Popularite") {
                        return a.likes - b.likes;
                    }

                    else if (value === "Titre") {
                        let nameA = a.title.toUpperCase();
                        let nameB = b.title.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                    };

                    element.setAttribute("aria-selected", "true");
                });

                btnFiltreText.innerText = `${value}`;
                gallerie.innerHTML="";
                setLightbox();
                lightbox.addEventListener("keydown", keybordLightbox);

                const mediaFactory = new MediaFactory();
                let mediaLikes = 0;
                galerieLightbox = [];
                for (i = 0; i < sortedData.length; i++) {
                    const media = sortedData[i];
                    mediaLikes = mediaLikes + media.likes;
                    const mediaInstance = mediaFactory.createMedia(media);
                    const mediaThumb = mediaInstance.createMediaThumbnail();
                    galerieLightbox.push(media);
                    gallerie.appendChild(mediaThumb);
                    const galerieMediaDOM = document.querySelectorAll(".media_thumbnail img, .media_thumbnail video");
                    galerieMediaDOM.forEach((mediaDOM, index) => {
                        mediaDOM.addEventListener('click', () => {
                            currentIndex = index;
                            displayLightboxContent(index);

                        });

                        mediaDOM.addEventListener('keydown', function (event) {
                            if (event.keyCode === 13 || event.keyCode === 32) {
                                currentIndex = index;
                                displayLightboxContent(index);

                            }
                        });


                        // Navigation aux flèches dans la galerie 
                        const galerieFocusable = document.querySelectorAll(".media_thumbnail img, .media_thumbnail video, .media_likes button");

                        function navigationGaleryArrow(event, index) {
                            if (event.key === "ArrowRight") {
                                event.target.blur();
                                const nextIndex = index + 1;
                                if (nextIndex < galerieFocusable.length) {
                                    galerieFocusable[nextIndex].focus();
                                } else {
                                    galerieFocusable[0].focus();
                                }
                            } else if (event.key === "ArrowLeft") {
                                event.target.blur();
                                const prevIndex = index - 1;
                                if (prevIndex >= 0) {
                                    galerieFocusable[prevIndex].focus();
                                } else {
                                    galerieFocusable[galerieFocusable.length - 1].focus();
                                }
                            }
                        }

                        for (let i = 0; i < galerieFocusable.length; i++) {
                            galerieFocusable[i].addEventListener('keydown', (event) => {
                                navigationGaleryArrow(event, i);
                            });
                        }
                    })
                }

                /*************************************************** * Gestion des likes ********************************/

                totalLikes = document.querySelector(".total_likes");
                totalLikes.innerHTML = `${mediaLikes} <span class="fa-solid fa-heart"></span>`;
                totalLikes.innerHTML = "";
                totalLikes.innerHTML = `${mediaLikes} <span class="fa-solid fa-heart"></span>`;
                const mediaIndivLikes = document.querySelectorAll(".media_likes");
                mediaIndivLikes.forEach(element => {
                    element.addEventListener("click", function () {
                        if (element.classList.contains("active")) {
                            mediaLikes += 1;
                            totalLikes.innerHTML = `${mediaLikes} <span class="fa-solid fa-heart"></span>`;
                        }
                        else {
                            mediaLikes -= 1
                            totalLikes.innerHTML = `${mediaLikes} <span class="fa-solid fa-heart"></span>`;
                        }
                    });
                });
            })
        })
    })