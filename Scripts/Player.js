import GameObject from "./GameObject.js";
import Plant from "./Plant.js";
import TreasureBox from "./TreasureBox.js";

export default class Player extends GameObject {
    constructor(config) {
        super(config);
        /* Inherited params: 
            position 
            direction (facing), 
            sprite
        */
        this.game = window.game;

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

        window.game.soundManager.playOneOfSounds(['step1', 'step2']);
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

    onActionKeyDown(e) {
        if (!game.currentMap.isPositionWithinBounds(this.selector)) return;
        
        if (e.ctrlKey) {
            this.game.objectManager.removeObjectAtPosition(this.selector);
            return;
        }

        const targetTile = game.currentMap.tiles[this.selector.x][this.selector.y];

        if (targetTile === 'w') return;

      

        const objectAtSelector = game.objectManager.objects[`${this.selector.x},${this.selector.y}`] || null;
        if (objectAtSelector) {
            objectAtSelector.onInteract();
            return;
        }
          // const plant = new Plant({
        //     position: this.selector,
        //     sprite: window.images.plant
        // });

        const box = new TreasureBox({
            position: this.selector,
            sprite: window.images.treasure_box
        });


        game.objectManager.addObject(box);

    }
}