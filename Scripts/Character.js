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
        this._selector = { x: 0, y: 0 };
        this.updateSelector(this.direction);
    }

    walk(direction) {
        this.setDirection(direction);

        const positionTable = {
            left: { x: this.position.x - 1, y: this.position.y },
            right: { x: this.position.x + 1, y: this.position.y },
            up: { x: this.position.x, y: this.position.y - 1 },
            down: { x: this.position.x, y: this.position.y + 1 },
        }
        this.position = positionTable[direction];
        this.updateSelector(direction);
    }

    setDirection(direction) {
        this.direction = direction;
    }

    get selector() {
        return this._selector;
    }

    updateSelector(direction) {
        const d = {
            x: Number(direction === 'right') - Number(direction === 'left'),
            y: Number(direction === 'down') - Number(direction === 'up'),
        };
        this._selector = { x: this.position.x + d.x, y: this.position.y + d.y };
    }
}