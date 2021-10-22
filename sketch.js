const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var player, playerBase, playerArcher;
var arrows = [];
var playerArrow;


function preload() {
  backgroundImg = loadImage("./assets/background.png");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(200, 350, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(250, playerBase.position.y - 160, 50, 180, options);
  World.add(world,player)

  playerArcher = new PlayerArcher(
    340,
    playerBase.position.y - 112,
    120,
    120
  );

  //playerArrow = new PlayerArrow(340, playerBase.position.y-112, 90,10);
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);
  image(baseimage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerimage,player.position.x,player.position.y,50,180)

  playerArcher.display();
  

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);

  for (var i=0; i<arrows.length; i++) {
    showPlayerArrows(arrows[i])
  }
}

/*function keyReleased() {
  if (keyCode===32) {
    playerArrow.shoot(playerArcher.body.angle);
  }
}*/

function keyReleased() {
  if (keyCode===32) {
    arrows[arrows.length-1].shoot(playerArcher.body.angle);
  }
}

function keyPressed() {
  if (keyCode===32) {
    var playerArrow = new PlayerArrow(340, playerBase.position.y-112, 90,10);
    playerArrow.body.angle = playerArcher.body.angle;
    arrows.push(playerArrow);
  }
}

function showPlayerArrows (arrow) {
  if (arrow) {
    arrow.display();
  }
}

