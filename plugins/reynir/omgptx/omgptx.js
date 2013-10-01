exports.Plugin = (function() {
	function Plugin(bot) {
		this.name = 'omgptx';
		this.title = 'OMGPTX';
		this.description = 'Spørg boris';
		this.version = '0.0.0';
		this.author = 'Reynir';

		this.bot = bot;
		this.commands = { 'ptx': 'onCommandPtx' }
	}

	Plugin.prototype.onCommandPtx = function (from, to, message, args) {
		this.bot.client.say(to, "OMGPTX");
	}

	return Plugin;
})();
