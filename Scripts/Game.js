export default class Game {
    constructor(config) {
        this.container = config.container;
        this.canvas;
        this.size = config.dimensions || { width: 800, height: 500 };


        config.autoStart && this.init();
    }

    init() {
        console.log(this.container.style.width);
        this.canvas = this.createCanvas({ width: this.container.style.width, height: this.container.style.height });
    }

    createCanvas({ width, height }) {
        console.log('creating canvas');
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('id', 'main-canvas');
        this.canvas.setAttribute('height', this.size.width);
        this.canvas.setAttribute('width', this.size.height);
        this.container.appendChild(this.canvas);
    }


}