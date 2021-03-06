var youtubeFeeds = require('youtube-feeds');
var getYouTubeID = require('get-youtube-id');
var moment = require('moment');

var Plugin = (function () {
    function Plugin(bot) {
        this.name = 'youtube';
        this.title = 'YouTube';
        this.description = "Parse Youtube links and output information";
        this.version = '0.1';
        this.author = 'Kamal Nasser';

        this.bot = bot;
        this.database = bot.database;
        this.client = bot.client;
        this.commands = {};
    }
    Plugin.prototype.onMessage = function (from, to, message) {
        var args = message.split(' ');

        if (args.length < 1) {
            this.bot.reply(from, to, "Usage: .youtube http://youtube.com/watch?v=xyz");
            return;
        }

        var link = args[0];
        var id = getYouTubeID(link);
        if (id) {
            youtubeFeeds.video(id, (function (err, data) {
                if (err) {
                    this.bot.reply(from, to, err);
                    return;
                }

                this.bot.reply(from, to, data.title + " | length " + moment.duration((data.duration * 1000)).humanize() + " | rated " + parseFloat(data.rating).toFixed(2) + "/5.00 | " + data.viewCount + " views | by " + data.uploader);
            }).bind(this));
        }
    };
    return Plugin;
})();
exports.Plugin = Plugin;

//@ sourceMappingURL=youtube.js.map
