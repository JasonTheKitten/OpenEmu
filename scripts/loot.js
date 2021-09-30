let loot = {};

loader.queue(zipFS.create("./resources/loot/mineos.zip").then(r=>loot.openos = r));