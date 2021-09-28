function charWidth(charCode) {
    //TODO: Fix this
    if (charCode < 0xFF) {
        if (((charCode + 1) & 0x7F) >= 0x21) {
            return 1;
        } else if (charCode > 0) {
            return -1;
        } else {
            return 0;
        }
    } else if ((charCode & 0xfffeffff) < 0xfffe) {
        return 0;
    } else if ((charCode & 0xfffe) == 0xfffe) {
        return -1;
    } else if ((charCode - 0x20000) < 0x20000) {
        return 2;
    } else if ((charCode == 0xe0001) || ((charCode - 0xe0020) < 0x5f) || ((charCode - 0xe0100) < 0xef)) {
        return 0;
    } else {
        return 1;
    }
}

function UnicodeAPI() {
    
}

UnicodeAPI.prototype.getName = function() {
    return "unicode";
}

UnicodeAPI.prototype.getMethods = function() {
    let methods = {};

    methods["lower"] = function(l) {
        let lower = l.getStringParameter(1).toLocaleLowerCase();

        return [lower];
    }

    methods["upper"] = function(l) {
        let upper = l.getStringParameter(1).toLocaleUpperCase();

        return [upper];
    }

    methods["char"] = function(l) {
        // TODO: Support multiple parameters
        let char = String.fromCodePoint(l.getIntegerParameter(1));

        return [char];
    }

    methods["len"] = function(l) {
        return [[...l.getStringParameter(1)].length];
    }

    methods["sub"] = function(l) {
        let str = l.getStringParameter(1);

        //console.log(str);

        let start = l.getIntegerParameter(2);
        if (start < 1) {
            start += [...str].length;
        }
        if (start < 1) {
            start = 1;
        }

        let end = [...str].length;
        if (l.getNumParameters() >= 3) {
            end = l.getIntegerParameter(3);
            if (end < start) {
                return [""];
            }
        }

        if (str.endsWith("\n")) {
            //TODO: This should not be needed
            str += "\n";
        }

        return [str.substring(start-1, end)];
    }

    methods["isWide"] = function(l) {
        let char = l.getStringParameter(1).getCharCodeAt(0);
        let isWide = charWidth(char) == 2;

        return [isWide];
    }

    methods["charWidth"] = function(l) {
        let char = l.getStringParameter(1).charCodeAt(0);

        return [charWidth(char)];
    }

    methods["wlen"] = function(l) {
        let str = l.getStringParameter(1);

        let len = 0;
        for (let i = 0; i < [...str].length; i++) {
            let ch = str.charCodeAt(i);
            len += Math.max(1, charWidth(ch));
        }

        return [len];
    }

    methods["wtrunc"] = function(l) {
        let str = l.getStringParameter(1).substring(0, l.getIntegerParameter(2));

        return [str];
    }

    return methods;
}