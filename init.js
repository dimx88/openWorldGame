import Game from "./Scripts/Game.js";
(
    function () {
        console.log('running OpenWorldGame project...');

        const gameConfig = { 
            autoStart: true,
            container: document.querySelector('.container'), 
            windowSize: {width: 500, height: 200}
        };

        let game = new Game(gameConfig);

        // game.init(); // Not needed if config is set to autoStart

        window.reset = () => {
            console.log('restarting...');
            game = new Game(gameConfig);
        }


    })();