// Making new copy for features_RS

// Instantiating game object
var game = new Phaser.Game(800, 600, Phaser.AUTO);

// Globals

// Boot
var Boot = function(game){};
Boot.prototype = 
{
	preload:  function()
	{

	},
	create: function()
	{

	}
}

var MainMenu = function(game){};
MainMenu.prototype = 
{
	preload: function()
	{

	},
	create: function()
	{

	},
	update: function()
	{

	}
}
// GamePlay State
var GamePlay = function(game){};
GamePlay.prototype = 
{
	preload: function()
	{

	},
	create: function()
	{

	},
	update: function()
	{
		
	}
}

// Game Over
var GameOver = function(game){};
GameOver.prototype =
{
	preload: function()
	{

	},
	create: function()
	{

	},
	update: function()
	{

	}
}

// Add states to the StateManager
game.state.add('MainMenu', MainMenu);
game.state.start('MainMenu');