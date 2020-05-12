/*-----------------------------------------
CLASSES
-----------------------------------------*/
class Player{
    constructor() {
        this.name="";
        this.level=0;
        this.score=0;
        this.country="";
    }
}

/*-----------------------------------------
INFO MGMT
-----------------------------------------*/
var player = new Player();

// Set the name of the player via prompt
function setPlayerName()
{
    player.name = prompt("Hey fireman ! Please enter a nickname");
}

/*-----------------------------------------
GEOLOCALISATION MGMT
-----------------------------------------*/
function getLocalisation()
{
    // Controls whether the browser supports localization
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccessLoc, onFailedLoc); // One parameter if it succeeds and one if it fails
    }
    else{
        onFailedLoc();
    }
}

function onSuccessLoc(){

}

function onFailedLoc(){
    player.country = "Unknown"
}

//Commented for faster rending when launched in dev.
//setPlayerName();
//getLocalisation();

/*-----------------------------------------
GAME
-----------------------------------------*/
// Create and define the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "ressources/images/background1500px.jpg";

// Burned bush image
var bushBurnedImage = new Image();
var bushBurned = {};
var bushBurnedReady = false ;
bushBurnedImage.src = "ressources/images/decor/burning_bush_50.gif";
bushBurnedImage.onload = function () {
    bushBurnedReady = true;
}
//var myGif = GIF("https://media.giphy.com/media/cluoH97qdlBd56Izol/giphy.gif");

// Bush image
var bushImage = new Image();
var bush = {};
bushImage.src = "ressources/images/decor/bush_50.png";

// Border image
var borderImage = new Image();
borderImage.src = "ressources/images/decor/border.png";

// Safe zone image
var safeZoneImage = new Image();
safeZoneImage.src = "ressources/images/decor/SafeZone_V1_100.png";

// Lifes image
var heartFullImage = new Image();
heartFullImage.src = "ressources/images/decor/lifes/heart_full_trans_60.png";

var heartEmptyImage = new Image();
heartEmptyImage.src = "ressources/images/decor/lifes/heart_empty_trans_60.png";

// Koala image
var koalaImage = new Image();
koalaImage.onload = function () {
    koalaReady = true;
};
var koala = {};
koalaImage.src = "ressources/images/koala_50.png";

// Well
var wellImage = new Image();
var well = {};
wellImage.src = "ressources/images/decor/well_full_100.png";
var isWellFull = true;

// Well text
var wellTextImage = new Image();
wellTextImage.src = "";

// Helicopter images
var heli1Image = new Image();
heli1Image.src = "ressources/images/decor/Helicopter/helicopter_1.png";

// Helicopter airstrips
var airstripsImage = new Image();
airstripsImage.src = "ressources/images/decor/Helicopter/H1.png";

// Splash
var splashStateImage = new Image();
splashStateImage.src = "ressources/images/Splash_Down.png";
var splashReady = false;
var splashImage = new Image();
splashImage.onload = function () {
    splashReady = true;
};
var splash = {};

// fireman image
var firemanReady = false;
var firemanImage = new Image();
firemanImage.onload = function () {
    firemanReady = true;
};
firemanImage.src = "ressources/images/FM_down_50.png";

// Game objects
var fireman = {
    speed: 256 // movement in pixels per second
};
fireman.x = 50;
fireman.y = 50;
var mapH = 20, mapW = 20;
var like = 3;
var firemanColumn = 0;
var firemanRow = 0;
var collision = 0;
var life = 3 ;
var dateNowForKoala = new Date();
var dateNowForHeli = new Date();
var temp;
var ammunition = 3;
direction = null;

// Helicopter start information
var helicoStartX = 1000;
var helicoStartY = 1000;
var helicoType = 2;

// Define level
var level = 1;
player.level = level;

var gameMap;

// Load the correct map corresponding to the level
switch(level){
    case 1:
        var gameMap=gameMap1;
        break;
    case 2:
        var gameMap=gameMap2;
        break;
    case 3:
        var gameMap=gameMap3;
        break;
}

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

var reset = function () {
    fireman.x = 50;
    fireman.y = 50;
    //    firemanImage.src = "ressources/images/FM_down_50.png";
    //    wellImage.src = "ressources/images/decor/well_full_100.png";
    render();
}

