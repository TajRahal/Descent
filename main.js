// Features_RS Copy of Main

// Globals Variables
// Instantiating game object
var game = new Phaser.Game(576, 160, Phaser.AUTO);
var player, playerSpeed;
var ground, apple, plant, door, newspaper;
var usedPlant, usedApple, key, readNewspaper, interactable;
var livingRoomDoor, nDoor;
var disableInput = 0;
var timer;

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

		// BEDROOM ASSETS------------------------------------------
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
		game.load.atlas("sprite_atlas", 'assets/img/atlas/tempsprite.png', 'assets/img/atlas/tempsprite.json');

		// Audio and SFX
		// https://opengameart.org/content/collaboration-theme-song-shades
		game.load.audio('shades', 'assets/audio/Shades/Shades.mp3');
		// https://opengameart.org/content/scary-ambient-wind
		game.load.audio('scary_wind', 'assets/audio/Scary Ambient Wind.ogg');
		game.load.audio('walk_sfx', 'assets/audio/Fantasy Sound Library/Fantasy Sound Library/Mp3/Footsteps/Footstep_Dirt_00.mp3')

		// https://opengameart.org/content/glass-break
		game.load.audio('glass_break', 'assets/audio/glass_breaking.mp3');
		// https://opengameart.org/content/breaking-bottle
		game.load.audio('bottle_break', 'assets/audio/Bottle Break.mp3');

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
		musicTrack1 = game.add.audio('shades');
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
			game.state.start('FrontDoor');
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
		playerSpeed = 1;
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

		// Enabling Physics and Creating Ground
		ground = game.add.group();
		ground.enableBody = true;

		var front_ground = ground.create(0, game.height - 35, 'front_ground');
		front_ground.body.immovable = true;
		var porch_ground = ground.create(game.width - 186, game.height - 46, 'porch_platform');
		porch_ground.body.immovable = true;
		var porch_steps = ground.create(game.width - 217, game.height - 46, 'porch_steps');
		porch_steps.body.immovable = true;

		door = game.add.group();
		door.enableBody = true;
		door.create(game.width - 5, game.height - 107, 'front_door');

		newspaper = game.add.group();
		newspaper.enableBody = true;
		newspaper.create(70, game.height - 39, 'newspaper');

		apple = game.add.group();
		apple.enableBody = true;
		apple.create(game.width - 97, game.height - 65, 'apple');

		plant = game.add.group();
		plant.enableBody = true;
		plant.create(game.width - 234, game.height - 62, 'plant');

		// Player Sprite 
		player = game.add.sprite(40, game.height - 50, 'sprite_atlas', 'player-idle');
		player.anchor.setTo(0.5, 0.5);

		// Player Physics
		game.physics.arcade.enable(player);
		player.body.bounce.y = 0.1;
		player.body.gravity.y = 1200;
		player.body.collideWorldBounds = true;

		// Player Animations
		player.animations.add('idle', ['player-idle'], 0, false);
		player.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-0', 1, 6), 10, true);
		player.animations.play('idle');
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
		key = 1;
	},
	interactDoor: function(player, door)
	{
		if(key == 0)
		{
			this.locked.play('', 0, 1, false);
			interactable = 1;
		}
		else if(key == 1)
		{
			this.opened.play('', 0, 1.0, false);
			game.state.start("LivingRoom")
		}
	},
	update: function()
	{
		// Collision detection between groups
		var hitGround = game.physics.arcade.collide(player, ground);	// Collision b/t player and platforms
		player.body.gravity.y = 350;	// Simulate gravity by applying a force in the y-axis
		player.body.velocity.x = 0;		// Stills horizontal velocity

		// Checks for input of player to determine direction of movement
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
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
			if(readNewspaper == 0 && interactable == 0)
			{
				game.physics.arcade.overlap(player, newspaper, this.interactNewspaper, null, this);
			}
			if(key == 0 && interactable == 0)
			{
				game.physics.arcade.overlap(player, door, this.interactDoor, null, this);
			}
			if(key == 1 && interactable == 1)
			{
				game.physics.arcade.overlap(player, door, this.interactDoor, null, this);
			}
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
			player.animations.play('idle');
		}
	}
}

var usedMirror = 0;
var usedPortrait=0;
var usedCat=0;
var usedCabinet=0;

