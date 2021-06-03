function Disk(filesystem) {
    this.filesystem = filesystem;
    this.maxHandles = 16;
    this.handles = [];
}

Disk.prototype.getName = function() {
    return "filesystem";
}

Disk.prototype.getAddress = function() {
    return "disk1";
}

Disk.prototype.getMethods = function(computer) {
    let methods = {}

    let self = this;

    methods["open"] = function(l) {
        let file = l.getStringParameter(1);

        console.log(file)

        let handleID = undefined;
        for (let i=0; i<self.maxHandles; i++) {
            if (self.handles[i]==undefined) {
                handleID = i;
                break;
            }
        }
        if (handleID == undefined) {
            return [undefined, "Too many handles open"]; //TODO: What is the actual error?
        }

        self.handles[handleID] = {
            file: file,
            pointer: 0
        }

        self.filesystem.open(file);

        return [handleID]; //TODO: This should be userdata
    }

    methods["read"] = function(l) {
        let handleID = l.getIntegerParameter(1);
        let len = Math.floor(l.getNumberParameter(2));
        
        //if (self.handles[handleID].pointer==0) {
            if (len==0) return "";
            let handle = self.handles[handleID];
            let c = self.filesystem.read(handle.file, handle.pointer, len);
            console.log(c)
            handle.pointer+=len;
            console.log(len);
            return [c===""?undefined:c];
        //}

        return [undefined];
    }

    methods["close"] = function(l) {
        let handleID = l.getIntegerParameter(1);

        self.filesystem.close(self.handles[handleID].file);
        self.handles[handleID] = undefined;
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

    return methods;
}