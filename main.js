// Features_RS Copy of Main

// Globals Variables
// Instantiating game object
var game = new Phaser.Game(576, 160, Phaser.AUTO);
var player, transition;
var playerSpeed = 60;
var ground, apple, plant, door, newspaper;
var usedPlant, usedApple, key, readNewspaper, interactable;
var bottlePutBack = 1;
var livingRoomDoor, nDoor;
var disableInput = 0;
var timer;
var altCouch, move = 0;

var musicTrack1, musicTrack2;
var musicTrack2Paused = 0;
var musicTrack3Paused = 0;

// Tracking From Where
var fromFrontDoor;
var fromLivingRoom;
var fromAlternateLR = 0;

// On Load
window.onload = function()
{
	/*
	 * Add states to the StateManager
	 */

	// Asset Loading and Menus (Maybe include in-game pause)
	game.state.add('Boot', Boot);
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
		// SCRIPTS
		game.load.script('gray', 'https://cdn.rawgit.com/photonstorm/phaser-ce/master/filters/Gray.js');
		game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser-ce/master/filters/Fire.js');

		game.load.atlas('megaAtlas', 'assets/img/megaAtlas.png', 'assets/img/megaAtlas.json')

		//BACKYARD ASSETS-----------------------------------------

		// game.load.image('tree', 'assets/img/backyard/tree.png');
		// game.load.image('apple', 'assets/img/backyard/apple.png');
		// game.load.image('backyard_BG', 'assets/img/backyard/backyard_bg.png');
		// game.load.image('backyard_cement_ground', 'assets/img/backyard/backyard_cement_ground.png');
		// game.load.image('backyard_door', 'assets/img/backyard/backyard_door.png');
		// game.load.image('backyard_ground', 'assets/img/backyard/backyard_ground.png');
		game.load.spritesheet('rain', 'assets/img/rain.png');
		game.load.spritesheet('rain_splash', 'assets/img/rain_splash.png');


		// BEDROOM ASSETS------------------------------------------
		// game.load.image('bedroomBG','assets/img/bedroom/bedroom bg.png');
		// game.load.image('bedroomFloor','assets/img/bedroom/bedroom_floor.png');
		// game.load.image('backyard_door','assets/img/bedroom/backyard_door.png');
		// game.load.image('bedroom_bed','assets/img/bedroom/bed.png');
		// game.load.image('bedroom_cabinet','assets/img/bedroom/cabinet.png');
		// game.load.image('cabinet_broken','assets/img/bedroom/cabinet_broken.png');
		// game.load.image('closet_door','assets/img/bedroom/closet_door.png');
		// game.load.image('closet','assets/img/bedroom/closet.png');
		// game.load.image('mirror_stand','assets/img/bedroom/mirror_stand.png');
		// game.load.image('mirror_stand_broken', 'assets/img/bedroom/mirror_stand_broken.png');
		// game.load.image('small_cabinet','assets/img/bedroom/small_cabinet.png');
		// game.load.image('normal_portrait','assets/img/bedroom/normal_picture.png');
		// game.load.image('door','assets/img/bedroom/front_door.png');
		// game.load.image('pendant', 'assets/img/bedroom/necklase.png');
		// game.load.image('candle_lit', 'assets/img/bedroom/candle_lit.png');
		// game.load.image('candle_out', 'assets/img/bedroom/candle_out.png');
		// game.load.image('wall', 'assets/img/bedroom/wall_structure.png');
		// game.load.image('portrait_mp', 'assets/img/bedroom/portrait_missing_pendant.png');
		// game.load.image('closet_~', 'assets/img/bedroom/closet__.png');

		// Title image
		// game.load.image('title', 'assets/img/Descent_Title.png');
		// game.load.image('space', 'assets/img/press_space.png');
		//game.load.atlas('transition_atlas', 'assets/img/atlas/transition.png', 'assets/img/atlas/transition.json');

		// LIVINGROOM ASSETS
		// Background and Sprites
     //    game.load.image('front_door', 'assets/img/livingroom/front_door.png');
     //    game.load.image('living_room_bg', 'assets/img/livingroom/living_bg.png');
     //    game.load.image('floor', 'assets/img/livingroom/floor.png');
     //    game.load.image('mirror', 'assets/img/livingroom/livingroom_mirror.png');
     //    game.load.image('wine_cabinet', 'assets/img/livingroom/wine_cabinet.png');
     //    game.load.image('bed_door', 'assets/img/livingroom/front_view_door.png');
     //    game.load.image('cat1', 'assets/img/livingroom/cat.png');
     //    game.load.image('portrait', 'assets/img/livingroom/normal_picture.png');
     //    game.load.image('cat2', 'assets/img/livingroom/laying_cat.png');
     //    game.load.image('cabinet_missing', 'assets/img/livingroom/cabinet_missing.png');
     //    game.load.image('portrait_missing', 'assets/img/livingroom/portrait_missing.png');
     //    game.load.image('cracked_bottle', 'assets/img/livingroom/bottle_cracked.png');
     //    game.load.image('podium', 'assets/img/livingroom/podium.png');
	    // game.load.image('y-hint', 'assets/img/livingroom/y1.png');
	    // game.load.image('couch', 'assets/img/livingroom/couch.png');


		// Temporary Assets (If use later then add to atlas)
		// game.load.image('trigger', 'assets/img/greenbox.png');
		// https://opengameart.org/content/meow
		game.load.audio('meow', 'assets/audio/Meow.ogg');
		// https://opengameart.org/content/picked-coin-echo-2
		game.load.audio('pickup', 'assets/audio/Picked Coin Echo 2.mp3');

		// Sprites

		// SFX
		//game.load.audio('scream', 'assets/audio/scream_horror1.mp3');
		game.load.audio('click', 'assets/audio/UI_SFX_Set/click1.mp3');
		//game.load.audio('beep', 'assets/audio/beep.ogg');
		game.load.audio('locked', 'assets/audio/DoorLockSounds/LockedDoorHandleJiggle.ogg');
		game.load.audio('opened', 'assets/audio/DoorLockSounds/UnlockDoor.ogg');
		game.load.audio('heart_beat', 'assets/audio/heartbeat.ogg');
		game.load.audio('rain', 'assets/audio/Dark_Rainy_Night.ogg');
		game.load.audio('muff_rain', 'assets/audio/Dark_Rainy_Night_Muffled.ogg');
		game.load.audio('glass_shatter', 'assets/audio/glass_break.ogg');
		game.load.audio('couch_scrape', 'assets/audio/couch_scrape.ogg');


		// FRONT PORCH ASSETS
		// game.load.image('front_porch_bg', 'assets/img/front_porch/outside_front.png');
		// game.load.image('front_ground', 'assets/img/front_porch/outside_front_ground.png');
		// game.load.image('front_door', 'assets/img/front_porch/front_door.png');
		// game.load.image('porch_platform', 'assets/img/front_porch/porch_platform.png');
		// game.load.image('porch_steps', 'assets/img/front_porch/porch_steps.png');
		// game.load.image('apple', 'assets/img/front_porch/apple.png');
		// game.load.image('plant', 'assets/img/front_porch/plant.png');
		// game.load.image('newspaper', 'assets/img/front_porch/newspaper.png');
		// game.load.image('porch_step2', 'assets/img/front_porch/porch_step2.png')
		// game.load.atlas("sprite_atlas", 'assets/img/atlas/tempsprite.png', 'assets/img/atlas/tempsprite.json');
		// game.load.atlas('cat_atlas', 'assets/img/bedroom/catRun.png', 'assets/img/bedroom/catRun.json');
		// game.load.image('key', 'assets/img/front_porch/key.png');

		// Audio and SFX
		// https://opengameart.org/content/collaboration-theme-song-shades
		game.load.audio('shades', 'assets/audio/Shades/Shades.mp3');
		// https://opengameart.org/content/scary-ambient-wind
		game.load.audio('scary_wind', 'assets/audio/Scary Ambient Wind.ogg');
		game.load.audio('walk_sfx', 'assets/audio/Fantasy Sound Library/Fantasy Sound Library/Mp3/Footsteps/Footstep_Dirt_00.mp3')
		// https://opengameart.org/content/skweaks
		game.load.audio('skweak', 'assets/audio/skweak1.ogg');

		// https://opengameart.org/content/glass-break
		game.load.audio('glass_break', 'assets/audio/glass_breaking.mp3');
		// https://opengameart.org/content/breaking-bottle
		game.load.audio('bottle_break', 'assets/audio/Bottle Break.mp3');

	},
	create: function()
	{
		musicTrack1 = new Phaser.Sound(game, 'shades', 1, true);
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.renderer.renderSession.roundPixels = true;	// No Blurring of Pixels
	},
	update: function()
	{
		if (musicTrack1.isDecoded == true){
			console.log('decoded');
			game.state.start('MainMenu');
		}
	}
}

