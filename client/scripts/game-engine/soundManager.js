const soundsList = {};

export const SoundManager = {
    play(name){
        soundsList[name].element.play();
    },
    load({name, src}){
        return new Promise((resolve, reject) => {
            const audio = new Audio(src);
            audio.oncanplaythrough = () => {
                soundsList[name] = {
                    name,
                    src,
                    element: audio
                }
                resolve(soundsList[name]);
            }
        })
    },
    loadAll(sounds){
        return Promise.all(
            sounds.map(sound => SoundManager.load(sound))
        )
    }
}