function Computer() {

}

Computer.prototype.getName = function() {
    return "computer";
}

Computer.prototype.getAddress = function() {
    return "computer1";
}

Computer.prototype.getMethods = function(computer) {
    let methods = {}

    methods["beep"] = function(l) {
        let freq = 500;
        let dur = .2;
        if (l.isIntegerParameter(1)) {
            freq = l.getIntegerParameter(1);
            if (l.isNumberParameter(2)) {
                dur = l.getNumberParameter(2);
            }
        }

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        osc.type = "square";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime+dur);
    }

    return methods;
}