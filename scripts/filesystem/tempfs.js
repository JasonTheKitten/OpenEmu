function TempFS() {
    this.handles = {};
    this.refs = [];
    this.init();
}

{
    const FOLDER_TYPE = 0;
    const FILE_TYPE = 1;

    function shortenPath(path) {
        let built = [];
        for (let i = 0; i < path.length; i++) {
            let nextSlash = path.indexOf("/", i);
            if (nextSlash == -1) {
                nextSlash = path.length;
            }
            let part = path.substring(i, nextSlash);
            i = nextSlash + 1;

            if (part == "..") {
                if (built.length>0) {
                    delete built[built.length-1];
                }
            } else if (part == (".").repeat(part.length)) {
                
            } else {
                built[built.length] = part;
            }
        }
        
        let npath = "";
        for (let i = 0; i < built.length; i++) {
            npath += "/" + built[i];
        }
        
        return npath.substring(1);
    }

    function createFolderNode() {
        return {
            type: FOLDER_TYPE,
            children: {}
        }
    }

    function createFileNode() {
        return {
            type: FILE_TYPE,
            content: ""
        }
    }

    function findEmptyRef(refs) {
        for (let i = 0; i < 16; i++) {
            if (!refs[i]) {
                return i;
            }
        }
    }

    function findNode(root, path_, dirVar) {
        let path = shortenPath(path_);
        
        let node = root;
        for (let i = 0; i < path.length; i++) {
            let nextSlash = path.indexOf("/", i);
            if (nextSlash == -1) {
                nextSlash = path.length;
            }
            let part = path.substring(i, nextSlash);
            i = nextSlash + 1;

            if (!node.children || !node.children[part]) {
                if ((dirVar||null)==null || node.type != FOLDER_TYPE) {
                    return null;
                }

                node.children[part] = createFolderNode();

                if (Array.isArray(dirVar)) {
                    dirVar[0] = true;
                }
            }

            node = node.children[part];
        }

        return node;
    }

    TempFS.prototype.init = function() {
        this.root = createFolderNode();
    }

    TempFS.prototype.open = function(path) {
        //TODO: Create empty folders?

        let file = findNode(this.root, path);
        if (!file) {
            // TODO: We failed
        }

        this.handles[file] = this.handles[file] || {
            references: 0,
            writeMode: false
        };

        let ref = findEmptyRef(this.refs);
        if (ref == -1) {
            //TODO
        }

        this.refs[ref] = file;
        this.handles[file].references++;

        return ref;
    }

    TempFS.prototype.read = function(handle, start, l) {
        
    }

    TempFS.prototype.seek = function(handle, pos, offset) {

    }

    TempFS.prototype.write = function(handle, content) {

    }

    TempFS.prototype.close = function(ref) {
        let file = this.refs[ref];
        if (!file) {
            //TODO
        }

        this.refs[ref] = undefined
        this.handles[file].references--;
        if (this.handles[file].references === 0) {
            this.handles[file] = undefined;
        }
    }

    TempFS.prototype.isDir = function(path) {
        let node = findNode(this.root, path);
        if (!node) {
            return false;
        }
        let isDir = node.type == FOLDER_TYPE;

        return isDir;
    }

    TempFS.prototype.mkDir = function(path) {
        let madeDir = [];
        findNode(this.root, path, madeDir);

        if (!madeDir[0]) {
            //TODO
        }
    }

    TempFS.prototype.list = function(path) {
        let node = findNode(this.root, path);
        if (!node || node.type != FOLDER_TYPE) {
            //TODO
        }

        let rtn = [];
        for (let name in node.children) {
            rtn[rtn.length] = name;
        };

        return rtn;
    }

    TempFS.prototype.exists = function(path) {
        let node = findNode(this.root, path);

        return !!node;
    }
}