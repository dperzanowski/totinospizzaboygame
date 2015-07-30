var width = window.innerWidth - 20;
var height = window.innerHeight - 20;

var game = new Phaser.Game(width, height, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render});

var music;

var totinosPizzaBoy;
var actionBronson;
var pizzaRoll;
var pizzaBoyMouth;
var pizzaRollHitbox;

function preload() {
  game.load.image('warhammer-world', 'assets/warhammer-world.jpg');
  game.load.image('action-bronson', 'assets/action-bronson.png');
  game.load.image('totinos-pizza-boy', 'assets/totinos-pizza-boy-guy.png');
  game.load.image('pizza-roll', 'assets/pizza-roll.png');

  game.load.audio('rolls-in-my-mouth', ['assets/Put_Some_Rolls_In_Your_Mouth.mp3']);
}

function create() {

  actionBronson = game.add.sprite(400, 300, 'action-bronson');
  actionBronson.anchor.setTo(0.5, 0.5);
  actionBronson.scale.set(.25);

  pizzaBoyMouth = game.add.graphics(100,100);

  // draw a circle
  pizzaBoyMouth.lineStyle(0);
  pizzaBoyMouth.beginFill(0xFF0000, 0.0);
  pizzaBoyMouth.drawCircle(7, -150, 50);
  pizzaBoyMouth.endFill();

  totinosPizzaBoy = game.add.sprite(400, 300, 'totinos-pizza-boy');
  totinosPizzaBoy.scale.set(.25);
  totinosPizzaBoy.anchor.setTo(0.5, 0.5);
  totinosPizzaBoy.addChild(pizzaBoyMouth);

  pizzaRollHitbox = game.add.graphics(50,50);

  // draw a circle
  pizzaRollHitbox.lineStyle(0);
  pizzaRollHitbox.beginFill(0x00FF00, 0.0);
  pizzaRollHitbox.drawCircle(-55, -50, 50);
  pizzaRollHitbox.endFill();

  pizzaRoll = game.add.sprite(50, 50, 'pizza-roll');
  pizzaRoll.scale.set(0.5);
  pizzaRoll.anchor.setTo(0.5, 0.5);
  pizzaRoll.addChild(pizzaRollHitbox);

  var style1 = {font: "30px Helvetica", fill: "#f0f", align: "right"};
  var style2 = {font: "30px Helvetica", fill: "#0ff", align: "right"};
  var style3 = {font: "30px Helvetica", fill: "#ff0", align: "right"};

  var actionBronsonName3 = game.add.text(570, 550, "Put some rolls in my mouth!", style3);
  var actionBronsonName2 = game.add.text(571, 551, "Put some rolls in my mouth!", style2);
  var actionBronsonName1 = game.add.text(572, 552, "Put some rolls in my mouth!", style1);

  //  Our controls.
  cursors = game.input.keyboard.createCursorKeys();

  music = game.add.audio('rolls-in-my-mouth');
}

function update() {
  totinosPizzaBoy.angle += 1;

  var speed = 2;

  if (cursors.left.isDown) {
    // Move left
    pizzaRoll.x -= speed;
    pizzaRoll.angle += speed;
  }
  if (cursors.right.isDown) {
    // Move left
    pizzaRoll.x += speed;
    pizzaRoll.angle += speed;
  }
  if (cursors.up.isDown) {
    // Move left
    pizzaRoll.y -= speed;
    pizzaRoll.angle -= speed;
  }
  if (cursors.down.isDown) {
    // Move left
    pizzaRoll.y += speed;
    pizzaRoll.angle -= speed;
  }


  if (checkOverlap(pizzaRollHitbox, pizzaBoyMouth)) {
    music.restart();
  }
}

function render() {
  game.debug.soundInfo(music, 20, 20);
}

function checkOverlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);
}
