function Disk(filesystem, address) {
    this.filesystem = filesystem;
    this.address = address || "disk1";
}

Disk.prototype.getName = function() {
    return "filesystem";
}

Disk.prototype.getAddress = function() {
    return this.address;
}

Disk.prototype.getMethods = function(computer) {
    let methods = {}

    let self = this;

    methods["open"] = function(l) {
        // TODO: Support devFS
        let file = l.getStringParameter(1);

        console.log(file);

        let handleID = self.filesystem.open(file);

        return [handleID]; //TODO: This should be userdata
    }

    methods["lastModified"] = function(l) {
        return [Date.now()];
    }

    methods["remove"] = function(l) {
        
    }

    methods["read"] = function(l) {
        let handleID = l.getIntegerParameter(1);
        let len = Math.floor(l.getNumberParameter(2));
        
        if (len == 0) {
            return "";
        }

        computer.reduceCallBudget(1);

        soundLib.play("floppy_access");

        let c = self.filesystem.read(handleID, len);

        //console.log(c);

        return [c.length==0?undefined:c];
    }

    methods["seek"] = function(l) {
        let handleID = l.getIntegerParameter(1);
        let pos = l.getStringParameter(2);
        let offset = l.getIntegerParameter(3);

        return [self.filesystem.seek(handleID, pos, offset)];
    }

    methods["write"] = function(l) {
        let handleID = l.getIntegerParameter(1);
        //TODO: Support byte array
        let content = l.getStringParameter(2);

        if (self.filesystem.write) {
            self.filesystem.write(handleID, content);
        }

        //TODO: Error if fail
    }

    methods["close"] = function(l) {
        let handleID = l.getIntegerParameter(1);

        self.filesystem.close(handleID);
    }

    methods["list"] = function(l) {
        let dir = l.getStringParameter(1);

        return [self.filesystem.list(dir)];
    }

    methods["isDirectory"] = function(l) {
        let dir = l.getStringParameter(1);

        return [self.filesystem.isDir(dir)];
    }

    methods["exists"] = function(l) {
        let path = l.getStringParameter(1);

        return [self.filesystem.exists(path)];
    }

    methods["makeDirectory"] = function(l) {
        let path = l.getStringParameter(1);

        if (self.filesystem.write) {
            self.filesystem.mkDir(path);
        }

        //TODO: Error if fail
    }

    methods["size"] = function(l) {
        let path = l.getStringParameter(1);

        let size = self.filesystem.getSize(path);
        if (size == -1) {
            //TODO
        }
        
        return [size];
    }

    methods["getLabel"] = function(l) {
        return ["Device"];
    }

    methods["isReadOnly"] = function(l) {
        return [!self.filesystem.write];
    }

    return methods;
}

Disk.prototype.getMethodInfo = function() {
    return {
        ["exists"]: {
            direct: true,
            doc: "function(path:string):boolean -- Returns whether an object exists at the specified absolute path in the file system"
        },

        ["isDirectory"]: {
            direct: true,
            doc: "function(path:string):boolean -- Returns whether the object at the specified absolute path in the file system is a directory."
        },

        ["close"]: {
            direct: true,
            doc: "function(handle:userdata) -- Closes an open file descriptor with the specified handle."
        },
        ["open"]: {
            direct: true,
            limit: 4,
            doc: "function(path:string[, mode:string='r']):userdata -- Opens a new file descriptor and returns its handle."
        },
        ["read"]: {
            direct: true,
            limit: 15,
            doc: "function(handle:userdata, count:number):string or nil -- Reads up to the specified amount of data from an open file descriptor with the specified handle. Returns nil when EOF is reached."
        }
    };
}