export default class Game {
    constructor(config) {
        this.container = config.container;


        this.windowSize = config.windowSize || { width: containerSize.width, height: containerSize.height };
        this.canvas;

        this.currentMap = window.maps.demoMap;

        // Start app if autoStart is on
        config.autoStart && (() => {
            this.init();
            this.startGameLoop();
        })();
    }

    init() {
        this.canvas = this.createCanvas();
        this.canvas.ctx = this.canvas.getContext('2d');

        this.container.appendChild(this.canvas);

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
        this.render();
        this.update();
    }

    update() {



        requestAnimationFrame(() => this.update());
    }

    async render() {
        const { canvas } = this;
        const { ctx } = canvas;
        const { currentMap: map } = this;
        const tileSize = 20;

        // Render map
        const colorMap = { g: 'green', s: 'brown', w: 'cyan', x: 'white' };
        let count = 0;
        let offset = { x: 0, y: 0 };
        for (let x = offset.x; x < map.tiles.length; x++) {
            for (let y = offset.y; y < map.tiles[0].length; y++) {
                const tile = map.tiles[x][y];
                ctx.fillStyle = colorMap[tile];
                ctx.fillRect((x - offset.x) * tileSize, (y - offset.y) * tileSize, tileSize, tileSize);
                ctx.strokeRect((x - offset.x) * tileSize, (y - offset.y) * tileSize, tileSize, tileSize);
                await this.delay(10);
            }
        }
    }



    delay(ms) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, ms)
        });
    }


}