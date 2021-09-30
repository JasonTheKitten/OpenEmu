let Lua53 = (function() {
    let n = "number";
    let s = "string";
    let a = "array";

    let lua53_m = null;
    loader.queue(Lua53_m().then(l=>lua53_m=l));

    let CoroutineResult = function(thread, bottom) {
        this.thread = thread;
        this.bottom = bottom;
    }

    CoroutineResult.prototype.isFunction = function(i) {
        return lua53_m.ccall("lua_type", n, [n, n], [this.thread, this.bottom+i]) === 6;
    }

    CoroutineResult.prototype.invoke = function() {
        // TODO: Find a better way to represent functions
        lua53_m.ccall("lua_callk", null, [n, n, n, n, n], [this.thread, 0, -1, 0, 0]) == 0;
        let diff = lua53_m.ccall("lua_gettop", n, [n], [this.thread]) - this.bottom;
        return diff;
    }

    CoroutineResult.prototype.isBoolean = function(i) {
        return lua53_m.ccall("lua_type", n, [n, n], [this.thread, this.bottom+i]) === 1;
    }

    CoroutineResult.prototype.getBoolean = function(i) {
        return lua53_m.ccall("lua_toboolean", n, [n, n], [this.thread, this.bottom+i]) === 1;
    }

    let Coroutine = function(thread) {
        this.thread = thread;
    }
    
    Coroutine.prototype.resume = function(args) {
        let argsn = 0;
        if (args[0] == 0) {
            lua53_m.ccall("lua_settop", n, [n], [0])
            for (i = 0; i < args[1].length; i++) {
                luaHelper.toLuaValue(new Lua53(this.thread), args[1][i]).push();
            }
            argsn = args[1].length;
        } else if (args[0] == 1) {
            argsn = args[1];
        }

        let status = lua53_m.ccall("lua_resume", n, [n, n, n], [this.thread, 0, argsn]);
        if (status !== 0 && status !== 1) {
            return [false, lua53_m.ccall("lua_tolstring", s, [n, n], [this.thread, -1])];
        }

        return [true, new CoroutineResult(this.thread, 0)];
    }

    Coroutine.prototype.getRawLua = function() {
        return new Lua53(this.thread);
    }

    function Number(lua, n) {
        this.lua = lua;
        this.number = n;
    }

    Number.prototype.push = function() {
        lua53_m.ccall("lua_pushnumber", null, [n, n], [this.lua, this.number]);
    }

    function String(lua, s) {
        this.lua = lua;
        this.string = s;
    }

    String.prototype.push = function() {
        let len = new TextEncoder().encode(this.string).length;
        lua53_m.ccall("lua_pushlstring", null, [n, s, n], [this.lua, this.string, len]);
    }

    function UTF8String(lua, s) {
        this.lua = lua;
        this.string = s;
    }

    UTF8String.prototype.push = function() {
        lua53_m.ccall("lua_pushlstring", null, [n, a, n], [this.lua, this.string, this.string.length]);
    }

    function Table(lua) {
        this.lua = lua;
        this.values = {};
    }

    Table.prototype.push = function() {
        let keys = Object.keys(this.values);
        lua53_m.ccall("lua_createtable", null, [n, n, n], [this.lua, 0, keys.length]);

        for (key in keys) {
            let name = keys[key];
            this.values[name].push();
            lua53_m.ccall("lua_setfield", null, [n, n, s], [this.lua, -2, name]);
        }
    }

    Table.prototype.setField = function(name, value) {
        this.values[name] = value;
    }

    function OrderedTable(lua) {
        this.lua = lua;
        this.values = [];
        this.i = 0;
    }

    OrderedTable.prototype.push = function() {
        lua53_m.ccall("lua_createtable", null, [n, n, n], [this.lua, this.i, 0]);
        
        for (let i=0; i<this.i; i++) {
            this.values[i].push();
            lua53_m.ccall("lua_seti", null, [n, n, n], [this.lua, -2, i+1]);
        }
    }

    OrderedTable.prototype.addField = function(value) {
        this.values[this.i++] = value;
    }

    function Boolean(lua, b) {
        this.lua = lua;
        this.boolean = b?1:0;
    }

    Boolean.prototype.push = function() {
        lua53_m.ccall("lua_pushboolean", null, [n, n], [this.lua, this.boolean]);
    }

    function Nil(lua) {
        this.lua = lua;
    }

    Nil.prototype.push = function() {
        lua53_m.ccall("lua_pushnil", null, [n], [this.lua]);
    }

    function FunctionArgs(lua, chop) {
        this.lua = lua;
        this._chop = chop || 0;
    }

    FunctionArgs.prototype.getStringParameter = function(i) {
        return lua53_m.ccall("luaL_checklstring", s, [n, n], [this.lua, this._chop+i]);
    }

    FunctionArgs.prototype.isStringParameter = function(i) {
        return lua53_m.ccall("lua_type", n, [n, n], [this.lua, this._chop+i]) === 4;
    }

    FunctionArgs.prototype.getBooleanParameter = function(i) {
        return lua53_m.ccall("lua_toboolean", n, [n, n], [this.lua, this._chop+i]) === 1;
    }

    FunctionArgs.prototype.isBooleanParameter = function(i) {
        return lua53_m.ccall("lua_type", n, [n, n], [this.lua, this._chop+i]) === 1;
    }

    FunctionArgs.prototype.getIntegerParameter = function(i) {
        if (this.isIntegerParameter(i)) {
            return lua53_m.ccall("luaL_checkinteger", n, [n, n], [this.lua, this._chop+i]);
        } else {
            return Math.floor(lua53_m.ccall("luaL_checknumber", n, [n, n], [this.lua, this._chop+i]));
        }
    }

    FunctionArgs.prototype.isIntegerParameter = function(i) {
        return lua53_m.ccall("lua_isinteger", n, [n, n], [this.lua, this._chop+i]) === 1;
    }

    FunctionArgs.prototype.getNumberParameter = function(i) {
        return lua53_m.ccall("luaL_checknumber", n, [n, n], [this.lua, this._chop+i]);
    }

    FunctionArgs.prototype.isNumberParameter = function(i) {
        return lua53_m.ccall("lua_isnumber", n, [n, n], [this.lua, this._chop+i]) === 1;
    }

    FunctionArgs.prototype.getNumParameters = function(i) {
        return lua53_m.ccall("lua_gettop", n, [n], [this.lua]) - this._chop;
    }

    FunctionArgs.prototype.debug = function(i) {
        lua53_m.ccall("luaL_traceback", n, [n, n, n, n], [this.lua, this.lua, 0, 1]);
        console.log(lua53_m.ccall("luaL_checklstring", s, [n, n], [this.lua, -1]));
    }

    FunctionArgs.prototype.chop = function(i) {
        return new FunctionArgs(this.lua, this._chop+i-1)
    }

    FunctionArgs.prototype.getLua = function() {
        return new Lua53(this.lua);
    }

    function Function(lua, algo) {
        this.lua = lua;
        this.func = lua53_m.addFunction(function(l) {
            let rtn = algo(new FunctionArgs(l))||[];
            //TODO: Catch errors

            let ctx = new Lua53(l);
            for (let i=0; i<rtn.length; i++) {
                luaHelper.toLuaValue(ctx, rtn[i]).push();
            }

            return rtn.length;
        }, "ii");
    }

    Function.prototype.push = function() {
        lua53_m.ccall("lua_pushcclosure", null, [n, n, n], [this.lua.lua, this.func, 0]);
    }

    let Lua53 = function(l) {
        if (l!==undefined) {
            this.lua = l;
            return;
        } 
        this.lua = lua53_m.ccall("luaL_newstate", n, [n], [0]);
        if (this.lua == 0) {
            throw "Failed to initialize Lua!";
        }
    };

    Lua53.prototype.createCoroutine = function(name, code) {
        let thread = lua53_m.ccall("lua_newthread", n, [n], [this.lua]);
        if (thread == 0) {
            throw "Failed to create coroutine!";
        }
        this.thread = thread;

        lua53_m.ccall("luaL_openlibs", null, [n], [thread]);
        lua53_m.ccall("luaL_loadbufferx", null, [n, s, n, s], [thread, code, code.length, name]);
        return new Coroutine(thread);
    }

    Lua53.prototype.quit = function() {
        lua53_m.ccall("lua_close", null, [n], [this.lua]);
    }

    Lua53.prototype.setGlobal = function(name, value) {
        value.push();
        lua53_m.ccall("lua_setglobal", null, [n, s], [this.lua, name]);
    }

    //TODO: createSpecialTable, so that non-string values can be included in table indices
    Lua53.prototype.createTable = function() {
        return new Table(this.lua);
    };

    Lua53.prototype.createFunction = function(algo) {
        return new Function(this, algo);
    };

    Lua53.prototype.createNumber = function(n) {
        return new Number(this.lua, n);
    };

    Lua53.prototype.createString = function(s) {
        return new String(this.lua, s);
    };

    Lua53.prototype.createUTF8String = function(s) {
        return new UTF8String(this.lua, s);
    };

    Lua53.prototype.createBoolean = function(b) {
        return new Boolean(this.lua, b);
    };

    Lua53.prototype.createOrderedTable = function() {
        return new OrderedTable(this.lua);
    };

    Lua53.prototype.createNil = function() {
        return new Nil(this.lua);
    };

    return Lua53;
})();