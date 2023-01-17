export default class ObjectManager {
    // Runs the object logic
    constructor(objectsData) {
        this.objectsData = objectsData || [];
        this.objects = [];
        this.init();
    }

    init() {
        // Create objects instances based on objectsData
        this.objectsData.forEach(object => {
            object.position.x += 1;
        });
    }

    update() {
        this.objectsData.forEach(object => {
            object.position = this.getRandomStep(object.position);
        });
    }

    // Returns a new position 1 step away in a random direction
    getRandomStep(position) {
        return {
            x: position.x += Math.random() > 0.5 ? 1 : -1,
            y: position.y += Math.random() > 0.5 ? 1 : -1
        }

    }


}