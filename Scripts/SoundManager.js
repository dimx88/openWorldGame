export default class SoundManager {
    constructor(config) {
        this.sounds = {
            // step1: new Audio('../Sounds/bassy_step_2.wav'),
            // step2: new Audio('../Sounds/bassy_step_3.wav'),
            step1: new Audio('../Sounds/step_1.wav'),
            step2: new Audio('../Sounds/step_2.wav'),
            box_open: new Audio('../Sounds/box_open.wav'),
            hit_tree: new Audio('../Sounds/hit_tree.wav'),
            pickup_item: new Audio('../Sounds/pickup_item.wav'),
        };
    }


    play(id) {
        // this.sounds[id] = new Audio(this.sounds[id].src);

        this.sounds[id].pause();
        this.sounds[id].currentTime = 0;
        this.sounds[id].play();
    }

    playOneOfSounds(arrayOfSounds) {
        const randomId = ~~(Math.random() * arrayOfSounds.length);
        this.play(arrayOfSounds[randomId]);
    }
}