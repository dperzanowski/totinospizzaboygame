var width = window.innerWidth - 20;
var height = window.innerHeight - 20;
var game = new Phaser.Game(width, height, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var pizzaRoll;
var pizzaBoyMouth;

function preload() {
  // backgrounds
  game.load.image('warhammer-world', 'assets/warhammer-world.jpg');
  game.load.image('action-bronson', 'assets/action-bronson.png');

  // people
  game.load.image('totinos-pizza-boy', 'assets/people/totinos-pizza-boy-guy.png');
  game.load.image('totinos-pizza-boy-two', 'assets/people/960.png');
  game.load.image('hard-rock-joe', 'assets/people/pizza_rolls.png');

  // pizza rolls
  game.load.image('pizza-roll', 'assets/pizza-roll.png');

  // audio
  game.load.audio('rolls-in-my-mouth', ['assets/Put_Some_Rolls_In_Your_Mouth.mp3']);
}

function create() {

  // create background
  background = game.add.group();
  actionBronson = background.create(400, 300, 'action-bronson');
  actionBronson.anchor.setTo(0.5, 0.5);
  actionBronson.scale.set(.75);


  totinosPeople = game.add.group();
  totinosPizzaBoy = build_pizza_boy()

}

function update() {
  totinosPizzaBoy.angle += 1.5;
}


function build_pizza_boy() {
  x_pos = Math.random() * width + 1;
  y_pos = Math.random() * height + 1;

  // draw a circle
  pizzaBoyMouth = game.add.graphics(100,100);
  pizzaBoyMouth.lineStyle(0);
  pizzaBoyMouth.beginFill(0xFF0000, 0.5);
  pizzaBoyMouth.drawCircle(7, -150, 50);
  pizzaBoyMouth.endFill();

  pizzaBoybody = totinosPeople.create(x_pos, y_pos, 'totinos-pizza-boy');
  pizzaBoybody.scale.set(.25);
  pizzaBoybody.anchor.setTo(0.5, 0.5);
  pizzaBoybody.addChild(pizzaBoyMouth);


  // peopleLayer.add(pizzaBoyMouth);

  console.log("Pizzaboy built at: (" + x_pos + ", " + y_pos + ")");

  return pizzaBoybody;
}
