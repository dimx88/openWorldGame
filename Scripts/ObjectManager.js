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
        const {from, to} = range;
        for (let x = from.x; x < to.x; x++) {
            for (let y = from.y; y < to.y; y++) {
                this.objects[`${x},${y}`]?.update();   // If object exists at this location update it
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




}