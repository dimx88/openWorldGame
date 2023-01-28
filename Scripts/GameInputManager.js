import utils from "./utils.js";

export default class GameInputManager {
    constructor(config) {

        addEventListener('keydown', this.onKeyDown.bind(this));
    }

    isObjectAtSelector() {
        const selector = utils.getNextTileAtDirection(player.position, direction);
       return game.objectManager.objects[`${selector.x},${selector.y}`] || false;
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
        if (e.code === 'ArrowLeft') direction = utils.direction.LEFT;
        if (e.code === 'ArrowRight') direction = utils.direction.RIGHT;
        if (e.code === 'ArrowUp') direction = utils.direction.UP;
        if (e.code === 'ArrowDown') direction = utils.direction.DOWN;

        if (direction) {
            if (e.ctrlKey || e.shiftKey) {
            }
            else {
                const destination = utils.addVectors(player.position, direction);
                const tileAtDestination = game.currentMap.isPositionWithinBounds(destination) ? game.currentMap.tiles[destination.x][destination.y] : null;

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