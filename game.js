/*-----------------------------------------
CLASS
-----------------------------------------*/
class Player{
    constructor() {
        this.name="";
        this.level=1;
        this.score=0;
        this.country="";
        this.avatar=0;
    }
}

/*-----------------------------------------
PLAYER INFO MGMT
-----------------------------------------*/

/* Store some html contents to reset it faster*/
var player = new Player();
var old_dragdrop = $("#dragdrop").html();

var old_d1 = document.getElementById("drag1");
var old_d2 = document.getElementById("drag2");
var old_d3 = document.getElementById("drag3");

/* Set player name */
function setPlayerName() {

    //Set name
    player.name = document.getElementById("name").value;

    //Error for the input name
    if(player.name==""){
        document.getElementById("errorName").style.display = "block";
        return;
    }

    //Set avatar (mobile version only)
    var avMobile = parseInt(document.getElementById("avatarMobile").value);

    //If the player has choosen a good number
    if(avMobile!=0 && avMobile<4){
        player.avatar = avMobile;
        console.log(player.avatar);
    }

    //Notify user he successfully registered
    alert("Congratulations " + player.name + " your score " + counter.textContent + " has been registred, you chose avatar number "+ player.avatar+"! Go to hall of fame to see your ranking.");
    document.getElementById("player").style.display = "none";
    saveScore();

    /* Code to reset all values for the player information zone*/
    /* HTML clear input & images */
    //Reset drag & drop images
    var images = document.getElementById("images");
    var img = document.createElement('img');

    switch(player.avatar){
        case 1:
            images.insertBefore(old_d1, images.childNodes[0]);
            document.getElementById("drag2").setAttribute("class", "active");
            document.getElementById("drag3").setAttribute("class", "active");
            document.getElementById("drag2").draggable = true;
            document.getElementById("drag3").draggable = true;
            break;
        case 2:
            images.insertBefore(old_d2, images.childNodes[2]);
            document.getElementById("drag1").setAttribute("class", "active");
            document.getElementById("drag3").setAttribute("class", "active");
            document.getElementById("drag1").draggable = true;
            document.getElementById("drag3").draggable = true;
            break;
        case 3:
            document.getElementById("drag1").setAttribute("class", "active");
            document.getElementById("drag2").setAttribute("class", "active");
            document.getElementById("drag1").draggable = true;
            document.getElementById("drag2").draggable = true;
            images.appendChild(old_d3);
            break;
    }

    //Reset avatar
    player.avatar=0;

    //Reset input name & (mobile) avatar
    document.getElementById("name").value= "";
    document.getElementById("avatarMobile").value= "";

    //Reset error
    document.getElementById("errorName").style.display = "none";

    //Clear drop zone from any image
    $("#dragdrop").html(old_dragdrop);
}

// Save score
function saveScore(){
    //Put object in JSON via serialization
    var p_serizalized = JSON.stringify(player);
    console.log(localStorage.length);
    //Store the JSON
    localStorage.setItem("user"+localStorage.length, p_serizalized);

    console.log("saveScore() => serialized =>"+localStorage.length+p_serizalized+" // player=>" + player.name);

}

// Retrieve all scores
function getScores(lvl){

    console.log("getScore() => RUNNING" );

    var arrayScore = [];
    var n = localStorage.length;

    console.log("getScore() => length "+n );

    // Retrieving objects of the correct level from local storage
    for(var i=0; i<n; i++){
        var obj = JSON.parse(localStorage.getItem("user"+i));
        console.log("getScore() => obj:" + obj.name);

        if(obj != null){
            if(obj.level == lvl){
                arrayScore[i] = obj;
            }
        }
    }

    arrayScore.sort(function (a,b) {
        return a.score.localeCompare(b.score);
    });

    return arrayScore;

}

