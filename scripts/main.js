window.onload = function() {
    loader.await().then(()=>{
        new AceInstance();

        let canvas = document.getElementById("monitor");
        let terminal = new Terminal(canvas, 80, 25);

        let text = "This text should appear correctly";
        for (let i=0; i<text.length; i++) {
            terminal.setPixel(i+1, 1, 0x000000, 0xFFFFFF, text[i]);
        }

        let computer = new OCComputer();
        computer.registerComponent(new EEPROM());
        computer.registerComponent(new Disk(loot.openos));
        computer.registerComponent(new GPU());
        computer.registerComponent(new Screen(terminal));
        computer.registerComponent(new Computer());
        computer.on();
    }).catch(e=>console.log(e));
}