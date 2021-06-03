function Screen(terminal) {
    //TODO: Should the screen create the terminal?
    this.terminal = terminal;
    this.buffer = [];
}

Screen.prototype.getName = function() {
    return "screen";
}

Screen.prototype.getAddress = function() {
    return "screen1";
}

Screen.prototype.getMethods = function(computer) {
    let methods = {}

    return methods;
}


/////
Screen.prototype.set = function(x, y, text) {
    let buffer = this.buffer;

    buffer[y] = buffer[y]||[];
    for (let i=0; i<text.length; i++) {
        buffer[y][x+i] = {char: text.substring(i, i+1)}
    }
    //TODO
    for (y2 in buffer) {
        for (x2 in buffer[y2]) {
            this.terminal.setPixel(x2, y2, 0, 0, buffer[y2][x2].char);
        }
    }
}