// Function to move the koala during the game
function makeTheKoalaMoves(mapH, mapW){
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
