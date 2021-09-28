function toColor(color) {
    let b = color % 256;
    color = Math.floor(color/256);

    let g = color % 256;
    color = Math.floor(color/256);

    let r = color % 256;

    return [r, g, b];
}

function fromColor(color) {
    return (color[0]*256+color[1])*256+color[2];
}

function GPU() {
    
}

GPU.prototype.getName = function() {
    return "gpu";
}

GPU.prototype.getAddress = function() {
    return "gpu1";
}

GPU.prototype.getMethods = function(computer) {
    let methods = {}

    let self = this;

    methods["bitblt"] = function(l) {
        console.log("Invoke");
    }

    methods["bind"] = function(l) {
        let addr = l.getStringParameter(1);
        self.screen = addr; //TODO: make sure this is a screen
    }

    methods["getScreen"] = function(l) {
        return [self.screen];
    }

    methods["getBackground"] = function(l) {
        return [0];
    }

    methods["setBackground"] = function(l) {
        //TODO: Check if screen bound

        let color = l.getIntegerParameter(1);

        let screen = computer.getComponentByAddress(self.screen);
        let oldColor = fromColor(screen.getBackground());
        screen.setBackground(toColor(color));

        return [oldColor];
    }

    methods["getForeground"] = function(l) {
        return [0];
    }

    methods["setForeground"] = function(l) {
        let color = l.getIntegerParameter(1);

        let screen = computer.getComponentByAddress(self.screen);
        let oldColor = fromColor(screen.getForeground());
        screen.setForeground(toColor(color));

        return [oldColor];
    }

    methods["getPalleteColor"] = function(l) {
        return [0];
    }

    methods["setPalleteColor"] = function(l) {
        
    }

    methods["getDepth"] = function(l) {
        return [8];
    }

    methods["setDepth"] = function(l) {
        
    }

    methods["maxDepth"] = function(l) {
        
    }

    methods["getResolution"] = function(l) {
        let screen = computer.getComponentByAddress(self.screen);
        return screen.getResolution();
    }

    methods["setResolution"] = function(l) {
        let width = l.getIntegerParameter(1);
        let height = l.getIntegerParameter(2);

        let screen = computer.getComponentByAddress(self.screen);
        screen.setResolution(width, height);
    }

    methods["maxResolution"] = function(l) {
        return [160, 50];
    }

    methods["getViewport"] = function(l) {
        return [160, 50];
    }

    methods["setViewport"] = function(l) {
        console.log("Viewport set")
    }

    methods["get"] = function(l) {
        let x = l.getIntegerParameter(1);
        let y = l.getIntegerParameter(2);

        let screen = computer.getComponentByAddress(self.screen);
        return [
            screen.get(x, y).char,
            fromColor(screen.get(x, y).foreground),
            fromColor(screen.get(x, y).background)
        ];
    }

    methods["set"] = function(l) {
        let x = l.getIntegerParameter(1);
        let y = l.getIntegerParameter(2);
        let char = l.getStringParameter(3);

        let screen = computer.getComponentByAddress(self.screen);
        screen.set(x, y, char);
    }

    methods["copy"] = function(l) {
        let sx = l.getIntegerParameter(1);
        let sy = l.getIntegerParameter(2);
        let w = l.getIntegerParameter(3);
        let h = l.getIntegerParameter(4);
        let x = l.getIntegerParameter(5) + sx;
        let y = l.getIntegerParameter(6) + sy;

        let buffer = [];

        let screen = computer.getComponentByAddress(self.screen);
        for(let cy = 0; cy < h; cy++) {
            for (let cx = 0; cx < w; cx++) {
                buffer[cy] = buffer[cy] || {};
                buffer[cy][cx] = screen.get(sx + cx, sy + cy);
            }
        }
        for(let cy = 0; cy < h; cy++) {
            for (let cx = 0; cx < w; cx++) {
                screen.set(x + cx, y + cy, buffer[cy][cx]);
            }
        }
    }

    methods["fill"] = function(l) {
        let x = l.getIntegerParameter(1);
        let y = l.getIntegerParameter(2);
        let w = l.getIntegerParameter(3);
        let h = l.getIntegerParameter(4);
        let char = l.getStringParameter(5);

        let screen = computer.getComponentByAddress(self.screen);
        for(let cy = y; cy < y + h; cy++) {
            for (let cx = x; cx < x + w; cx++) {
                screen.set(cx, cy, char);
            }
        }

        return [];
    }

    return methods;
}

GPU.prototype.getMethodInfo = function() {
    return {
        ["getScreen"]: {
            direct: true,
            doc: "function():string -- Get the address of the screen the GPU is currently bound to."
        },
        ["getBackground"]: {
            direct: true,
            doc: "function():number, boolean -- Get the current background color and whether it's from the palette or not."
        },
        ["setBackground"]: {
            direct: true,
            doc: "function(value:number[, palette:boolean]):number, number or nil -- Sets the background color to the specified value. Optionally takes an explicit palette index. Returns the old value and if it was from the palette its palette index."
        },
        ["getForeground"]: {
            direct: true,
            limit: 128, //TODO: Per tier
            doc: "function():number, boolean -- Get the current foreground color and whether it's from the palette or not."
        },
        ["setForeground"]: {
            direct: true,
            limit: 128, //TODO: Per tier
            doc: "function(value:number[, palette:boolean]):number, number or nil -- Sets the foreground color to the specified value. Optionally takes an explicit palette index. Returns the old value and if it was from the palette its palette index."
        },

        ["get"]: {
            direct: true,
            doc: "function(x:number, y:number):string, number, number, number or nil, number or nil -- Get the value displayed on the screen at the specified index, as well as the foreground and background color. If the foreground or background is from the palette, returns the palette indices as fourth and fifth results, else nil, respectively."
        },
        ["set"]: {
            direct: true,
            limit: 256, //TODO: Per tier
            doc: "function(x:number, y:number, value:string[, vertical:boolean]):boolean -- Plots a string value to the screen at the specified position. Optionally writes the string vertically."
        },

        ["copy"]: {
            direct: true,
            limit: 64,
            doc: "function(x:number, y:number, width:number, height:number, tx:number, ty:number):boolean -- Copies a portion of the screen from the specified location with the specified size by the specified translation."
        },
        ["fill"]: {
            direct: true,
            limit: 128,
            doc: "function(x:number, y:number, width:number, height:number, char:string):boolean -- Fills a portion of the screen at the specified position with the specified size with the specified character."
        }
    };
}