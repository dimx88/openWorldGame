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
        // If target tile is clear, move
        this.move(interactor.direction);
    }
    
    move(direction) {
        const newPosition = utils.addVectors(this.position, direction);
        game.objectManager.repositionObject(this.position, newPosition);
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