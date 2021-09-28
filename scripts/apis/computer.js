function ComputerAPI() {
    this.date = Date.now();
}

ComputerAPI.prototype.getName = function() {
    return "computer";
}

ComputerAPI.prototype.getMethods = function(computer, arch) {
    let methods = {};

    let self = this;

    methods["getArchitecture"] = function(l) {
        return ["Lua 5.3"]
    }

    methods["setArchitecture"] = function(l) {
        //TODO
    }

    methods["realTime"] = function() {
        return [Date.now()/1000];
    }

    methods["uptime"] = function(l) {
        return [Math.round((Date.now()-self.date)/1000)];
    }

    methods["energy"] = function(l) {
        return [Infinity];
    }

    methods["maxEnergy"] = function(l) {
        return [Infinity];
    }

    methods["address"] = function(l) {
        return ["computer1"];
    }

    methods["freeMemory"] = function(l) {
        return [0];
    }

    methods["totalMemory"] = function(l) {
        return [0];
    }

    methods["pushSignal"] = function(l) {
        arch.queueSignal(luaHelper.argumentsToJSObjects(l, l.getNumParameters(), 0));
    }
    
    methods["tmpAddress"] = function(l) {
        return ["disk2"];
    }

    methods["debug"] = function(l) {
        console.log(l.getStringParameter(1));
    }

    return methods;
}