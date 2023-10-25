class MediaFactory {
    createMedia(data) {

        if (data.video) {
            return new Video(data);
        }

        else if (data.image) {
            return new Image(data);
        }

        else {
            throw 'Unknown type';
        }
    }
}

