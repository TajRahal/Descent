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
		game.load.image('trigger', 'assets/img/greenbox.png');
		// https://opengameart.org/content/meow
		game.load.audio('meow', 'assets/audio/Meow.ogg');

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
		game.load.audio('shades', 'assets/audio/Shades/Shades.mp3');
		game.load.audio('walk_sfx', 'assets/audio/Fantasy Sound Library/Fantasy Sound Library/Mp3/Footsteps/Footstep_Dirt_00.mp3')

		// https://opengameart.org/content/glass-break
		game.load.audio('glass_break', 'assets/audio/glass_breaking.mp3');

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
		this.walk_sfx = game.add.audio('walk_sfx');
		this.scream = game.add.audio('scream');
		this.beep = game.add.audio('beep');
		this.click = game.add.audio('click');
		this.locked = game.add.audio('locked');
		this.opened = game.add.audio('opened');

		// Initalizing Variables
		playerSpeed = 5;
		usedApple = 0;
		usedPlant = 0;
		readNewspaper = 0;
		key = 0;
		interactable = 0;

		// Starting Up Physics and Music
		game.physics.startSystem(Phaser.Physics.Arcade);
		game.music = game.add.audio('shades');
		game.music.play('', 0, 1.0, true);

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
		this.click.play('', 0, 1, false);
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

		// SFX
		this.glass_break = game.add.audio('glass_break')
		this.meow = game.add.audio('meow');

		this.doorAccess = 1;
		game.add.sprite(0, 0, 'living_room_bg');

		ground = game.add.group();
		ground.enableBody = true;
        var floor = ground.create(0, 130,'floor');
        floor.body.immovable = true;

        portrait = game.add.group();
        portrait.enableBody = true;
        portrait.create(165,25, 'portrait');

        this.wineCabinet = game.add.group();
        this.wineCabinet.enableBody = true;
        this.wineCabinet.create(300,47,'wine_cabinet');

        this.triggerObj = game.add.group();
        this.triggerObj.enableBody = true;
        this.trigger = this.triggerObj.create(350, 95, 'trigger');
        this.trigger.scale.setTo(0.2, 0.8);

        mirror = game.add.group();
        mirror.enableBody = true;
        mirror.create(50, 65, 'mirror');

        frontDoor = game.add.sprite(5, 69, 'front_door');
        frontDoor.scale.setTo(-1,1);
        frontDoor.anchor.setTo(0.0, 0.0);

        bedDoor = game.add.group();
        bedDoor.enableBody = true;
        bedDoor.create(450, 69, 'bed_door');

        cat1 = game.add.group();
        cat1.enableBody = true;
		cat1.create(285, 117, 'cat1');

		this.triggerCatObj = game.add.group();
		this.triggerCatObj.enableBody = true;
		this.catTrigger = this.triggerCatObj.create(290, 117, 'trigger');
		this.catTrigger.scale.setTo(0.2,0.5);

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
		game.state.start("AlternateLivingRoom");
	},
	bottlePuzzlePrompt: function()
	{
		playerSpeed = 5;
		this.notInEvent = 1;
	},
	catInteract: function()
	{
		playerSpeed = 5;
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
			playerSpeed = 0;
			player.animations.play('idle');
			this.glass_break.onStop.add(this.bottlePuzzlePrompt, this);
		}
		if(passCat && catMeowed == 0)
		{
			this.meow.play('', 0, 1, false);
			catMeowed = 1;
			this.notInEvent = 0;
			playerSpeed = 0;
			player.animations.play('idle');
			this.meow.onStop.add(this.catInteract, this);
		}
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.notInEvent == 1)
		{
			if(usedMirror == 0)
			{
				game.physics.arcade.overlap(player, mirror, this.interactMirror, null, this);
			}
			if(usedPortrait == 0)
			{
				game.physics.arcade.overlap(player, portrait, this.interactPortrait, null, this);
			}
			if(usedCat == 0)
			{
				game.physics.arcade.overlap(player, cat1, this.interactCat, null, this);
			}
			if(usedCabinet == 0)
			{
				game.physics.arcade.overlap(player, door, this.interactCabinet, null, this);
			}
			if(this.doorAccess == 1)
			{
				game.physics.arcade.overlap(player, bedDoor, this.interactDoor, null, this);
			}
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

var AusedMirror = 0;
var AusedPortrait=0;
var AusedCat=0;
var AusedCabinet=0;
// GamePlay State
var AlternateLivingRoom = function(game){};
AlternateLivingRoom.prototype = 
{

	create: function()
	{
		// Starting Up Physics and Music
		game.physics.startSystem(Phaser.Physics.Arcade);

		this.doorAccess = 1;
		// livingRoomDoor = 0;
		game.add.sprite(0, 0, 'living_room_bg');

		ground = game.add.group();
		ground.enableBody = true;
        var floor = ground.create(0, 130,'floor');
        floor.body.immovable = true;

        portrait = game.add.group();
        portrait.enableBody = true;
        portrait.create(165,25, 'portrait');
        portrait.alpha = 0.5;

        wineCabinet = game.add.group();
        wineCabinet.enableBody = true;
        wineCabinet.create(300,47,'wine_cabinet');

        mirror = game.add.group();
        mirror.enableBody = true;
        mirror.create(50, 65, 'mirror');
        
        this.normalDoorObj = game.add.group();
        this.normalDoorObj.enableBody = true;
        this.LRdoor = this.normalDoorObj.create(5, 69, 'front_door');
       	
        this.LRdoor.scale.setTo(-1,1);
        this.LRdoor.anchor.setTo(0.0, 0.0);

        this.frontDoorObj = game.add.group();
        this.frontDoorObj.enableBody = true;
        this.frontDoor = this.frontDoorObj.create(450, 69, 'bed_door');

        cat1 = game.add.group();
        cat1.enableBody = true;
		cat1.create(285, 117, 'cat1');

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
		game.state.start("LivingRoom");
	},
	interactFrontDoor: function()
	{
		game.state.start("FrontDoor");
	},
	update: function()
	{
		var hitGround = game.physics.arcade.collide(player, ground);
		player.body.gravity.y = 350;	// Simulate gravity by applying a force in the y-axis
		player.body.velocity.x = 0;	// Stills horizontal velocity
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			if(usedMirror == 0)
			{
				game.physics.arcade.overlap(player, mirror, this.interactMirror, null, this);
			}
			if(usedPortrait == 0)
			{
				game.physics.arcade.overlap(player, portrait, this.interactPortrait, null, this);
			}
			if(usedCat == 0)
			{
				game.physics.arcade.overlap(player, cat1, this.interactCat, null, this);
			}
			if(usedCabinet == 0)
			{
				game.physics.arcade.overlap(player, door, this.interactCabinet, null, this);
			}
			game.physics.arcade.overlap(player, this.normalDoorObj, this.interactDoor, null, this);
			game.physics.arcade.overlap(player, this.frontDoorObj, this.interactFrontDoor, null, this);
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
