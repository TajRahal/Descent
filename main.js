// Features_MR Copy of Main

// Globals Variables
// Instantiating game object
var game = new Phaser.Game(576, 160, Phaser.AUTO);
var player;
var ground, apple, plant, door, newspaper;
var interaction, key;
// var livingRoomDoor, nDoor;
var disableInputFlag = 0;
var playerSpeed = 75;
var interaction = 0;
var key = 0;
var interactable = 0;

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
		game.load.image('textbox', 'assets/img/temp_art/temptextbox.png');
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
		game.load.image('porch_step2', 'assets/img/front_porch/porch_step2.png')
		game.load.image('apple', 'assets/img/front_porch/apple.png');
		game.load.image('plant', 'assets/img/front_porch/plant.png');
		game.load.image('newspaper', 'assets/img/front_porch/newspaper.png');
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
		// this.walk_sfx = game.add.audio('walk_sfx');
		// this.scream = game.add.audio('scream');
		// this.beep = game.add.audio('beep');
		// this.click = game.add.audio('click');
		// this.locked = game.add.audio('locked');
		// this.opened = game.add.audio('opened');

		game.physics.startSystem(Phaser.Physics.Arcade);
		// game.music = game.add.audio('shades');
		// game.music.play('', 0, 1.0, true);

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
		player = game.add.sprite(40, game.height - 50, 'sprite_atlas', 'player-idle');
		player.anchor.setTo(0.5, 0.5);

		// Player Physics
		game.physics.arcade.enable(player);
		player.body.setSize(10, 30, 3, 2);
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
		this.enableInput();
		game.state.start("LivingRoom");
	},

	interactApple: function(player, apple)
	{
		this.disableInput();
		console.log('Apple. Press Space.');
		interaction = 1;
	},
	interactNewspaper: function(player, newspaper)
	{
		this.disableInput();
		console.log('Newspaper. Press Space.')
		interaction = 1;
	},
	interactPlant: function(player, plant)
	{
		this.disableInput();
		if (interactable == 0 && key == 0) 
		{
			console.log('Plant. Press Space.');
		}
		else if (interactable == 1 && key == 0) 
		{
			console.log('Key found. Press Space.');
			key = 1;
		}
		else {
			console.log('Plant 2. Press Space.');
		}
		interaction = 1;
	},
	interactDoor: function(player, door)
	{
		this.disableInput();
		if(key == 0)
		{
			console.log('Door locked. Press Space.');
			interaction = 1;
			interactable = 1;
		}
		else if(key == 1)
		{
			console.log('Door Unlocked, Press Space.');
			game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.switchLivingRoom, this);

		}
	},
	enableInput: function()
	{
		disableInputFlag = 0;
		playerSpeed = 75;
	},
	disableInput: function()
	{
		disableInputFlag = 1;
		playerSpeed = 0;
	},
	update: function()
	{
		//render();
		// Collision detection between groups
		var hitGround = game.physics.arcade.collide(player, ground);	// Collision b/t player and platforms
		player.body.gravity.y = 350;	// Simulate gravity by applying a force in the y-axis
		player.body.velocity.x = 0;	// Stills horizontal velocity

		// Checks for input of player to determine direction of movement
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			if (disableInputFlag == 1 && interaction == 1)
			{
				this.enableInput();
				interaction = 0;
			}
			else if(interaction == 0 && disableInputFlag == 0)
			{
				game.physics.arcade.overlap(player, apple, this.interactApple, null, this);
				game.physics.arcade.overlap(player, plant, this.interactPlant, null, this);
				game.physics.arcade.overlap(player, newspaper, this.interactNewspaper, null, this);
				game.physics.arcade.collide(player, door, this.interactDoor, null, this);
			}
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && disableInputFlag == 0)
		{
			player.body.velocity.x = playerSpeed;
			player.scale.setTo(1.0, 1);
			player.animations.play('walk');
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && disableInputFlag == 0)
		{
			player.body.velocity.x = -playerSpeed;
			player.scale.setTo(-1.0, 1);
			player.animations.play('walk');
		}
		else
		{
			player.animations.play('idle');
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && player.body.touching.down && hitGround && disableInputFlag == 0)
		{
			player.body.velocity.y = -75;
			if (player.scale.x == -1){
				player.scale.setTo(-1.0, 1);
			}
			else {
				player.scale.setTo(1.0, 1);
			}
		}
		
	}
}
// GamePlay State
var LivingRoom = function(game){};
LivingRoom.prototype = 
{

	create: function()
	{
		livingRoomDoor = 0;
		game.add.sprite(0,0, 'living_room_bg');
        floor = game.add.sprite(0,130,'floor');
        portrait = game.add.sprite(165,25, 'portrait');
        game.physics.arcade.enable(portrait);
        portrait.body.setSize(40, 50, 12, 45);
        wineCabinet = game.add.sprite(300,47,'wine_cabinet');
        game.physics.arcade.enable(wineCabinet);
        wineCabinet.body.setSize(61,65,9,20);
        mirror = game.add.sprite(50, 65, 'mirror');
        game.physics.arcade.enable(mirror);
        mirror.body.setSize(35, 26, 10, 26);

        frontDoor = game.add.sprite(5, 69, 'front_door');
        frontDoor.scale.setTo(-1,1);
        frontDoor.anchor.setTo(0.0, 0.0);
        bedDoor = game.add.sprite(450, 69, 'bed_door');
        game.physics.arcade.enable(bedDoor);
        bedDoor.body.setSize(22, 61, 3, 0);

        cat1 = game.add.sprite(285, 117, 'cat1');
        game.physics.arcade.enable(cat1);
        cat1.body.setSize(10, 10, 1, 2);
        game.add.sprite(305, 34, 'cat2');
        

		// Player Sprite 
		player = game.add.sprite(40, game.height - 46, 'sprite_atlas', 'player-idle');
		player.anchor.setTo(0.5, 0.5);

		// Player Physics
		game.physics.arcade.enable(player);
		player.body.setSize(10, 30, 3, 2);
		player.body.collideWorldBounds = true;

		// Player Animations
		player.animations.add('idle', ['player-idle'], 0, false);
		player.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-0', 1, 6), 10, true);
		player.animations.play('idle');
	},

	interactMirror: function(player, mirror)
	{
		this.disableInput();
		console.log('mirror');
		interaction = 1;
	},
	interactCat: function(player, cat1)
	{
		this.disableInput();
		console.log('cat');
		interaction = 1;
	},
	interactPortrait: function(player, portrait)
	{
		this.disableInput();
		console.log('portrait');
		interaction = 1;
	},
	interactCabinet: function(player, wineCabinet)
	{
		this.disableInput();
		console.log('cabinet');
		interaction = 1;
	},
	enableInput: function()
	{
		disableInputFlag = 0;
		playerSpeed = 75;
	},
	disableInput: function()
	{
		disableInputFlag = 1;
		playerSpeed = 0;
	},
	interactDoor1: function(player, bedDoor)
	{
		game.state.start("BedRoom");
	},
	update: function()
	{
		//render();
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			//game.debug.body(mirror);
			if (disableInputFlag == 1 && interaction == 1)
			{
				this.enableInput();
				// console.log('penis');
				interaction = 0;
			}
			else if(interaction == 0 && disableInputFlag == 0)
			{
				game.physics.arcade.overlap(player, cat1, this.interactCat, null, this);
				game.physics.arcade.overlap(player, wineCabinet, this.interactCabinet, null, this);
				game.physics.arcade.overlap(player, portrait, this.interactPortrait, null, this);
				game.physics.arcade.overlap(player, mirror, this.interactMirror, null, this);
				game.physics.arcade.overlap(player, bedDoor, this.interactDoor1, null, this);
			}
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && disableInputFlag == 0)
		{
			player.body.velocity.x = playerSpeed;
			player.scale.setTo(1.0, 1);
			player.animations.play('walk');
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && disableInputFlag == 0)
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

// function render() {    
// call renderGroup on each of the alive members    
	// game.debug.body(mirror);
	//game.debug.body(player);
	// game.debug.body(portrait)
	// game.debug.body(wineCabinet);
	// game.debug.body(bedDoor);
	// game.debug.body(cat1);
	// game.debug.body(mirror_stand);
	// game.debug.body(small_cabinet);
	// game.debug.body(bedroom_bed);
	// game.debug.body(bedroom_cabinet);
	// game.debug.body(closet);
	// game.debug.body(closet_door);
	// game.debug.body(player);
	//ground.forEach(game.debug.body, game.debug);
// }

var BedRoom = function(game){};
BedRoom.prototype = 
{
	preload: function()
	{

	},
	create: function()
	{
		//BEDROOM CODE----------------------------------------------------------------------------------------------------
		bedroomBG = game.add.sprite(0, 0, 'bedroomBG');
		floor = game.add.group();
		bedroomFloor = floor.create(0, game.height-31, 'bedroomFloor');
		nDoor = game.add.group();
		nDoor.enableBody = true;
		nDoor.create(game.width-4, game.height-104, 'backyard_door');

		bedroom_bed = game.add.sprite(game.width/3-50, game.height-81, 'bedroom_bed');
		bedroom_cabinet = game.add.sprite(game.width/2, 52, 'bedroom_cabinet');

		closet = game.add.sprite(game.width-170,38, 'closet');
		closet_door = game.add.sprite(game.width-160, 43, 'closet_door');
		mirror_stand = game.add.sprite(50, 71, 'mirror_stand');
		small_cabinet = game.add.sprite(100, 99, 'small_cabinet');
		normal_portrait = game.add.sprite(game.width/3-33, 10, 'normal_portrait');

		game.physics.arcade.enable([bedroom_bed, bedroom_cabinet, closet_door, mirror_stand,
			small_cabinet]);
		mirror_stand.body.setSize(26,58, 6, 0);
		small_cabinet.body.setSize(29, 30, 4, 0);
		bedroom_bed.body.setSize(80, 50, 8, 0);
		bedroom_cabinet.body.setSize(70, 77, 4, 0);
		closet_door.body.setSize(75, 86, -5,0);

		door1 = game.add.sprite(2, 99, 'door');
		door1.anchor.setTo(.5,.5);
		door1.scale.x *= -1;

		// Player Sprite 
		player = game.add.sprite(40, game.height - 46, 'sprite_atlas', 'player-idle');
		player.anchor.setTo(0.5, 0.5);

		// Player Physics
		game.physics.arcade.enable(player);
		player.body.setSize(10, 30, 3, 2);
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
	interactMirrorStand: function(player, mirror_stand)
	{
		this.disableInput();
		console.log('mirror stand');
		interaction = 1;
	},
	interactCloset: function(player, closet_door)
	{
		this.disableInput();
		console.log('closet');
		interaction = 1;
	},
	interactSmallCabinet: function(player, small_cabinet)
	{
		this.disableInput();
		console.log('cabinet');
		interaction = 1;
	},
	interactBedCabinet: function(player, bedroom_cabinet)
	{
		this.disableInput();
		console.log('cabinet2');
		interaction = 1;
	},
	interactBed: function(player, bedroom_bed)
	{
		this.disableInput();
		console.log('bed');
		interaction = 1;
	},
	enableInput: function()
	{
		disableInputFlag = 0;
		playerSpeed = 75;
	},
	disableInput: function()
	{
		disableInputFlag = 1;
		playerSpeed = 0;
	},
	update: function()
	{
		//render();
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			if (disableInputFlag == 1 && interaction == 1)
			{
				this.enableInput();
				// console.log('penis');
				interaction = 0;
			}
			else if(interaction == 0 && disableInputFlag == 0)
			{
				game.physics.arcade.overlap(player, nDoor, this.interactDoor2, null, this);
				//game.physics.arcade.overlap(player, closet, this.interactCloset, null, this);
				game.physics.arcade.overlap(player, closet_door, this.interactCloset, null, this);
				game.physics.arcade.overlap(player, bedroom_bed, this.interactBed, null, this);
				game.physics.arcade.overlap(player, small_cabinet, this.interactSmallCabinet, null, this);
				game.physics.arcade.overlap(player, bedroom_cabinet, this.interactBedCabinet, null, this);
				game.physics.arcade.overlap(player, mirror_stand, this.interactMirrorStand, null, this);
			}
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && disableInputFlag == 0)
		{
			player.body.velocity.x = playerSpeed;
			player.scale.setTo(1.0, 1);
			player.animations.play('walk');
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && disableInputFlag == 0)
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

game.state.add('MainMenu', MainMenu);
//game.state.add('GameOver', GameOver);

// Game "Levels"
game.state.add('FrontDoor', FrontDoor);
game.state.add('LivingRoom', LivingRoom);
game.state.add('BedRoom', BedRoom);
//game.state.add('Backyard', Backyard);
