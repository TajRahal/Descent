// Features_RS Copy of Main

// Globals Variables
// Instantiating game object
var game = new Phaser.Game(576, 160, Phaser.AUTO);
var player, playerSpeed;
var ground, apple, plant, door;
var usedPlant, usedApple, key;
var livingRoomDoor, bedDoor, nDoor;

// On Load
window.onload = function()
{
	/*
	 * Add states to the StateManager
	 */

	// Asset Loading and Menus (Maybe include in-game pause)
	game.state.add('Boot', Boot);
	// game.state.add('MainMenu', MainMenu);
	// game.state.add('GameOver', GameOver);

	// // Game "Levels"
	// game.state.add('FrontDoor', FrontDoor);
	// game.state.add('LivingRoom', LivingRoom);
	// game.state.add('BedRoom', BedRoom);
	// game.state.add('Backyard', Backyard);

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
		//BACKYARD ASSETS-----------------------------------------

		game.load.image('tree', 'assets/backyard/tree.png');
		game.load.image('apple', 'assets/backyard/apple.png');
		game.load.image('backyard_BG', 'assets/backyard/backyard_bg.png');
		game.load.image('backyard_cement_ground', 'assets/backyard/backyard_cement_ground.png');
		game.load.image('backyard_door', 'assets/backyard/backyard_door.png');
		game.load.image('backyard_ground', 'assets/backyard/backyard_ground.png');
		game.load.spritesheet('rain', 'assets/img/rain.png');
		game.load.spritesheet('rain_splash', 'assets/img/rain_splash.png');



		//BEDROOM ASSETS------------------------------------------
		game.load.image('bedroomBG','assets/img/bedroom/bedroom bg.png');
		game.load.image('bedroomFloor','assets/img/bedroom/bedroom_floor.png');
		game.load.image('backyard_door','assets/img/bedroom/backyard_door.png');
		game.load.image('bedroom_bed','assets/img/bedroom/bed.png');
		game.load.image('bedroom_cabinet','assets/img/bedroom/cabinet.png');
		game.load.image('closet_door','assets/img/bedroom/closet_door.png');
		game.load.image('closet','assets/img/bedroom/closet.png');
		game.load.image('mirror_stand','assets/img/bedroom/mirror_stand.png');
		game.load.image('small_cabinet','assets/img/bedroom/small_cabinet.png');
		game.load.image('normal_portrait','assets/img/bedroom/normal_picture.png');
		game.load.image('door','assets/img/bedroom/front_door.png');
		//Title image
		game.load.image('title', 'assets/img/Descent_Title.png');
		game.load.image('space', 'assets/img/press_space.png');

		//LIVINGROOM ASSETS
		// Background and Sprites
        game.load.image('front_door', 'assets/img/livingroom/front_door.png');
        game.load.image('living_room_bg', 'assets/img/livingroom/living_bg.png');
        game.load.image('floor', 'assets/img/livingroom/floor.png');
        game.load.image('mirror', 'assets/img/livingroom/livingroom_mirror.png');
        game.load.image('wine_cabinet', 'assets/img/livingroom/wine_cabinet.png');
        game.load.image('bed_door', 'assets/img/livingroom/front_view_door.png');
        game.load.image('cat1', 'assets/img/livingroom/cat.png');
        game.load.image('portrait', 'assets/img/livingroom/normal_picture.png');
        game.load.image('cat2', 'assets/img/livingroom/laying_cat.png');

		// Temporary Assets (If use later then add to atlas)

		// Sprites

		// SFX
		game.load.audio('scream', 'assets/audio/scream_horror1.mp3');
		game.load.audio('click', 'assets/audio/UI_SFX_Set/click1.mp3');
		game.load.audio('beep', 'assets/audio/beep.ogg');
		game.load.audio('locked', 'assets/audio/DoorLockSounds/LockedDoorHandleJiggle.ogg');
		game.load.audio('opened', 'assets/audio/DoorLockSounds/UnlockDoor.ogg');

		// FRONT PORCH ASSETS
		game.load.image('front_porch_bg', 'assets/img/front_porch/outside_front.png');
		game.load.image('front_ground', 'assets/img/front_porch/outside_front_ground.png');
		game.load.image('front_door', 'assets/img/front_porch/front_door.png');
		game.load.image('porch_platform', 'assets/img/front_porch/porch_platform.png');
		game.load.image('porch_steps', 'assets/img/front_porch/porch_steps.png');
		game.load.image('apple', 'assets/img/front_porch/apple.png');
		game.load.image('plant', 'assets/img/front_porch/plant.png');
		game.load.atlas("sprite_atlas", 'assets/img/atlas/tempsprite.png', 'assets/img/atlas/tempsprite.json');

		// Audio and SFX
		game.load.audio('viligante_justice', 'assets/audio/walking_with_poseidon.mp3');
		game.load.audio('shades', 'assets/audio/Shades/Shades.mp3');
		game.load.audio('walk_sfx', 'assets/audio/Fantasy Sound Library/Fantasy Sound Library/Mp3/Footsteps/Footstep_Dirt_00.mp3');
	},
	create: function()
	{
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.renderer.renderSession.roundPixels = true;	// No Blurring of Pixels
		game.state.start('MainMenu');
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
		var titleImage = game.add.image(game.width/2, 50, 'title');
        titleImage.anchor.setTo(0.5, 1);
        titleImage.alpha = 0;
        game.add.tween(titleImage).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

		var space = game.add.image(game.width/2, 140, 'space');
        space.anchor.setTo(0.5, 1);
        space.alpha = 0;
        game.add.tween(space).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
	},
	update: function()
	{
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			game.state.start('FrontDoor');
		}
	}
}

