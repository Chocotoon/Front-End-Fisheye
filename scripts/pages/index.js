// On récupère les informations des photographes   
    async function getPhotographers() {
        const response = await fetch("./data/photographers.json");
        const photographers = await response.json();
        return photographers;
    }
// On les affiche grâce à templates/photographer.js
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
