import "./GameData/maps.js";
import AssetLoader from "./Scripts/AssetLoader.js";
import Game from "./Scripts/Game.js";

(
    async function () {
        console.log('running OpenWorldGame project...');

        // Load sprites 
        const loader = new AssetLoader();
        loader.add('player', './Sprites/player.png');
        loader.add('soil', './Sprites/soil.png');
        loader.add('water', './Sprites/water.png');
        loader.add('grass', './Sprites/grass.png');
        loader.add('plant', './Sprites/plant.png');
        await loader.loadImages();


        const gameConfig = { 
            // Window size = tileSize x numberOfTilesOnScreen
            autoStart: true,
            container: document.querySelector('.container'), 
            tileSize: 16,  // Pixel dimensions of a single tile
            numberOfTilesOnScreen: {x: 8, y: 8},  // Currently must use odd values so we can place the character in the middle
            resolutionScale: 5
        };


        let game = new Game(gameConfig);

    
        // game.init(); // Not needed if config is set to autoStart

    })();