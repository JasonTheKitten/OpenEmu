let luaHelper = {}

luaHelper.toLuaValue = function(lua, object) {
    if (typeof object == "object" && Array.isArray(object)) {
        let table = lua.createOrderedTable();

        for (let i=0; i<object.length; i++) {
            table.addField(luaHelper.toLuaValue(lua, object[i]));
        }

        return table;
    } else if (typeof object == "object") {
        let table = lua.createTable();

        let keys = Object.keys(object);
        for (key in keys) {
            let name = keys[key];
            table.setField(name, luaHelper.toLuaValue(lua, object[name]));
        }

        return table;
    } else if (typeof object == "function") {
        return lua.createFunction(object);
    } else if (typeof object == "number") {
        return lua.createNumber(object);
    } else if (typeof object == "string") {
        return lua.createString(object);
    } else if (typeof object == "boolean") {
        return lua.createBoolean(object);
    } else if (object === undefined) {
        return lua.createNil();
    }

    // Something has gone drastically wrong, and we have to back out
    // However, backing out now might just make things worse
    // So instead, we just return a nil value
    console.trace();
    return lua.createNil();

    //TODO: Support other values
}