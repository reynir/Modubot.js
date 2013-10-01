var Plugin = (function() {
	function Plugin(bot) {
		this.name = 'seen';
		this.tite = 'Seen';
		this.description = "Prints last time a user was seen. Expects axxim/logger";
		this.version = '0.0.0';
		this.author = 'Reynir';

		this.bot = bot;
		this.database = bot.database;
		this.commands = { 'seen' : 'onCommandSeen' };
		this.logSchema = bot.database.Schema({
			channel: String,
			from: String,
			message: String,
			createdAt: {type: Date, default: Date.now}
		});
		this.Log = this.database.model('Log');
	}
	Plugin.prototype.onCommandSeen = function (from, to, message, args) {
		if (args.length < 2) {
			this.bot.client.say(this.bot.getReplyTo(from, to),
					    '.seen <nick>', 'notice');
			return;
		}
		var nick = args[1];
		var query = this.Log.findOne({from: nick}).sort('-createdAt');
		query.exec((function (err, log) {
			if (err) {
				this.bot.config.bot.debug && console.log('seen.js: '+err);
				return;
			}
			if (!log)
				return;
			var msg = from + ': '+
				log.from+' was last seen '+
				log.createdAt+' saying:'+
				log.message;
			this.bot.client.say(this.bot.getReplyTo(from, to), msg);
		}).bind(this));
	};
	return Plugin;
})();
exports.Plugin = Plugin;