//---------BACKYARD-----------------------------------
// GamePlay State
var BackYard = function(game){};
Backyard.prototype =
{
	preload: function()
	{
		console.log("Front Door");
	},
	create: function() {
		game.add.sprite(0,0, 'backyard_BG');


        var tree = game.add.sprite(352,0, 'tree');
        var backyard_door = game.add.sprite(0, 68, 'backyard_door');
        var apple = game.add.sprite(368,73, 'apple');

        var emitter = game.add.emitter(400, -100, 600);
		emitter.width = game.world.width;
	    //emitter.angle = 20; // uncomment to set an angle for the rain.

		emitter.makeParticles('rain');
		emitter.minParticleScale = 1;
		emitter.maxParticleScale = 1.5;

		emitter.setYSpeed(500, 500);
		emitter.setXSpeed(-400, -200);

		emitter.minRotation = 0;
		emitter.maxRotation = 0;

		emitter.start(false, 700, 5, 0);



		var backyard_ground = game.add.sprite(0,129,'backyard_ground');
        var backyard_cement_ground = game.add.sprite(0,126,'backyard_cement_ground');



    },
	update: function()
	{

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
		livingRoomDoor = 0;
		game.add.sprite(0,0, 'living_room_bg');
        var floor = game.add.sprite(0,130,'floor');
        var portrait = game.add.sprite(165,25, 'portrait');
        var wineCabinet = game.add.sprite(300,47,'wine_cabinet');
        var mirror = game.add.sprite(50, 65, 'mirror');
        var frontDoor = game.add.sprite(5, 69, 'front_door');
        frontDoor.scale.setTo(-1,1);
        frontDoor.anchor.setTo(0.0, 0.0);
        bedDoor = game.add.group();
        bedDoor.enableBody = true;
        bedDoor.create(450, 69, 'bed_door');
        var cat1 = game.add.sprite(285, 117, 'cat1');
        game.add.sprite(305, 34, 'cat2');

		// Player Sprite 
		player = game.add.sprite(40, game.height - 45, 'sprite_atlas', 'player-idle');
		player.anchor.setTo(0.5, 0.5);

		// Player Physics
		game.physics.arcade.enable(player);
		//player.body.bounce.y = 0.1;
		//player.body.gravity.y = 1200;
		player.body.collideWorldBounds = true;

		// Player Animations
		player.animations.add('idle', ['player-idle'], 0, false);
		player.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-0', 1, 6), 10, true);
		player.animations.play('idle');
	},
	interactDoor1: function()
	{
		game.state.start("BedRoom");
	},
	update: function()
	{
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			game.physics.arcade.overlap(player, bedDoor, this.interactDoor1, null, this);
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
		{
			player.position.x += playerSpeed;
			player.scale.setTo(1.0, 1);
			player.animations.play('walk');
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
		{
			player.position.x -= playerSpeed;
			player.scale.setTo(-1.0, 1);
			player.animations.play('walk');
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && player.body.touching.down && hitGround)
		{
			player.body.velocity.y = -100;
			player.scale.setTo(-1.0, 1);
			player.animations.play('walk');
		}
		else
		{
			player.animations.play('idle')
		}
	}
}

var BedRoom = function(game){};
BedRoom.prototype = 
{
	preload: function()
	{

	},
	create: function()
	{
		//BEDROOM CODE----------------------------------------------------------------------------------------------------
		var bedroomBG = game.add.sprite(0, 0, 'bedroomBG');
		var floor = game.add.group();
		var bedroomFloor = floor.create(0, game.height-31, 'bedroomFloor');
		nDoor = game.add.group();
		nDoor.enableBody = true;
		nDoor.create(game.width-4, game.height-104, 'backyard_door');

		var bedroom_bed = game.add.sprite(game.width/3-50, game.height-81, 'bedroom_bed');
		var bedroom_cabinet = game.add.sprite(game.width/2, 52, 'bedroom_cabinet');

		var closet = game.add.sprite(game.width-170,38, 'closet');
		var closet_door = game.add.sprite(game.width-160, 43, 'closet_door');
		var mirror_stand = game.add.sprite(50, 71, 'mirror_stand');
		var small_cabinet = game.add.sprite(100, 100, 'small_cabinet');
		var normal_portrait = game.add.sprite(game.width/3-33, 10, 'normal_portrait');
		var door1 = game.add.sprite(2, 99, 'door');
		door1.anchor.setTo(.5,.5);
		door1.scale.x *= -1;

		// Player Sprite 
		player = game.add.sprite(40, game.height - 45, 'sprite_atlas', 'player-idle');
		player.anchor.setTo(0.5, 0.5);

		// Player Physics
		game.physics.arcade.enable(player);
		//player.body.bounce.y = 0.1;
		//player.body.gravity.y = 1200;
		player.body.collideWorldBounds = true;

		// Player Animations
		player.animations.add('idle', ['player-idle'], 0, false);
		player.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-0', 1, 6), 10, true);
		player.animations.play('idle');
	},
	interactDoor2: function()
	{
		game.state.start("MainMenu");
	},
	update: function()
	{
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			game.physics.arcade.overlap(player, nDoor, this.interactDoor2, null, this);
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
		{
			player.position.x += playerSpeed;
			player.scale.setTo(1.0, 1);
			player.animations.play('walk');
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
		{
			player.position.x -= playerSpeed;
			player.scale.setTo(-1.0, 1);
			player.animations.play('walk');
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && player.body.touching.down && hitGround)
		{
			player.body.velocity.y = -100;
			player.scale.setTo(-1.0, 1);
			player.animations.play('walk');
		}
		else
		{
			player.animations.play('idle')
		}
	}
}

game.state.add('MainMenu', MainMenu);
//game.state.add('GameOver', GameOver);

// Game "Levels"
game.state.add('FrontDoor', FrontDoor);
game.state.add('LivingRoom', LivingRoom);
game.state.add('BedRoom', BedRoom);
//game.state.add('Backyard', Backyard);
