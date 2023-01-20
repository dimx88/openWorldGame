export default class GameObject {
    constructor(config) {
        this.position = config.position || {x:0, y:0};
        this.direction = config.direction || 'down';
        this.sprite = config.sprite || null;
        this.color = config.color || '#ffffff';
        this.onUpdate = null;
    }

    setBehavior(behavior) {
        this.onUpdate = behavior;
    }

    update() {
        this.onUpdate?.();
    }

    render() {
        
    }
}