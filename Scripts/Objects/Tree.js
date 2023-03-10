import GameObject from "../GameObject.js";

export default class Tree extends GameObject {
    constructor(config) {
        super(config);

        this.sprite = window.images.tree_2;
        this.height = 2;

        this.timesChopped = 0;
        this.maxChops = 5;

        this.started = false;
        this.isChopped = false;
    }

    update() {

    }

    onInteract() {

        this.timesChopped++;
        !this.isChopped && game.soundManager.play('hit_tree');

        this.timesChopped >= this.maxChops && this.onDoneChopping();
    }

    onDoneChopping() {
        if (!this.isChopped) {
            this.isChopped = true;
            this.sprite = window.images.chopped_wood;
            this.height = 1;
            return;
        }

        // Todo -> Add chopped wood to inventory
        delete game.objectManager.objects[`${this.position.x},${this.position.y}`];
        game.soundManager.play('pickup_item');
    }



    render(tileOffset) {
        const { tileSize } = window.game;

        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        game.canvas.ctx.drawImage(
            this.sprite,
            0,
            0,
            tileSize,
            tileSize * this.height,
            (this.position.x - tileOffset.x) * tileSize,
            (this.position.y - tileOffset.y) * tileSize - (tileSize * (this.height - 1)),
            tileSize,
            tileSize * this.height
        );
    }
}