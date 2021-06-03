let loot = {};

loader.queue(zipFS.create("../resources/loot/openos.zip").then(r=>loot.openos = r));