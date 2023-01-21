import Game from "./Game.js";
import GameObject from "./GameObject.js";
export default class Plant extends GameObject {
    constructor(config) {
        super(config);
        this.level = 0;
        this.progress = config.initialProgress || 0;
        this.levelUpThreshold = config.levelUpThreshold || 10;
        this.levelColors = ['#666139', '#5d703f', '#7eb05a', '#69e03a'];
        this.color = this.levelColors[0];
        this.levelSprites = [];
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
            if (this.level < this.levelColors.length - 1) {
                this.levelUp()
            }
            // } else {
            //     this.dead = true;
            // }
        }


    }



    levelUp() {
        this.progress = 0;
        this.level += 1;
        this.color = this.levelColors[this.level];
    }
}