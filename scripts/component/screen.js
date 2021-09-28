function Screen(terminal) {
    //TODO: Should the screen create the terminal?
    this.terminal = terminal;
    this.buffer = [];

    this.foreground = [255, 255, 255];
    this.background = [0, 0, 0];

    this.setResolution(160, 50)
}

Screen.prototype.getName = function() {
    return "screen";
}

Screen.prototype.getAddress = function() {
    return "screen1";
}

Screen.prototype.getMethods = function(computer) {
    let methods = {};

    methods["getKeyboards"] = function(l) {
        return [[
            "keyboard1"
        ]];
    }

    methods["setPrecise"] = function(l) {
        
    }

    return methods;
}

Screen.prototype.getMethodInfo = function() {
    return {
        
    };
}


/////
Screen.prototype.set = function(x, y, text) {
    if (y < 0) {
        return;
    }

    let buffer = this.buffer;
    buffer[y] = buffer[y] || [];

    if (typeof text == "object") {
        buffer[y][x] = text;
        this.terminal.setPixel(x, y, text.background, text.foreground, text.char);
        return;
    }

    for (let i = 0; i < text.length; i++) {
        if (x + i < 0) {
            return;
        }

        buffer[y][x+i] = {
            char: text.substring(i, i+1),
            foreground: this.foreground,
            background: this.background
        };
        
        this.terminal.setPixel(x + i, y, this.background, this.foreground, buffer[y][x + i].char);
    }
}

Screen.prototype.get = function(x, y) {
    let buffer = this.buffer;

    if (buffer[y] && buffer[y][x]) {
        return buffer[y][x];
    } else {
        return {
            char: ' ',
            foreground: [255, 255, 255],
            background: [0, 0, 0]
        };
    }
}

Screen.prototype.setForeground = function(fg) {
    this.foreground = fg;
}

Screen.prototype.setBackground = function(bg) {
    this.background = bg;
}

Screen.prototype.getForeground = function() {
    return this.foreground;
}

Screen.prototype.getBackground = function() {
    return this.background;
}

Screen.prototype.setResolution = function(cols, rows) {
    if (cols < 10 || cols > 160 || rows < 8 || rows > 50) {
        return;
    }

    this.resolution = [cols, rows];
    this.terminal.setSize(cols, rows);

    //TODO: Draw buffer
}

Screen.prototype.getResolution = function() {
    return this.resolution;
}