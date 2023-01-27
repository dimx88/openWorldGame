import GameObject from "./GameObject.js";

export default class Plant extends GameObject {
    constructor(config) {
        super(config);
        this.level = 0;
        this.maxLevel = 4;
        this.progress = config.initialProgress || 0;
        this.levelUpThreshold = config.levelUpThreshold || 10;
        this.started = false;
        this.dead = false;
    }

    update() {
        if (!this.started) { // Don't update state immidiatly after creation
            this.started = true;
            return;
        }


        this.progress += 1;
        if (this.progress >= this.levelUpThreshold) {
            if (this.level < this.maxLevel) {
                this.levelUp()
            }
        }


    }



    levelUp() {
        this.progress = 0;
        this.level += 1;
    }

    render(tileOffset) {
        const {tileSize} = window.game;
        
        game.canvas.ctx.drawImage(
            this.sprite,
            this.level * tileSize,
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