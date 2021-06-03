function SystemAPI() {
    
}

SystemAPI.prototype.getName = function() {
    return "system";
}

SystemAPI.prototype.getMethods = function() {
    let methods = {};

    methods["timeout"] = function(l) {
        return [3]
    }

    methods["allowBytecode"] = function(l) {
        return [true];
    }

    return methods;
}