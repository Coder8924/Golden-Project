var PLAY=1;
var END=0;
var gameState=PLAY;

var player, playerImg;
var alien, alienImg;
var bullet, bulletImg;
var missile, missileImg;
var bgImg, baseImg;
var score = 0, heart= 3,heartSprite ,heartImg;
var  lifeSheildImg;
var gameOver,gameOverImg;
var replayImg,replay;
var shootSound;
var blast,blastImg;
var destroySound,lifeSound,loseSound,gameOverSound;


function preload() {
    bgImg = loadImage("Images/bgblack.jpg");
    baseImg = loadImage("Images/bgblue.jpg");
    playerImg = loadImage("Images/spaceship.png");
    alienImg = loadImage("Images/alienspaceship.png");
    missileImg = loadImage("Images/missile.png");
    lifeSheildImg = loadImage("Images/lifeshield.png");
    heartImg=loadImage("Images/heart.png")
    gameOverImg = loadImage("Images/gameover.png");
    replayImg = loadImage("Images/replay.png");
    shootSound = loadSound("Images/blaster.mp3");
    blastImg = loadImage("Images/blast.png");
    destroySound = loadSound("Images/blast.mp3");
    lifeSound = loadSound("Images/ding.mp3");
    loseSound = loadSound("Images/loose.mp3");
    gameOverSound = loadSound("Images/gameOver.wav");
}

function setup() {
    canvas = createCanvas(900, 680);
    bg = createSprite(450, 200);
    bg.addImage(bgImg);
    base = createSprite(450, 660);
    base.addImage(baseImg);
    base.scale = 0.5
    player = createSprite(450, 560);
    player.addImage(playerImg);
    player.scale = 0.7;
    heartSprite= createSprite(50,650);
    heartSprite.addImage(heartImg) 
    heartSprite.scale=0.04;
    gameOver=createSprite(450,200);
        gameOver.addImage(gameOverImg);
        gameOver.scale=0.7;
        
        replay = createSprite(440,400);
        replay.addImage(replayImg);
        replay.scale=0.8;

    alienGroup = createGroup();
    missileGroup = createGroup();
    lifeGroup = createGroup();
}

function draw() {
    bg.velocityY = 5;


    if(gameState===PLAY) {
        gameOver.visible=false;
    replay.visible=false;
        if (keyDown("LEFT_ARROW")) {
            player.x = player.x - 20;
        }
        if (keyDown("RIGHT_ARROW")) {
            player.x = player.x + 20;
        }
     bg.velocityY = 10;

    if (bg.y < 600) {
        bg.y = bg.height / 2;
    }
    }
    if(heart===0) {
        gameState=END;
}
    if(gameState===END) {
        gameOver.visible=true;
    replay.visible=true;
        bg.velocityY=0;
        alienGroup.velocityY=0;
        alienGroup.destroyEach();

    }
    if(mousePressedOver(replay)) {
        reset();
    }

    spawnMissile();
    spawnAlien();
    spawnLife();
    if (missileGroup.isTouching(alienGroup)) {
        for (var i = 0; i < alienGroup.length; i++) {
            if (alienGroup.contains(alienGroup.get(i))) {
                if (missileGroup.isTouching(alienGroup.get(i))) {

                    //alienGroup.get(i).destroy();
                    alien.lifetime=100;
                    alien.addImage(blastImg);
                    alien.scale=0.1;
                    destroySound.play();
                    missileGroup.destroyEach()
                    score = score + 1;
                }
            }
        }
    }
    if (player.isTouching(alienGroup)) {
        for (var i = 0; i < alienGroup.length; i++) {
            if (alienGroup.contains(alienGroup.get(i))) {
                if (player.isTouching(alienGroup.get(i))) {

                    alienGroup.get(i).destroy();
                    loseSound.play();
                    heart = heart - 1;
                }
            }
        }
    }

    if(player.isTouching(lifeGroup)) {
        lifeSound.play();
        heart = heart+1;
        lifeGroup.destroyEach();
    }
   
    drawSprites();

    fill(0);
    stroke("green");
    strokeWeight(1);
    textSize(25)
    text("SCORE :  " + score, 750, 650);
    text(" :   " + heart, 70, 660);
}

function spawnMissile() {
    missile = createSprite(player.x, 500);
    missile.addImage(missileImg);
    missile.scale = 0.1;

    if (keyWentDown("space")) {
        missile.visible = true;
        missile.velocityY = -15;
        shootSound.play();
    }
    else {
        missile.visible = false;
    }
    missile.lifetime = 500;
    missileGroup.add(missile);
}

function spawnAlien() {
    if (frameCount % 100 === 0) {
        alien = createSprite(random(10, 870), -50);
        alien.addImage(alienImg);
        alien.scale = 0.5;
     //   alien.velocityY = 5 + score/5;
        alien.velocityY = score+2;
        alien.lifetime = 900;
        alienGroup.add(alien);
    }
}

function spawnLife() {
    if(frameCount%1000===0) {
        life = createSprite(random(10,870),-25);
        life.addImage(heartImg);
        life.scale = 0.04;
        life.velocityY = 10;
        life.lifetime = 900;
        lifeGroup.add(life);
    }
}


function reset() {
    gameOver.visible=false;
    replay.visible=false;
    gameState = PLAY;   
    score = 0;
    heart = 3;
  }