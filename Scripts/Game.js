export default class Game {
    constructor(config) {
        this.container = config.container;
        // Stretch to the container's size
        const containerSize = this.container.getBoundingClientRect();
        this.windowSize = { width: containerSize.width, height: containerSize.height };
        this.canvas;

        // Start app if autoStart is on
        config.autoStart && (() => {
            this.init();
            this.startGameLoop();
        })();
    }

    init() {
        this.canvas = this.createCanvas({ width: this.container.style.width, height: this.container.style.height });
        this.container.appendChild(this.canvas);

        this.canvas.ctx = this.canvas.getContext('2d');

    }

    createCanvas() {

        const canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'main-canvas');
        canvas.setAttribute('height', this.windowSize.width);
        canvas.setAttribute('width', this.windowSize.height);

        this.container.appendChild(canvas);

        console.log('created main canvas');

        return canvas;
    }

    startGameLoop() {
        this.update();
    }

    update() {
        const { canvas } = this;
        const { ctx } = canvas;

        ctx.fillRect(50, 50, 50, 50);

        requestAnimationFrame(() => this.update());
    }

}