// Open the hall of fame
function retrieveHOF(lvl)
{
    console.log("retriveHOF running==> lvl: " + lvl);

    tbody = document.getElementById("tbodyHOF");
    tbody.innerHTML = "";

    var arrayObj = getScores(lvl);
    var n = arrayObj.length;
    console.log("arrayObj==> " + arrayObj);
    console.log("arrayObj.length==> " +n);

    for(var i=0; i<n; i++){
        var tr = document.createElement("tr");
        var obj = arrayObj[i];

        // Number of columns = 6
        // Add rows in the Hall Of Fame
        for(var j=0; j<6; j++){

            var td = document.createElement("td");

            switch(j){
                case 0 :
                    td.appendChild(document.createTextNode(i+1));
                    break;
                case 1 :
                    td.appendChild(document.createTextNode(obj.name))
                    break;
                case 2 :
                    //Draw avatar in the column avatar for each row
                    switch(obj.avatar){
                        case 1:
                            var img = document.createElement('img');
                            img.src = "ressources/images/avatar/AKangoo.png";
                            img.style.height="55px";
                            img.style.width="50px";
                            td.appendChild(img);
                            break;
                        case 2:
                            var img = document.createElement('img');
                            img.src = "ressources/images/avatar/AKoala.png";
                            img.style.height="55px";
                            img.style.width="50px";
                            td.appendChild(img);
                            break;
                        case 3:
                            var img = document.createElement('img');
                            img.src = "ressources/images/avatar/AOrnitho.png";
                            img.style.height="55px";
                            img.style.width="50px";
                            td.appendChild(img);
                            break;
                            //Unknow or 0 which is the default value
                        default:
                            var img = document.createElement('img');
                            img.src = "ressources/images/avatar/AWorm.png";
                            img.style.height="55px";
                            img.style.width="50px";
                            td.appendChild(img);
                            break;
                    }
                    break;
                case 3 :
                    td.appendChild(document.createTextNode(obj.country))
                    break;
                case 4 :
                    td.appendChild(document.createTextNode(obj.level))
                    break;
                case 5 :
                    //                    console.log("My score: " + obj.score);
                    var pHours = obj.score.substr(11,2);
                    var pMinutes = obj.score.substr(14,2);
                    var pSeconds = obj.score.substr(17,2);
                    var addTime=pHours+":"+pMinutes+":"+pSeconds;
                    //                    console.log("addTime:"+addTime);
                    td.appendChild(document.createTextNode(addTime))
                    break;
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}

/*-----------------------------------------
DRAG & DROP MNGMT
-----------------------------------------*/
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));

    // Register the avatar
    switch(data){
        case "drag1":
            player.avatar=1;
            document.getElementById("drag2").setAttribute("class", "disable");
            document.getElementById("drag3").setAttribute("class", "disable");
            document.getElementById("drag2").draggable = false;
            document.getElementById("drag3").draggable = false;
            break;
        case "drag2":
            player.avatar=2;
            document.getElementById("drag1").setAttribute("class", "disable");
            document.getElementById("drag3").setAttribute("class", "disable");
            document.getElementById("drag1").draggable = false;
            document.getElementById("drag3").draggable = false;
            break;
        case "drag3":
            player.avatar=3;
            document.getElementById("drag1").setAttribute("class", "disable");
            document.getElementById("drag2").setAttribute("class", "disable");
            document.getElementById("drag1").draggable = false;
            document.getElementById("drag2").draggable = false;
            break;
    }
}

/*-----------------------------------------
GEOLOCALISATION MGMT
-----------------------------------------*/
function getLocalisation()
{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {

            $.ajax('http://www.datasciencetoolkit.org/coordinates2politics/'
                   + position.coords.latitude + ','
                   + position.coords.longitude, {dataType: 'jsonp'})
                .done(function(data, textStatus, jqXHR) {
                if ( textStatus === 'success' ) {
                    var country = data[0].politics[0].name
                    player.country=country;
                    console.log("SuccessLoc");
                }
            })
        },
                                                 function(error) {
            if (error.code == error.PERMISSION_DENIED)
                searchByIP();
        });

    }
    else{ // if navigator.geolocation is false
        onFailedLoc();
    }
}

function onFailedLoc(){
    player.country = "Unknown"
}

//Search country name by IP
function searchByIP(){

    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.ipdata.co/?api-key=test');
    request.setRequestHeader('Accept', 'application/json');
    request.send();

    request.onreadystatechange = function (){
        // Request finished
        if (request.readyState == 4) {

            var result = request.response;

            var headerKey = "country_name"
            var headerIdx = result.indexOf(headerKey) + headerKey.length+4;
            var cntr = result.substring(headerIdx, result.indexOf('"', headerIdx));
            cntrName=cntr+" (ip)";

            player.country=cntrName;
        }
    }

    request.onerror = function(){
        onFailedLoc();
    }
}

/*Call function getLocalisation*/
getLocalisation();

/*-----------------------------------------
CHRONO MGMT - Samuel
-----------------------------------------*/
var counter = document.getElementById('counter');
var intervalID = NaN;