// Main Menu state (GUI functionality)
var MainMenu = function(game){};
MainMenu.prototype =
{

	create: function()
	{
		musicTrack1 = game.add.audio('shades');
		game.sound.setDecodedCallback([ musicTrack1 ], this.startMusic, this);
		// musicTrack1.play('', 0, 1.0, true);

		var titleImage = game.add.image(game.width/2, 50, 'megaAtlas', 'Descent_Title');
        titleImage.anchor.setTo(0.5, 1);
        titleImage.alpha = 0;
        game.add.tween(titleImage).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

		var space = game.add.image(game.width/2, 140, 'megaAtlas', 'press_space');
        space.anchor.setTo(0.5, 1);
        space.alpha = 0;
        game.add.tween(space).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
	},
	startMusic: function()
	{
		musicTrack1.play('', 0, 0.7, true);
	},
	update: function()
	{
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			musicTrack1.stop();
			game.state.start('AlternateBedRoom');
		}
	}
}



















// Globals to carry from FD
var placedBottle = 0;
var cycle = 0;

// GamePlay State
var FrontDoor = function(game){};
FrontDoor.prototype =
{
	create: function()
	{
		// Rain BGM
		musicTrack1 = game.add.audio('rain');
		musicTrack1.play('', 0, 0.60, true);

		// Creating sfx
		this.walk_sfx = game.add.audio('walk_sfx');
		this.scream = game.add.audio('scream');
		this.beep = game.add.audio('beep');
		this.click = game.add.audio('click');
		this.locked = game.add.audio('locked');
		this.opened = game.add.audio('opened');
		this.pickup = game.add.audio('pickup');

		// Initalizing Variables
		//playerSpeed = 600;
		usedApple = 0;
		usedPlant = 0;
		readNewspaper = 0;
		key = 0;
		interactable = 0;

		// Starting Up Physics and Music
		game.physics.startSystem(Phaser.Physics.Arcade);
		// game.music = game.add.audio('shades');
		// game.music .play('', 0, 1.0, true);

		front_bg = game.add.sprite(0, 0, 'megaAtlas', 'outside_front');

		ground = game.add.group();
		ground.enableBody = true;

		var front_ground = ground.create(0, game.height - 35, 'megaAtlas', 'outside_front_ground');
		front_ground.body.immovable = true;
		var porch_ground = ground.create(game.width - 184, game.height - 46, 'megaAtlas', 'porch_platform');
		porch_ground.body.immovable = true;
		var porch_steps = ground.create(game.width - 215, game.height - 43, 'megaAtlas', 'porch_steps');
		porch_steps.body.immovable = true;
		porch_steps.body.setSize(10,5,2,9);
		porch_steps2 = ground.create(game.width-203, game.height-39, 'megaAtlas', 'porch_step2');
		porch_steps2.body.immovable = true;
		porch_steps3 = ground.create(game.width-194, game.height-43, 'megaAtlas', 'porch_step2');
		porch_steps3.body.immovable = true;



		door = game.add.sprite(game.width - 5, game.height - 107, 'megaAtlas', 'front_door');
		game.physics.arcade.enable(door);
		door.enableBody = true;
		door.body.immovable = true;
		door.body.setSize(10,65,-5,0);

		// newspaper = game.add.sprite(70, game.height - 39, 'newspaper');
		// game.physics.arcade.enable(newspaper);

		apple = game.add.sprite(game.width - 97, game.height - 65, 'megaAtlas', 'apple');
		game.physics.arcade.enable(apple);

		plant = game.add.sprite(game.width - 234, game.height - 60, 'megaAtlas', 'plant');
		game.physics.arcade.enable(plant);
		plant.body.setSize(9, 25, 1, 1);

		// Player Sprite
		player = game.add.sprite(40, game.height - 52, 'megaAtlas', 'player-idle');
		player.anchor.setTo(0.5, 0.5);

		// Player Physics
		game.physics.arcade.enable(player);
		player.body.setSize(12, 30, 4, 2);
		//player.body.bounce.y = 0.1;
		player.body.gravity.y = 1200;
		player.body.collideWorldBounds = true;

		// Player Animations
		player.animations.add('idle', ['player-idle'], 0, false);
		player.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-0', 1, 6), 10, true);
		player.animations.play('idle');

		this.keyObj = game.add.group();
		this.keyObj.enableBody = true;
		this.keyPickup = this.keyObj.create(game.width - 270, game.height - 38, 'megaAtlas', 'key');
		this.keyPickup.alpha = 0.0;

		var emitter = game.add.emitter(400, -100, 800);
        emitter.width = game.world.width;
        //emitter.angle = 20; // uncomment to set an angle for the rain.


        emitter.makeParticles('rain');
        emitter.minParticleScale = .5;
        emitter.maxParticleScale = 1.5;

        emitter.setYSpeed(500, 500);
        emitter.setXSpeed(-500, -500);

        emitter.minRotation = 0;
        emitter.maxRotation = 0;

        emitter.start(false, 700, 5, 0);

        // Transition Test
  //       transition = game.add.sprite(0, 0, 'transition_atlas', 'transition1');
		// transition.animations.add('close', Phaser.Animation.generateFrameNames('transition', 1, 9), 4, false);
		// transition.animations.play('close');

	},
	switchLivingRoom: function()
	{
		game.state.start("LivingRoom");
	},
	interactApple: function(player, apple)
	{
		this.click.play('', 0, 1, false);
		usedApple = 1;
	},
	interactNewspaper: function(player, newspaper)
	{
		this.click.play('', 0, 1, false);
		readNewspaper = 1;
	},
	interactPlant: function(player, plant)
	{
		this.pickup.play('', 0, 1, false);
		usedPlant = 1;
		this.keyPickup.alpha = 1.0;
	},
	pickupKey: function()
	{
		this.pickup.play('', 0, 1, false);
		key = 1;
		this.keyPickup.kill();
	},
	interactDoor: function(player, door)
	{
		if(key == 0 && interactable == 0 || key == 0 && interactable == 1)
		{
			this.locked.play('', 0, 2.0, false);
			interactable = 1;
		}
		else if(key == 1 && interactable == 1)
		{
			this.opened.play('', 0, 1.0, false);
			musicTrack1.stop();
			game.state.start("LivingRoom")
		}
	},
	update: function()
	{
		// render();
		// Collision detection between groups
		var hitGround = game.physics.arcade.collide(player, ground);	// Collision b/t player and platforms
		// player.body.gravity.y = 350;	// Simulate gravity by applying a force in the y-axis
		// player.body.velocity.x = 0;		// Stills horizontal velocity

		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			game.physics.arcade.collide(player, door, this.interactDoor, null, this);
		}


		// Checks for input of player to determine direction of movement

		if(cycle > 0)
		{
			interactable = 1;
			key = 1;
			usedPlant = 1;
		}
		if(usedApple == 0 && interactable == 1)
		{
			game.physics.arcade.overlap(player, apple, this.interactApple, null, this);
		}
		if(usedPlant == 0 && interactable == 1)
		{
			game.physics.arcade.overlap(player, plant, this.interactPlant, null, this);
		}
		if(usedPlant == 1 && cycle == 0)
		{
			game.physics.arcade.overlap(player, this.keyObj, this.pickupKey, null, this);
		}
		if(readNewspaper == 0 && interactable == 0)
		{
			game.physics.arcade.overlap(player, newspaper, this.interactNewspaper, null, this);
		}


		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
		{
			player.body.velocity.x = playerSpeed;
			player.scale.setTo(1.0, 1);
			player.animations.play('walk');
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
		{
			player.body.velocity.x = -playerSpeed;
			player.scale.setTo(-1.0, 1);
			player.animations.play('walk');
		}
		// else if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && player.body.touching.down && hitGround)
		// {
		// 	player.body.velocity.y = -100;
		// 	player.scale.setTo(-1.0, 1);
		// 	player.animations.play('walk');
		// }
		else
		{
			player.body.velocity.x = 0;
			player.animations.play('idle');
		}
	}
}
function render() {
//call renderGroup on each of the alive members
	// game.debug.body(mirror);
	// game.debug.body(player);
	//game.debug.body(portrait)
	// game.debug.body(wineCabinet);
	// game.debug.body(bedDoor);
	// game.debug.body(cat1);
	// game.debug.body(mirror_stand);
	// game.debug.body(small_cabinet);
	// game.debug.body(bedroom_bed);
	// game.debug.body(bedroom_cabinet);
	// game.debug.body(closet);
	// game.debug.body(closet_door);
	game.debug.body(player);
	ground.forEach(game.debug.body, game.debug);
}























