import GameObject from "../GameObject.js";
import utils from "../utils.js";

export default class Boulder extends GameObject {
    constructor(config) {
        super(config);

        this.sprite = window.images.boulder;

    }

    update() {

    }

    onInteract(interactor) {
        // If target tile is clear and is within map bounds there, move

        const targetPosition = utils.addVectors(this.position, interactor.direction);

        if (!game.objectManager.getObjectAt(targetPosition) && game.currentMap.isPositionWithinBounds(targetPosition)) {
            this.move(targetPosition);

        }
    }

    move(targetPosition) {
        game.objectManager.repositionObject(this.position, targetPosition);
    }

    render(tileOffset) {
        const { tileSize } = window.game;

        game.canvas.ctx.drawImage(
            this.sprite,
            0,
            0,
            tileSize,
            tileSize,
            (this.position.x - tileOffset.x) * tileSize,
            (this.position.y - tileOffset.y) * tileSize,
            tileSize,
            tileSize
        );
    }
}