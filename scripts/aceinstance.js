let AceInstance = (function() {
    let AceInstance = function() {
        ace.require("ace/ext/language_tools");
        ace.require("ace/ext/searchbox");
        let editor = ace.edit("editor-container", {
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true
        });
        editor.setTheme("ace/theme/tomorrow_night_bright");
        let LuaMode = ace.require("ace/mode/lua").Mode;
        editor.session.setMode(new LuaMode());
        editor.setKeyboardHandler("ace/keyboard/vim");
        editor.commands.addCommand({
            name: 'save',
            bindKey: {win: "Ctrl-S", "mac": "Cmd-S"},
            exec: function(editor) {
                alert("You cannot save");
            }
        })
    
        ace.config.loadModule('ace/keyboard/vim', function(module) {
            let vim = module.CodeMirror.Vim;
            vim.defineEx('quit', 'q', function(cm, input) {
                alert("You cannot quit");
            });
        });

        this.editor = editor;
    }

    return AceInstance;
})();