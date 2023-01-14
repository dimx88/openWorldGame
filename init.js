import Game from "./Scripts/Game.js";
(
    function () {
        console.log('running OpenWorldGame project...');

        const gameConfig = { 
            // Window size is tile size multiplied by number of tiles on screen
            autoStart: true,
            container: document.querySelector('.container'), 
            tileSize: 40,
            numberOfTilesOnScreen: {x: 10, y: 10},
        };

        console.log(gameConfig);

        let game = new Game(gameConfig);

        // game.init(); // Not needed if config is set to autoStart

        window.reset = () => {
            console.log('restarting...');
            game = new Game(gameConfig);
        }


    })();