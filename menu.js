window.onload = function(){
    document.getElementById("play").style.display = "none";
    document.getElementById("rules").style.display = "none";
    document.getElementById("hallfame").style.display = "none";
    document.getElementById("game").style.display = "none";

    //Declare the buttons
    var rulesButton = document.getElementById("rulesButton");
    var okButton = document.getElementById("ok");
    var playButton = document.getElementById("playButton");

    //Add event listener to the buttons
    rulesButton.addEventListener("click", rulesClick);
    okButton.addEventListener("click", okClick);
    playButton.addEventListener("click", playClick);

    //Show the rules and hide the menu
    function rulesClick(){
        document.getElementById("rules").style.display = "";
        document.getElementById("menu").style.display = "none";
    }

    //Show the menu and hide the rules
    function okClick(){
        document.getElementById("menu").style.display = "";
        document.getElementById("rules").style.display = "none";
    }

    //Show the choice of level and hide the menu
    function playClick(){
        document.getElementById("play").style.display = "";
        document.getElementById("menu").style.display = "none";
    }
}
