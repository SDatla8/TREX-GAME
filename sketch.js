var trex, trexImage;
var bg;
var GO,GOImg;
var restart,restartImg;
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var obstaclegroup;
var cloudgroup;
var obstacle1Img,obstacle2Img,obstacle3Img,obstacle4Img,obstacle5Img,obstacle6Img;
var cloudImg;
 var invisibleground;
var ground2,ground2Image;
var trexcollide;
var CheckPoint;
var jump;
var die;
function setup() {
  createCanvas(600,200);
invisibleground=createSprite(300,200,600,5)
  trex = createSprite(50,175);
  trex.addAnimation("trex", trexImage);
  ground = createSprite(200,190, 800, 5);
trex.scale=0.5;
ground.addImage("ground2.png",ground2Image)  
invisibleground.visible=false;
  obstaclegroup = new Group();
cloudgroup = new Group();
 GO=createSprite (275,130,5,5);
restart=createSprite(290,165,5,5);
GO.addImage("gameOver.png",GOImg);
  restart.addImage("restart.png",restartImg);
  GO.scale=0.5;
  restart.scale=0.5;
  GO.visible=false;
  restart.visible=false;
}

function preload() {
  trexImage = loadAnimation("trex1.png", "trex3.png", "trex4.png")
ground2Image= loadImage("ground2.png")
  obstacle1Img = loadImage("obstacle1.png")
  obstacle2Img = loadImage("obstacle2.png")
  obstacle3Img = loadImage("obstacle3.png")
  obstacle4Img = loadImage("obstacle4.png")
  obstacle5Img = loadImage("obstacle5.png")
  obstacle6Img = loadImage("obstacle6.png")
cloudImg=loadImage("cloud1.png");
  trexcollided=loadImage("trexcollided.png");
GOImg=loadImage("gameOver.png");
restartImg=loadImage("restart.png");
CheckPoint=loadSound("checkPoint.mp3");
jump=loadSound("jump.mp3");
die=loadSound("die.mp3");
}

function draw() {
  
  background("white");
  drawSprites();
   
   text("SCORE: "+ score,30,10);
  if(gameState===PLAY){
  ground.velocityX= -(6 + 3*score/100);
if (ground.x < 0){
    ground.x = ground.width/2;
  }
    score=score + Math.round(getFrameRate()/60);
  if(keyDown("space")&& trex.y>=174){
   jump.play();
    trex.velocityY=-10; 
    }
    if(score>0 && score%100 === 0){
      CheckPoint.play();
       }
trex.velocityY=trex.velocityY+0.8; 
 
console.log(trex.y);
spawnobstacles();
spawnclouds();  
 if(obstaclegroup.isTouching(trex)){
   gameState=END; 
   die.play();
    }
     
  }   

 else if(gameState===END){
 
   obstaclegroup.setVelocityXEach(0);
   cloudgroup.setVelocityXEach(0);
   ground.velocityX=0;
cloudgroup.setLifetimeEach(-1);
obstaclegroup.setLifetimeEach(-1);   
trex.addImage("t1",trexcollided);
   trex.changeImage("t1",trexcollided);
 GO.visible=true;
  restart.visible=true;
if(mousePressedOver(restart)) {
    reset();
  }
   
 }
  
  
trex.collide(invisibleground);
    
}



function spawnobstacles () {
 if(frameCount  % 60===0){ 
obstacles=createSprite(600,180,5,5);
obstacles.velocityX= -(6 + 3*score/100);
  
  var rand=Math.round(random(1,6));
   switch(rand){
case 1:obstacles.addImage("ob1",obstacle1Img);
break;
case 2:obstacles.addImage("ob2",obstacle2Img);
 break;
case 3:obstacles.addImage("ob3",obstacle3Img);
 break;
case 4:obstacles.addImage("ob4",obstacle4Img);
 break;
 case 5:obstacles.addImage("ob5",obstacle5Img);
 break;
case 6:obstacles.addImage("ob6",obstacle6Img);
break;       
   } 
  obstacles.scale=0.5;
   obstacles.lifetime=75;
   obstaclegroup.add(obstacles);
 }
}
function spawnclouds () {
 if(frameCount%100==0){ 
 cloud=createSprite(600,55,5,5); 
cloud.velocityX=-4;
cloud.y=random(15,100);
   
      cloud.addImage("c1",cloudImg);
  cloud.scale=0.75;
   cloud.lifetime=75;
    cloudgroup.add(cloud);
   }
}

function reset(){
score = 0;
trex.addAnimation("t1",trexImage)

gameState= PLAY;  
GO.visible=false;
restart.visible=false;

obstaclegroup.destroyEach();
cloudgroup.destroyEach();
 


}