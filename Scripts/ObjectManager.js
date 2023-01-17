import utils from "./utils.js";

export default class ObjectManager {
    // Runs the object logic
    constructor(objectsData, map) {
        this.map = map;
        this.objectsData = objectsData || [];
        this.objects = [];
        this.init();
    }

    init() {
        // Create objects instances based on objectsData
        this.objectsData.forEach(object => {
        });
    }

    update() {
        this.objectsData.forEach(object => {


            // Get random new Position and restrict it to map bounds
            const newPosition = this.getRandomStep(object.position);
            object.position = utils.clampVector(newPosition, { x: 0, y: 0 }, { x: this.map.tiles.length-1, y: this.map.tiles[0].length-1 });




        });
    }

    // Returns a new position 1 step away in a random direction
    getRandomStep(position) {
        return {
            x: position.x + (Math.random() > 0.5 ? 1 : -1),
            y: position.y + (Math.random() > 0.5 ? 1 : -1)
        }

    }


}