import GameObject from "./GameObject.js";
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
        // Create objects instances based on objectsData as defined in the map
        this.objectsData.forEach(data => {
            const object = new GameObject(data);
            this.addObject(object);
        });
    }

    update() {
        this.objects.forEach(object => {
            object.update();
        });
        
        this.removeDeadObjects();
    }

    addObject(object) {
        this.objects.push(object);
    }

    removeObject(object) {
        this.objects = this.objects.filter(obj => object !== obj);
    }

    removeDeadObjects() {
        this.objects = this.objects.filter(obj => !obj.dead);
    }



}