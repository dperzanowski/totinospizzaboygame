var width = window.innerWidth - 20;
var height = window.innerHeight - 20;

var game = new Phaser.Game(width, height, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render});

var music;

var totinosPizzaBoy;
var actionBronson;
var pizzaRoll;
var pizzaBoyMouth;
var pizzaRollHitbox;
var pizzaRollEaten;

var pizzaroll_song;
var cursors;

function preload() {
  game.load.image('warhammer-world', 'assets/warhammer-world.jpg');
  game.load.image('action-bronson', 'assets/action-bronson.png');

  // people
  game.load.image('totinos-pizza-boy', 'assets/people/totinos-pizza-boy-guy.png');
  game.load.image('totinos-pizza-boy-two', 'assets/people/960.png');
  game.load.image('hard-rock-joe', 'assets/people/pizza_rolls.png');

  game.load.image('pizza-roll', 'assets/pizza-roll.png');

  game.load.audio('rolls-in-my-mouth', ['assets/Put_Some_Rolls_In_Your_Mouth.mp3']);
}

function create() {

  actionBronson = game.add.sprite(400, 300, 'action-bronson');
  actionBronson.anchor.setTo(0.5, 0.5);
  actionBronson.scale.set(.25);

  // build people
  pizzaBoys = game.add.group();
  build_random_pizza_boy();

  pizzaRollHitbox = game.add.graphics(50,50);

  // draw a circle
  pizzaRollHitbox.lineStyle(0);
  pizzaRollHitbox.beginFill(0x00FF00, 0.5);
  pizzaRollHitbox.drawCircle(-55, -50, 50);
  pizzaRollHitbox.endFill();

  pizzaRoll = game.add.sprite(50, 50, 'pizza-roll');
  pizzaRoll.scale.set(0.5);
  pizzaRoll.anchor.setTo(0.5, 0.5);
  pizzaRoll.addChild(pizzaRollHitbox);

  // pizzaRollLayer.add(pizzaRoll);

  var style1 = {font: "30px Helvetica", fill: "#ff0000", align: "right"};
  var style2 = {font: "30px Helvetica", fill: "#00f0f0", align: "right"};
  var style3 = {font: "30px Helvetica", fill: "#0000ff", align: "right"};

  var actionBronsonName3 = game.add.text(570, 550, "Put some rolls in my mouth!", style3);
  var actionBronsonName2 = game.add.text(572, 552, "Put some rolls in my mouth!", style2);
  var actionBronsonName1 = game.add.text(574, 554, "Put some rolls in my mouth!", style1);

  // Our sounds
  pizzaroll_song = new Phaser.Sound(game, 'rolls-in-my-mouth');
  pizzaroll_song.allowMultiple = true;

  //  Our controls.
  cursors = game.input.keyboard.createCursorKeys();

  // Our variables
  var pizzaRollEaten = false;
}

function update() {
  totinosPizzaBoy.angle += 1;

  var speed = 4;

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

  if (checkOverlap(pizzaRollHitbox, pizzaBoyMouth) && !pizzaRollEaten) {
    pizzaroll_song.play();
    build_random_pizza_boy();
  }
  if (checkOverlap(pizzaRollHitbox, pizzaBoyMouth)) {
    pizzaRollEaten = true;
  }
  if (!checkOverlap(pizzaRollHitbox, pizzaBoyMouth)) {
    pizzaRollEaten = false;
  }
}

function render() {
  game.debug.soundInfo(pizzaroll_song, 20, 20);
}

function checkOverlap(spriteA, spriteB) {
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);
}

function build_random_pizza_boy() {
  build_key = Math.floor(Math.random() * 2 + 1);
  console.log("Building key: " + build_key);
  switch (build_key) {
    case 1:
      build_pizza_boy();
      break;
    case 2:
      build_hardrock_joe();
      break;
    case 3:
      build_pizza_boy();
      break;
    default:
      build_pizza_boy();

  }
}

function build_hardrock_joe() {
  x_pos = Math.floor(Math.random() * width + 1);
  y_pos = Math.floor(Math.random() * height + 1);

  // draw a circle
  pizzaBoyMouth = game.add.graphics(100,100);
  pizzaBoyMouth.lineStyle(0);
  pizzaBoyMouth.beginFill(0xFF0000, 0.5);
  pizzaBoyMouth.drawCircle(-145, -60, 45);
  pizzaBoyMouth.endFill();

  totinosPizzaBoy = pizzaBoys.create(x_pos, y_pos, 'hard-rock-joe');
  totinosPizzaBoy.scale.set(.25);
  totinosPizzaBoy.anchor.setTo(0.5, 0.5);
  totinosPizzaBoy.addChild(pizzaBoyMouth);

  console.log("Hardrock Joe built at: (" + x_pos + ", " + y_pos + ")");
}

function build_pizza_boy() {
  x_pos = Math.floor(Math.random() * width + 1);
  y_pos = Math.floor(Math.random() * height + 1);

  // draw a circle
  pizzaBoyMouth = game.add.graphics(100,100);
  pizzaBoyMouth.lineStyle(0);
  pizzaBoyMouth.beginFill(0xFF0000, 0.5);
  pizzaBoyMouth.drawCircle(7, -150, 50);
  pizzaBoyMouth.endFill();

  totinosPizzaBoy = pizzaBoys.create(x_pos, y_pos, 'totinos-pizza-boy');
  totinosPizzaBoy.scale.set(.25);
  totinosPizzaBoy.anchor.setTo(0.5, 0.5);
  totinosPizzaBoy.addChild(pizzaBoyMouth);

  console.log("Pizzaboy built at: (" + x_pos + ", " + y_pos + ")");
}
