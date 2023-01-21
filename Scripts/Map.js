import Player from "./Player.js";

export default class Map {
    constructor(config) {
        this.canvas = config.canvas;
        this.ctx = this.canvas.ctx;
        this.tileSize = config.tileSize;

        this.tiles = config.mapData.tiles;
        this.objects = config.mapData.objects || {};
        this.numberOfTilesOnScreen = config.numberOfTilesOnScreen;

        this.player = new Player(config.mapData.player);
    }

    getDimensions() {
        return { x: this.tiles.length, y: this.tiles[0].length };
    }

    update() {

    }

    render(tileOffset) {
        this.renderTiles(tileOffset);
        this.renderObjects(tileOffset);
        this.renderPlayer(tileOffset);
        this.renderSelector(tileOffset);
    }

    renderTiles(tileOffset = { x: 0, y: 0 }) {
        const { canvas, tileSize, numberOfTilesOnScreen, ctx } = this;

        const colorMap = { g: 'green', s: 'brown', w: 'cyan', x: 'white' };
        const spriteMap = { g: images.grass, s: images.soil, w: images.water };

        // Calculate what area of the grid we actually want to render
        const minX = Math.max(0, tileOffset.x);
        const minY = Math.max(0, tileOffset.y);
        const maxY = Math.min(numberOfTilesOnScreen.y + minY, this.tiles[0].length);
        const maxX = Math.min(numberOfTilesOnScreen.x + minX, this.tiles.length);

        // Render
        for (let x = minX; x < maxX; x++) {
            for (let y = minY; y < maxY; y++) {
                const tile = this.tiles[x][y];
                // ctx.drawImage(spriteMap[tile], (x - tileOffset.x) * tileSize, (y - tileOffset.y) * tileSize);

                // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
                ctx.drawImage(
                    spriteMap[tile],
                    Math.random() > 0.5 ? 0 : tileSize,  
                    0,
                    tileSize,
                    tileSize,
                    (x - tileOffset.x) * tileSize,
                    (y - tileOffset.y) * tileSize,
                    tileSize,
                    tileSize
                );

                // ctx.fillStyle = colorMap[tile];
                // ctx.fillRect((x - tileOffset.x) * tileSize, (y - tileOffset.y) * tileSize, tileSize, tileSize);

            }
        }

    }

    renderObjects(tileOffset = { x: 0, y: 0 }) {
        const { tileSize, ctx } = this;

        // for (let obj of this.objects) {
        for (let obj of window.game.objectManager.objects) {
            obj.render(tileOffset);
        }

    }

    renderPlayer(tileOffset = { x: 0, y: 0 }) {
        const { player, tileSize, ctx } = this;
        const eyeSize = 10;

        ctx.save();

        ctx.shadowColor = 'rgba(236, 255, 91, 0.50)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 8;

        ctx.drawImage(images.player, (player.position.x - tileOffset.x) * tileSize, (player.position.y - tileOffset.y) * tileSize);

        ctx.restore();
    }

    renderSelector(tileOffset = { x: 0, y: 0 }) {
        const { player, tileSize, ctx } = this;

        ctx.save();

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'lime';
        ctx.setLineDash([5]);
        ctx.shadowColor = "black";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;
        const selectorPos = player.selector;
        ctx.strokeRect((selectorPos.x - tileOffset.x) * tileSize, (selectorPos.y - tileOffset.y) * tileSize, tileSize, tileSize);

        ctx.restore();

    }

}