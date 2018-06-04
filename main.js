// Features_RS Copy of Main

// Globals Variables
// Instantiating game object
var game = new Phaser.Game(576, 160, Phaser.AUTO);
var player;
var playerSpeed = 600;
var ground, apple, plant, door, newspaper;
var usedPlant, usedApple, key, readNewspaper, interactable;
var bottlePutBack = 1;
var livingRoomDoor, nDoor;
var disableInput = 0;
var timer;
var altCouch, move = 0;

var musicTrack1, musicTrack2;
var musicTrack2Paused = 0;

// Tracking From Where
var fromFrontDoor;
var fromLivingRoom;
var fromAlternateLR;

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

		//BACKYARD ASSETS-----------------------------------------

		game.load.image('tree', 'assets/img/backyard/tree.png');
		game.load.image('apple', 'assets/img/backyard/apple.png');
		game.load.image('backyard_BG', 'assets/img/backyard/backyard_bg.png');
		game.load.image('backyard_cement_ground', 'assets/img/backyard/backyard_cement_ground.png');
		game.load.image('backyard_door', 'assets/img/backyard/backyard_door.png');
		game.load.image('backyard_ground', 'assets/img/backyard/backyard_ground.png');
		game.load.spritesheet('rain', 'assets/img/rain.png');
		game.load.spritesheet('rain_splash', 'assets/img/rain_splash.png');


		// BEDROOM ASSETS------------------------------------------
		game.load.image('bedroomBG','assets/img/bedroom/bedroom bg.png');
		game.load.image('bedroomFloor','assets/img/bedroom/bedroom_floor.png');
		game.load.image('backyard_door','assets/img/bedroom/backyard_door.png');
		game.load.image('bedroom_bed','assets/img/bedroom/bed.png');
		game.load.image('bedroom_cabinet','assets/img/bedroom/cabinet.png');
		game.load.image('cabinet_broken','assets/img/bedroom/cabinet_broken.png');
		game.load.image('closet_door','assets/img/bedroom/closet_door.png');
		game.load.image('closet','assets/img/bedroom/closet.png');
		game.load.image('mirror_stand','assets/img/bedroom/mirror_stand.png');
		game.load.image('mirror_stand_broken', 'assets/img/bedroom/mirror_stand_broken.png');
		game.load.image('small_cabinet','assets/img/bedroom/small_cabinet.png');
		game.load.image('normal_portrait','assets/img/bedroom/normal_picture.png');
		game.load.image('door','assets/img/bedroom/front_door.png');
		game.load.image('pendant', 'assets/img/bedroom/necklase.png');


		// Title image
		game.load.image('title', 'assets/img/Descent_Title.png');
		game.load.image('space', 'assets/img/press_space.png');

		// LIVINGROOM ASSETS
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
        game.load.image('cabinet_missing', 'assets/img/livingroom/cabinet_missing.png');
        game.load.image('portrait_missing', 'assets/img/livingroom/portrait_missing.png');
        game.load.image('cracked_bottle', 'assets/img/livingroom/bottle_cracked.png');
        game.load.image('podium', 'assets/img/livingroom/podium.png');
	    game.load.image('y-hint', 'assets/img/livingroom/y.png');
	    game.load.image('couch', 'assets/img/livingroom/couch.png');


		// Temporary Assets (If use later then add to atlas)
		game.load.image('trigger', 'assets/img/greenbox.png');
		// https://opengameart.org/content/meow
		game.load.audio('meow', 'assets/audio/Meow.ogg');
		// https://opengameart.org/content/picked-coin-echo-2
		game.load.audio('pickup', 'assets/audio/Picked Coin Echo 2.mp3');

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
		game.load.image('newspaper', 'assets/img/front_porch/newspaper.png');
		game.load.image('porch_step2', 'assets/img/front_porch/porch_step2.png')
		game.load.atlas("sprite_atlas", 'assets/img/atlas/tempsprite.png', 'assets/img/atlas/tempsprite.json');
		game.load.atlas('cat_atlas', 'assets/img/bedroom/catRun.png', 'assets/img/bedroom/catRun.json');
		game.load.image('key', 'assets/img/front_porch/key.png');

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
	preload: function()
	{
		console.log("Main Menu");
	},
	create: function()
	{
		//musicTrack1 = game.add.audio('shades');
		// game.sound.setDecodedCallback([ musicTrack1 ], start, this);
		musicTrack1.play('', 0, 1.0, true);

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
			game.state.start('LivingRoom');
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
	preload: function()
	{
		console.log("Front Door");
	},
	create: function()
	{

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

		front_bg = game.add.sprite(0, 0, 'front_porch_bg');

		ground = game.add.group();
		ground.enableBody = true;

		var front_ground = ground.create(0, game.height - 35, 'front_ground');
		front_ground.body.immovable = true;
		var porch_ground = ground.create(game.width - 184, game.height - 46, 'porch_platform');
		porch_ground.body.immovable = true;
		var porch_steps = ground.create(game.width - 215, game.height - 43, 'porch_steps');
		porch_steps.body.immovable = true;
		porch_steps.body.setSize(10,5,2,9);
		porch_steps2 = ground.create(game.width-203, game.height-39, 'porch_step2');
		porch_steps2.body.immovable = true;
		porch_steps3 = ground.create(game.width-194, game.height-43, 'porch_step2');
		porch_steps3.body.immovable = true;



		door = game.add.sprite(game.width - 5, game.height - 107, 'front_door');
		game.physics.arcade.enable(door);
		door.enableBody = true;
		door.body.immovable = true;
		door.body.setSize(10,65,-5,0);

		newspaper = game.add.sprite(70, game.height - 39, 'newspaper');
		game.physics.arcade.enable(newspaper);

		apple = game.add.sprite(game.width - 97, game.height - 65, 'apple');
		game.physics.arcade.enable(apple);

		plant = game.add.sprite(game.width - 234, game.height -60, 'plant');
		game.physics.arcade.enable(plant);
		plant.body.setSize(9, 25, 1, 1);

		// Player Sprite
		player = game.add.sprite(40, game.height - 52, 'sprite_atlas', 'player-idle');
		player.anchor.setTo(0.5, 0.5);

		// Player Physics
		game.physics.arcade.enable(player);
		player.body.setSize(10, 30, 3, 2);
		//player.body.bounce.y = 0.1;
		player.body.gravity.y = 1200;
		player.body.collideWorldBounds = true;

		// Player Animations
		player.animations.add('idle', ['player-idle'], 0, false);
		player.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-0', 1, 6), 10, true);
		player.animations.play('idle');

		this.keyObj = game.add.group();
		this.keyObj.enableBody = true;
		this.keyPickup = this.keyObj.create(game.width - 270, game.height - 38, 'key');
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
			this.locked.play('', 0, 1, false);
			interactable = 1;
		}
		else if(key == 1 && interactable == 1)
		{
			this.opened.play('', 0, 1.0, false);
			game.state.start("LivingRoom")
		}
	},
	update: function()
	{
		render();
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









var usedMirror = 0;
var usedPortrait=0;
var usedCat=0;
var usedCabinet=0;

var glassBroke = 0;
var catMeowed = 0;
var revealAlternate = 0;
var reveal = 0;


// GamePlay State
var LivingRoom = function(game){};
LivingRoom.prototype =
{

	create: function()
	{
		// Starting Up Physics and Music
		game.physics.startSystem(Phaser.Physics.Arcade);

		musicTrack1.pause();

		// SFX
		this.walk_sfx = game.add.audio('walk_sfx');
		this.scream = game.add.audio('scream');
		this.beep = game.add.audio('beep');
		this.click = game.add.audio('click');
		this.locked = game.add.audio('locked');
		this.opened = game.add.audio('opened');
		this.glass_break = game.add.audio('bottle_break');
		this.meow = game.add.audio('meow');
		this.pickup = game.add.audio('pickup');
		//this.skweak = game.add.audio('skweak');

		this.doorAccess = 1;
		game.add.sprite(0, 0, 'living_room_bg');

		// Creation of the floor
		ground = game.add.group();
		ground.enableBody = true;
        var floor = ground.create(0, 130,'floor');
        floor.body.immovable = true;

        // Creation of Sprites and their interactive groups (Needed for interact)
        portrait = game.add.group();
        portrait.enableBody = true;
        portrait.create(145, 20, 'portrait');
        couch = game.add.sprite(130,100,'couch');

        this.wineCabinet = game.add.group();
        this.wineCabinet.enableBody = true;

        if(glassBroke == 1)
        {
        	this.cabinet_missing = this.wineCabinet.create(300, 47, 'cabinet_missing');
	        this.cabinet_missing.alpha = 1.0;

	        this.wCabinet = this.wineCabinet.create(300,47,'wine_cabinet');
	        this.wCabinet.alpha = 0.0;
        }
        else
        {
	        this.wCabinet = this.wineCabinet.create(300,47,'wine_cabinet');
	        this.wCabinet.alpha = 1.0;
	        // CHECK HERE TO REVERT
	        this.cabinet_missing = this.wineCabinet.create(300, 47, 'cabinet_missing');
	        this.cabinet_missing.alpha = 0.0;
        }

        // Green Square Hit Box change alpha to 1 to see
        this.triggerObj = game.add.group();
        this.triggerObj.enableBody = true;
        this.trigger = this.triggerObj.create(380, 95, 'trigger');
        this.trigger.scale.setTo(0.2, 0.8);
        this.trigger.alpha = 0.0;

        if(reveal == 1)
        {
	        this.mirror = game.add.group();
	        this.mirror.enableBody = true;
	        this.mirrorT = this.mirror.create(70, 70, 'mirror');
	        this.mirrorT.anchor.setTo(0.5,0.5)
	        this.mirrorT.angle += 32;

            this.clue = game.add.group();
	        this.clue.enableBody = true;
	        this.y = this.clue.create(71, 70, 'y');
	        this.y.anchor.setTo(0.5, 0.5);
	        this.y.scale.setTo(1.0, 1.0);
	        this.y.angle += 32;
	        this.y.alpha = 1.0;
        }
        else
        {
	        this.mirror = game.add.group();
	        this.mirror.enableBody = true;
	        this.mirrorT = this.mirror.create(70, 70, 'mirror');
	        this.mirrorT.anchor.setTo(0.5,0.5)

            this.clue = game.add.group();
	        this.clue.enableBody = true;
	        this.y = this.clue.create(71, 70, 'y-hint');
	        this.y.anchor.setTo(0.5, 0.5);
	        this.y.scale.setTo(1.0, 1.0);
	        //this.y.angle += 32;
	        this.y.alpha = 0.0;
        }

        // Green Square Hit Box change alpha to 1 to see
        this.clueTrigger = this.clue.create(105, 95, 'trigger');
        this.clueTrigger.scale.setTo(0.2, 0.8);
        this.clueTrigger.alpha = 0.0;

        frontDoor = game.add.sprite(5, 69, 'front_door');
        frontDoor.scale.setTo(-1,1);
        frontDoor.anchor.setTo(0.0, 0.0);

        bedDoor = game.add.group();
        bedDoor.enableBody = true;
        bedDoor.create(450, 69, 'bed_door');


        this.cat = game.add.group();
        this.cat.enableBody = true;
		this.cat.create(267, 96, 'cat1');

		this.podium = game.add.group();
		this.podium.enableBody = true;
		this.podium.create(265, 109, 'podium');

		// Green Square Hit Box change alpha to 1 to see
		this.triggerCatObj = game.add.group();
		this.triggerCatObj.enableBody = true;
		this.catTrigger = this.triggerCatObj.create(250, 117, 'trigger');
		this.catTrigger.scale.setTo(0.2,0.5);
		this.catTrigger.alpha = 0.0;

        game.add.sprite(305, 34, 'cat2');

		// Player Creation
		if(fromAlternateLR == 1)
		{
			player = game.add.sprite(465, game.height - 45, 'sprite_atlas', 'player-idle');
			player.anchor.setTo(0.5, 0.5);

			game.physics.arcade.enable(player);
			player.smoothed = true;
			player.body.setSize(10, 30, 3, 2);
			// player.body.bounce.y = 0.1;
			player.body.gravity.y = 0;
			player.body.collideWorldBounds = true;
		}
		else
		{
			player = game.add.sprite(40, game.height - 52, 'sprite_atlas', 'player-idle');
			player.anchor.setTo(0.5, 0.5);

			// Player Physics
			game.physics.arcade.enable(player);
			player.smoothed = true;
			player.body.setSize(10, 30, 3, 2);
			// player.body.bounce.y = 0.1;
			player.body.gravity.y = 0;
			player.body.collideWorldBounds = true;
		}

		// Player Animations
		player.animations.add('idle', ['player-idle'], 0, false);
		player.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-0', 1, 6), 10, true);
		player.animations.play('idle');
	},
	interactMirror: function(player, mirror)
	{
		this.usedMirror = 1;
	},
	interactCat: function(player, cat1)
	{
		this.usedCat = 1;
	},
	interactPortrait: function(player, portrait)
	{
		this.usedPortrait = 1;
	},
	completeBottlePuzzle: function()
	{
		if(haveBottle == 0)
		{
			this.click.play('', 0, 1, false);
		}
		else if(haveBottle == 1)
		{
			placedBottle = 1;
			//this.pickup.play('', 0, 1, false);
			this.wCabinet.alpha = 1.0;
			this.cabinet_missing.alpha = 0.0;
			if(bottlePutBack == 1) {
				bottlePutBack = 0;
				this.pickup.play('', 0, 1, false);

			}
		}
	},
	interactDoor: function()
	{
		// Take out cycle if dont want to cycle through front
		// If not lock door as soon as you pick up bottle.
		if(placedBottle == 0)
		{
			this.opened.play('', 0, 1, false);
			game.state.start("AlternateLivingRoom");
		}
		// if(placedBottle == 0 && cycle == 1)
		// {
		// 	this.locked.play('', 0, 1, false);
		// }
		if(placedBottle == 1)
		{
			this.opened.play('', 0, 1, false);
			game.state.start("BedRoom");
		}
	},
	bottlePuzzlePrompt: function()
	{
		playerSpeed = 60;
		this.notInEvent = 1;
		disableInput = 0;
	},
	catInteract: function()
	{
		playerSpeed = 60;
		this.notInEvent = 1;
		disableInput = 0;
	},
	revealY: function()
	{
		reveal = 1;
		revealAlternate = 1;
		this.clueTrigger.kill();
		this.pickup.play('', 0, 1, false);
		this.mirrorT.angle += 32;
		this.y.alpha = 1.0;
	},
	enableInput: function()
	{
		disableInput = 0;
	},
	update: function()
	{
		var hitGround = game.physics.arcade.collide(player, ground);
		var passCabinet = game.physics.arcade.collide(player, this.triggerObj);
		var passCat = game.physics.arcade.collide(player, this.triggerCatObj);
		var passMirror = game.physics.arcade.collide(player, this.clue);

		this.notInEvent = 1;
		player.body.gravity.y = 350;	// Simulate gravity by applying a force in the y-axis
		player.body.velocity.x = 0;	// Stills horizontal velocity

		if(passMirror && reveal == 0 && cycle == 0)
		{
			this.revealY();
		}
		if(passCabinet && glassBroke == 0)
		{
			disableInput = 1;
			this.glass_break.play('', 0, 1, false);
			glassBroke = 1;
			this.notInEvent = 0;
			this.wCabinet.alpha = 0.0;
			this.cabinet_missing.alpha = 1.0;
			playerSpeed = 0;
			this.trigger.kill();
			this.glass_break.onStop.add(this.bottlePuzzlePrompt, this);
		}
		if(passCat && catMeowed == 0)
		{
			disableInput = 1;
			this.meow.play('', 0, 1, false);
			catMeowed = 1;
			this.notInEvent = 0;
			playerSpeed = 0;
			this.catTrigger.kill();
			this.meow.onStop.add(this.catInteract, this);
		}
		if( this.notInEvent == 1)
		{
			game.physics.arcade.overlap(player, this.wineCabinet, this.completeBottlePuzzle, null, this);
			if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
			{
				game.physics.arcade.overlap(player, bedDoor, this.interactDoor, null, this);
			}


		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && disableInput == 0)
		{
			player.body.velocity.x = playerSpeed;
			player.scale.setTo(1.0, 1);
			player.animations.play('walk');
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && disableInput == 0)
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









var AusedMirror = 0;
var AusedPortrait=0;
var AusedCat=0;
var AusedCabinet=0;

// Globals to carry from ALR
var haveBottle = 0;
// GamePlay State
var AlternateLivingRoom = function(game){};
AlternateLivingRoom.prototype =
{

	create: function()
	{
		// Starting Up Physics and Music
		//game.physics.startSystem(Phaser.Physics.Arcade);
		// game.music.resume();
		if(musicTrack2Paused == 0)
		{
			musicTrack2 = game.add.audio('scary_wind');
			musicTrack2.play('', 0, 0.85, true);
		}
		else
		{
			musicTrack2.resume();
		}

		// Creating sfx
		this.walk_sfx = game.add.audio('walk_sfx');
		this.scream = game.add.audio('scream');
		this.beep = game.add.audio('beep');
		this.click = game.add.audio('click');
		this.locked = game.add.audio('locked');
		this.opened = game.add.audio('opened');
		this.pickup = game.add.audio('pickup');

		game.add.sprite(0, 0, 'living_room_bg');

		ground = game.add.group();
		ground.enableBody = true;
        var floor = ground.create(0, 130,'floor');
        floor.body.immovable = true;

        this.portrait = game.add.group();
        this.portrait.enableBody = true;
        this.portraitM = this.portrait.create(145,50, 'portrait_missing');
        this.portraitM.alpha = 0.5;
        altCouch = game.add.sprite(110,100,'couch');
        game.physics.arcade.enable(altCouch);
        altCouch.body.immovable = true;

        wineCabinet = game.add.group();
        wineCabinet.enableBody = true;
        wineCabinet.create(300,47,'wine_cabinet');
        wineCabinet.alpha = 0.5;

        if(haveBottle == 0)
        {
	        this.triggerBottle = game.add.group();
	        this.triggerBottle.enableBody = true;
	        this.bottle = this.triggerBottle.create(385, 128, 'cracked_bottle');
	        this.bottle.anchor.setTo(0.5, 0.5);
	        this.bottle.angle += 90;
        }

        this.mirrorObj = game.add.group();
        this.mirrorObj.enableBody = true;
        this.mirror = this.mirrorObj.create(70, 70, 'mirror');
        this.mirror.anchor.setTo(0.5, 0.5);
        this.mirror.angle += 32;
        this.mirror.alpha = 1.0;

        if(revealAlternate == 1)
        {
	        this.clue = game.add.group();
	        this.clue.enableBody = true;
	        this.y = this.clue.create(71, 70, 'y');
	        this.y.anchor.setTo(0.5, 0.5);
	        this.y.scale.setTo(1.0, 1.0);
	        this.y.angle += 32;
	        this.y.alpha = 1.0;
        }
        else
        {
	        this.clue = game.add.group();
	        this.clue.enableBody = true;
	        this.y = this.clue.create(71, 70, 'y');
	        this.y.anchor.setTo(0.5, 0.5);
	        this.y.scale.setTo(1.0, 1.0);
	        this.y.angle += 32;
	        this.y.alpha = 0.0;
        }

        this.normalDoorObj = game.add.group();
        this.normalDoorObj.enableBody = true;
        this.LRdoor = this.normalDoorObj.create(5, 69, 'front_door');

        this.LRdoor.scale.setTo(-1,1);
        this.LRdoor.anchor.setTo(0.0, 0.0);

        this.frontDoorObj = game.add.group();
        this.frontDoorObj.enableBody = true;
        this.frontDoor = this.frontDoorObj.create(490, 100, 'bed_door');
        this.frontDoor.anchor.setTo(0.5, 0.5);
        this.frontDoor.angle += 90;

        this.cat = game.add.group();
        this.cat.enableBody = true;
		this.catStatue = this.cat.create(267, 96, 'cat1');
		this.catStatue.alpha = 0.5;

		this.podium = game.add.group();
		this.podium.enableBody = true;
		this.podium.create(265, 109, 'podium');

        game.add.sprite(305, 34, 'cat2');

		// Player Sprite
		player = game.add.sprite(80, game.height - 46, 'sprite_atlas', 'player-idle');
		player.anchor.setTo(0.5, 0.5);

		// Player Physics
		game.physics.arcade.enable(player);
		// player.body.bounce.y = 0.1;
		// player.body.gravity.y = 1200;
		player.body.collideWorldBounds = true;

		// Player Animations
		player.animations.add('idle', ['player-idle'], 0, false);
		player.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-0', 1, 6), 10, true);
		player.animations.play('idle');


		this.background = game.add.sprite(0, 0);
		this.background.width = game.width;
		this.background.height = game.height;
		this.fire = game.add.filter('Fire', game.width, game.height);
		this.fire.alpha = 0.0;
		this.background.filters = [this.fire];

		this.gray = game.add.filter('Gray');	// Preping Filter To Use
		game.world.filters = [this.gray];		// Setting Filter to Gray
	},
	interactMirror: function(player, mirror)
	{
		this.usedMirror = 1;
	},
	interactCat: function(player, cat1)
	{
		this.usedCat = 1;
	},
	interactPortrait: function(player, portrait)
	{
		this.usedPortrait = 1;
	},
	interactCabinet: function(player, wineCabinet)
	{
		this.usedCabinet = 1;
	},
	interactDoor: function()
	{
		this.opened.play('', 0, 1, false);
		musicTrack2.pause();
		musicTrack2Paused = 1;
		fromAlternateLR = 1;
		game.state.start("LivingRoom");
	},
	interactFrontDoor: function()
	{
		this.locked.play('', 0, 1, false);
		// if(haveBottle == 0)
		// {
		// 	this.locked.play('', 0, 1, false);
		// }
		// else
		// {
		// 	cycle = 1;
		// 	this.opened.play('', 0, 1, false);
		// 	musicTrack2.stop();
		// 	musicTrack1.resume();
		// 	game.state.start("FrontDoor");
		// }
	},
	collectBottle: function()
	{
		haveBottle = 1;
		this.bottle.kill();
		this.pickup.play('', 0, 1, false);
	},
	update: function()
	{
		this.fire.update();
		var hitGround = game.physics.arcade.collide(player, ground);
		// player.body.gravity.y = 350;	// Simulate gravity by applying a force in the y-axis
		// player.body.velocity.x = 0;	// Stills horizontal velocity

		if(haveBottle == 0)
		{
			game.physics.arcade.overlap(player, this.triggerBottle, this.collectBottle, null, this);
			if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
			{
				game.physics.arcade.overlap(player, this.frontDoorObj, this.interactFrontDoor, null, this);
			}


		}
		if(haveBottle == 1)
		{
			game.physics.arcade.overlap(player, this.frontDoorObj, this.interactFrontDoor, null, this);
		}
		if(AusedMirror == 0)
		{
			game.physics.arcade.overlap(player, this.mirror, this.interactMirror, null, this);
		}
		if(AusedPortrait == 0)
		{
			game.physics.arcade.overlap(player, this.portrait, this.interactPortrait, null, this);
		}
		if(AusedCat == 0)
		{
			game.physics.arcade.overlap(player, this.cat, this.interactCat, null, this);
		}
		if(AusedCabinet == 0)
		{
			game.physics.arcade.overlap(player, door, this.interactCabinet, null, this);
		}
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
            game.physics.arcade.overlap(player, this.normalDoorObj, this.interactDoor, null, this);
        }

		// game.physics.arcade.overlap(player, this.frontDoorObj, this.interactFrontDoor, null, this);

		if(game.input.keyboard.isDown(Phaser.Keyboard.Y))
		{
			player.body.velocity.x = playerSpeed;
			player.scale.setTo(1.0, 1);
			player.animations.play('walk');
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
		{
			player.body.velocity.x = -playerSpeed;
			player.scale.setTo(-1.0, 1);
			player.animations.play('walk');
			if(player.position.x == 20 && altCouch.body.x != 90 && haveBottle == 1 ){
				console.log('hi');
				move = 1;
			}
		}
		else
		{
			player.body.velocity.x = 0;
			player.animations.play('idle')
		}

		if(move == 1){
			altCouch.body.x -=10;
			console.log('derp');
			if(altCouch.body.x == 90){
				move = 0;
			}
		}
	}
}






firstTimeBedroom = 0;
usedCloset = 0;

var BedRoom = function(game){};
BedRoom.prototype =
{
	preload: function()
	{

	},
	create: function()
	{
		disableInput = 0;
		pendant = 0;
		game.physics.startSystem(Phaser.Physics.Arcade);
		playerSpeed = 4;
		//this.usedCloset = 0;
		usedDresser = 0;
		usednDoor = 0;

		//BEDROOM CODE----------------------------------------------------------------------------------------------------
		var bedroomBG = game.add.sprite(0, 0, 'bedroomBG');
		var floor = game.add.group();
		var bedroomFloor = floor.create(0, game.height-31, 'bedroomFloor');
		nDoor = game.add.group();
		nDoor.enableBody = true;
		nDoor.create(game.width-4, game.height-104, 'backyard_door');

		var bedroom_bed = game.add.sprite(game.width/3-50, game.height-81, 'bedroom_bed');
		bedroom_cabinet = game.add.sprite(game.width/2, 52, 'bedroom_cabinet');
		closet = game.add.sprite(game.width-170,38, 'closet');
		if(usedCloset == 1)
		{
			closet_door = game.add.sprite(game.width-127, 43, 'closet_door');
		}
		else
		{
			closet_door = game.add.sprite(game.width-160, 43, 'closet_door');
		}
		mirror_stand = game.add.sprite(55, 71, 'mirror_stand');
		small_cabinet = game.add.sprite(100, 99, 'small_cabinet');
		normal_portrait = game.add.sprite(game.width/3-33, 10, 'normal_portrait');
		door1 = game.add.sprite(2, 99, 'door');
		door1.anchor.setTo(.5,.5);
		door1.scale.x *= -1;
		game.physics.arcade.enable([bedroom_cabinet, closet_door]);

		if(firstTimeBedroom == 0)
		{
			this.triggerCatObj = game.add.group();
			this.triggerCatObj.enableBody = true;
			this.catTrigger = this.triggerCatObj.create(100, 117, 'trigger');
			this.catTrigger.scale.setTo(0.2, 0.8);
			this.catTrigger.alpha = 0;
			bedcat = game.add.sprite(0, 0, 'cat_atlas', 'cat-run-1');
			cat_run = bedcat.animations.add(Phaser.Animation.generateFrameNames('cat-run-', 1, 10));
		}

		// this.pendantObj = game.add.group();
		// this.pendantObj.enableBody = true;
		// this.pendantPickup = this.pendantObj.create(game.width/2, game.height - 69, 'pendant');
		// this.pendantPickup.alpha = 0.0;
		//bedcat.animations.killOnComplete = true;
		//bedcat.animations.play('cat-run');

		// Player Sprite
		player = game.add.sprite(30, game.height - 47, 'sprite_atlas', 'player-idle');
		player.anchor.setTo(0.5, 0.5);

		// Player Physics
		game.physics.arcade.enable(player);
		player.body.setSize(10, 30, 3, 0);
		// player.body.bounce.y = 0.1;
		// player.body.gravity.y = 1200;
		player.body.collideWorldBounds = true;

		// Player Animations
		player.animations.add('idle', ['player-idle'], 0, false);
		player.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-0', 1, 6), 10, true);
		player.animations.play('idle');

	},

	interactDoor2: function()
	{
		game.state.start("AlternateBedRoom");
	},

	enableInput: function()
	{
		disableInput = 0;
	},
	interactCloset: function(player, closet_door)
	{
		closet_door.position.x += 33;
		usedCloset = 1;
	},

	update: function()
	{
		//render();
		var passCat = game.physics.arcade.collide(player, this.triggerCatObj);
		if(passCat && disableInput == 0 && firstTimeBedroom == 0)
		{
			this.catTrigger.kill();
			disableInput = 1;
			firstTimeBedroom = 1;
			cat_run.play(10, false, true);
		}
		if(cat_run.isFinished == true)
		{
			disableInput = 0;
		}
		if(usedCloset == 0)
		{
			game.physics.arcade.overlap(player, closet_door, this.interactCloset, null, this);
		}


		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
            game.physics.arcade.overlap(player, nDoor, this.interactDoor2, null, this);
        }

		//game.physics.arcade.overlap(player, nDoor, this.interactDoor2, null, this);
		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && disableInput == 0)
		{
			player.position.x += playerSpeed;
			player.scale.setTo(1.0, 1);
			player.animations.play('walk');
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && disableInput == 0)
		{
			player.position.x -= playerSpeed;
			player.scale.setTo(-1.0, 1);
			player.animations.play('walk');
		}
		else
		{
			// player.body.velocity.x = 0;
			player.animations.play('idle')
		}
	}
}





passMirror = 0;
passDresser = 0;


// **WORK IN PROGRESS**
var AlternateBedRoom = function(game){};
AlternateBedRoom.prototype =
{
	preload: function()
	{

	},
	create: function()
	{
		disableInput = 0;
		playerSpeed = 4;

		//BEDROOM CODE----------------------------------------------------------------------------------------------------
		var bedroomBG = game.add.sprite(0, 0, 'bedroomBG');
		var floor = game.add.group();
		var bedroomFloor = floor.create(0, game.height-31, 'bedroomFloor');
		nDoor = game.add.group();
		nDoor.enableBody = true;
		nDoor.create(game.width-4, game.height-104, 'backyard_door');

		var bedroom_bed = game.add.sprite(game.width/3-50, game.height-81, 'bedroom_bed');
		bedroom_cabinet = game.add.sprite(game.width/2, 52, 'bedroom_cabinet');
		cabinet_broken = game.add.sprite(game.width/2, 52, 'cabinet_broken');
		if (passDresser == 0)
		{
			cabinet_broken.alpha = 0;
		}
		closet = game.add.sprite(game.width-170,38, 'closet');
		closet_door = game.add.sprite(game.width-127, 43, 'closet_door');
		mirror_stand = game.add.sprite(55, 71, 'mirror_stand');
		mirror_stand_broken = game.add.sprite(55, 71, 'mirror_stand_broken');
		if (passMirror == 0)
		{
			mirror_stand_broken.alpha = 0;
		}
		small_cabinet = game.add.sprite(100, 99, 'small_cabinet');
		portrait = game.add.sprite(game.width/3-33, 10, 'portrait_missing');
		door1 = game.add.sprite(2, 99, 'door');
		door1.anchor.setTo(.5,.5);
		door1.scale.x *= -1;
		game.physics.arcade.enable([closet_door, portrait, mirror_stand, bedroom_cabinet]);

		// Player Sprite
		player = game.add.sprite(30, game.height - 47, 'sprite_atlas', 'player-idle');
		player.anchor.setTo(0.5, 0.5);

		// Player Physics
		game.physics.arcade.enable(player);
		player.body.setSize(10, 30, 3, 0);
		// player.body.bounce.y = 0.1;
		// player.body.gravity.y = 1200;
		player.body.collideWorldBounds = true;

		// Player Animations
		player.animations.add('idle', ['player-idle'], 0, false);
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

	interactDoor2: function()
	{
		game.state.start("Backyard");
	},

	enableInput: function()
	{
		disableInput = 0;
	},
	interactCloset: function(player, closet_door)
	{
		closet_door.position.x += 33;
		usedCloset = 1;
	},
	interactDresser: function(player, bedroom_cabinet)
	{
		passDresser = 1;
		cabinet_broken.alpha = 1;
	},
	interactMirror: function(player, mirror_stand)
	{
		passMirror = 1;
		mirror_stand_broken.alpha = 1;
	},

	update: function()
	{
		//render();
		this.fire.update();
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
            game.physics.arcade.overlap(player, nDoor, this.interactDoor2, null, this);
        }

		if (usedCloset == 0)
		{
			game.physics.arcade.overlap(player, closet_door, this.interactCloset, null, this);
		}
		if (passMirror == 0)
		{
			game.physics.arcade.overlap(player, mirror_stand, this.interactMirror, null, this);
		}
		if (passDresser == 0)
		{
			game.physics.arcade.overlap(player, bedroom_cabinet, this.interactDresser, null, this);
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && disableInput == 0)
		{
			player.position.x += playerSpeed;
			player.scale.setTo(1.0, 1);
			player.animations.play('walk');
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && disableInput == 0)
		{
			player.position.x -= playerSpeed;
			player.scale.setTo(-1.0, 1);
			player.animations.play('walk');
		}
		else
		{
			//player.position.x = 0;
			player.animations.play('idle')
		}
	}
}

//---------BACKYARD-----------------------------------
var Backyard = function(game){};
Backyard.prototype =
    {
        preload: function () {
            console.log("BackYard");
        },
        create: function () {
            game.add.sprite(0, 0, 'backyard_BG');
            this.locked = game.add.audio('locked');


            var tree = game.add.sprite(352, 0, 'tree');
            door = game.add.sprite(0, 68, 'backyard_door');
            game.physics.arcade.enable(door);
			door.enableBody = true;
			door.body.immovable = true;
			door.body.setSize(10,65,-5,0);

            var apple = game.add.sprite(368, 73, 'apple');

            //var backyard_ground = game.add.sprite(0, 129, 'backyard_ground');
            //var backyard_cement_ground = game.add.sprite(0, 126, 'backyard_cement_ground');
            ground = game.add.group();
			ground.enableBody = true;

			var backyard_ground = ground.create(0, 129, 'backyard_ground');
			backyard_ground.body.immovable = true;
			var backyard_cement_ground = ground.create(0, 126, 'backyard_cement_ground');
			backyard_cement_ground.body.immovable = true;

            player = game.add.sprite(40, game.height - 56, 'sprite_atlas', 'player-idle');
            player.anchor.setTo(0.5, 0.5);

            // Player Physics
            game.physics.arcade.enable(player);
            player.body.setSize(10, 30, 3, 0);
            // player.body.bounce.y = 0.1;
            player.body.gravity.y = 1200;
            player.body.collideWorldBounds = true;

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
		interactDoor: function(player, door)
		{

			this.locked.play('', 0, 1, false);
			interactable = 1;

		},

        update: function () {
			render();
        	var hitGround = game.physics.arcade.collide(player, ground);
        	if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
			{
				game.physics.arcade.collide(player, door, this.interactDoor, null, this);
			}
            else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && disableInput == 0) {
                player.body.velocity.x = playerSpeed;
                player.scale.setTo(1.0, 1);
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