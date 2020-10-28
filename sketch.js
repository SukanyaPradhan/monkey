var monkey,monkey_animation,banana,banana_image,stone,stone_image,forest,forest_image,
    stoneGroup,bananaGroup,ground;

var PLAY=1;
var END=0;
var gameState=PLAY;

var score=0;

function preload(){
  
  monkey_animation = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png",
  "Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  banana_image=loadImage("banana.png");
  forest_image=loadImage("jungle.jpg");
  stone_image=loadImage("stone.png");
}

function setup() {
  createCanvas(800, 400);
  
  monkey = createSprite(50,350,20,20);
  monkey.addAnimation('monkey',monkey_aniamtion);
  monkey.scale=0.09;

  forest = createSprite(200,200,800,800);
  forest.addImage('jungle',forest_image);
  forest.velocityX=-3;
  forest.scale=1.5;
  forest.x=forest.width/2;

  ground = createSprite(200,380,800,5);
  ground.visible=false;
  ground.velocityX=-3;
  ground.x=ground.width/2;

}

function draw() {
  background(220);

  if(forest.x<0){
    forest.x=forest.width/2;
  }
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  monkey.collide(ground);
  
  if (gameState===PLAY){
    
    if(keyDown("space")&& monkey.y>=350){
      monkey.velocityY=-5;
    }
    monkey.velocityY=monkey.velocityY+0.2;
    
    if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score=score+5;
    }
    switch (score){
      case 10:monkey.scale=0.14;
         break;
      case 20:monkey.scale=0.16;
         break;
      case 30:monkey.scale=0.18;
         break;
      case 40:monkey.scale=0.20;
         break;
      case 50:monkey.scale=0.22;
         break;
      default:break;
      
    }
    if (stoneGroup.isTouching(monkey)) {
      gameState=END;
      monkey.velocityY=10;
    }

  }else if (gameState===END){
     fill("white");
     textSize(25);
     text("GAME OVER",150,200);
     text("Press 'space' to restart the game",20,250);

     stoneGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
     stoneGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
     ground.velocityX=0;
     forest.velocityX=0;
     monkey.velocityX=0;
     monkey.velocityY=0;

  }
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: " + score,550,100);

spawnBanana();
spawnStone();
drawSprites();
}

function spawnStone(){
if (frameCount%200===0){
var stone = createSprite(800,370,10,10);
stone.addImage('stone',stone_image);
stone.velocityX=-3;
stone.scale=0.1;
stone.lifetime=250;
stoneGroup.add(stone);
}
}
function spawnBanana(){
  if (frameCount%250===0){
  var banana = createSprite(800,300,10,10);
  banana.y=random(270,300);
  banana.addImage('banana',banana_image);
  banana.velocityX=-3;
  banana.scale=0.5;
  banana.lifetime=250;
  bananaGroup.add(banana);
  }
}