let luaHelper = {}

luaHelper.toLuaValue = function(lua, object) {
    if (object === null || object === undefined) {
        return lua.createNil();
    } else if (object instanceof Uint8Array) {
        let str = new TextDecoder().decode(object);
        return lua.createUTF8String(object);
    } else if (Array.isArray(object)) {
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
    }

    // Something has gone drastically wrong, and we have to back out
    // However, backing out now might just make things worse
    // So instead, we just return a nil value
    console.trace();
    return lua.createNil();

    //TODO: Support other values
}

luaHelper.argumentToJSObject = function(l, i) {
    if (l.isStringParameter(i)) {
        return l.getStringParameter(i);
    } else if (l.isBooleanParameter(i)) {
        return l.getBooleanParameter(i);
    } else if (l.isIntegerParameter(i)) {
        return l.getIntegerParameter(i);
    } if (l.isNumberParameter(i)) {
        return l.getNumberParameter(i);
    } else {
        alert("Unsupported type!");
        return null;
    }

    // TODO: Support tables
}

luaHelper.argumentsToJSObjects = function(l, n, off) {
    let objects = [];
    for (i = 0; i < n; i++) {
        objects[i] = luaHelper.argumentToJSObject(l, i + off + 1);
    }

    return objects;
}