var glassBroke = 0;
var catMeowed = 0;
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
        portrait.create(145, 50, 'portrait');

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

	        this.cabinet_missing = this.wineCabinet.create(300, 47, 'cabinet_missing');
	        this.cabinet_missing.alpha = 0.0;
        }

        // Green Square Hit Box change alpha to 1 to see
        this.triggerObj = game.add.group();
        this.triggerObj.enableBody = true;
        this.trigger = this.triggerObj.create(410, 95, 'trigger');
        this.trigger.scale.setTo(0.2, 0.8);
        this.trigger.alpha = 0.0;

        this.mirror = game.add.group();
        this.mirror.enableBody = true;
        this.mirror.create(50, 65, 'mirror');

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
		this.catTrigger = this.triggerCatObj.create(265, 117, 'trigger');
		this.catTrigger.scale.setTo(0.2,0.5);
		this.catTrigger.alpha = 0.0;

        game.add.sprite(305, 34, 'cat2');
        
		// Player Creation
		player = game.add.sprite(40, game.height - 50, 'sprite_atlas', 'player-idle');
		player.anchor.setTo(0.5, 0.5);

		// Player Physics
		game.physics.arcade.enable(player);
		player.body.bounce.y = 0.1;
		player.body.gravity.y = 1200;
		player.body.collideWorldBounds = true;

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
		if(haveBottle == 0 || cycle == 0)
		{
			this.click.play('', 0, 1, false);
		}
		else
		{
			placedBottle = 1;
			this.pickup.play('', 0, 1, false);
			this.wCabinet.alpha = 1.0;
			this.cabinet_missing.alpha = 0.0;
		}
	},
	interactDoor: function()
	{
		if(placedBottle == 0 && cycle == 0)
		{
			this.opened.play('', 0, 1, false);
			game.state.start("AlternateLivingRoom");
		}
		if(placedBottle == 0 && cycle == 1)
		{
			this.locked.play('', 0, 1, false);
		}
		if(placedBottle == 1 && cycle == 1)
		{
			this.opened.play('', 0, 1, false);
			game.state.start("BedRoom");
		}
	},
	bottlePuzzlePrompt: function()
	{
		playerSpeed = 1;
		this.notInEvent = 1;
	},
	catInteract: function()
	{
		playerSpeed = 1;
		this.notInEvent = 1;
	},
	update: function()
	{
		var hitGround = game.physics.arcade.collide(player, ground);
		var passCabinet = game.physics.arcade.collide(player, this.triggerObj);
		var passCat = game.physics.arcade.collide(player, this.triggerCatObj);

		this.notInEvent = 1;
		player.body.gravity.y = 350;	// Simulate gravity by applying a force in the y-axis
		player.body.velocity.x = 0;	// Stills horizontal velocity

		if(passCabinet && glassBroke == 0)
		{
			this.glass_break.play('', 0, 1, false);
			glassBroke = 1;
			this.notInEvent = 0;
			this.wCabinet.alpha = 0.0;
			this.cabinet_missing.alpha = 1.0;
			playerSpeed = 0;
			this.glass_break.onStop.add(this.bottlePuzzlePrompt, this);
		}
		if(passCat && catMeowed == 0)
		{
			this.meow.play('', 0, 1, false);
			catMeowed = 1;
			this.notInEvent = 0;
			playerSpeed = 0;
			this.meow.onStop.add(this.catInteract, this);
		}
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.notInEvent == 1)
		{
			game.physics.arcade.overlap(player, this.wineCabinet, this.completeBottlePuzzle, null, this);
			game.physics.arcade.overlap(player, bedDoor, this.interactDoor, null, this);
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.notInEvent == 1)
		{
			player.position.x += playerSpeed;
			player.scale.setTo(1.0, 1);
			player.animations.play('walk');
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.notInEvent == 1)
		{
			player.position.x -= playerSpeed;
			player.scale.setTo(-1.0, 1);
			player.animations.play('walk');
		}
		else
		{
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
		game.physics.startSystem(Phaser.Physics.Arcade);
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
        this.mirror.angle += 50;
        this.mirror.alpha = 0.5;
        
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
		player = game.add.sprite(40, game.height - 50, 'sprite_atlas', 'player-idle');
		player.anchor.setTo(0.5, 0.5);

		// Player Physics
		game.physics.arcade.enable(player);
		player.body.bounce.y = 0.1;
		player.body.gravity.y = 1200;
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
		game.state.start("LivingRoom");
	},
	interactFrontDoor: function()
	{
		if(haveBottle == 0)
		{
			this.locked.play('', 0, 1, false);
		}
		else
		{
			cycle = 1;
			this.opened.play('', 0, 1, false);
			musicTrack2.stop();
			musicTrack1.resume();
			game.state.start("FrontDoor");
		}
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
		player.body.gravity.y = 350;	// Simulate gravity by applying a force in the y-axis
		player.body.velocity.x = 0;	// Stills horizontal velocity
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			if(haveBottle == 0)
			{
				game.physics.arcade.overlap(player, this.triggerBottle, this.collectBottle, null, this);
				game.physics.arcade.overlap(player, this.frontDoorObj, this.interactFrontDoor, null, this);
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
			game.physics.arcade.overlap(player, this.normalDoorObj, this.interactDoor, null, this);
			// game.physics.arcade.overlap(player, this.frontDoorObj, this.interactFrontDoor, null, this);
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.Y))
		{
			player.position.x += playerSpeed;
			player.scale.setTo(1.0, 1);
			player.animations.play('walk');
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.UP))
		{
			player.position.x -= playerSpeed;
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

/*
 * Add states to the StateManager
 */
game.state.add('MainMenu', MainMenu);

// Game "Levels"
game.state.add('FrontDoor', FrontDoor);
game.state.add('LivingRoom', LivingRoom);
game.state.add('AlternateLivingRoom', AlternateLivingRoom);
game.state.add('BedRoom', BedRoom);
//game.state.add('Backyard', Backyard);
