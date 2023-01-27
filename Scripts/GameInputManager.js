import utils from "./utils.js";

export default class GameInputManager {
    constructor(config) {

        addEventListener('keydown', this.onKeyDown.bind(this));
    }

    onKeyDown(e) {
        // Todo: make better

        const game = window.game;
        const player = game.currentMap.player;
        let direction = null;

        let shouldUpdate = false;

        // WASD -> player interaction selector positioning
        const TABLE = { 'KeyW': 'up', 'KeyA': 'left', 'KeyS': 'down', 'KeyD': 'right' };

        TABLE[e.code] && player.updateSelector(TABLE[e.code]);




        // Arrow keys -> player movement
        if (e.code === 'ArrowLeft') direction = 'left';
        if (e.code === 'ArrowRight') direction = 'right';
        if (e.code === 'ArrowUp') direction = 'up';
        if (e.code === 'ArrowDown') direction = 'down';

        if (direction) {
            if (e.ctrlKey || e.shiftKey) {
            }
            else {
                const destination = utils.getNextTileAtDirection(player.position, direction);
                const tileAtDestination = game.currentMap.isPositionWithinBounds(destination) ? game.currentMap.tiles[destination.x][destination.y] : null;

                // player.updateSelector(direction);
                const objects = game.objectManager.objects;
                const isObjectAtDestination = !!(objects[`${destination.x},${destination.y}`]);

                if (!isObjectAtDestination && tileAtDestination && tileAtDestination !== 'w') {
                    player.walk(direction);
                    shouldUpdate = true;
                }
            };
            player.updateSelector(direction);
        }



        // Action key
        if (e.code === 'Space') {
            player.onActionKeyDown(e);
            shouldUpdate = true;
        }


        shouldUpdate && game.update();
        game.render(game.getTileOffset());
    }
}