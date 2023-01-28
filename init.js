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
        loader.add('treasure_box', './Sprites/treasure_box.png');
        loader.add('tree', './Sprites/tree.png');
        loader.add('chopped_wood', './Sprites/chopped_wood.png');
        await loader.loadImages();


        const gameConfig = { 
            // Window size = tileSize x numberOfTilesOnScreen
            autoStart: true,
            container: document.querySelector('.container'), 
            tileSize: 16,  // Pixel dimensions of a single tile
            numberOfTilesOnScreen: {x: 15, y: 15},  // Currently must use odd values so we can place the character in the middle
            resolutionScale: 3
        };


        let game = new Game(gameConfig);

    

    })();