// Global Variables to keep track of events
var bottleBroke = 0;
var mirrorTurned = 0;
var revealAlternate = 0;

// GamePlay State
var LivingRoom = function(game){};
LivingRoom.prototype =
{

	create: function()
	{
		// Starting Up Physics & Initalizing Variables
		game.physics.startSystem(Phaser.Physics.Arcade);
		this.disableInput = 0;

		// Muffled Rain BGM
		musicTrack2 = game.add.audio('muff_rain');
		musicTrack2.play('', 0, 1.0, true);

		// Creating instances of Audio
		this.walk_sfx = game.add.audio('walk_sfx');
		this.scream = game.add.audio('scream');
		this.beep = game.add.audio('beep');
		this.click = game.add.audio('click');
		this.locked = game.add.audio('locked');
		this.opened = game.add.audio('opened');
		this.glass_break = game.add.audio('bottle_break');
		this.meow = game.add.audio('meow');
		this.pickup = game.add.audio('pickup');
		this.skweak = game.add.audio('skweak');
		this.glassShatter = game.add.audio('glass_shatter');

		// Creating Sprites
		game.add.sprite(0, 0, 'megaAtlas', 'living_bg');	// Background for the room

		ground = game.add.group();	// Ground sprite group - add anythign that player can stand on
		ground.enableBody = true;
		this.floor = ground.create(0, 130, 'megaAtlas', 'floor');
		this.floor.body.immovable = true;

		this.portrait = game.add.sprite(320, 20, 'megaAtlas', 'normal_picture');
		this.couch = game.add.sprite(305, 100, 'megaAtlas', 'couch');

		if(bottleBroke == 1)
		{
			this.brokeWineCabinet = game.add.sprite(110, 47, 'megaAtlas', 'cabinet_missing');
			this.brokeWineCabinet.alpha = 1.0;
			this.wineCabinet = game.add.sprite(110, 47, 'megaAtlas', 'wine_cabinet');
			this.wineCabinet.alpha = 0.0;
		}
		else
		{
			this.wineCabinet = game.add.sprite(110, 47, 'megaAtlas', 'wine_cabinet');	
			this.wineCabinet.alpha = 1.0;
			this.wineCabinetTrigger = game.add.sprite(150, 106, 'megaAtlas', 'greenbox');
			this.wineCabinetTrigger.scale.setTo(0.2, 0.8);
			this.wineCabinetTrigger.alpha = 0.0;
			this.brokeWineCabinet = game.add.sprite(110, 47, 'megaAtlas', 'cabinet_missing');
			this.brokeWineCabinet.alpha = 0;
		}

		if(mirrorTurned == 1)
		{
			this.mirror = game.add.sprite(480, 80, 'megaAtlas', 'livingroom_mirror');
			this.mirror.anchor.setTo(0.5, 0.5);
			this.mechHint = game.add.sprite(480, 80, 'megaAtlas', 'y1');
			this.mechHint.anchor.setTo(0.5, 0.5);
			this.mechHint.alpha = 0.0;	// Can take out later just used as reference
			this.mirror.angle += 30;
			this.mechHint.angle += 30;
		}
		else
		{
			this.mirror = game.add.sprite(480, 80, 'megaAtlas', 'livingroom_mirror');
			this.mirror.anchor.setTo(0.5, 0.5);
			this.mechHint = game.add.sprite(480, 80, 'megaAtlas', 'y1');
			this.mechHint.anchor.setTo(0.5, 0.5);
			this.mechHint.alpha = 0.0;	// Can take out later just used as reference
		}


		this.frontDoor = game.add.sprite(5, 69, 'megaAtlas', 'front_door');
		this.frontDoor.scale.setTo(-1,1);
		this.bedDoor = game.add.sprite(260, 69, 'megaAtlas', 'front_view_door');
		this.bedDoor.scale.setTo(-1, 1);
		this.cat = game.add.sprite(520, 96, 'megaAtlas', 'cat');
		this.catTrigger = game.add.sprite(480, 106, 'megaAtlas', 'greenbox');
		this.catTrigger.scale.setTo(0.2, 0.8);
		this.catTrigger.alpha = 0.0;
		this.cat2 = game.add.sprite(175, 34, 'megaAtlas', 'laying_cat');
		this.podium = game.add.sprite(519, 109, 'megaAtlas', 'podium');

		if(fromAlternateLR == 1)
		{
			player = game.add.sprite(248, game.height - 45, 'megaAtlas', 'player-idle');
			player.anchor.setTo(0.5, 0.5);
			player.scale.setTo(-1,1);
		}
		else
		{
			player = game.add.sprite(40, game.height - 45, 'megaAtlas', 'player-idle');
			player.anchor.setTo(0.5, 0.5);
		}

		game.physics.arcade.enable(player);		// Player Physics
		player.smoothed = true;
		player.body.setSize(12, 30, 4, 2);
		player.body.gravity.y = 0;				// To Fly to ceiling apply y velocity until collides with top
		player.body.collideWorldBounds = true;

		player.animations.add('idle', ['player-idle'], 0, false);		// Player Animations
		player.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-0', 1, 6), 10, true);
		player.animations.play('idle');

		game.physics.arcade.enable([this.couch, this.wineCabinet, this.wineCabinetTrigger, this.brokeWineCabinet, this.mirror, this.frontDoor, this.bedDoor, this.cat, this.catTrigger]);
	},
	bottlePrompt: function()
	{
		this.meow.play('', 0, 1, false);
		this.disableInput = 0;
	},
	revealHint: function()
	{
		mirrorTurned = 1;
		this.meow.play('', 0, 1, false);
		this.disableInput = 0;
	},
	interactDoor: function()
	{
		if(placedBottle == 1)
		{
			musicTrack2.stop();
			this.opened.play('', 0, 1.0, false);
			game.state.start('BedRoom');
		}
		else
		{	
			musicTrack2.stop();
			this.opened.play('', 0, 1.0, false);
			game.state.start('AlternateLivingRoom');
		}
	},
	placeBottle: function()
	{
		this.wineCabinet.alpha = 1.0;
		this.brokeWineCabinet.alpha = 0.0;
		this.pickup.play('', 0, 1, false);
		placedBottle = 1;
	},
	update: function()
	{
		// render();
		var bottleBreak = game.physics.arcade.collide(player, this.wineCabinetTrigger);
		var mirrorTurn = game.physics.arcade.collide(player, this.catTrigger);
		
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			game.physics.arcade.collide(player, this.bedDoor, this.interactDoor, null, this);
		}
		if(haveBottle == 1 && placedBottle == 0)
		{
			game.physics.arcade.overlap(player, this.wineCabinet, this.placeBottle, null, this);
		}
		if(bottleBreak && bottleBroke == 0)
		{
			this.wineCabinet.alpha = 0.0;
			this.brokeWineCabinet.alpha = 1.0;
			bottleBroke = 1;
			this.disableInput = 1;
			this.glassShatter.play('', 0, 1, false);
			this.glassShatter.onStop.add(this.bottlePrompt, this);
		}
		if(mirrorTurn && mirrorTurned == 0)
		{
			mirrorTurned = 1;
			this.disableInput = 1;
			this.skweak.play('', 0, 1, false);
			this.mirror.angle += 30;
			this.mechHint.angle += 30;
			this.skweak.onStop.add(this.revealHint, this);
		}

		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.disableInput == 0)
		{
			player.body.velocity.x = playerSpeed;
			player.scale.setTo(1.0, 1);
			player.animations.play('walk');
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.disableInput == 0)
		{
			player.body.velocity.x = -playerSpeed;
			player.scale.setTo(-1.0, 1);
			player.animations.play('walk');
		}
		else
		{
			player.body.velocity.x = 0;
			player.animations.play('idle')
		}
	}
}












