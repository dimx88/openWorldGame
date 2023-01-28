import utils from "./utils.js";
import GameObject from "./GameObject.js";
import Plant from "./Objects/Plant.js";
import TreasureBox from "./Objects/TreasureBox.js";
import Tree from "./Objects/Tree.js";
import Boulder from "./Objects/Boulder.js";

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
        this.direction = direction;

        this.position = utils.addVectors(this.position, direction);

        window.game.soundManager.playOneOfSounds(['step1', 'step2']);
    }

    get selector() {
        return this._selector;
    }

    updateSelector(direction) {

        this._selector = utils.addVectors(this.position, direction);
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
            objectAtSelector.onInteract(this);
            return;
        }


        const obj = new Boulder({
            position: this.selector,
        });

        game.objectManager.addObject(obj);

    }
}