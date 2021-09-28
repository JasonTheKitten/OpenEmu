let loot = {};

loader.queue(zipFS.create("./resources/loot/plan9k.zip").then(r=>loot.openos = r));