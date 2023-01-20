export default class SoundManager {
    constructor(config) {
        this.sounds = {
            step1: new Audio('../Sounds/bassy_step_1.wav'),
            step2: new Audio('../Sounds/bassy_step_2.wav'),
            step3: new Audio('../Sounds/bassy_step_3.wav'),
        };
    }


    play(id) {
        this.sounds[id] = new Audio(this.sounds[id].src);
        this.sounds[id].play();
        console.log('playing', id)
    }

    playOneOfSounds(arrayOfSounds) {
        const randomId = ~~(Math.random() * arrayOfSounds.length);
        this.play(arrayOfSounds[randomId]);
    }
}