
var balloon, balloonImage1, balloonImage2; 
var database; 
var height; 

function preload(){
  balloonImage = loadImage("images/1.png");
  balloonImage1 = loadAnimation("images/2.png");
  balloonImage2 = loadAnimation("images/3.png");
}

function setup() {
  database = firebase.database(); 
  createCanvas(1500,700);
  
  
  balloon = createSprite(250, 650, 150, 150);
  balloon.addAnimation("BALLOON", balloonImage1);
  balloon.scale = 0.5; 

  var balloonHeight = database.ref('balloon/height'); 
  balloonHeight.on("value", readHeight, showError); 
}

function draw() {
  background(balloonImage);  

if(keyDown(UP_ARROW)){
  updateHeight(0, -10);
  balloon.addAnimation("image1", balloonImage2);
}

if(keyDown(DOWN_ARROW)){
  updateHeight(0, 10);
  balloon.addAnimation("image1", balloonImage2);
}
  

if(keyDown("left")){ 
  updateHeight(-10, 0); 
  balloon.addAnimation("image2", balloonImage2)
}

if(keyDown("right")){ 
  updateHeight(10, 0); 
  balloon.addAnimation("image2", balloonImage2)
}

drawSprites();

}

function updateHeight(x,y){ 
  database.ref('balloon/height').set({
    'x': height.x + x, 
    'y': height.y + y
  })
}

function readHeight(data){ 
  height = data.val(); 
  balloon.x = height.x; 
  balloon.y = height.y;

}

function showError(){
  console.log("Error in reading from database")
}