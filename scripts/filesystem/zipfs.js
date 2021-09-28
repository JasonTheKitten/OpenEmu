let zipFS = {};
zipFS.create = (function() {
    //TODO: This API is terribly written
    function ZipFS(z) {
        this.zip = z;
        this.handles = {};
        this.refs = [];
    }

    function shortenPath(path) {
        let built = [];
        for (let i = 0; i < path.length; i++) {
            let part = "";
            while ((i<path.length) && (path.substring(i, i+1) != "/")) {
                part += path.substring(i, i+1);
                i++;
            }
            if (part == "..") {
                if (built.length>0) {
                    delete built[built.length-1];
                }
            } else if (part == (".").repeat(part.length)) {
                
            } else if (part != "/") {
                built[built.length] = part;
            }
        }
        
        let npath = "";
        for (let i = 0; i < built.length; i++) {
            npath += "/" + built[i];
        }
        
        return npath.substring(1);
    }

    function findEmptyRef(refs) {
        for (let i = 0; i < 16; i++) {
            if (!refs[i]) {
                return i;
            }
        }
    }

    ZipFS.prototype.open = function(file) {
        file = shortenPath(file);

        if (!this.zip.file(file)) {
            return null;
        }

        this.handles[file] = this.handles[file] || {
            contents: this.zip.file(file).asText(),
            references: 0
        };

        this.handles[file].references++;
        let ref = findEmptyRef(this.refs);
        this.refs[ref] = {file: file, pointer: 0};
        return ref;
    }

    ZipFS.prototype.read = function(ref, l) {
        let handle = this.refs[ref];
        let content = this.handles[handle.file].contents.substring(handle.pointer, handle.pointer+l);
        handle.pointer += l;
        return content;
    }

    ZipFS.prototype.seek = function(ref, pos, offset) {
        let handle = this.refs[ref];
        switch(pos) {
            case "cur":
                handle.pointer += offset;
                break;

            case "set":
                handle.pointer = offset;
                break;

            case "end":
                handle.pointer = this.handles[handle.file].contents.length + offset;
                break;

            default:
                //TODO
        }

        return handle.pointer;
    }

    ZipFS.prototype.close = function(ref) {
        let file = this.refs[ref].file;
        this.refs[ref] = null;
        this.handles[file].references--;
        if (this.handles[file].references===0) {
            this.handles[file] = undefined;
        }
    }

    ZipFS.prototype.isDir = function(file) {
        file = shortenPath(file);
        if (file === "") {
            return true;
        }
        let isDir = this.zip.file(file) == null && this.zip.filter(a=>a.startsWith(file+"/")).length>0;

        return isDir;
    }

    ZipFS.prototype.list = function(folder) {
        folder = shortenPath(folder)+"/";
        if (folder === "/") {
            folder = "";
        }
        
        let rtn = [];
        let list = this.zip.filter(a=>a.startsWith(folder));
        for (index in list) {
            let file = list[index];
            let name = file.name.substring(folder.length, file.name.length);
            if ((!name.includes("/") || (name.indexOf("/") == name.length - 1)) && name!="") {
                rtn[rtn.length] = name;
            }
        };

        return rtn;
    }

    ZipFS.prototype.exists = function(path) {
        path = shortenPath(path);

        return this.zip.file(path)!=null || this.isDir(path);
    }

    return (file)=>{
        return fetch(file).then(r=>r.arrayBuffer()).then(ab=>new JSZip(ab)).then(r=>new ZipFS(r));
    };
})();