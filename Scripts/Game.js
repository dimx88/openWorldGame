export default class Game {
    constructor(config) {
        this.container = config.container;

        this.windowSize = config.windowSize || { width: containerSize.width, height: containerSize.height };
        this.canvas;

        // Start app if autoStart is on
        config.autoStart && (() => {
            this.init();
            this.startGameLoop();
        })();
    }

    init() {
        this.canvas = this.createCanvas();
        this.container.appendChild(this.canvas);

        this.canvas.ctx = this.canvas.getContext('2d');

    }

    createCanvas() {
        // ...Should the canvas be provided instead of created here?

        // Remove #main-canvas if already exists
        document.querySelector('#main-canvas')?.remove();

        const canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'main-canvas');
        canvas.setAttribute('width', this.windowSize.width);
        canvas.setAttribute('height', this.windowSize.height);

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

        ctx.fillRect(0, 50, 50, 50);

        requestAnimationFrame(() => this.update());
    }

}