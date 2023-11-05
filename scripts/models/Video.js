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

    get id() {
        return this._id;
    }

    get photographerId() {
        return this._photographerId;
    }

    get title() {
        return this._title;
    }

    get video() {
        return this._video;
    }

    get likes() {
        return this._likes;
    }

    get date() {
        return this._date;
    }

    get price() {
        return this._price;
    }

    createMediaThumbnail() {
        const thumbGallerie = document.createElement("div");
        thumbGallerie.classList.add("media_thumbnail");
        const mediaLegend = document.createElement("div");
        mediaLegend.classList.add("media_legend");
        const videoMedia = document.createElement("video");
        videoMedia.setAttribute("src", `././assets/photos/${this._photographerId}/${this._video}`);
        videoMedia.setAttribute("data-id", this._id);
        const titre = document.createElement("h2");
        titre.textContent = this._title;
        const likesNumber = document.createElement("div");
        const likesBtn = document.createElement("button");
        likesNumber.classList.add("media_likes");
        likesNumber.setAttribute("aria-labelledby", "likes")
        likesBtn.setAttribute("aria-label", "nombre de likes")
        likesBtn.innerHTML = `${this._likes} <span class="fa-solid fa-heart"></span>`;
        likesBtn.addEventListener("click", () => updateLikes());

        // Update des likes du media

        const updateLikes = () => {
            if (likesNumber.classList.contains("active")) {
                this._likes -= 1;
                likesBtn.innerHTML = `${this._likes} <span class="fa-solid fa-heart"></span>`;
                likesNumber.classList.remove("active");
                likesNumber.removeAttribute("aria-label", "active");
            } else {
                this._likes += 1;
                likesBtn.innerHTML = `${this._likes} <span class="fa-solid fa-heart"></span>`;
                likesNumber.classList.add("active");
                likesNumber.setAttribute("aria-label", "active");
            }
        }
        /*********************************************************************************/

        thumbGallerie.appendChild(videoMedia);
        likesNumber.appendChild(likesBtn);
        mediaLegend.appendChild(titre);
        mediaLegend.appendChild(likesNumber);
        thumbGallerie.appendChild(mediaLegend);
        gallerie.appendChild(thumbGallerie);
        return (thumbGallerie);
    }
}