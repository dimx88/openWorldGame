export default class SoundManager {
    constructor(config) {
        this.sounds = {
            step2: new Audio('../Sounds/bassy_step_2.wav'),
            step3: new Audio('../Sounds/bassy_step_3.wav'),
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