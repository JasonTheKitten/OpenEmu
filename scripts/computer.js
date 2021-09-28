let OCComputer = (function() {
    let computers = [];

    function OCComputer() {
        this.Arch = Lua53arch;
        this.components = [];
        this.componentsByAddress = [];
        this.callBudget = 1;
        this.lastCallReset = Date.now();
    }

    OCComputer.prototype.on = function() {
        this.off();
        
        this.arch = new this.Arch(this);
        this.arch.init();
        this.arch.tick();

        computers[computers.length] = this;
    }

    OCComputer.prototype.off = function() {
        if (this.arch) {
            this.arch.exit();
            this.arch = null;
        }
    }

    OCComputer.prototype.tick = function() {
        if (this.arch) {
            this.resetCallBudget();
            this.arch.tick();
        }
    }

    OCComputer.prototype.registerComponent = function(component) {
        this.components[this.components.length] = component;
        this.componentsByAddress[component.getAddress()] = component;
    }

    OCComputer.prototype.getComponents = function() {
        return this.components;
    }
    OCComputer.prototype.getComponentByAddress = function(address) {
        return this.componentsByAddress[address];
    }

    OCComputer.prototype.reduceCallBudget = function(amount) {
        if (this.callBudget < amount) {
            this.callBudget = 0; //Because
            return false;
        }
        
        this.callBudget -= amount;
        return true;
    }

    OCComputer.prototype.resetCallBudget = function() {
        if (Date.now() - this.lastCallReset >= 1000) {
            this.callBudget = 1;
        }
    }

    OCComputer.prototype.isResumed = function() {
        return this.arch.resumed;
    }

    OCComputer.prototype.queueSignal = function(s) {
        if (this.arch) {
            return this.arch.queueSignal(s);
        }
    }

    function frame() {
        for (let i = 0; i < computers.length; i++) {
            computers[i].tick();
        }
        //requestAnimationFrame(frame);
    }

    //requestAnimationFrame(frame);

    // OC's default freeze time is 12.
    // We go by the tick instead, because I'm too dumb to get the call budgets slow enough
    setInterval(frame, /*12*/ 50);

    return OCComputer;
})();