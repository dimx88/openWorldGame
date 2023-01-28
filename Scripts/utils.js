const utils = {

    delay(ms) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, ms)
        });
    },

    clamp(n, min, max) {
        return Math.min(Math.max(n, min), max);
    },

    clampVector(vec, vecMin, vecMax) {
        return {
            x: Math.min(Math.max(vec.x, vecMin.x), vecMax.x),
            y: Math.min(Math.max(vec.y, vecMin.y), vecMax.y)
        };
    },

    getRandomStep(position) {
        return {
            x: position.x + (Math.random() > 0.5 ? 1 : -1),
            y: position.y + (Math.random() > 0.5 ? 1 : -1)
        }
    },

    getNextTileAtDirection(position, direction) {
        const d = {
            x: Number(direction === 'right') - Number(direction === 'left'),
            y: Number(direction === 'down') - Number(direction === 'up'),
        };
        return { x: position.x + d.x, y: position.y + d.y };
    },

    addVectors(vec1, vec2) {
        return { x: vec1.x + vec2.x, y: vec1.y + vec2.y };
    },

    direction: {
        LEFT: { x: -1, y: 0 },
        RIGHT: { x: 1, y: 0 },
        UP: { x: 0, y: -1 },
        DOWN: { x: 0, y: 1 },
    }
}

export default utils;