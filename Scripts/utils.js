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
    
    getTileAtDirection() {
        
    }
}

export default utils;