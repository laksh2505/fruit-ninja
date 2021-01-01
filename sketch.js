var PLAY = 1
var END = 0
var gamestate = PLAY
var score;

var fruit1, fruit2, fruit3, fruit4;
var monster;
var sword;
var fruit;
var gameover_img, monster_img, sword_img;
var r, randomfruit;
var fruitgroup, enemygroup;
var knifeSound, gameoverSound;
var position;

function preload(){
 monster_img = loadAnimation("alien1.png", "alien2.png") ;
  sword_img = loadImage("sword.png");
  gameover_img = loadImage("gameover.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  knifeSound = loadSound("knifeSwooshSound.mp3");
  gameoverSound = loadSound("gameover.mp3");
}

function setup(){
  createCanvas(600,600);
  
  sword = createSprite(40,200,20,20);
  sword.addImage(sword_img);
  sword.scale = 0.7;
  
  score = 0;
  fruitgroup = createGroup();
  enemygroup = createGroup()
}


function draw(){
  background("yellow");
  if(gamestate === PLAY){
  sword.x = mouseX;
  sword.y = mouseY;
  
  enemy();
  fruits();
  if(fruitgroup.isTouching(sword)){
    fruitgroup.destroyEach();
    knifeSound.play()
    score = score+2;
  }
  else{
    if(enemygroup.isTouching(sword)){
      gamestate = END;
      gameoverSound.play();
      fruitgroup.destroyEach();
      enemygroup.destroyEach();
      fruitgroup.setVelocityXEach(0);
      enemygroup.setVelocityXEach(0);
      sword.addImage(gameover_img);
      sword.x = 300;
      sword.y = 300;
      sword.scale = 2.0;
    }
  }
  
}
 drawSprites();
 text("score" + score, 300, 30);
}

function enemy(){
  if(frameCount %200===0){
    monster = createSprite(600,200,20,20);
    monster.addAnimation("mov", monster_img);
    monster.velocityX = -(8+score/10);
    monster.y = Math.round(random(100, 300))
    monster.lifetime = 90;
    enemygroup.add(monster);
  }
}

function fruits(){
  if(frameCount %50===0){
    position = Math.round(random(1,2));
    fruit = createSprite(400,200,20,20);
    if(position==1){
      fruit.x = 600
      fruit.velocityX = -(7+score/4)
    }
    else{
      if (position == 2){
        fruit.x = 0;
        fruit.velocityX = +(7 + score/4);
      }
    }
    r = Math.round(random(1,4))
  if(r == 1){
    fruit.addImage(fruit1);
  }else if(r==2){
    fruit.addImage(fruit2);
  }else if(r==3){
    fruit.addImage(fruit3);
  }else if(r==4){
    fruit.addImage(fruit4);
  }
    fruit.y = Math.round(random(50, 340));
    fruit.scale = 0.2;
    fruit.lifetime = 100
  fruitgroup.add(fruit);
  }
  
  
  
}

