function EEPROM() {

}

EEPROM.prototype.getName = function() {
    return "eeprom";
}

EEPROM.prototype.getAddress = function() {
    return "eeprom1";
}

EEPROM.prototype.getMethods = function(computer) {
    let methods = {}

    methods["get"] = function(l) {
        return [code.bios];
    }

    methods["getData"] = function(l) {
        return ["disk1"];
    }

    methods["setData"] = function(l) {
        
    }

    return methods;
}

EEPROM.prototype.getMethodInfo = function() {
    return {
        
    };
}