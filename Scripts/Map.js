class Map {
    constructor(mapData) {
        this.tiles = mapData.tiles;
        this.objects = mapData.objects || {};
    }
}