function incrementTime() {
    var time = counter.innerHTML.split(":")
    time[2] = ("0" + (Number(time[2]) + 1) % 60).slice(-2);
    if (time[2] == "00") {
        time[1] = ("0" + (Number(time[1]) + 1) % 60).slice(-2);
        if (time[1] == "00") {
            time[0] = (Number(time[0]) + 1) % 10;
            if (time[0] == "0") {
                resetClicked();
            }
        }
    }
    counter.innerHTML = time.join(":")
}

function startClicked() {
    if (isNaN(intervalID)){
        intervalID = setInterval(incrementTime, 1000);
    }
}

function stopClicked() {
    clearInterval(intervalID);
    intervalID = NaN;
}

function resetClicked() {
    counter.innerHTML = "00:00:00";
    intervalID = NaN;
}


document.getElementById('start').addEventListener("click", startClicked);
document.getElementById('stop').addEventListener("click", stopClicked);
document.getElementById('reset').addEventListener("click", resetClicked);


/*-----------------------------------------
GAME - LEVEL HANDLER
-----------------------------------------*/
var gameMap=[[9, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [9, 9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0],
             [0, 9, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
             [0, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
             [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 0],
             [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
             [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
             [0, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
             [0, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 0],
             [0, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 1, 2, 1, 1, 1, 2, 2, 1, 0],
             [0, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 0],
             [0, 1, 1, 1, 2, 2, 3, 4, 9, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0],
             [0, 1, 1, 1, 2, 3, 3, 9, 9, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0],
             [0, 1, 1, 1, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0],
             [0, 2, 2, 1, 2, 2, 2, 1, 3, 3, 2, 1, 2, 1, 1, 1, 2, 2, 1, 0],
             [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0],
             [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 8, 2, 2, 1, 1, 1, 1, 0],
             [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 0],
             [0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

function mapDebug(number){
    let retour="";

    for(let row = 0; row < number; ++row)
    {
        for(let col = 0; col < number; ++col)
        {
            retour+=gameMap[row][col]+", ";

            if(col==(number-1)){
                retour+="\r\n";
            }
        }
    }
    console.log(retour);
}

function setTheMap(mapLevel){
    for(let row = 0; row < mapH; ++row){
        for(let col = 0; col < mapW; ++col){
            gameMap[row][col] = mapLevel[row][col];
        }
    }
}

//mapDebug(8);
//var isLevelChanged=false;

// Activate or desactivate buttons
function myFunction(x) {
    mapLevel = x;
    //    isLevelChanged=true;
    stopClicked();
    resetClicked();
    //    startClicked();
    isDead=false;
    gameStarted=false;

    console.log("RESET FULL by myFunction()")

    switch(x){
        case 1:
            document.getElementById("lvl1").disabled = true;
            document.getElementById("lvl2").disabled = false;
            document.getElementById("lvl3").disabled = false;
            setTheMap(gameMap1);

            nbKoalasToSave=1;
            reload();
            mapDebug(8);
            player.level=1;
            break;
        case 2:
            document.getElementById("lvl1").disabled = false;
            document.getElementById("lvl2").disabled = true;
            document.getElementById("lvl3").disabled = false;
            setTheMap(gameMap2);

            nbKoalasToSave=2;
            reload();
            mapDebug(8);
            player.level=2;
            break;
        case 3:
            document.getElementById("lvl1").disabled = false;
            document.getElementById("lvl2").disabled = false;
            document.getElementById("lvl3").disabled = true;
            setTheMap(gameMap3);

            nbKoalasToSave=3;
            reload();
            mapDebug(8);
            player.level=3;
            break;
    }

}

/*-----------------------------------------
GAME
-----------------------------------------*/
// Create and define the canvas
//var canvas = document.createElement("canvas");
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;

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

// RIP image
var RIPimage = new Image();
RIPimage.src = "ressources/images/decor/RIP1.png";
var RIPReady = false;

// Bush image
var bushImage = new Image();
var bush = {};
bushImage.src = "ressources/images/decor/bush_50.png";

// Border image
var borderImage = new Image();
borderImage.src = "ressources/images/decor/tresss.png";

// Safe zone image
var safeZoneImage = new Image();
safeZoneImage.src = "ressources/images/decor/SafeZone_V1_100.png";

// Dead fireman image
var deadFMImage = new Image();
deadFMImage.src = "ressources/images/deadFM_50.png";

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
var koalaRow ;
var koalaCol ;
koalaImage.src = "ressources/images/koala_50.png";

// Well
var wellImage = new Image();
var well = {};
wellImage.src = "ressources/images/decor/well_full_100.png";
var isWellFull = true;

// Well text
var wellTextImage = new Image();
wellTextImage.src = "";

// Helicopter image
var heli1Image = new Image();
heli1Image.src = "ressources/images/decor/Helicopter/helicopter_1.png";

// Helicopter airstrips
var airstripsImage = new Image();
airstripsImage.src = "ressources/images/decor/Helicopter/H1.png";

// Trophy image
var trophyImage = new Image();
trophyImage.src = "ressources/images/decor/Trophy.png";
var trophyImageX = 284;
var trophyImageY = -500;

// Fireworks image
var fireworksImage = new Image();
fireworksImage.src = "ressources/images/decor/fireworks.png";

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
koalaSaved = 0;
var collisionMargin = 15;
var isFMCarryingAKoala = false ;
isDead = true;
var nbKoalasToSave=1;
var mapLevel = 1;
var deathLocationX = true;
var deathLocationY ;

// Helicopter start information
var helicoStartX = 1000;
var helicoStartY = 1000;
var helicoType = 2;

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
}

//For the button to move the fireman
var goingDown = false;
var goingUp = false;
var goingLeft = false;
var goingRight = false;

var goDown = function(){
    goingDown = true;
}
var goUp = function(){
    goingUp = true;
}
var goLeft = function(){
    goingLeft = true;
}
var goRight = function(){
    goingRight = true;
}
var stop = function(){
    goingDown = false;
    goingUp = false;
    goingLeft = false;
    goingRight = false;
}

// Update game objects
var update = function (modifier) {
    if (38 in keysDown||goingUp) { // Player holding up
        // Block to border
        if(fireman.y>50){
            fireman.y -= fireman.speed * modifier;
            firemanImage.src = "ressources/images/FM_up_50.png";
            direction = "up";
        }
    }
    if (40 in keysDown||goingDown) { // Player holding down
        // Block to border
        if(fireman.y<canvas.height-100){
            fireman.y += fireman.speed * modifier;
            firemanImage.src = "ressources/images/FM_down_50.png";
            direction = "down";
        }
    }
    if (37 in keysDown||goingLeft) { // Player holding left
        // Block to border
        if(fireman.x>50){
            fireman.x -= fireman.speed * modifier;
            firemanImage.src = "ressources/images/FM_left_50.png";
            direction = "left";
        }
    }
    if (39 in keysDown||goingRight) { // Player holding right
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
            splash();
        }
    }

    // Check for any collisions between fireman and (burned bush, well,...)
    checkCollision(fireman.x, fireman.y);
}

// Method to splash (used for the space key and the button for mobile)
var splash = function(){
    splashing();
    if(ammunition>0){
        ammunition -= 1;
    }
}

// Method to restart the level when the player died or won
var enterToRestart = function(){
    myFunction(mapLevel);
    reload();
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
                splashImage.src = "ressources/images/splash_u.png";
                removeTheSplash();
                splash.x = fireman.x + 10;
                splash.y = fireman.y - 30;
                document.getElementById("splash").play();
                break;
            case 'down':
                splashImage.src = "ressources/images/splash_d.png";
                removeTheSplash();
                splash.x = fireman.x + 10;
                splash.y = fireman.y + 50;
                document.getElementById("splash").play();
                break;
            case 'left':
                splashImage.src = "ressources/images/splash_l.png";
                removeTheSplash();
                splash.x = fireman.x - 30;
                splash.y = fireman.y + 10;
                document.getElementById("splash").play();
                break;
            case 'right':
                splashImage.src = "ressources/images/splash_r.png";
                removeTheSplash();
                splash.x = fireman.x + 50;
                splash.y = fireman.y + 10;
                document.getElementById("splash").play();
                break;
            default:
                splashImage.src = null;
        }
    }
}

// Function to check if there are any collision
// (x and y are fireman's coordinate)
function checkCollision(x, y){
    // Fireman with koala and safety zone
    if( isFMCarryingAKoala
       && x <= (50 + 50)
       && 50 <= (x + 50)
       && y <= (50 + 50)
       && 50 <= (y + 50))
    {
        koalaSaved++;
        isFMCarryingAKoala = false ;
    }

    for(let row = 0; row < mapH; ++row)
    {
        for(let col = 0; col < mapW; ++col)
        {
            switch(gameMap[row][col]){
                    // Burned bush
                case 1:
                    bushBurned.x = col*50;
                    bushBurned.y = row*50;
                    // Burned bush and fireman
                    if(
                        x+collisionMargin <= (bushBurned.x + 50)
                        && bushBurned.x <= (x + 50 - collisionMargin)
                        && y+collisionMargin <= (bushBurned.y + 50)
                        && bushBurned.y <= (y + 50 - collisionMargin))
                    {
                        life--;
                        document.getElementById("damage").play();
                        // Put the koala where the fireman died
                        if(isFMCarryingAKoala){
                            isFMCarryingAKoala = false;
                            // Must do it otherwise it doesn't work
                            var x = row+1;
                            var y = col+1;
                            switch(direction){
                                case 'up':
                                    gameMap[x][col] = 8;
                                    reset();
                                    break;
                                case 'down':
                                    gameMap[row-1][col] = 8;
                                    reset();
                                    break;
                                case 'left':
                                    gameMap[row][y] = 8;
                                    reset();
                                    break;
                                case 'right':
                                    gameMap[row][col-1] = 8;
                                    reset();
                                    break;
                            }
                            //                            gameMap[koalaRow][koalaCol] = 8;
                            //                            isFMCarryingAKoala = false;
                        }
                        deathLocationX = fireman.x;
                        deathLocationY = fireman.y;
                        reset();
                    }

                    // Burned bush and splash
                    if (
                        splash.x <= (bushBurned.x + 30)
                        && bushBurned.x <= (splash.x + 30)
                        && splash.y <= (bushBurned.y + 30)
                        && bushBurned.y <= (splash.y + 30)
                    ) {
                        // Collision => stop the fire
                        gameMap[row][col] = 3 ;
                    }
                    //                    mapDebug(8);
                    break;
                    // Koala
                case 8:
                    koala.x = col*50;
                    koala.y = row*50;
                    koalaRow = row;
                    koalaCol = col;
                    // Koala and fireman
                    if( !isFMCarryingAKoala
                       && x+collisionMargin <= (koala.x + 50)
                       && koala.x <= (x + 50 - collisionMargin)
                       && y+collisionMargin <= (koala.y + 50)
                       && koala.y <= (y + 50 - collisionMargin))
                    {
                        document.getElementById("koala").play();
                        gameMap[row][col] = 2;
                        isFMCarryingAKoala = true;
                    }
                    break;
                    // Well
                case 4:
                    well.x = col*50;
                    well.y = (row*50)+50;
                    if( ammunition < 3
                       && isWellFull
                       && x+collisionMargin <= (well.x + 100)
                       && well.x <= (x + 50 - collisionMargin)
                       && y+collisionMargin <= (well.y + 50)
                       && well.y <= (y + 50 - collisionMargin))
                    {
                        document.getElementById("well").play();
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
                       && x+collisionMargin <= (well.x + 100)
                       && well.x <= (x + 50 - collisionMargin)
                       && y+collisionMargin <= (well.y + 50)
                       && well.y <= (y + 50 - collisionMargin))
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

var uniqueInstance=true;

// Draw everything
var render = function () {

    // BACKGROUND
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    // SAFE ZONE
    ctx.drawImage(safeZoneImage, 50, 50);
    if(koalaSaved==1){
        ctx.drawImage(koalaImage, 70, 70)
    }

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
                        //                        makeTheKoalaMoves(mapH, mapW);
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

    // Fireman death, place a skeleton on the location the fireman died
    ctx.drawImage(deadFMImage, deathLocationX, deathLocationY);

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
        isDead = false;
    }

    // TEXT
    ctx.fillStyle = "crimson";
    ctx.font = "bold 26px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score " + counter.textContent, 800, 965);
    ctx.fillText("Koala saved : " + koalaSaved + "/" + nbKoalasToSave, 50, 965);

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

    // Ammunition
    var x1=900;
    var x2=x1-80;
    var x3=x2-80;
    var y=10;
    if(ammunition == 1){
        ctx.drawImage(splashStateImage, x1, y);
    }
    if(ammunition == 2){
        ctx.drawImage(splashStateImage, x1, y);
        ctx.drawImage(splashStateImage, x2, y);
    }
    if(ammunition == 3){
        ctx.drawImage(splashStateImage, x1, y);
        ctx.drawImage(splashStateImage, x2, y);
        ctx.drawImage(splashStateImage, x3, y);
    }

    // HEARTS
    var x1=400;
    var x2=x1+80;
    var x3=x2+80;
    var y=10;
    switch(life){
        case 3:
            ctx.drawImage(heartFullImage, x1, y);
            ctx.drawImage(heartFullImage, x2, y);
            ctx.drawImage(heartFullImage, x3, y);
            break;
        case 2:
            ctx.drawImage(heartFullImage, x1, y);
            ctx.drawImage(heartFullImage, x2, y);
            ctx.drawImage(heartEmptyImage, x3, y);
            break;
        case 1:
            ctx.drawImage(heartFullImage, x1, y);
            ctx.drawImage(heartEmptyImage, x2, y);
            ctx.drawImage(heartEmptyImage, x3, y);
            break;
        case 0:
            ctx.drawImage(heartEmptyImage, x1, y);
            ctx.drawImage(heartEmptyImage, x2, y);
            ctx.drawImage(heartEmptyImage, x3, y);
            var deathSound = document.getElementById("gameOver");

            // RIP display
            ctx.drawImage(RIPimage, 0, 0);

            //This won't loop !!!
            if(uniqueInstance==true){
                deathSound.play();
                uniqueInstance=false;
            }

            // To stop the reset
            isDead=true;

            // Enter to reset
            if(13 in keysDown){
                enterToRestart();
                uniqueInstance=true;
            }
            break;
    }

    //localStorage.clear();

    // Level finished
    if(koalaSaved == nbKoalasToSave){
        // To stop the reset
        var completeSound = document.getElementById("complete");

        //This won't loop !!!
        if(uniqueInstance==true){
            document.getElementById("player").style.display = "block";
            completeSound.play();
            uniqueInstance=false;
        }

        var pTime=counter.textContent;
        //        var newStr = pTime.replace(/:/g, "-");
        //        console.log(pTime);
        //        console.log(newStr);

        var pSeconds = pTime.substring(6, 8);
        var pMinutes = pTime.substring(3, 5);
        var pHours = pTime.substring(0, 2);
        //        console.log("Minutes " + pMinutes);
        //        console.log("Seconds " + pSeconds);
        //        console.log("Hours " + pHours);

        //        var dateString="2020-01-01-T"+pHours+":"+pMinutes+":"+pSeconds+"Z";
        //        console.log(dateString);

        //        var d = new Date(dateString);
        var pTimeString = "2020-01-01T"+pHours+":"+pMinutes+":"+pSeconds+"Z";
        //        console.log(z);
        var d = new Date(pTimeString);
        //        var d = new Date('2020', '01' - 1, '1', pHours, pMinutes, pSeconds);

        //        console.log(d);
        player.score = d;


        //        stopClicked();
        isDead=true;
        // Score font
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.font="bold 30px Helvetica";

        // Speed of the trophy
        trophyImageY+=10;

        // Trophy animation from top to middle
        if(trophyImageY<300){
            ctx.drawImage(trophyImage, trophyImageX, trophyImageY);
            ctx.fillText(counter.textContent, 470,trophyImageY+100);
        }else{
            ctx.drawImage(trophyImage, trophyImageX, 300);
            ctx.drawImage(fireworksImage, 50, 150);
            ctx.drawImage(fireworksImage, 700, 150);
            ctx.fillText(counter.textContent, 470, 400);
            //            completeSound.ended();
        }
        // Enter to reset
        if(13 in keysDown){
            enterToRestart();
            uniqueInstance=true;
        }
    }
};

function reload(){
    life=3;
    ammunition=3;
    isDead=false;
    koalaSaved=0;
    isFMCarryingAKoala=false;
    reset();
}

// Method to sleep a bit
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

var gameStarted=false;
//var gameStopped=false;

// The main game loop
var main = function () {

    var now = Date.now();
    var delta = now - then;

    //Stop the chrono
    if(isDead && gameStarted==true){
        stopClicked();
        console.log("MAIN: stopclicked!");
        gameStarted=false;
    }

    //Reset and start the chrono
    if(!isDead && gameStarted==false){
        resetClicked();
        startClicked();
        console.log("MAIN: startclicked!");
        gameStarted=true;
    }

    if(helicoStartY<=-10 && !isDead){
        update(delta / 1000);
    }
    render();

    then = now;

    // Request to do this again ASAP
    // a checker ! seems correct after all...
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
main();
