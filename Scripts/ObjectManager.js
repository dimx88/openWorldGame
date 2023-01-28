import GameObject from "./GameObject.js";
import utils from "./utils.js";

import Plant from "./Objects/Plant.js";
import TreasureBox from "./Objects/TreasureBox.js";
import Tree from "./Objects/Tree.js";
import Boulder from "./Objects/Boulder.js";

export default class ObjectManager {
    // Runs the object logic
    constructor(objectsData, map) {
        this.map = map;
        this.objectsData = objectsData || [];

        this.objects = {};

        this.init();
    }

    init() {
        // Create objects instances based on objectsData as defined in the map
        this.objectsData.forEach(data => {
            const object = new GameObject(data);
            this.addObject(object);
        });

        this.generateRandomObjects();
    }

    update(tileOffset) {

        this.updateObjectsWithinRange(this.map.getOnScreenTileRange(tileOffset));

    }

    updateObjectsWithinRange(range) {
        const { from, to } = range;
        for (let x = from.x; x < to.x; x++) {
            for (let y = from.y; y < to.y; y++) {
                const position = `${x},${y}`;
                this.objects[position]?.update();   // If object exists at this location update it
                this.objects[position]?.dead && this.removeObjectAtPosition(position);
            }
        }
    }

    generateRandomObjects(num = 40) {
        const types = ['Boulder', 'Plant', 'TreasureBox', 'Tree'];
 

        for (let i = 0; i < num; i++) {
  
            let obj;
            const pos = {
                x: ~~(Math.random() * game.currentMap.tiles.length),
                y: ~~(Math.random() * game.currentMap.tiles[0].length)
            }

            switch (types[~~(Math.random() * types.length)]) {
                case 'Boulder':
                    obj = new Boulder({ position: pos });
                    break;
                case 'Plant':
                    obj = new Plant({ position: pos });
                    break;
                case 'TreasureBox':
                    obj = new TreasureBox({ position: pos });
                    break;
                case 'Tree':
                    obj = new Tree({ position: pos });
                    break;
            }

            this.addObject(obj);

        }
    }


    addObject(object) {
        const pos = `${object.position.x},${object.position.y}`;
        this.objects[pos] = object;
    }

    removeObjectAtPosition(pos) {
        delete this.objects[`${pos.x},${pos.y}`];
    }

    getObjectAt(pos) {
        return this.objects[`${pos.x},${pos.y}`] || null;
    }

    repositionObject(pos, newPos) {
        // Get the object at the position
        const obj = this.objects[`${pos.x},${pos.y}`];
        // Copy it to the new position
        this.objects[`${newPos.x},${newPos.y}`] = obj;
        // Change the object's position parameter;
        obj.position = newPos;
        // Delete from old position
        delete this.objects[`${pos.x},${pos.y}`];
    }


}