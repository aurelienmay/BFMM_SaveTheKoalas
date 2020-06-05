window.onload = function(){
    //Hide the levels the rules and the hall of fame
    document.getElementById("play").style.display = "none";
    document.getElementById("rules").style.display = "none";
    document.getElementById("hallOfFame").style.display = "none";

    //Declare the buttons
    var rulesButton = document.getElementById("rulesButton");
    var okRulesButton = document.getElementById("okRules");
    var playButton = document.getElementById("playButton");
    var cancelButton = document.getElementById("cancel");
    var hofButton = document.getElementById("hofButton");
    var okHOFButton = document.getElementById("okHOF");

    //Add event listener to the buttons
    rulesButton.addEventListener("click", rulesClick);
    okRulesButton.addEventListener("click", okRulesClick);
    playButton.addEventListener("click", playClick);
    cancelButton.addEventListener("click", cancelClick);
    hofButton.addEventListener("click", hofClick);
    okHOFButton.addEventListener("click", okHOFClick);

    //Show rules
    function rulesClick(){
        document.getElementById("rules").style.display = "";
        document.getElementById("menu").style.display = "none";
    }

    //Hide rules
    function okRulesClick(){
        document.getElementById("menu").style.display = "";
        document.getElementById("rules").style.display = "none";
    }

    //Show levels
    function playClick(){
        document.getElementById("play").style.display = "";
        document.getElementById("menu").style.display = "none";
    }

    //Hide levels
    function cancelClick(){
        document.getElementById("menu").style.display = "";
        document.getElementById("play").style.display = "none";
    }

    //Show hall of fame
    function hofClick(){
        document.getElementById("hallOfFame").style.display = "";
        document.getElementById("menu").style.display = "none";
    }

    //Hide hall of fame
    function okHOFClick(){
        document.getElementById("menu").style.display = "";
        document.getElementById("hallOfFame").style.display = "none";
    }
}

//Hall Of Fame - Prevent bugs with keydown/keyup
function IgnoreAlpha(e) {
    if (!e) {
        e = window.event;
    }
    //Disable all keyboard shortcut to prevent bugs
    if (e.keyCode >= 0 && e.keyCode <= 300) // A to Z
    {
        e.returnValue = false;
        e.cancel = true;
    }
}

//HTML - Behavior for hall of fame level selector
$(function () {
    $("#lvlSelector").change(function () {
        var selectedText = $(this).find("option:selected").text();
        var selectedValue = $(this).val();
        retrieveHOF(selectedValue);

        console.log(selectedValue);

        alert("Selected Text: " + selectedText + " Value: " + selectedValue);
    });
});

//Music
var soundPlayer = new Audio("ressources/audio/music.mp3");
var isPlaying = false;

function playAudio(){
    soundPlayer.play();
    isPlaying=true;
}

function pauseAudio(){
    soundPlayer.pause();
}

function stopAudio(){
    soundPlayer.pause();
    soundPlayer.currentTime = 0;
}

function mute(){
    if(soundPlayer.muted==false){
        soundPlayer.muted = true;
        document.getElementById("muteImg").src="ressources/images/website/muted.png";
    }
    else{
        soundPlayer.muted = false;
        document.getElementById("muteImg").src="ressources/images/website/unmuted.png";
    }
}
