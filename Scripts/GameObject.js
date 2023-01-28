
export default class GameObject {
    constructor(config) {
        this.position = config.position || { x: 0, y: 0 };
        this.direction = config.direction || { x: 0, y: 1 };   // Down
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

    render(offset) {

    }

    renderShadow(offset) {
        game.canvas.ctx.fillStyle = 'rgba(0, 0, 0, 0.30)';


        game.canvas.ctx.beginPath();

        game.canvas.ctx.ellipse(
            (this.position.x - offset.x + 0.5) * game.tileSize,
            (this.position.y - offset.y + 1) * game.tileSize,
            game.tileSize * 0.4,
            game.tileSize * 0.15,
            0,
            0,
            Math.PI * 2
        )

        game.canvas.ctx.fill();
    }

}