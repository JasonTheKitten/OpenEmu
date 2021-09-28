function SystemAPI() {
    
}

SystemAPI.prototype.getName = function() {
    return "system";
}

SystemAPI.prototype.getMethods = function() {
    let methods = {};

    methods["allowBytecode"] = function(l) {
        return [true];
    }

    methods["allowGC"] = function(l) {
        return [true];
    }

    methods["timeout"] = function(l) {
        return [5]
    }

    return methods;
}