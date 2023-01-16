import utils from './utils.js';
import Map from './Map.js';

export default class Game {
    constructor(config) {
        this.container = config.container;


        this.windowSize = { width: config.tileSize * config.numberOfTilesOnScreen.x, height: config.tileSize * config.numberOfTilesOnScreen.y };
        this.canvas = null;
        this.currentMap = null;
        this.tileOffset = { x: 0, y: 0 };


        this.numberOfTilesOnScreen = config.numberOfTilesOnScreen;

        this.tileSize = config.tileSize;

        // Start app if autoStart is on
        config.autoStart && (() => {
            this.init();
            this.update();
        })();
    }

    init() {
        this.canvas = this.createCanvas();
        this.canvas.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        this.currentMap = new Map({
            mapData: window.maps.demoMap,
            canvas: this.canvas,
            numberOfTilesOnScreen: this.numberOfTilesOnScreen,
            tileSize: this.tileSize
        });

        // Temp - just to test offset
        window.onkeydown = (e) => {
            const inputX = Number(e.code === 'ArrowRight') - Number(e.code === 'ArrowLeft');
            const inputY = Number(e.code === 'ArrowDown') - Number(e.code === 'ArrowUp');
            // this.tileOffset.x += inputX;
            // this.tileOffset.y += inputY;

            const { player } = this.currentMap;
            let direction = null;
            if (e.code === 'ArrowLeft') direction = 'left';
            if (e.code === 'ArrowRight') direction = 'right';
            if (e.code === 'ArrowUp') direction = 'up';
            if (e.code === 'ArrowDown') direction = 'down';

            direction && player.walk(direction);
            console.log(player.position);
            this.update();
        }
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


    update() {
        this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.currentMap.update();

        this.render(this.currentMap.player.position);

    }

    render(tileOffset) {
        this.currentMap.render(tileOffset);
        this.currentMap.renderObjects(tileOffset);
    }


}