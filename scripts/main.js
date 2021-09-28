window.onload = function() {
    loader.await().then(()=>{
        new AceInstance();

        let canvas = document.getElementById("monitor");
        let terminal = new Terminal(canvas, 160, 50);

        let computer = new OCComputer();
        computer.registerComponent(new EEPROM());
        computer.registerComponent(new Disk(loot.openos));
        computer.registerComponent(new Disk(new TempFS(), "disk2"));
        computer.registerComponent(new GPU());
        computer.registerComponent(new Keyboard());
        computer.registerComponent(new Screen(terminal));
        computer.registerComponent(new Computer());
        computer.on();

        registerKeyboardHandler(computer, canvas);
    }).catch(e=>console.log(e));

    function registerKeyboardHandler(computer, canvas) {
        //TODO: Proper key codes
        canvas.addEventListener("keydown", e => {
            computer.queueSignal(["key_down", "keyboard1", extractChar(e), map(e.keyCode), "OpenEmu"]);
            e.preventDefault();
        });
        canvas.addEventListener("keyup", e => {
            computer.queueSignal(["key_up", "keyboard1", extractChar(e), map(e.keyCode), "OpenEmu"]);
            e.preventDefault();
        });
    }
    
    function extractChar(e) {
        let code = e.key.charCodeAt(0);
        if (e.keyCode <= 32) {
            code = e.keyCode;
        } else if (e.key.length > 1) {
            code = 0;
        }
        return code;
    }

    function map(key) {
        return keyCodeMap[key] || key;
    }
}