// Global Variables to keep track of events
var bottleBroke = 0;
var mirrorTurned = 0;
var revealAlternate = 0;
var ghostLook = 0.5;
var haveBottle = 0;

// GamePlay State
var AlternateLivingRoom = function(game){};
AlternateLivingRoom.prototype =
{

	create: function()
	{
		// Variable Initalization
		this.disableInput = 0;
		this.couchS = 0;

		// Starting Up Physics and Music
		musicTrack3 = game.add.audio('heart_beat');
		musicTrack3.play('', 0, 3.0, true);

		// Starting Up Physics & Initalizing Variables
		game.physics.startSystem(Phaser.Physics.Arcade);
		this.disableInput = 0;

		// Creating instances of Audio
		this.walk_sfx = game.add.audio('walk_sfx');
		//this.scream = game.add.audio('scream');
		//this.beep = game.add.audio('beep');
		this.click = game.add.audio('click');
		this.locked = game.add.audio('locked');
		this.opened = game.add.audio('opened');
		this.glass_break = game.add.audio('bottle_break');
		this.meow = game.add.audio('meow');
		this.pickup = game.add.audio('pickup');
		this.skweak = game.add.audio('skweak');
		this.couchScrape = game.add.audio('couch_scrape');

		// Creating Sprites 
		game.add.sprite(0, 0, 'megaAtlas', 'living_bg');	// Background for the room

		ground = game.add.group();	// Ground sprite group - add anythign that player can stand on
		ground.enableBody = true;
		this.floor = ground.create(0, 130, 'megaAtlas', 'floor');
		this.floor.body.immovable = true;

		this.Aportrait = game.add.sprite(160, 40, 'megaAtlas', 'portrait_missing');
		this.Aportrait.alpha = ghostLook;
		this.Acouch = game.add.sprite(248, 115, 'megaAtlas', 'couch');
		this.Acouch.alpha = ghostLook;
		this.Acouch.anchor.setTo(0.5, 0.5);
		this.AwineCabinet = game.add.sprite(320, 47, 'megaAtlas', 'wine_cabinet');
		this.AwineCabinet.alpha = ghostLook;

		if(haveBottle == 0)
        {
        	this.indicator = game.add.sprite(394, 118, 'megaAtlas', 'greenbox');
	        this.indicator.scale.setTo(0.6, 0.6);
	        this.indicator.alpha = 0.5;
	        this.crackedBottle = game.add.sprite(405, 128, 'megaAtlas', 'bottle_cracked');
	        this.crackedBottle.anchor.setTo(0.5, 0.5);
	        this.crackedBottle.angle += 90;
        }

		if(mirrorTurned == 1)
		{
			this.mirror = game.add.sprite(80, 75, 'megaAtlas', 'livingroom_mirror');
			this.mirror.anchor.setTo(0.5, 0.5);
			this.mirror.alpha = ghostLook;
			this.mechHint = game.add.sprite(80, 75, 'megaAtlas', 'y1');
			this.mechHint.anchor.setTo(0.5, 0.5);
			this.mechHint.alpha = 1.0;
			this.mirror.angle += 30;
			this.mechHint.angle += 30;
		}
		else
		{
			this.mirror = game.add.sprite(80, 80, 'megaAtlas', 'livingroom_mirror');
			this.mirror.anchor.setTo(0.5, 0.5);
			this.mirror.alpha = ghostLook;
		}


		this.LRDoor = game.add.sprite(5, 69, 'megaAtlas', 'front_door');
		this.LRDoor.scale.setTo(-1,1);
		this.fakeDoor = game.add.sprite(510, 100, 'megaAtlas', 'front_view_door');
		this.fakeDoor.scale.setTo(-1, 1);
		this.fakeDoor.anchor.setTo(0.5, 0.5);
		this.fakeDoor.angle += 90;
		this.fakeDoor.alpha = ghostLook;
		this.cat = game.add.sprite(426, 96, 'megaAtlas', 'cat');
		this.cat2 = game.add.sprite(325, 34, 'megaAtlas', 'laying_cat');
		this.podium = game.add.sprite(425, 109, 'megaAtlas', 'podium');
		player = game.add.sprite(80, game.height - 45, 'megaAtlas', 'player-idle');
		player.anchor.setTo(0.5, 0.5);

		game.physics.arcade.enable(player);		// Player Physics
		player.smoothed = true;
		player.body.setSize(12, 30, 4, 2);
		player.body.gravity.y = 0;				// To Fly to ceiling apply y velocity until collides with top
		player.body.collideWorldBounds = true;

		player.animations.add('idle', ['player-idle'], 0, false);		// Player Animations
		player.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-0', 1, 6), 10, true);
		player.animations.play('idle');

		// Setting filters
		this.background = game.add.sprite(0, 0);
		this.background.width = game.width;
		this.background.height = game.height;
		this.fire = game.add.filter('Fire', game.width, game.height);
		this.fire.alpha = 0.0;
		this.background.filters = [this.fire];

		this.gray = game.add.filter('Gray');
		game.world.filters = [this.gray];

		game.physics.arcade.enable([this.LRDoor, this.fakeDoor, this.crackedBottle]);
	},
	interactDoor: function()
	{
		this.opened.play('', 0, 1, false);
		fromAlternateLR = 1;
		musicTrack3.stop();
		game.state.start('LivingRoom');
	},
	interactFakeDoor: function()
	{
		this.locked.play('', 0, 1, false);
	},
	pickupBottle: function()
	{
		haveBottle = 1;
		this.disableInput = 1;
		this.crackedBottle.kill();
		this.indicator.kill();
		this.pickup.play('', 0, 1, false);
		this.pickup.onStop.add(this.meowIndicate, this);
	},
	meowIndicate: function()
	{
		this.meow.play('', 0, 1, false);
		this.disableInput = 0;
	},
	update: function()
	{
		// render();
		this.fire.update();	

		// Checking overlap for interactions
		game.physics.arcade.overlap(player, this.crackedBottle, this.pickupBottle, null, this);

		if(haveBottle == 1 && player.position.x > 50 && player.position.x < 250)
		{
			if(this.couchS == 0)
			{
				this.couchScrape.play('', 0, 1, true);
				this.couchS = 1;
			}
			else if(player.body.velocity.x != 0 && this.couchS == 1)
			{
				this.couchScrape.resume();
			}
			if(player.body.velocity.x == 0 && this.couchS == 1)
			{
				this.couchScrape.pause();
			}
			this.Acouch.position.x = player.position.x;
		}
		else if(player.position.x < 50 || player.position.x > 250)
		{
			if(this.couchS == 1)
			{
				this.couchScrape.pause();
			}
		}

		// Navigation through doors
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			game.physics.arcade.overlap(player, this.LRDoor, this.interactDoor, null, this);
			game.physics.arcade.overlap(player, this.fakeDoor, this.interactFakeDoor, null, this);
		}

		// Player Movement Controls
		if(game.input.keyboard.isDown(Phaser.Keyboard.Y) && this.disableInput == 0)
		{
			player.body.velocity.x = playerSpeed;
			player.scale.setTo(1.0, 1);
			player.animations.play('walk');
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.disableInput == 0)
		{
			player.body.velocity.x = -playerSpeed;
			player.scale.setTo(-1.0, 1);
			player.animations.play('walk');
		}
		else
		{
			player.body.velocity.x = 0;
			player.animations.play('idle')
		}
	}
}








