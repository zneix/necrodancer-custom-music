(async () => {
	const fs = require("fs").promises;
	await fs.writeFile("./config.json", JSON.stringify({
		directory: null,
		beatmapExecutable: null
	}, null, 4));
})();