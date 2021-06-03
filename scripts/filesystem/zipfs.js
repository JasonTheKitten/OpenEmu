let zipFS = {};
zipFS.create = (function() {
    //TODO: This API is terribly written
    function ZipFS(z) {
        this.zip = z;
        this.handles = {};
    }

    function shortenPath(path) {
        if (path.substring(0, 1)==="/") return path.substring(1);
        return path;
    }

    ZipFS.prototype.open = function(file) {
        file = shortenPath(file);
        this.handles[file] = this.handles[file] || {
            contents: this.zip.file(file).asText(),
            references: 0
        };

        this.handles[file].references++;
    }

    ZipFS.prototype.read = function(file, start, l) {
        file = shortenPath(file);
        return this.handles[file].contents.substring(start, start+l);
    }

    ZipFS.prototype.close = function(file) {
        file = shortenPath(file);
        this.handles[file].references--;
        if (this.handles[file].references===0) {
            this.handles[file].references = undefined;
        }
    }

    ZipFS.prototype.isDir = function(file) {
        file = shortenPath(file);
        let isDir = this.zip.file(file)!=null && this.zip.filter(a=>a.startsWith(file+"/")).length>0;

        return isDir;
    }

    ZipFS.prototype.list = function(folder) {
        folder = shortenPath(folder)+"/";
        
        let rtn = [];
        let list = this.zip.filter(a=>a.startsWith(folder));
        for (index in list) {
            let file = list[index];
            let name = file.name.substring(folder.length, file.name.length);
            if (!name.includes("/") && name!="") {
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