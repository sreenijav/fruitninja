//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage ;
var fruitimg1, fruitimg2, fruitimg3, fruitimg4, enemyimg1, enemyimg2,
gameOverimg, done , swoosh, oversound

var score

function preload(){
  
  knifeImage = loadImage("knife.png");
  
fruitimg1=loadImage("fruit1.png")
  fruitimg2=loadImage("fruit2.png")
  fruitimg3=loadImage("fruit3.png")
  fruitimg4=loadImage("fruit4.png")
  
  enemyimg1=loadImage("alien1.png")
  enemyimg2=loadImage("alien2.png")
  gameOverimg=loadImage("gameover.png")
  
  swoosh=loadSound("knifeSwoosh.mp3")
  oversound=loadSound("gameover.mp3")
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
  fruitGroup=new Group();
  monsterGroup=new Group();
  
  done=createSprite(300,300)
  done.addImage(gameOverimg)
  done.scale=1.5
  done.visible=false
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    fruits();
    enemies();
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    
   
  
    // Increase score if knife touching fruit
    if(fruitGroup.collide(knife)){
      fruitGroup.destroyEach();
      score=score+2
      swoosh.play()
    }
      
    
   
    // Go to end state if knife touching enemy
      if(monsterGroup.collide(knife)){
        oversound.play()
        gameState=END
      }
  }
  if(gameState===END){
    done.visible=true
    if(keyDown("enter")){
      reset();
      
      
    }
    
    
  }
  
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}

function fruits(){
  if(frameCount%100===0){
    fruit=createSprite(400,200,20,20)
    fruit.scale=0.2
    
    var allfruits=Math.round(1,4)
      switch(allfruits){
      case 1:fruit.addImage(fruitimg1)
        break;
        case 2:fruit.addImage(fruitimg2)
        break;
        case 3:fruit.addImage( fruitimg3)
        break;
        case 4:fruit.addImage(fruitimg4)
        break;
        default:break
  }
        fruit.y=Math.round(random(50,350)) 
          fruit.setLifetime=150
          fruit.velocityX=-7
          fruitGroup.add(fruit)
           
          
          var position=Math.round(random(1,2));
          if(position===1){
            fruit.x=600
          }
          
  }}
  
  function enemies(){
     if(frameCount%80===0){
    enemy=createSprite(20,200,20,20)
    enemy.scale=0.7
    
    var allenemy=Math.round(random(1,4))
      switch(allenemy){
      case 1:enemy.addImage(enemyimg1)
        break;
        case 2:enemy.addImage(enemyimg2)
        break;
        default:break
  }
        enemy.y=Math.round(random(20,350)) 
         enemy.setLifetime=200
          enemy.velocityX=7
          monsterGroup.add(enemy)
  }}
    
    
   function reset(){
      gameState=PLAY
     score=0
     fruitGroup.destroyEach();
     monsterGroup.destroyEach();
     done.visible=false
     
    
     
    }