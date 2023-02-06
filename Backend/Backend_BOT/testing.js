 //static Variables
let MAX_SHIP_LENGHT = 5;

let AIRCRAFT_CARRIER_LENGHT = 5;
let BATTLESHIP_LENGHT = 4;
let CRUISER_LENGHT = 3;
let UBOAT_LENTGH = 2;
let GUNBOAT_LENGHT = 2;

let MAX_SHIP_COUNT = 30;
let MAX_AIRCRAFTCARRIER_COUNT = 1;
let MAX_BATTLESHIPCOUNT_COUNT = 2;
let MAX_CRUISER_COOUNT = 3;
let MAX_UBOAT_COUNT = 2;
let MAX_GUNBOAT_COUNT = 2;

let GAMESIZE = 10;

//boolean variables for game
let isPlayerTurn  = true;
var isShipField =  [GAMESIZE][GAMESIZE];
//init for booleanArray
for (let i = 0; i < isShipField.lengtht; i++) {
    for (let j = 0; j < isShipField.lengtht; j++) {
        isShipField[i][j].push(false);
        
    }
}

//variables for game
let playField = [GAMESIZE][GAMESIZE];
let shipposition_X_x;
let shipposition_X_y;
let shipposition_Y_x;
let shipposition_Y_y;

function shoot(x, y){
    if(isShipField[x][y] == true){
        return true;
    }
    return false;
}

function placeShip(x1,y1, x2, y2){
    if(x1 == x2){
        placeHorizontal(x, y1, y2);
    }
    if(y1 == y2){
        palceVertical(y, x1, x2);
    }
}

function palceVertical(x, y1, y2){
    for (let j = y1; j < y2; j++) {
        isShipField[x][j].push(true);
    }
}
function placeHorizontal(x1, x2, y){
    for (let j = x1; j < x2; j++) {
        isShipField[j][y].push(true);
    }
}

function gameloop(){
    //einbindung von UserInput
    placeShip(posx1, posx2, posy1, posy2);
    //einbindung von BOT
    botinit();
    while(gamewon != true){
        //einbindung von UserInput
        while(shoot(sposx, sposy) == true);
        haswon();
        //einbindung von BOT
        while(botshoot() == true);
        haswon();
    }
}
