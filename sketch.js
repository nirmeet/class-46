var rocket
var rocketImage
var asteroid, asteroidImage
var asteroidGroup
var gameState="play"
var gameover,gameoverImage
var restart,restartImage

function preload (){
rocketImage=loadImage("pixlr.png")
asteroidImage=loadImage("asteroid.png")
gameoverImage=loadImage("gameover.png")
restartImage=loadImage("restart.png")
}

function setup() {
  createCanvas(800,800);
  rocket=createSprite(400,700,20,50)
  rocket.addImage(rocketImage)
  rocket.scale = 0.3
asteroidGroup=new Group()
  edges=createEdgeSprites()
  
  gameover=createSprite(400,400)
  gameover.addImage(gameoverImage)
  gameover.scale=0.5;
  gameover.visible=false;
  restart=createSprite(400,550);
  restart.addImage(restartImage);
  restart.scale=0.3;
  restart.visible=false;
}
function draw() {
  background(0,0,0) 

  if(gameState=="play"){
    if (keyDown("left")){
      rocket.x=rocket.x-5
  
    }
    if(keyDown("right")){
      rocket.x=rocket.x+5
    }
  
    if(keyDown("space")){
      rocket.velocityY = -4;
    }
    rocket.velocityY = rocket.velocityY +0.8
  
    spawnAsteriods();

    if(asteroidGroup.isTouching (rocket)){
      gameState = "end"
  }

  }
  else if(gameState=="end"){
      asteroidGroup.destroyEach();
      rocket.destroy();
      restart.visible= true;
      gameover.visible=true;

      if(mousePressedOver(restart)) {
        restart.visible=false;
        gameover.visible=false;
        gameState ="play";
      }
  }




  
  rocket.collide(edges);
  console.log(rocket.position.x)
  

  drawSprites();
}

function spawnAsteriods(){
  if(frameCount%50 === 0){
    asteroid=createSprite(200,-50,20,20)
    asteroid.velocityY=6;
    asteroid.x=Math.round(random(20,780))
    asteroid.lifetime=500
    asteroid.addImage(asteroidImage)
    asteroid.scale=0.2
    rocket.depth=asteroid.depth+1;
    asteroidGroup.add(asteroid)
  }
  
}

