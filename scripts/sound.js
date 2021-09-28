let soundLib = (function() {
    let soundLib = {};

    let soundInfo = null;
    loader.queue(fetch("./resources/sound/sound.json").then(r=>r.json()).then(r=>soundInfo = r));

    let cache = {};
    let currentTrack = null;

    soundLib.play = function(name) {
        if (currentTrack && !currentTrack.ended) {
            return;
        }

        let sounds = soundInfo[name];
        let selection = Math.floor(Math.random()*sounds.length);
        if (!cache[sounds[selection]]) {
            cache[sounds[selection]] = new Audio("./resources/sound/"+sounds[selection]);
        }

        currentTrack = cache[sounds[selection]];
        currentTrack.play();
    }

    return soundLib;
})();