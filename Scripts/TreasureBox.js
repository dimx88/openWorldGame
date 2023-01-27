import GameObject from "./GameObject.js";

export default class TreasureBox extends GameObject {
    constructor(config) {
        super(config);
        this.isOpen = 0;

        this.started = false;
        this.dead = false;
    }

    update() {

    }

    onInteract() {  

        this.isOpen = this.isOpen === 0 ? 1 : 0;
        game.soundManager.play('box_open');
        console.log(this.isOpen);

    }





    render(tileOffset) {
        const { tileSize } = window.game;

        game.canvas.ctx.drawImage(
            this.sprite,
            this.isOpen * tileSize,
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