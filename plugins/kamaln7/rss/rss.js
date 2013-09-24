var feedsub = require('feedsub');
var moment = require('moment');
var Plugin = (function () {
    function Plugin(bot, config) {
        this.name = 'rss';
        this.title = 'RSS';
        this.description = "RSS module for Modubot";
        this.version = '0.1';
        this.author = 'Kamal Nasser';

        this.bot = bot;
        this.database = bot.database;
        this.client = bot.client;
        this.commands = {};
        this.config = config;
        this.loadedAt = moment();

        var readers = [];
        this.config.feeds.forEach((function (feed) {
            var reader = new feedsub(feed.url, {
                interval: feed.interval,
                autoStart: true
            });

            reader.on('item', (function (item) {
                if (this.loadedAt.isAfter(item.updated)) {
                    return;
                }

                feed.channels.forEach((function (channel) {
                    this.client.say(channel, '[' + feed.name + '] ' + item.title + ' - ' + item.link.href);
                }).bind(this));
            }).bind(this));

            readers.push(reader);
            reader.read();
        }).bind(this));
    }
    return Plugin;
})();
exports.Plugin = Plugin;

//@ sourceMappingURL=rss.js.map