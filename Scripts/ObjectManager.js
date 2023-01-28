import GameObject from "./GameObject.js";
import utils from "./utils.js";

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