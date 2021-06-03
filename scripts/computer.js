let OCComputer = (function() {
    let computers = [];

    function OCComputer() {
        this.Arch = Lua53arch;
        this.components = [];
    }

    OCComputer.prototype.on = function() {
        this.off();
        
        this.arch = new this.Arch(this);
        this.arch.init();
        this.arch.tick();

        computers[computers.length] = this;
    }

    OCComputer.prototype.off = function() {
        if (this.arch !== undefined) {
            this.arch.exit();
            this.arch = null;
        }
    }

    OCComputer.prototype.tick = function() {
        if (this.arch !== undefined) {
            this.arch.tick();
        }
    }

    OCComputer.prototype.registerComponent = function(component) {
        this.components[this.components.length] = component;
    }

    OCComputer.prototype.getComponents = function() {
        return this.components;
    }
    OCComputer.prototype.getComponentByAddress = function(address) {
        for(index in this.components) {
            let component = this.components[index];
            if (address === component.getAddress()) {
                return component;
            }
        };
    }

    function frame() {
        for (i=0; i<computers.length; i++) {
            computers[i].tick();
        }
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);

    return OCComputer;
})();