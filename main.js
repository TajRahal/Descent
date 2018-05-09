// Features_RS Copy of Main

// Globals Variables
// Instantiating game object
var game = new Phaser.Game(500, 350, Phaser.AUTO);
var player;

// On Load
window.onload = function()
{
	/* 
	 * Add states to the StateManager
	 */

	// Asset Loading and Menus (Maybe include in-game pause)
	game.state.add('Boot', Boot);
	game.state.add('MainMenu', MainMenu);
	game.state.add('GameOver', GameOver);

	// Game "Levels"
	game.state.add('FrontDoor', FrontDoor);
	game.state.add('LivingRoom', LivingRoom);
	game.state.add('BedRoom', BedRoom);
	game.state.add('Backyard', Backyard);

	game.state.start('Boot');
}

// Boot state to load assets
var Boot = function(game){};
Boot.prototype = 
{
	/*	
	 *	Loading temporary assets.
	 *	When have final assets, make a sprite atlas.
	 */
	preload:  function()
	{
		// Background and Sprites
		game.load.image('front_door_bg', 'assets/img/temp_art/front-door-temp.png');
		game.load.image('living_room_bg', 'assets/img/temp_art/inside-temp.png');
		game.load.atlas("sprite_atlas", 'assets/img/atlas/tempsprite.png', 'assets/img/atlas/tempsprite.json')

		// Audio and SFX
		game.load.audio('viligante_justice', 'assets/audio/walking_with_poseidon.mp3');
		game.load.audio('walk_sfx', 'assets/audio/Fantasy Sound Library/Fantasy Sound Library/Mp3/Footsteps/Footstep_Dirt_00.mp3');
	},
	create: function()
	{
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.setMinMax(0, 0, 1280, 356);
		game.renderer.renderSession.roundPixels = true;	// No Blurring of Pixels
		game.state.start('MainMenu')
	}
}

// Main Menu state (GUI functionality)
var MainMenu = function(game){};
MainMenu.prototype = 
{
	preload: function()
	{
		console.log("Main Menu");
	},
	create: function()
	{

	},
	update: function()
	{
		if(game.input.keyboard.justPressed(Phaser.Keyboard.TILDE))
		{
			game.state.start('FrontDoor');
		}
	}
}

// GamePlay State
var FrontDoor = function(game){};
FrontDoor.prototype = 
{
	preload: function()
	{
		console.log("Front Door");
	},
	create: function()
	{
		// Creating audio
		// TEMP MUSIC -- CHANGE TO CREEPY EERIE
		game.music = game.add.audio('viligante_justice');
		game.music.play('', 0, 0.85, true);

		// Creating sfx
		//this.walk_sfx = game.add.audio('walk_sfx');
		var bg_front_door = game.add.sprite(0, 0, 'front_door_bg');
		bg_front_door.width = game.width;
		bg_front_door.height = game.height;

		// Creating Player Instance
		player = game.add.sprite(70, game.height-108, 'sprite_atlas', 'player-idle');
		player.scale.setTo(0.9, 3);
		player.anchor.setTo(0.5, 0.5);

		// Player Physics
		game.physics.arcade.enable(player);
		//player.body.bounce.y = 0.1;
		// NO PLATFORM SO CANNOT USE GRAVY, YES GRAVY.
		//player.body.gravity.y = 1200;
		player.body.collideWorldBounds = true;

		// Player Animations
		player.animations.add('idle', ['player-idle'], 0, false);
		player.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-0', 1, 6), 10, true);
		player.animations.play('idle');
	},
	update: function()
	{
		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
		{
			//player.scale.x *= -1;
			//player.position.x += 10;
			player.position.x += 1;
			player.scale.setTo(0.9, 3);
			player.animations.play('walk');
			///this.walk_sfx.play('', 0, 1, true);
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
		{
			//player.scale.x *= -1;
			//player.position.x -= 10;
			player.position.x -= 1;
			player.scale.setTo(-0.9, 3);
			player.animations.play('walk');
			//this.walk_sfx.play('', 0, 0.50, false);
		}
		else
		{
			player.animations.play('idle')
		}
	}
}

// GamePlay State
var LivingRoom = function(game){};
LivingRoom.prototype = 
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
var BedRoom = function(game){};
BedRoom.prototype = 
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
var Backyard = function(game){};
Backyard.prototype = 
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