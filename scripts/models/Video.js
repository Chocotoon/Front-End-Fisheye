class Video {
    constructor(data) {
        this._id = data.id,
        this._photographerId = data.photographerId,
        this._title = data.title,
        this._video = data.video,
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

    get video () {
        return this._video;
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
        const videoMedia = document.createElement("video");
        videoMedia.setAttribute("src", `././assets/photos/${this._photographerId}/${this._video}`); 
        videoMedia.setAttribute("controls", "true");
        const titre = document.createElement("h2");
        titre.textContent = this._title;
        const likesNumber = document.createElement("div");
        likesNumber.innerHTML = `${this._likes} <i class="fa-solid fa-heart"></i>`;
        likesNumber.setAttribute("aria-label", "likes")
        thumbGallerie.appendChild(videoMedia);
        
        mediaLegend.appendChild(titre);
        mediaLegend.appendChild(likesNumber);
        thumbGallerie.appendChild(mediaLegend);
        gallerie.appendChild(thumbGallerie);
        return (thumbGallerie);
    }
}