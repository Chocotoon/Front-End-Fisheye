class Image {
    constructor(data) {
        this._id = data.id,
        this._photographerId = data.photographerId,
        this._title = data.title,
        this._image = data.image, 
        this._likes = data.likes,
        this._date = data.date,
        this._price = data.price
    }

    get id () {
        return this._id;
    }

    get photographerId () {
        return this._photographerId;
    }

    get title() {
        return this._title;
    }

    get image () {
        return this._image;
    }

    get likes() {
        return this._likes;
    }

    get date () {
        return this._date;
    }
    
    get price () {
        return this._price;
    }

    createMediaThumbnail() {
        const thumbGallerie = document.createElement("div");
        const mediaLegend = document.createElement("div");
        mediaLegend.classList.add("media_legend");
        const img = document.createElement("img");
        img.setAttribute("src", `././assets/photos/${this._photographerId}/${this._image}`); 
        img.setAttribute("aria-label", `${this._title}, closeup view`);
        const titre = document.createElement("h2");
        titre.textContent = this._title;
        const likesNumber = document.createElement("div");
        likesNumber.setAttribute("aria-label", "likes")
        likesNumber.innerHTML = `${this._likes} <i class="fa-solid fa-heart"></i>`;
        thumbGallerie.appendChild(img);
        mediaLegend.appendChild(titre);
        mediaLegend.appendChild(likesNumber);
        thumbGallerie.appendChild(mediaLegend);
        gallerie.appendChild(thumbGallerie);
        return (thumbGallerie);
    }
}