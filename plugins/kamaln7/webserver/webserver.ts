export class Plugin {
	name:string;
	title:string;
	description:string;
	version:string;
	author:string;

	bot:any;
	database:any;
	client:any;
	commands:any;
	server:any;
	port:number;
	config:any;

	constructor(bot:any, config:any) {
		this.name = 'webserver';
		this.title = 'Webserver';
		this.description = "Webserver module for Modubot";
		this.version = '0.1';
		this.author = 'Kamal Nasser';

		this.bot = bot;
		this.database = bot.database;
		this.client = bot.client;
		this.commands = {};
		this.config = config;

		var express = require('express');
		this.port = this.config.port || 8888;

		this.server = express();
		this.server.use(express.static(__dirname + '/public'));
		this.server.set('views', __dirname + '/views');
		this.server.set('view engine', 'jade');
		this.server.locals.bot = this.client;

		if(this.server.listen(this.port)){
			console.log('Webserver listening on port http://localhost:' + this.port);
		} else {
			console.log('Error binding to port ' + this.port);
		}

		this.setupRoutes();
		this.loadPlugins();
	}

	setupRoutes(){
		var plugin = this;
		this.server.get('/', function(req, res){
			res.render('home', {menu: 'home'});
		});
		this.server.get('/channels', function(req, res){
			res.render('channels', {menu: 'channels'});
		});
	}

	loadPlugins(){
		var plugin = this;
		console.log(this.config);
		this.config.plugins.forEach(function(webserverPlugin){
			console.log(webserverPlugin);
			if(typeof plugin[webserverPlugin] == 'function'){
				plugin[webserverPlugin]();
			}
		});
	}

	factoids(){
		this.server.get('/factoids', function(req, res){
			res.end(200);
		});
	}

}