// Initalilzing globals needed for this level
var firstTimeBedroom = 0;
var usedCloset = 0;
var havePendant = 0;

var BedRoom = function(game){};
BedRoom.prototype =
{
	create: function()
	{
		// Initializing variables
		usedCloset = 0;
		playerSpeed = 60;
		disableInput = 0;
		this.disableInput = 0;
		this.pendantSpawn = 0;
		this.passedDresser = 0;
		game.physics.startSystem(Phaser.Physics.Arcade);

		// Muffled Rain BGM
		musicTrack2 = game.add.audio('muff_rain');
		musicTrack2.play('', 0, 1, true);

		// Creating instances of Audio
		this.walk_sfx = game.add.audio('walk_sfx');
		//this.scream = game.add.audio('scream');
		//this.beep = game.add.audio('beep');
		this.click = game.add.audio('click');
		this.locked = game.add.audio('locked');
		this.opened = game.add.audio('opened');
		this.glass_break = game.add.audio('bottle_break');
		this.meow = game.add.audio('meow');
		this.pickup = game.add.audio('pickup');
		this.skweak = game.add.audio('skweak');
		
		// Creating Sprites 
		game.add.sprite(0,0, 'megaAtlas', 'bedroom bg');		// Anything the player can stand on
		ground = game.add.group();
		this.floor = ground.create(0, game.height - 31, 'megaAtlas', 'bedroom_floor');

		this.backyardDoor = game.add.sprite(game.width - 4, game.height - 104, 'megaAtlas', 'backyard_door');
		this.bed = game.add.sprite(game.width/3-50, game.height - 81, 'megaAtlas', 'bed');
		this.cabinet = game.add.sprite(game.width/2, 52, 'megaAtlas', 'cabinet');
		this.closet = game.add.sprite(game.width - 170, 38, 'megaAtlas', 'closet');
		if(usedCloset == 1)
		{
			this.closetDoor = game.add.sprite(game.width - 127, 43, 'megaAtlas', 'closet_door');
		}
		else
		{
			this.closetDoor = game.add.sprite(game.width-160, 43, 'megaAtlas', 'closet_door');
		}

		this.mirrorStand = game.add.sprite(55, 71, 'megaAtlas', 'mirror_stand');
		this.smallCabinet = game.add.sprite(100, 99, 'megaAtlas', 'small_cabinet');
		this.candle = game.add.sprite(115, 87, 'megaAtlas', 'candle_lit');
		this.normalPortrait = game.add.sprite(game.width/3 - 33, 10, 'megaAtlas', 'normal_picture');
		//this.door = game.add.sprite(2, 99, 'megaAtlas', 'door');
		//this.door.anchor.setTo(0.5, 0.5);
		//this.door.scale.x *= -1;

		if(firstTimeBedroom == 0)
		{
			this.catTrigger = game.add.sprite(180, 117, 'megaAtlas', 'greenbox');
			this.catTrigger.scale.setTo(0.2, 0.8);
			this.catTrigger.alpha = 0.0;
			this.bedCat = game.add.sprite(0, 0, 'megaAtlas', 'cat-run-1');
			cat_run = this.bedCat.animations.add('megaAtlas', ['cat-run-1', 'cat-run-2', 'cat-run-3', 'cat-run-4', 'cat-run-5', 'cat-run-6', 'cat-run-7', 'cat-run-8', 'cat-run-9', 'cat-run-10', 'cat-run-11']);
		}

		this.catDresser = game.add.sprite(353, 80, 'megaAtlas', 'laying_cat');
		// this.catDTrigger = game.add.sprite(335, 105, 'trigger');
		// this.catDTrigger.scale.setTo(0.2, 0.8);
		// this.catDTrigger.alpha = 1.0;

		this.pendant = game.add.sprite(game.width/2, game.height - 69, 'megaAtlas', 'necklase');
		this.pendant.alpha = 1.0;

		// Player Sprite
		player = game.add.sprite(30, game.height - 47, 'megaAtlas', 'player-idle');
		player.anchor.setTo(0.5, 0.5);

		// Player Physics
		game.physics.arcade.enable(player);		// Player Physics
		player.smoothed = true;
		player.body.setSize(12, 32, 4, 1);
		player.body.gravity.y = 0;				// To Fly to ceiling apply y velocity until collides with top
		player.body.collideWorldBounds = true;

		player.animations.add('idle', ['player-idle'], 0, false);		// Player Animations
		player.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-0', 1, 6), 10, true);
		player.animations.play('idle');

		game.physics.arcade.enable([this.cabinet, this.closetDoor, this.catTrigger, this.pendant, this.backyardDoor]);

	},

	interactDoor2: function()
	{
		this.opened.play('', 0, 1, false);
		this.opened.onStop.add(this.switchState, this);
	},
	switchState: function()
	{
		game.state.start("AlternateBedRoom");
	},
	closetDelay: function()
	{
		this.disableInput = 0;
		usedCloset = 1;
	},
	interactCloset: function(player, closet_door)
	{
		this.disableInput = 1;
		this.closetDoor.position.x += 33;
		this.skweak.play('', 0, 1, false);
		this.skweak.onStop.add(this.closetDelay, this);
	},
	playCatAnimation: function()
	{
		firstTimeBedroom = 1;
		cat_run.play(10, false, true);
	},
	meowIndicate: function()
	{
		this.meow.play('', 0, 1, false);
		this.disableInput = 0;
		disableInput = 0;
	},
	collectPendant: function()
	{
		disableInput = 1;
		this.pendant.kill();
		havePendant = 1;
		this.pickup.play('', 0, 1, false);
		this.pickup.onStop.add(this.meowIndicate, this);
	},
	update: function()
	{
		// Collision Trigger Events
		// render();
		var passCat = game.physics.arcade.collide(player, this.catTrigger);

		if(passCat && firstTimeBedroom == 0)
		{
			this.catTrigger.kill();
			this.disableInput = 1;
			this.meow.play('', 0, 1, false);
			this.meow.onStop.add(this.playCatAnimation, this);
		}
		
		if(cat_run.isFinished == true)
		{
			this.disableInput = 0;
		}

		// Checking Overlap to Pick up Objectives
		if(usedCloset == 0)
		{
			game.physics.arcade.overlap(player, this.closetDoor, this.interactCloset, null, this);
		}
		game.physics.arcade.overlap(player, this.pendant, this.collectPendant, null, this);

		// Navigation through doors
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
            game.physics.arcade.overlap(player, this.backyardDoor, this.interactDoor2, null, this);
        }

        // Movement Controls
		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.disableInput == 0 && disableInput == 0)
		{
			player.body.velocity.x = playerSpeed;
			player.scale.setTo(1.0, 1);
			player.animations.play('walk');
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.disableInput == 0  && disableInput == 0)
		{
			player.body.velocity.x = -playerSpeed;
			player.scale.setTo(-1.0, 1);
			player.animations.play('walk');
		}
		else
		{
			player.body.velocity.x = 0;
			player.animations.play('idle')
		}
	}
}





