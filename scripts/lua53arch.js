let Lua53arch = (function() {
    function Lua53arch(computer) {
        this.computer = computer;
        this.signalQueue = [];
        this.registered = [];
        this.resumed = false;
    }

    Lua53arch.prototype.init = function() {
        this.register(new ComputerAPI());
        this.register(new ComponentAPI());
        this.register(new SystemAPI());
        this.register(new UnicodeAPI());

        this.lua = new Lua53();
        let keys = Object.keys(this.registered);

        for (key in keys) {
            this.lua.setGlobal(
                keys[key],
                luaHelper.toLuaValue(this.lua, this.registered[keys[key]].getMethods(this.computer, this)));
        }

        this.coroutine = this.lua.createCoroutine("=machine.lua", code.machine);
    }

    let i = 0;
    Lua53arch.prototype.tick = function() {
        //TODO: Better resemble the actual Scala code for OC
        if (this.lua == undefined || this.coroutine == undefined) {
            return;
        }

        let signal = [];
        if (this.signalQueue.length > 0) {
            signal = this.signalQueue[this.signalQueue.length-1];
            this.signalQueue.length--;
        }
        
        this.resumed = true;
        let result = this.coroutine.resume(signal);
        this.resumed = false;

        if (!result[0]) {
            console.log("ERROR: "+result[1]);
            this.exit();
        } else {
            //TODO: Check # of results
            if (result[1].isFunction(1)) {
                this.signalQueue[this.signalQueue.length] = [1, result[1].invoke(1)];
            } else if (result[1].isBoolean(1)) {
                let reboot = result[1].getBoolean(1);
                this.computer.off()
                if (reboot) {
                    this.computer.on()
                }
            }
        }
    }

    Lua53arch.prototype.queueSignal = function(signal) {
        this.signalQueue.splice(0, 0, [0, signal]);
    }

    Lua53arch.prototype.exit = function() {
        this.lua.quit();
        this.lua = undefined;
        this.coroutine = undefined;
    }

    Lua53arch.prototype.register = function(value) {
        this.registered[value.getName()] = value;
    }

    return Lua53arch;
})();