// Update game objects
var update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        // Block to border
        if(fireman.y>50){
            fireman.y -= fireman.speed * modifier;
            firemanImage.src = "ressources/images/FM_up_50.png";
            direction = "up";
        }
    }
    if (40 in keysDown) { // Player holding down
        // Block to border
        if(fireman.y<canvas.height-100){
            fireman.y += fireman.speed * modifier;
            firemanImage.src = "ressources/images/FM_down_50.png";
            direction = "down";
        }
    }
    if (37 in keysDown) { // Player holding left
        // Block to border
        if(fireman.x>50){
            fireman.x -= fireman.speed * modifier;
            firemanImage.src = "ressources/images/FM_left_50.png";
            direction = "left";
        }
    }
    if (39 in keysDown) { // Player holding right
        // Block to border
        if(fireman.x<canvas.width-100){
            fireman.x += fireman.speed * modifier;
            firemanImage.src = "ressources/images/FM_right_50.png";
            direction = "right";
        }
    }

    // Player pressing space for the splash
    document.body.onkeypress = function(e){
        if(e.keyCode == 32){
            splashing();
            if(ammunition>0){
                ammunition -= 1;
            }
        }
    }

    // Check for any collisions between fireman and (burned bush, well,...)
    checkCollision(fireman.x, fireman.y);
}

// Method to remove the splash with timing
var removeTheSplash = function (){
    setTimeout (function() {
        splashImage.src = "";
    }, 500);
}

// Setting the splash direction according to the fireman
var splashing = function () {
    if(ammunition>0){
        switch (direction) {
            case 'up':
                splashImage.src = "ressources/images/Splash_Up.png";
                removeTheSplash();
                splash.x = fireman.x + 0;
                splash.y = fireman.y - 70;
                break;
            case 'down':
                splashImage.src = "ressources/images/Splash_Down.png";
                removeTheSplash();
                splash.x = fireman.x + 0;
                splash.y = fireman.y + 90;
                break;
            case 'left':
                splashImage.src = "ressources/images/Splash_Left.png";
                removeTheSplash();
                splash.x = fireman.x - 50;
                splash.y = fireman.y + 10;
                break;
            case 'right':
                splashImage.src = "ressources/images/Splash_Right.png";
                removeTheSplash();
                splash.x = fireman.x + 70;
                splash.y = fireman.y + 10;
                break;
            default:
                splashImage.src = null;
        }
    }
}

// Function to check if there are any collision
function checkCollision(x, y){
    for(let row = 0; row < mapH; ++row)
    {
        for(let col = 0; col < mapW; ++col)
        {
            var diff = 15;
            switch(gameMap[row][col]){
                    // Burned bush and fireman
                case 1:
                    bushBurned.x = col*50;
                    bushBurned.y = row*50;
                    if(
                        x+diff <= (bushBurned.x + 50)
                        && bushBurned.x <= (x + 50 - diff)
                        && y+diff <= (bushBurned.y + 50)
                        && bushBurned.y <= (y + 50 - diff))
                    {
                        life--;
                        reset();
                    }
                    break;
                    // Koala
                case 8:
                    koala.x = col*50;
                    koala.y = row*50;
                    if(
                        x+diff <= (koala.x + 50)
                        && koala.x <= (x + 50 - diff)
                        && y+diff <= (koala.y + 50)
                        && koala.y <= (y + 50 - diff))
                    {
                        reset();
                    }
                    break;
                    // Well
                case 4:
                    well.x = col*50;
                    well.y = (row*50)+50;
                    if( ammunition < 3
                       && isWellFull
                       && x+diff <= (well.x + 100)
                       && well.x <= (x + 50 - diff)
                       && y+diff <= (well.y + 50)
                       && well.y <= (y + 50 - diff))
                    {
                        wellImage.src = "ressources/images/decor/well_emptyD_100.png";
                        window.setInterval(function(){
                            wellImage.src = "ressources/images/decor/well_empty_100.png";
                        }, 500);
                        window.clearInterval();
                        isWellFull = false ;
                        ammunition++;
                    }

                    // If the well is empty and there is a collision
                    if( !isWellFull
                       && x+diff <= (well.x + 100)
                       && well.x <= (x + 50 - diff)
                       && y+diff <= (well.y + 50)
                       && well.y <= (y + 50 - diff))
                    {
                        // Set the image message
                        wellTextImage.src = "ressources/images/decor/well_text_150.png";
                    }else{
                        wellTextImage.src = "";
                    }
                    break;
            }
        }
    }
}

//function roundnum(num){
//    return Math.round(num / 50)*50;
//}

// Function to move the koala during the game
function makeTheKoalaMoves(){
    for(let x = 0; x < mapH; ++x)
    {
        for(let y = 0; y < mapW; ++y)
        {
            if(gameMap[x][y]==8){
                setRandomDirection(x, y);
            }
        }
    }
}

