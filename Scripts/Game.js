import utils from './utils.js';
import Map from './Map.js';
import ObjectManager from './ObjectManager.js';
import SoundManager from './SoundManager.js';
import GameInputManager from './GameInputManager.js';

export default class Game {
    constructor(config) {
        // Display settings
        this.container = config.container;
        this.windowSize = { width: config.tileSize * config.numberOfTilesOnScreen.x, height: config.tileSize * config.numberOfTilesOnScreen.y };
        this.resolutionScale = config.resolutionScale || 5;
        this.canvas = null;

        this.numberOfTilesOnScreen = config.numberOfTilesOnScreen;
        this.tileSize = config.tileSize;
        this.tileOffset = { x: 0, y: 0 };

        // Main game data
        this.currentMap = null;
        this.objectManager = null;

        // Input
        this.inputManager;

        // Sound
        this.soundManager;

        // Start app if autoStart is on
        config.autoStart && (() => {
            this.init();
            this.update();
        })();
    }

    init() {
        window.game = this;
        // Set up canvas
        this.canvas = this.createCanvas();
        this.canvas.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        // Temp - start with this map
        const testMap = window.maps.demoMap;

        this.currentMap = new Map({
            mapData: testMap,
            canvas: this.canvas,
            numberOfTilesOnScreen: this.numberOfTilesOnScreen,
            tileSize: this.tileSize
        });

        this.objectManager = new ObjectManager(this.currentMap.objects, this.currentMap);

        // Start handling input
        // document.addEventListener('keydown', this.handleKeyboardInput.bind(this));
        this.inputManager = new GameInputManager({ game: this });

        this.soundManager = new SoundManager();
    }



    createCanvas() {
        // ...Should the canvas be provided rather than created here?

        // Remove #main-canvas if already exists
        document.querySelector('#main-canvas')?.remove();

        const canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'main-canvas');
        canvas.setAttribute('width', this.windowSize.width);
        canvas.setAttribute('height', this.windowSize.height);

        canvas.style.width = `${this.windowSize.width * this.resolutionScale}px`;
        canvas.style.height = `${this.windowSize.height * this.resolutionScale}px`;

        this.container.appendChild(canvas);

        console.log('created main canvas');

        return canvas;
    }


    update() {
        this.currentMap.update();

        this.objectManager.update();

        this.render(this.getTileOffset());

    }


    render(tileOffset) {
        this.canvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.currentMap.render(tileOffset);
    }

    // Calculates the offset needed to display the player in the center
    getTileOffset() {
        const player = this.currentMap.player;
        const offset = {
            x: player.position.x - ~~(this.numberOfTilesOnScreen.x * 0.5),
            y: player.position.y - ~~(this.numberOfTilesOnScreen.y * 0.5)
        }
        return offset;
    }

}