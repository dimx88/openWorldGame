import utils from "./utils.js";

export default class Game {
    constructor(config) {
        this.container = config.container;


        this.windowSize = { width: config.tileSize * config.tilesOnScreen.x, height: config.tileSize * config.tilesOnScreen.y };
        this.canvas;

        this.currentMap = window.maps.demoMap;
        this.numberOfTilesOnScreen = config.tilesOnScreen;

        this.tileSize = config.tileSize;

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
        // ...Should the canvas be provided rather than created here?

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
        this.render();
    }

    update() {
        requestAnimationFrame(() => this.update());
    }


    render(config = {}) {
        const { canvas, tileSize, currentMap: map, numberOfTilesOnScreen } = this;
        const { ctx } = canvas;

        ctx.clearRect(0, 0, canvas.width, canvas.height);


        // Temp controls
        window.onkeydown = (e) => {

            if (e.code === 'ArrowLeft') tileOffset.x -= 1;
            if (e.code === 'ArrowRight') tileOffset.x += 1;
            if (e.code === 'ArrowUp') tileOffset.y -= 1;
            if (e.code === 'ArrowDown') tileOffset.y += 1;
            this.render({ tileOffset });
        }


        const colorMap = { g: 'green', s: 'brown', w: 'cyan', x: 'white' };
        const tileOffset = config.tileOffset || { x: 0, y: 0 };

        // Calculate what area of the grid we actually want to render
        const minX = Math.max(0, tileOffset.x);
        const minY = Math.max(0, tileOffset.y);
        const maxY = Math.min(numberOfTilesOnScreen.y + minY, map.tiles[0].length);
        const maxX = Math.min(numberOfTilesOnScreen.x + minX, map.tiles.length);


        // Render
        for (let x = minX; x < maxX; x++) {
            for (let y = minY; y < maxY; y++) {
                const tile = map.tiles[x][y];
                ctx.fillStyle = colorMap[tile];
                ctx.fillRect((x - tileOffset.x) * tileSize, (y - tileOffset.y) * tileSize, tileSize, tileSize);
                ctx.strokeRect((x - tileOffset.x) * tileSize, (y - tileOffset.y) * tileSize, tileSize, tileSize);
            }
        }

        this.renderObjects(tileOffset);
    }

    renderObjects(tileOffset) {
        const { canvas, tileSize, currentMap: map, numberOfTilesOnScreen } = this;
        const { ctx } = canvas;



        for (let obj of map.objects) {
            console.log(obj.id);
            ctx.fillStyle = obj.color;
            ctx.fillRect((obj.position.x - tileOffset.x) * tileSize, (obj.position.y - tileOffset.y) * tileSize, tileSize, tileSize);
        }
    }



}