import Character from "./Character.js";
import Game from "./Game.js";

export default class Map {
    constructor(config) {
        this.canvas = config.canvas;
        this.ctx = this.canvas.ctx;
        this.tileSize = config.tileSize;

        this.tiles = config.mapData.tiles;
        this.objects = config.mapData.objects || {};
        this.numberOfTilesOnScreen = config.numberOfTilesOnScreen;

        this.player = new Character(config.mapData.player);
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
                // ctx.strokeRect((x - tileOffset.x) * tileSize, (y - tileOffset.y) * tileSize, tileSize, tileSize);
            }
        }

    }

    renderObjects(tileOffset = { x: 0, y: 0 }) {
        const { tileSize, ctx } = this;
        ctx.save();
        // for (let obj of this.objects) {
        for (let obj of window.game.objectManager.objects) {
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 4;
            ctx.fillStyle = obj.color;
            ctx.fillRect((obj.position.x - tileOffset.x) * tileSize, (obj.position.y - tileOffset.y) * tileSize, tileSize, tileSize);
            ctx.strokeRect((obj.position.x - tileOffset.x) * tileSize, (obj.position.y - tileOffset.y) * tileSize, tileSize, tileSize);
        }
        ctx.restore();

    }

    renderPlayer(tileOffset = { x: 0, y: 0 }) {
        const { player, tileSize, ctx } = this;
        const eyeSize = 10;

        // 
        // Temp - draw player. Replace this with a sprite

        // Head
        ctx.save();

        ctx.shadowColor = "black";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 6;
        ctx.shadowOffsetY = 6;

        ctx.fillStyle = 'yellow';
        ctx.fillRect((player.position.x - tileOffset.x) * tileSize, (player.position.y - tileOffset.y) * tileSize, tileSize, tileSize);

        ctx.restore();

        // Eyes
        ctx.fillStyle = 'blue';
        ctx.fillRect((player.position.x - tileOffset.x) * tileSize, (player.position.y - tileOffset.y) * tileSize, eyeSize, eyeSize);
        ctx.fillRect((player.position.x - tileOffset.x) * tileSize - eyeSize + tileSize, (player.position.y - tileOffset.y) * tileSize, eyeSize, eyeSize);

    }

    renderSelector(tileOffset = { x: 0, y: 0 }) {
        const { player, tileSize, ctx } = this;

        ctx.save();

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'lime';
        ctx.setLineDash([5]);
        ctx.shadowColor = "black";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 6;
        ctx.shadowOffsetY = 6;
        const selectorPos = player.selector;
        ctx.strokeRect((selectorPos.x - tileOffset.x) * tileSize, (selectorPos.y - tileOffset.y) * tileSize, tileSize, tileSize);

        ctx.restore();

    }

}