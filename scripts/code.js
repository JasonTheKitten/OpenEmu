let code = {};

loader.queue(fetch("../resources/machine.lua").then(async resp=>{
    code.machine = await resp.text();
}));

loader.queue(fetch("../resources/shader/terminal.fs").then(async resp=>{
    code.fragmentShader = await resp.text();
}));

loader.queue(fetch("../resources/shader/terminal.vs").then(async resp=>{
    code.vertexShader = await resp.text();
}));

loader.queue(fetch("../resources/bios.lua").then(async resp=>{
    code.bios = await resp.text();
}));