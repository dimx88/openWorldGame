import GameObject from "./GameObject.js";

export default class Character extends GameObject {
    constructor(config) {
        super(config);
        /* Inherited params: 
            position 
            direction (facing), 
            sprite
        */
        this.name = config.name || 'manWithNoName';
    }

    walk(direction) {
        const positionTable = {
            left: { x: this.position.x - 1, y: this.position.y },
            right: { x: this.position.x + 1, y: this.position.y },
            up: { x: this.position.x, y: this.position.y - 1 },
            down: { x: this.position.x, y: this.position.y + 1 },
        }
        this.position = positionTable[direction];
    }
}