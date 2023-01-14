export default class Map {
    constructor(config) {
        this.tiles = config.map.tiles;
        this.objects = config.map.objects || {};
        this.canvas = config.canvas;
        this.ctx = this.canvas.ctx;
        this.tileSize = config.tileSize;
        this.numberOfTilesOnScreen = config.numberOfTilesOnScreen;
    }

    update() {

    }

    render(tileOffset = { x: 0, y: 0 }) {
        const { canvas, tileSize, numberOfTilesOnScreen, ctx } = this;

        const colorMap = { g: 'green', s: 'brown', w: 'cyan', x: 'white' };

        // Calculate what area of the grid we actually want to render
        const minX = Math.max(0, tileOffset.x);
        const minY = Math.max(0, tileOffset.y);
        const maxY = Math.min(numberOfTilesOnScreen.y + minY, this.tiles[0].length);
        const maxX = Math.min(numberOfTilesOnScreen.x + minX, this.tiles.length);

        // Render

        for (let x = minX; x < maxX; x++) {
            for (let y = minY; y < maxY; y++) {
                const tile = this.tiles[x][y];
                ctx.fillStyle = colorMap[tile];
                ctx.fillRect((x - tileOffset.x) * tileSize, (y - tileOffset.y) * tileSize, tileSize, tileSize);
                ctx.strokeRect((x - tileOffset.x) * tileSize, (y - tileOffset.y) * tileSize, tileSize, tileSize);
            }
        }

    }

    renderObjects(tileOffset = { x: 0, y: 0 }) {
        const { canvas, tileSize, numberOfTilesOnScreen, ctx } = this;

        for (let obj of this.objects) {
            ctx.fillStyle = obj.color;
            ctx.fillRect((obj.position.x - tileOffset.x) * tileSize, (obj.position.y - tileOffset.y) * tileSize, tileSize, tileSize);
        }
    }

}