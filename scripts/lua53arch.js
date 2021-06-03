let Lua53arch = (function() {
    function Lua53arch(computer) {
        this.computer = computer;
    }

    Lua53arch.prototype.init = function() {
        this.lua = new Lua53();
        this.coroutine = this.lua.createCoroutine("=machine.lua", code.machine);
        let keys = Object.keys(Lua53arch.registered);

        for (key in keys) {
            this.lua.setGlobal(
                keys[key],
                luaHelper.toLuaValue(this.lua, Lua53arch.registered[keys[key]].getMethods(this.computer)));
        }
    }

    Lua53arch.prototype.tick = function() {
        //TODO: Better resemble the actual Scala code for OC
        if (this.lua==undefined || this.coroutine==undefined) return;
        if (this.argsn == 0) {
            this.argsn = ["init"];
        }
        let result = this.coroutine.resume(this.argsn);
        this.argsn = 0;
        if (!result[0]) {
            console.log(result[1]);
            this.exit();
        } else {
            //TODO: Check # of results
            if (result[1].isFunction(1)) {
                this.argsn = result[1].invoke(1);
            }
        }
    }

    Lua53arch.prototype.exit = function() {
        this.lua.quit();
        this.lua = undefined;
        this.coroutine = undefined;
    }

    Lua53arch.registered = {};
    Lua53arch.register = function(value) {
        Lua53arch.registered[value.getName()] = value;
    }

    Lua53arch.register(new ComputerAPI());
    Lua53arch.register(new ComponentAPI());
    Lua53arch.register(new SystemAPI());
    Lua53arch.register(new UnicodeAPI());

    return Lua53arch;
})();