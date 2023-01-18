import "./GameData/maps.js";

import Game from "./Scripts/Game.js";
(
    function () {
        console.log('running OpenWorldGame project...');

        const gameConfig = { 
            // Window size = tileSize x numberOfTilesOnScreen
            autoStart: true,
            container: document.querySelector('.container'), 
            tileSize: 60,
            numberOfTilesOnScreen: {x: 11, y: 11},  // Currently must use odd values so we can place the character in the middle
        };


        let game = new Game(gameConfig);

        // game.init(); // Not needed if config is set to autoStart

        
        window.reset = () => {
            console.log('restarting...');
            game = new Game(gameConfig);
        }

    })();