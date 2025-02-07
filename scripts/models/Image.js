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

    get id() {
        return this._id;
    }

    get photographerId() {
        return this._photographerId;
    }

    get title() {
        return this._title;
    }

    get image() {
        return this._image;
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
        const img = document.createElement("img");
       

        img.setAttribute("tabindex", "0");
        img.setAttribute("aria-label", `${this._title}, closeup view`);
        img.setAttribute("src", `././assets/photos/${this._photographerId}/${this._image}`);
        img.setAttribute("data-id", this._id)
        const titre = document.createElement("h2");
        titre.textContent = this._title;
        const likesNumber = document.createElement("div");
        const likesBtn = document.createElement("button");
        likesNumber.classList.add("media_likes");
        likesBtn.setAttribute("aria-label", "nombre de likes")
        likesBtn.setAttribute("tabindex", "0")
        likesNumber.setAttribute("aria-labelledby", "likes")
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
        /**************************************************************************/
        likesNumber.appendChild(likesBtn);
        thumbGallerie.appendChild(img);
        mediaLegend.appendChild(titre);
        mediaLegend.appendChild(likesNumber);
        thumbGallerie.appendChild(mediaLegend);
        gallerie.appendChild(thumbGallerie);
        return (thumbGallerie);
    }
}