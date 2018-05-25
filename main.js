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

var textOn = 1;
var line = [];

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 100;
var lineDelay = 100;

var content = [
		"It's the newspaper from yesterday...",
		"BREAKING NEWS! New World Congress Regulations!", 
		"Citizens must now use the arrow keys to move",
		"and space bar to interact with objects! ",
		"Damn, they're really getting into everything."
		];

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
			game.state.start('LivingRoom');
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

		playerSpeed = 2;
		usedApple = 0;
		usedPlant = 0;
		readNewspaper = 0;
		key = 0;
		interactable = 0;

		game.physics.startSystem(Phaser.Physics.Arcade);
		game.music = game.add.audio('shades');
		game.music.play('', 0, 1.0, true);

		front_bg = game.add.sprite(0, 0, 'front_porch_bg');

		ground = game.add.group();
		ground.enableBody = true;
		//ground.immovable = true;

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
		//text.setTextBounds(0, 560, 250, 250);


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

		// Setting up text box
		this.textbox = game.add.image(140, 100, 'textbox');
		//textbox.scale.setTo(0.5, 0.5);
		this.textbox.alpha = 0.5;

		var bar = game.add.graphics();
		bar.beginFill(0x000000, 0.2);
		bar.drawRect(0, 250, 250, 250);

		this.style = { font: "bold 10px Arial", fill: "#3e8989", boundsAlignH: "center", boundsAlignV: "middle" };
		this.text = game.add.text(155, 110, '', this.style);
		//text.setShadow(3, 3, 'rgba(0,0,0,1.0)', 2);

		this.nextLine();

	},
	nextLine: function()
	{		
	    if (lineIndex === content.length)
	    {
	        //  We're finished
	        //this.enableInput();
	        return;
	    }
	    if(lineIndex%2 == 0)
	    {
	    	this.text.setText("");
	    }

	    //  Split the current line on spaces, so one word per array element
	    line = content[lineIndex].split(' ');

	    //  Reset the word index to zero (the first word in the line)
	    wordIndex = 0;

	    //  Call the 'nextWord' function once for each word in the line (line.length)
	    game.time.events.repeat(wordDelay, line.length, this.nextWord, this);

	    //  Advance to the next line
	    lineIndex++;
	},
	nextWord: function()
	{
	    //  Add the next word onto the text string, followed by a space
	    this.text.text = this.text.text.concat(line[wordIndex] + " ");

	    //  Advance the word index to the next word in the line
	    wordIndex++;

	    //  Last word?
	    if (wordIndex === line.length)
	    {
	        //  Add a carriage return
	        this.text.text = this.text.text.concat("\n");

	        //  Get the next line after the lineDelay amount of ms has elapsed
	        game.time.events.add(lineDelay, this.nextLine, this);
	    }
	},
	switchLivingRoom: function()
	{
		this.enableInput();
		game.state.start("LivingRoom");
	},
	interactApple: function(player, apple)
	{
		playerSpeed = 0;
		disableInput = 1;
		this.textbox.alpha = 0.5;
		this.text.alpha = 1;
		textOn = 1;
		this.click.play('', 0, 1, false);

		this.contentErase();
		content = [
		"How did this apple get here? Is this one of those ", 
		"fake fruit decoration-type things?",
		"Upon closer inspection, it’s REALLY ripe, ",
		"almost perfect, and real.",
		"Man, as tasty as this looks, this isn’t gonna help me ",
		"find Megan."
		];
		this.nextLine();

		usedApple = 1;
	},
	interactNewspaper: function(player, newspaper)
	{
		playerSpeed = 0;
		disableInput = 1;
		this.textbox.alpha = 0.5;
		this.text.alpha = 1;
		textOn = 1;
		this.click.play('', 0, 1, false);

		this.contentErase();
		content = [
		"In other news, local student of Monroe High School",
		"Megan has been filed as missing on Wednesday.",
		"Law enforcement encourage locals to call the ",
		"missing persons hotline if they have any tips on",
		"her whereabouts."
		]
		this.nextLine();

		readNewspaper = 1;
	},
	interactPlant: function(player, plant)
	{
		disableInput = 1;
		playerSpeed = 0;
		this.textbox.alpha = 0.5;
		this.text.alpha = 1;
		textOn = 1;
		this.click.play('', 0, 1, false);

		this.contentErase();
		content = [
		"The flowering plant seems well-maintained somehow. ",
		"The petals are white and the middle is pink, ", 
		"pretty standard for a flower.",
		"In the moonlight, something shines out of the soil.",
		"You pull out the shiny piece of metal and find that ",
		"it’s a key! Who would hide their key in a flower pot? ", 
		"Whatever, hopefully this is my golden ticket.",
		" "
		];
		this.nextLine();

		usedPlant = 1;
		key = 1;
	},
	interactDoor: function(player, door)
	{
		playerSpeed = 0;
		disableInput = 1;
		if(key == 0)
		{
			disableInput = 1;
			this.textbox.alpha = 0.5;
			this.text.alpha = 1;
			textOn = 1;
			this.locked.play('', 0, 1, false);

			this.contentErase();
			content = [
			"Of course it’s locked. What did I expect?", 
			];
			this.nextLine();
			interactable = 1;
		}
		else if(key == 1)
		{
			this.textbox.alpha = 0.5;
			this.text.alpha = 1;
			textOn = 1;
			this.opened.play('', 0, 1.0, false);

			this.contentErase();
			content = [
			"You slot the key in, turn it, and ",
			"a satisfying click confirms that the door is unlocked." 
			];
			this.nextLine();
			game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.switchLivingRoom, this);
			// this.opened.onStop.add(this.switchLivingRoom, this);

		}
	},
	contentErase: function()
	{
		content = [];
		line = [];
		wordIndex = 0;
		lineIndex = 0;
		this.text.setText("");
	},
	enableInput: function()
	{
		disableInput = 0;
		playerSpeed = 2;
	},
	update: function()
	{
		// Collision detection between groups
		var hitGround = game.physics.arcade.collide(player, ground);	// Collision b/t player and platforms
		player.body.gravity.y = 350;	// Simulate gravity by applying a force in the y-axis
		player.body.velocity.x = 0;	// Stills horizontal velocity
		// player.body.setSize(24, 24, 0, 0);

		// Checks for input of player to determine direction of movement
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			if(textOn == 1)
			{
				//disableInput = 1;
				textOn = 0;
				this.contentErase();
				this.enableInput();
				this.text.alpha = 0;
				this.textbox.alpha = 0;
			}
			else if(usedApple == 0 && interactable == 1)
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
		else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && disableInput == 0)
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
		else if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && player.body.touching.down && hitGround && disableInput == 0)
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
// GamePlay State
var LivingRoom = function(game){};
LivingRoom.prototype = 
{

	create: function()
	{
		livingRoomDoor = 0;
		game.add.sprite(0,0, 'living_room_bg');
        floor = game.add.sprite(0,130,'floor');
        portrait = game.add.group();
        portrait.enableBody = true;
        portrait.create(165,25, 'portrait');
        wineCabinet = game.add.group();
        wineCabinet.enableBody = true;
        wineCabinet.create(300,47,'wine_cabinet');
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

		// Setting up text box
		this.textbox = game.add.image(140, 100, 'textbox');
		//textbox.scale.setTo(0.5, 0.5);
		this.textbox.alpha = 0.5;

		var bar = game.add.graphics();
		bar.beginFill(0x000000, 0.2);
		bar.drawRect(0, 250, 250, 250);

		this.style = { font: "bold 10px Arial", fill: "#3e8989", boundsAlignH: "center", boundsAlignV: "middle" };
		this.text = game.add.text(155, 110, '', this.style);
		//text.setShadow(3, 3, 'rgba(0,0,0,1.0)', 2);

		this.nextLine();
	},
	nextLine: function()
	{		
	    if (lineIndex === content.length)
	    {
	        //  We're finished
	        //this.enableInput();
	        return;
	    }
	    if(lineIndex%2 == 0)
	    {
	    	this.text.setText("");
	    }

	    //  Split the current line on spaces, so one word per array element
	    line = content[lineIndex].split(' ');

	    //  Reset the word index to zero (the first word in the line)
	    wordIndex = 0;

	    //  Call the 'nextWord' function once for each word in the line (line.length)
	    game.time.events.repeat(wordDelay, line.length, this.nextWord, this);

	    //  Advance to the next line
	    lineIndex++;
	},
	nextWord: function()
	{
	    //  Add the next word onto the text string, followed by a space
	    this.text.text = this.text.text.concat(line[wordIndex] + " ");

	    //  Advance the word index to the next word in the line
	    wordIndex++;

	    //  Last word?
	    if (wordIndex === line.length)
	    {
	        //  Add a carriage return
	        this.text.text = this.text.text.concat("\n");

	        //  Get the next line after the lineDelay amount of ms has elapsed
	        game.time.events.add(lineDelay, this.nextLine, this);
	    }
	},
	// switchLivingRoom: function()
	// {
	// 	this.enableInput();
	// 	game.state.start("LivingRoom");
	// },
	interactMirror: function(player, mirror)
	{
		playerSpeed = 0;
		disableInput = 1;
		this.textbox.alpha = 0.5;
		this.text.alpha = 1;
		textOn = 1;
		//this.click.play('', 0, 1, false);

		this.contentErase();
		content = [
		"How did this apple get here? Is this one of those ", 
		"fake fruit decoration-type things?",
		"Upon closer inspection, it’s REALLY ripe, ",
		"almost perfect, and real.",
		"Man, as tasty as this looks, this isn’t gonna help me ",
		"find Megan."
		];
		this.nextLine();

		this.usedMirror = 1;
	},
	interactCat: function(player, cat1)
	{
		playerSpeed = 0;
		disableInput = 1;
		this.textbox.alpha = 0.5;
		this.text.alpha = 1;
		textOn = 1;
		//this.click.play('', 0, 1, false);

		this.contentErase();
		content = [
		"In other news, local student of Monroe High School",
		"Megan has been filed as missing on Wednesday.",
		"Law enforcement encourage locals to call the ",
		"missing persons hotline if they have any tips on",
		"her whereabouts."
		]
		this.nextLine();

		this.usedCat = 1;
	},
	interactPortrait: function(player, portrait)
	{
		disableInput = 1;
		playerSpeed = 0;
		this.textbox.alpha = 0.5;
		this.text.alpha = 1;
		textOn = 1;
		//this.click.play('', 0, 1, false);

		this.contentErase();
		content = [
		"The flowering plant seems well-maintained somehow. ",
		"The petals are white and the middle is pink, ", 
		"pretty standard for a flower.",
		"In the moonlight, something shines out of the soil.",
		"You pull out the shiny piece of metal and find that ",
		"it’s a key! Who would hide their key in a flower pot? ", 
		"Whatever, hopefully this is my golden ticket.",
		" "
		];
		this.nextLine();

		this.usedPortrait = 1;
		//key = 1;
	},
	interactCabinet: function(player, wineCabinet)
	{
		playerSpeed = 0;
		disableInput = 1;
		this.textbox.alpha = 0.5;
		this.text.alpha = 1;
		textOn = 1;
		//this.click.play('', 0, 1, false);

		this.contentErase();
		content = [
		"In other news, local student of Monroe High School",
		"Megan has been filed as missing on Wednesday.",
		"Law enforcement encourage locals to call the ",
		"missing persons hotline if they have any tips on",
		"her whereabouts."
		]
		this.nextLine();

		this.usedCabinet = 1;
	},
	contentErase: function()
	{
		content = [];
		line = [];
		wordIndex = 0;
		lineIndex = 0;
		this.text.setText("");
	},
	enableInput: function()
	{
		disableInput = 0;
		playerSpeed = 2;
	},
	interactDoor1: function()
	{
		game.state.start("BedRoom");
	},
	update: function()
	{
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))
		{
			if(textOn == 1)
			{
				//disableInput = 1;
				textOn = 0;
				this.contentErase();
				this.enableInput();
				this.text.alpha = 0;
				this.textbox.alpha = 0;
			}
			else if(usedMirror == 0)
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