var passMirror = 0;
var passDresser = 0;
var flipSide = 0;
var placedPendant = 0;
var haveKey = 0;

var AlternateBedRoom = function(game){};
AlternateBedRoom.prototype =
{

	create: function()
	{
		// Initialize Variables
		usedCloset = 0;

		// Starting Up Physics and Music
		musicTrack3 = game.add.audio('heart_beat');
		musicTrack3.play('', 0, 3.0, true);		// Maybe 2.5

		// Creating instances of Audio
		this.walk_sfx = game.add.audio('walk_sfx');
		//this.scream = game.add.audio('scream');
		//this.beep = game.add.audio('beep');
		this.click = game.add.audio('click');
		this.locked = game.add.audio('locked');
		this.opened = game.add.audio('opened');
		this.glass_break = game.add.audio('bottle_break');
		this.meow = game.add.audio('meow');
		this.pickup = game.add.audio('pickup');
		this.skweak = game.add.audio('skweak');
		this.glassShatter = game.add.audio('glass_shatter');

		// Creating Sprites
		this.bedroomBG = game.add.sprite(0, 0, 'megaAtlas', 'bedroom bg');
		ground = game.add.group();
		ground.enableBody = true;

		this.floor = ground.create(0, game.height-31, 'megaAtlas', 'bedroom_floor');
		this.floor.body.immovable = true;
		this.backyardDoor = game.add.sprite(game.width-45, 25, 'megaAtlas', 'front_view_door');
		this.backyardDoor.anchor.setTo(0.5, 0.5);
		this.backyardDoor.scale.setTo(-1, 1)
		this.backyardDoor.angle += 90;
		this.bed = game.add.sprite(game.width/2 + 60, game.height-81, 'megaAtlas', 'bed');
		this.cabinet = game.add.sprite(game.width/2 - 70, 52, 'megaAtlas', 'cabinet');

		this.brokenCabinet = game.add.sprite(game.width/2 - 70, 52, 'megaAtlas', 'cabinet_broken');
		this.walls = game.add.group();
		this.walls.enableBody = true;
		this.wall = this.walls.create(game.width/2 - 93, 38, 'megaAtlas', 'wall_structure');	// FIX THE GODDAM WALL
		this.wall.body.immovable = true;
		// this.wall.enableBody = true;
		// this.wall.body.immovable = true;
		this.wall2 = this.walls.create(game.width/2 + 27, 0, 'megaAtlas', 'wall_structure');
		this.wall2.body.immovable = true;
		// this.wall2.enableBody = true;
		// this.wall2.body.immovable = true;
		if (passDresser == 0)
		{
			this.brokenCabinet.alpha = 0;
		}

		this.closet = game.add.sprite(90, 38, 'megaAtlas', 'closet_~');
		this.closetDoor = game.add.sprite(133, 43, 'megaAtlas', 'closet_door');
		this.mirrorStand = game.add.sprite(513, 71, 'megaAtlas', 'mirror_stand');
		this.brokenMirrorStand = game.add.sprite(513, 71, 'megaAtlas', 'mirror_stand_broken');
		if (passMirror == 0)
		{
			this.brokenMirrorStand.alpha = 0;
		}

		this.smallCabinet = game.add.sprite(game.width - 130, 99, 'megaAtlas', 'small_cabinet');
		this.portraitP = game.add.sprite(game.width/2 + 75, 10, 'megaAtlas', 'portrait_missing');
		this.portraitP.alpha = 0.0;
		this.portrait = game.add.sprite(game.width/2 + 75, 10, 'megaAtlas', 'portrait_missing_pendant');
		this.pTrigger = game.add.sprite(game.width/2 + 90, 40, 'megaAtlas', 'greenbox');
		this.pTrigger.alpha = 0.0;
		this.pTrigger.scale.setTo(0.3, 0.3);
		this.key = game.add.sprite(528, 126, 'megaAtlas', 'key');
		this.key.alpha = 0.0;

		game.physics.arcade.enable([this.backyardDoor, this.pTrigger, this.closetDoor, this.portrait, this.mirrorStand, this.cabinet, this.key]);

		player = game.add.sprite(40, game.height -47, 'megaAtlas', 'player-idle');
		player.scale.setTo(1, 1);	// CHANGE HERE IF YOU WANT TO START ON TOP

		player.anchor.setTo(0.5, 0.5);

		game.physics.arcade.enable(player);		// Player Physics
		player.smoothed = true;
		player.body.setSize(12, 32, 4, 0);
		player.body.gravity.y = 0;				// To Fly to ceiling apply y velocity until collides with top
		player.body.collideWorldBounds = true;

		player.animations.add('idle', ['player-idle'], 0, false);		// Player Animations
		player.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-0', 1, 6), 10, true);
		player.animations.play('idle');

		this.gray = game.add.filter('Gray');	// Preping Filter To Use
		game.world.filters = [this.gray];		// Setting Filter to Gray

		this.background = game.add.sprite(0, 0);
		this.background.width = game.width;
		this.background.height = game.height;
		this.fire = game.add.filter('Fire', game.width, game.height);
		this.fire.alpha = 0.0;
		this.background.filters = [this.fire];
	},
	changeState: function()
	{
		musicTrack3.stop();
		game.state.start("Backyard");
	},
	interactDoor: function()
	{
		this.locked.play('', 0, 1, false);
	},
	interactDoor2: function()
	{
		if(haveKey == 0)
		{
			this.locked.play('', 0, 1, false);
		}
		else if(haveKey == 1)
		{
			this.opened.play('', 0, 1, false)
			this.opened.onStop.add(this.changeState, this);
		}
	},
	interactCloset: function(player, closet_door)
	{
		this.skweak.play('', 0, 1, false);
		this.closetDoor.position.x -= 33;
		usedCloset = 1;
	},
	interactDresser: function(player, bedroom_cabinet)
	{
		passDresser = 1;
		this.glassShatter.play('', 0, 1, false);
		this.brokenCabinet.alpha = 1;
	},
	interactMirror: function(player, mirror_stand)
	{
		passMirror = 1;
		this.glassShatter.play('', 0, 1, false);
		this.brokenMirrorStand.alpha = 1;
	},
	putPendant: function()
	{
		this.pTrigger.kill();
		this.pickup.play('', 0, 1, false);
		placedPendant = 1;
		this.key.alpha = 1.0;
		this.portraitP.alpha = 1.0;
		this.portrait.alpha = 0.0;
	},
	pickupKey: function()
	{
		this.key.kill();
		this.pickup.play('', 0, 1, false);
		haveKey = 1;
	},
	update: function()
	{
		// render();
		this.fire.update();
		var hitfloor = game.physics.arcade.collide(player, ground);
		var collideWall = game.physics.arcade.collide(player, this.wall);
		var collideWall = game.physics.arcade.collide(player, this.wall2);
		// Checking overlap to pick up items
		if(usedCloset == 0)
		{
			game.physics.arcade.overlap(player, this.closetDoor, this.interactCloset, null, this);
		}
		if(passMirror == 0)
		{
			game.physics.arcade.overlap(player, this.mirrorStand, this.interactMirror, null, this);
		}
		if(passDresser == 0)
		{
			game.physics.arcade.overlap(player, this.cabinet, this.interactDresser, null, this);
		}
		if(placedPendant == 0)
		{
			game.physics.arcade.overlap(player, this.pTrigger, this.putPendant, null, this);
		}
		if(this.key.alpha == 1.0)
		{
			game.physics.arcade.overlap(player, this.key, this.pickupKey, null, this);
		}

		// Navigation through doors
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.physics.arcade.overlap(player, this.door, this.interactDoor, null, this);
            game.physics.arcade.overlap(player, this.backyardDoor, this.interactDoor2, null, this);
        }

		// Player Movement
		if(hitfloor)
		{
			player.body.velocity.y = 0;
		}
		if(game.input.keyboard.justPressed(Phaser.Keyboard.TILDE) && flipSide == 1)
        {
        	flipSide = 0;
        	player.scale.y = 1.0;
        	player.body.gravity.y = 30;
        	// player.position.y = game.height-45;
        }
        else if(game.input.keyboard.justPressed(Phaser.Keyboard.TILDE) && flipSide == 0)
        {
        	flipSide = 1;
        	player.scale.y = -1.0;
        	player.body.gravity.y = -20;
        	// player.position.y = 0;
        }
		if(game.input.keyboard.isDown(Phaser.Keyboard.Y) && disableInput == 0)
		{
			player.body.velocity.x = playerSpeed;
			player.scale.x = 1.0;		// MAKE TYHIS 11 LOL
			player.animations.play('walk');
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && disableInput == 0)
		{
			player.body.velocity.x = -playerSpeed;
			player.scale.x = -1.0;
			player.animations.play('walk');
		}
		else
		{
			player.body.velocity.x = 0;
			player.animations.play('idle')
		}
	}
}

