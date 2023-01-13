import Game from "./Scripts/Game.js";
(
    function () {
        console.log('running OpenWorldGame project...');

        const gameConfig = { 
            container: document.querySelector('.container'), 
            autoStart: true 
        };

        let game = new Game(gameConfig);

        // game.init();

        window.reset = () => {
            console.log('restarting...');
            game = new Game(gameConfig);
            game.init();
            console.log('Initialized game');
        }


    })();