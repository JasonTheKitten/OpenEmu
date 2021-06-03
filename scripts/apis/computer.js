function ComputerAPI() {
    this.date = new Date();
}

ComputerAPI.prototype.getName = function() {
    return "computer";
}

ComputerAPI.prototype.getMethods = function() {
    let methods = {};

    let self = this;

    methods["realTime"] = function() {
        return [Date.now()/1000];
    }

    methods["uptime"] = function() {
        return [self.date.getMilliseconds()/1000];
    }

    methods["address"] = function() {
        return ["computer1"];
    }

    methods["getBootAddress"] = function() {
        return ["disk1"]
    }

    methods["pushSignal"] = function(l) {
        //TODO
    }
    
    methods["tmpAddress"] = function(l) {
        return ["disk1"];
    }

    methods["freeMemory"] = function(l) {
        return [50000];
    }

    return methods;
}