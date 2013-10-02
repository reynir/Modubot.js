exports.Plugin = (function() {
    function Plugin(bot) {
	this.name = 'seen';
	this.tite = 'Seen';
	this.description = "Prints last time a user was seen. Expects axxim/logger";
	this.version = '0.0.2';
	this.author = 'Reynir';

	this.bot = bot;
	this.database = bot.database;
	this.commands = { 'seen' : 'onCommandSeen' };
	this.getLog = function() {
	    var logger = this.bot.plugins['axxim/logger'];
	    return logger && logger.Log;
	}.bind(this);
	this.moment = require('moment');
    }
    
    Plugin.prototype.onCommandSeen = function (from, to, message, args) {
	var bot = this.bot;
	if (args.length < 2) {
	    bot.client.say(from, to,
			   'Usage: ' +
			   bot.config.command + 'seen <nick>',
			   'notice');
	    return;
	}
	var nick = args[1];
	var Log = this.getLog();
	if (!Log) {
	    bot.config.bot.debug &&
		console.log('reynir/seen requires axxim/logger!');
	    return;
	}
	Log.findOne({from: nick}).sort('-createdAt')
	    .exec(cont(err, log));
	if (err) {
	    bot.config.bot.debug && console.log('seen.js: '+err);
	    return;
	}
	if (!log) {
	    bot.reply(from, to,
		      "I haven't seen "+nick+" yet.",
		      'notice');
	    return;
	}
	var msg = log.from + ' was last seen ' +
	    moment(log.createdAt).fromNow() + ' saying: ' +
	    log.message;
	bot.reply(from, to, msg);
    };

    return Plugin;
})();
