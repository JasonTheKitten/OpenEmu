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

    methods["bind"] = function(l) {
        let addr = l.getStringParameter(1);
        self.screen = addr; //TODO
    }

    methods["getScreen"] = function(l) {
        return [self.screen];
    }

    methods["maxResolution"] = function(l) {
        return [80, 25];
    }

    methods["setResolution"] = function(l) {
        return [];
    }

    methods["setBackground"] = function(l) {
        
    }

    methods["setForeground"] = function(l) {
        
    }

    methods["fill"] = function(l) {
        
    }

    methods["copy"] = function(l) {
        
    }

    methods["set"] = function(l) {
        let x = l.getIntegerParameter(1);
        let y = l.getIntegerParameter(2);
        let char = l.getStringParameter(3);

        let screen = computer.getComponentByAddress(self.screen);
        screen.set(x, y, char);
    }

    return methods;
}