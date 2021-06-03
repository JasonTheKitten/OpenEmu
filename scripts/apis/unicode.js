function UnicodeAPI() {
    
}

UnicodeAPI.prototype.getName = function() {
    return "unicode";
}

UnicodeAPI.prototype.getMethods = function() {
    let methods = {};

    methods["sub"] = function(l) {
        return [true];
    }

    return methods;
}