// Function to get the axe direction of the koala
function setRandomDirection(x, y) {
    var randomChars = 'xy';
    var result = '';
    result = randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    if(result == 'x'){
        temp = x;
        x += Math.round(Math.random()) * 2 - 1;
        while(gameMap[x][y] != 2){
            x = temp;
            x += Math.round(Math.random()) * 2 - 1;
        }
        gameMap[x][y] = 8;
        gameMap[temp][y] = 2;
    }else{
        temp = y;
        y += Math.round(Math.random()) * 2 - 1;
        while(gameMap[x][y] != 2){
            y = temp;
            y += Math.round(Math.random()) * 2 - 1;
        }
        gameMap[x][y] = 8;
        gameMap[x][temp] = 2;
    }
}

// Draw everything
var render = function () {

    // BACKGROUND
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    // SAFE ZONE
    ctx.drawImage(safeZoneImage, 50, 50);

    // CONSTRUCT THE MAP
    var col=0, row=0;
    for(let x = 0; x < mapH; ++x)
    {
        for(let y = 0; y < mapW; ++y)
        {
            let number = gameMap[x][y];
            var date = new Date();
            var seconds = date.getSeconds();
            switch(number){
                case 0:
                    ctx.drawImage(borderImage, col*50, row*50);
                    break;
                case 1:
                    //                    if(dateNowForKoala.getSeconds() < seconds) {
                    //                        if(seconds%2==0){
                    //                            bushBurnedImage.src = "ressources/images/decor/bush_b_50.png";
                    //                        }else{
                    //                            bushBurnedImage.src = "ressources/images/decor/firedbush_50.png";
                    //                        }
                    //                    }
                    if(bushBurnedReady){
                        ctx.drawImage(bushBurnedImage, col*50, row*50);
                    }
                    break;
                case 3:
                    ctx.drawImage(bushImage, col*50, row*50);
                    break;
                case 4:
                    ctx.drawImage(wellImage, col*50, row*50);
                    ctx.drawImage(wellTextImage, col*50+70, row*50-40);
                    break;
                case 8:
                    // Move every x seconds (2 now)
                    if(dateNowForKoala.getSeconds()+1 < seconds) {
                        //                        makeTheKoalaMoves();
                        dateNowForKoala = new Date();
                    }
                    ctx.drawImage(koalaImage, col*50, row*50);
                    break;
            }
            col++;
        }
        col=0;
        row++;
    }

    // HELICOPTER ANIMATION
    ctx.drawImage(airstripsImage, 0, 22);
    ctx.drawImage(heli1Image, helicoStartX, helicoStartY);
    var date = new Date();
    var seconds = date.getSeconds();
    if(dateNowForHeli.getSeconds()-0.5 < seconds && helicoStartX > -10) {
        switch(helicoType){
            case 1:
                heli1Image.src = "ressources/images/decor/Helicopter/helicopter_11.png";
                helicoType = 2;
                break;
            case 2:
                heli1Image.src = "ressources/images/decor/Helicopter/helicopter_12.png";
                helicoType = 1;
                break;
        }
        helicoStartX-=4;
        helicoStartY-=4;
        dateNowForHeli = new Date();
    }else{
        heli1Image.src = "ressources/images/decor/Helicopter/helicopter_s_2.png";
    }


    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    var date = new Date();
    var seconds = date.getSeconds();
    ctx.fillText("Time " + seconds, 100, 32);
    ctx.fillText("Ammunition : " + ammunition, 800, 32);

    // FIREMAN
    if (firemanReady && helicoStartY <= -10) {
        ctx.drawImage(firemanImage,
                      fireman.x,
                      fireman.y);
    }

    // SPLASH
    if (splashReady){
        ctx.drawImage(splashImage, splash.x, splash.y);
    }

    // HEARTS
    var x1=400;
    var x2=x1+80;
    var x3=x2+80;
    var y=10;
    if(life == 1){
        ctx.drawImage(heartFullImage, x1, y);
        ctx.drawImage(heartEmptyImage, x2, y);
        ctx.drawImage(heartEmptyImage, x3, y);
    }
    if(life == 2){
        ctx.drawImage(heartFullImage, x1, y);
        ctx.drawImage(heartFullImage, x2, y);
        ctx.drawImage(heartEmptyImage, x3, y);
    }
    if(life == 3){
        ctx.drawImage(heartFullImage, x1, y);
        ctx.drawImage(heartFullImage, x2, y);
        ctx.drawImage(heartFullImage, x3, y);
    }

    if (life == 0){
        ctx.drawImage(heartEmptyImage, x1, y);
        ctx.drawImage(heartEmptyImage, x2, y);
        ctx.drawImage(heartEmptyImage, x3, y);
    }
};

// Method to sleep a bit
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    if(helicoStartY<=-10){
        update(delta / 1000);
    }
    render();

    then = now;

    // Request to do this again ASAP
    // a checker !
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
main();
