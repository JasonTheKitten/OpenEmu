let ComponentAPI = (function() {
    function getDevice(computer, addr) {
        let rawComponents = computer.getComponents();
        for (rawComponentInd in rawComponents) {
            let rawComponent = rawComponents[rawComponentInd];
            if (rawComponent.getAddress() === addr) {
                return rawComponent;
            }
        }

        throw "no such component";
    }

    function ComponentAPI() {
        this.date = new Date();
    }

    ComponentAPI.prototype.getName = function() {
        return "component";
    }

    ComponentAPI.prototype.getMethods = function(computer) {
        let methods = {};

        methods["list"] = function(l) {
            let components = {};
            let filter = "", strict = false;

            if (l.isStringParameter(1)) {
                filter = l.getStringParameter(1);

                if (l.isBooleanParameter(2)) {
                    strict = l.getBooleanParameter(i);
                }
            }

            let rawComponents = computer.getComponents();
            for (let i=0; i<rawComponents.length; i++) {
                let rawComponent = rawComponents[i];
                let name = rawComponent.getName();
                if (!strict&&name.includes(filter) || name===filter || filter=="") {
                    components[rawComponent.getAddress()] = name;
                }
            }

            return [components];
        }

        // TODO: Stuff in between

        methods["methods"] = function(l) {
            let addr = l.getStringParameter(1);
            let device = getDevice(computer, addr);

            let m = {};

            for (method in device.getMethods(computer)) {
                m[method] = {
                    direct: false,
                    getter: false,
                    setter: false
                }
            }

            return [m];
        }

        methods["invoke"] = function(l) {
            let addr = l.getStringParameter(1);
            let method = l.getStringParameter(2);
            let args = l.chop(3);

            //console.log(method)

            let device = getDevice(computer, addr);
            let methodF = device.getMethods(computer)[method];
            if (methodF == undefined) {
                throw "no such method";
            }

            return [true].concat(methodF(args)||[]);
        }

        methods["type"] = function(l) {
            let addr = l.getStringParameter(1);
            let device = getDevice(computer, addr);
            let type = device.getName();

            return [type];
        }

        methods["slot"] = function(l) {
            //TODO
            return [-1, 1];
        }

        return methods;
    }

    return ComponentAPI;
})();