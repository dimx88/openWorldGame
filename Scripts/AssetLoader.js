export default class AssetLoader {
    constructor(loadingList = []) {
        this.loadingList = loadingList;
        this.images = {};
        window.images = this.images;
    }

    add(name, source) {
       this.loadingList.push({name, source});

    }

    async loadImages() {
        
        for (let img of this.loadingList) {

            const newImage = new Image();
            newImage.src = img.source;

            await newImage.decode();

            this.images[img.name]  = newImage;
            console.log(`loaded ${img.name}`);
        }

        window.images = this.images;
        console.log('finished loading assets');
    }
}