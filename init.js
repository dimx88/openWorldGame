import Game from "./Scripts/Game.js";
(
    function () {
        console.log('running OpenWorldGame project...');

        const appContainer = document.querySelector('.container');

        const game = new Game({ container: appContainer, dimensions: {width: 400, height: 200}, autoStart: true});

        // game.init();


    })();