//---------BACKYARD-----------------------------------
var Backyard = function(game){};
Backyard.prototype =
    {
        create: function () {

        	this.appleDrop = 0;
        	disableInput = 0;

        	// Rain BGM
        	musicTrack1 = game.add.audio('rain');
        	musicTrack1.play('', 0, 0.60, true);

            game.add.sprite(0, 0, 'megaAtlas', 'backyard_bg');
            this.locked = game.add.audio('locked');

            this.tree = game.add.sprite(352, 0, 'megaAtlas', 'tree');
            this.appleTrigger = game.add.sprite(379, 120, 'megaAtlas', 'greenbox');
            this.appleTrigger.scale.setTo(0.2, 0.2);
            this.appleTrigger.alpha = 0.0;
            ground = game.add.group();
			ground.enableBody = true;

			this.backyard_ground = ground.create(0, 129, 'megaAtlas', 'backyard_ground');
			this.backyard_ground.body.immovable = true;
			this.backyard_cement_ground = ground.create(0, 126, 'megaAtlas', 'backyard_cement_ground');
			this.backyard_cement_ground.body.immovable = true;

            player = game.add.sprite(40, game.height - 56, 'megaAtlas', 'player-idle');
            player.anchor.setTo(0.5, 0.5);

            // Player Physics
            game.physics.arcade.enable([player, this.appleTrigger]);
            player.body.setSize(12, 30, 4, 2);
            // player.body.bounce.y = 0.1;
            player.body.gravity.y = 1200;
            player.body.collideWorldBounds = true;

            this.apple = game.add.sprite(368, 73, 'megaAtlas', 'apple');

            // Player Animations
            player.animations.add('idle', ['player-idle'], 0, false);
            player.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-0', 1, 6), 10, true);
            player.animations.play('idle');

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
        },
        appleFall: function()
        {
        	disableInput = 1;
        	this.appleTrigger.kill();
        	this.appleDrop = 1;
        },
        update: function () {
			// render();
        	var hitGround = game.physics.arcade.collide(player, ground);
        	var underApple = game.physics.arcade.collide(player, this.appleTrigger);

        	if(underApple)
        	{
        		this.appleFall();
        	}
        	if(this.appleDrop == 1)
        	{
        		this.apple.position.y += 1;
        	}
        	if(this.apple.position.y == player.position.y - 16)
        	{
        		game.state.start('MainMenu');
        	}

            if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && disableInput == 0) {
                player.body.velocity.x = playerSpeed;
                player.scale.setTo(1.0, 1.0);
                player.animations.play('walk');
            }
            else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && disableInput == 0) {
                player.body.velocity.x = -playerSpeed;
                player.scale.setTo(-1.0, 1);
                player.animations.play('walk');
            }
            else
			{
				player.body.velocity.x = 0;
				player.animations.play('idle')
			}

        },


    }

/*
 * Add states to the StateManager
 */
game.state.add('MainMenu', MainMenu);

// Game "Levels"
game.state.add('FrontDoor', FrontDoor);
game.state.add('LivingRoom', LivingRoom);
game.state.add('AlternateLivingRoom', AlternateLivingRoom);
game.state.add('BedRoom', BedRoom);
game.state.add('AlternateBedRoom', AlternateBedRoom);
game.state.add('Backyard', Backyard);