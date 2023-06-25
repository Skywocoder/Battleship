let placingPhase = true;
let slot1 = 0;
let slot2 = 0;
let blocks = 0;         //defakto die Länge zwischne den beiden ausgewählten Quadraten.
let stacked = true;       //wenn übereinander = true | wenn nebeneinander = false

let size2_ship1 = [];
let size2_ship2 = [];
let size2_ship3 = [];
let size2_ship4 = [];
let size3_ship1 = [];
let size3_ship2 = [];
let size3_ship3 = [];
let size4_ship1 = [];
let size4_ship2 = [];
let size5_ship1 = [];


let shot;
let shotplayer = [];








let isPlayerTurn = true;
let BotalreadyHIt = false;

let fieldHasBeenShot = [];
let gegnerischeSchiffe = [];

document.addEventListener('DOMContentLoaded', function () {
    let surface = document.getElementById('surface');
    let surfaceContent = "";

    for (let i = 0; i <= 100; i++) {
        surfaceContent += `<div class="grid-item" id="surface_item_ ` + (i) + `" onclick="select(event)"></div>`;
    }

    surface.innerHTML = surfaceContent;

    clicky();

    gegnerischeSchiffe = generiereGegnerischeSchiffe();
    console.log(gegnerischeSchiffe);
    
    shotplayer = shotplayer.concat(gegnerischeSchiffe[0],gegnerischeSchiffe[1],gegnerischeSchiffe[2],gegnerischeSchiffe[3],gegnerischeSchiffe[4],gegnerischeSchiffe[5],gegnerischeSchiffe[6],gegnerischeSchiffe[7],gegnerischeSchiffe[8]);
    console.log(shotplayer);

    document.getElementById("outputfromgame").innerHTML = "YOU LOST";
    document.getElementById("resultBox").style.display = "block";
    document.getElementsByClassName("flex-container").style.display = "none";
    
});



function select(event) {
    let elementId = event.target.id;
    //Wenn die Plazierphase noch andauert:
    if (placingPhase) {

        if (slot1 == 0) {
            slot1 = elementId;
            document.getElementById(elementId).style.backgroundColor = "grey";
        } else {
            slot2 = elementId;
            document.getElementById(elementId).style.backgroundColor = "grey";
            validation();
            setTimeout(function () {
                document.getElementById(slot1).style.backgroundColor = "";
                document.getElementById(slot2).style.backgroundColor = "";
                slot1 = slot2 = blocks = 0;
                //prüft ob es Schiffe gibt die noch unplatziert sind. Wenn es keine mehr gibt, wird die Platzierphase beendet.
                refreshDisplay();
            }, 200);
        }

    }
}

function select2(event) {
    if(gameEndBOT() == true){
        document.getElementById("resultBox").style.display = "block";
        document.getElementsByClassName("flex-container").style.display = "none";
        document.getElementById("outputfromgame").innerHTML = "YOU LOST";
    }

    if(gameEndPlayer() == true){
        document.getElementById("resultBox").style.display = "block";
        document.getElementsByClassName("flex-container").style.display = "none";
        document.getElementById("outputfromgame").innerHTML = "YOU WON";
    }


    document.getElementById("outputfromgame").innerHTML = "";
    let elementId = event.target.id;
    document.getElementById(elementId).style.backgroundColor = "grey";
    console.log("grey")
    setTimeout(100);
    if( gotHit(elementId) == true){
        console.log(gotHit(elementId) + " RETURN OF GOTHIT FUNCTION");
        document.getElementById(elementId).style.backgroundColor = "red";
        console.log("HIT")
    }else{
        console.log(gotHit(elementId) + " RETURN OF GOTHIT FUNCTION");
        document.getElementById(elementId).style.backgroundColor = "purple";
        botHit();
        console.log("DUb")
    }


    if(gameEndBOT() == true){
        document.getElementById("resultBox").style.display = "block";
        document.getElementsByClassName("flex-container").style.display = "none";
        document.getElementById("outputfromgame").innerHTML = "YOU LOST";

    }
    if(gameEndPlayer() == true){
        document.getElementById("resultBox").style.display = "block";
        document.getElementsByClassName("flex-container").style.display = "none";
        document.getElementById("outputfromgame").innerHTML = "YOU WON";
    }
    
}

function validation() {
    let first = parseInt(slot1.slice(-2));
    let second = parseInt(slot2.slice(-2));

    if (first != second) {
        if (alreadySet(first) || alreadySet(second)) {
            return;
        }

        //sind Felder übereinander?
        if ((first % 10) == (second % 10)) {
            console.log("Gewählte Felder sind übereinander");
            //Berechnen wie viele Blöcke ausgewählt sind.
            blocks = Math.abs(Math.floor(first / 10) - Math.floor(second / 10)) + 1;
            //Ist die Schifflänge valide?
            if (blocks < 6) {
                stacked = true
                placing();
            } else {
                document.getElementById(slot1).style.backgroundColor = "rgba(156, 23, 37,0.753)";
                document.getElementById(slot2).style.backgroundColor = "rgba(156, 23, 37,0.753)";
                console.log("Es gibt kein Schiff dieser Länge.");
            }

            //sind Felder nebeneinander?
        } else if ((Math.floor(first / 10)) == (Math.floor(second / 10))) {
            console.log("Gewählte Felder sind nebeneinander");
            //Berechnen wie viele Blöcke ausgewählt sind.
            blocks = Math.abs((first % 10) - (second % 10)) + 1;
            //Ist die Schifflänge valide?
            if (blocks < 6) {
                stacked = false;
                placing();
            } else {
                document.getElementById(slot1).style.backgroundColor = "rgba(156, 23, 37,0.753)";
                document.getElementById(slot2).style.backgroundColor = "rgba(156, 23, 37,0.753)";
                console.log("Es gibt kein Schiff dieser Länge.");
            }

        } else {
            document.getElementById(slot1).style.backgroundColor = "rgba(156, 23, 37,0.753)";
            document.getElementById(slot2).style.backgroundColor = "rgba(156, 23, 37,0.753)";
            console.log("Gewähltes Feld ist ungültig.");
        }

    } else {
        document.getElementById(slot1).style.backgroundColor = "rgba(156, 23, 37,0.753)";
        document.getElementById(slot2).style.backgroundColor = "rgba(156, 23, 37,0.753)";
        console.log("Gewähltes Feld ist ungültig.");
    }
}

function placing() {
    let first = parseInt(slot1.slice(-2));
    let second = parseInt(slot2.slice(-2));
    let calc = 0;
    let currArray = [];

    //Prüfung ob Berechnet werden muss mit übereinander oder nebeneinander liegenden Feldern.
    if (stacked) {
        calc = 10;
    } else {
        calc = 1;
    }
    //Berechnung
    let largerOne = Math.max(first, second);
    let smallerOne = Math.min(first, second);

    currArray.push(smallerOne);
    while (smallerOne != largerOne) {
        smallerOne += calc;
        if (alreadySet(smallerOne)) {
            return;
        }
        currArray.push(smallerOne);
    }

    let element = document.getElementById(slot1);
    rotateImage(element);
    //deleteOnclick(currArray);

    switch (blocks) {

        case 2:
            if (size2_ship1.length == 0) {
                size2_ship1 = currArray;
                console.log(currArray);
                element.innerHTML = '<img src="../../Schiffmodelle/U-Boot1-2er.png" alt="noSource" height="60vw">';
            } else if (size2_ship2.length == 0) {
                element.innerHTML = '<img src="../../Schiffmodelle/U-Boot2-2er.png" alt="noSource" height="60vw">';
                size2_ship2 = currArray;
                console.log(currArray);
            } else if (size2_ship3.length == 0) {
                element.innerHTML = '<img src="../../Schiffmodelle/U-Boot1-2er.png" alt="noSource" height="60vw">';
                size2_ship3 = currArray;
                console.log(currArray);
            } else if (size2_ship4.length == 0) {
                element.innerHTML = '<img src="../../Schiffmodelle/U-Boot2-2er.png" alt="noSource" height="60vw">';
                size2_ship4 = currArray;
            } else {
                document.getElementById(slot1).style.backgroundColor = "rgba(156, 23, 37,0.753)";
                document.getElementById(slot2).style.backgroundColor = "rgba(156, 23, 37,0.753)";
                console.log("Du kannst kein Schiff dieser Größe mehr platzieren.");
            }
            break;
        case 3:
            if (size3_ship1.length == 0) {
                element.innerHTML = '<img src="../../Schiffmodelle/Zerstörer1-3er.png" alt="noSource" height="65vw">';
                size3_ship1 = currArray;
                console.log(currArray);
            } else if (size3_ship2.length == 0) {
                element.innerHTML = '<img src="../../Schiffmodelle/Zerstörer2-3er.png" alt="noSource" height="65vw">';
                size3_ship2 = currArray;
                console.log(currArray);
            } else if (size3_ship3.length == 0) {
                element.innerHTML = '<img src="../../Schiffmodelle/Zerstörer1-3er.png" alt="noSource" height="65vw">';
                size3_ship3 = currArray;
                console.log(currArray);
            } else {
                document.getElementById(slot1).style.backgroundColor = "rgba(156, 23, 37,0.753)";
                document.getElementById(slot2).style.backgroundColor = "rgba(156, 23, 37,0.753)";
                console.log("Du kannst kein Schiff dieser Größe mehr platzieren.");
            }
            break;
        case 4:
            if (size4_ship1.length == 0) {
                element.innerHTML = '<img src="../../Schiffmodelle/Flaggschiff1-4er.png" alt="noSource" height="65vw">';
                size4_ship1 = currArray;
            } else if (size4_ship2.length == 0) {
                element.innerHTML = '<img src="../../Schiffmodelle/Flaggschiff2-4er.png" alt="noSource" height="65vw">';
                size4_ship2 = currArray;
                console.log(currArray);
            } else {
                document.getElementById(slot1).style.backgroundColor = "rgba(156, 23, 37,0.753)";
                document.getElementById(slot2).style.backgroundColor = "rgba(156, 23, 37,0.753)";
                console.log("Du kannst kein Schiff dieser Größe mehr platzieren.");
            }
            break;
        case 5:
            if (size5_ship1.length == 0) {
                element.innerHTML = '<img src="../../Schiffmodelle/Flugzeugträger1-5er.png" alt="noSource" height="72vw">';
                size5_ship1 = currArray;
                console.log(currArray);
            } else {
                document.getElementById(slot1).style.backgroundColor = "rgba(156, 23, 37,0.753)";
                document.getElementById(slot2).style.backgroundColor = "rgba(156, 23, 37,0.753)";
                console.log("Du kannst kein Schiff dieser Größe mehr platzieren.");
            }
            break;
    }
}

function rotateImage(element) {
    let first = parseInt(slot1.slice(-2));
    let second = parseInt(slot2.slice(-2));
    let largerOne = Math.max(first, second);
    if (stacked) {
        if (first == largerOne) {
            element.style.rotate = '-90deg';
        } else {
            element.style.rotate = '90deg';
        }
    } else {
        if (first == largerOne) {
            element.style.rotate = '-180deg';
        }
    }
}

function deleteOnclick(currArray) {
    console.log(currArray);
    for (let i = 0; i < currArray.length; i++) {
        document.getElementById('surface_item_' + currArray[i]).innerHTML = '<div class="grid-item" id="surface_item_' + currArray[i] + '"></div>';
    }
}

function alreadySet(item) {
    let allUsedItems = size2_ship1.concat(size2_ship2, size2_ship3, size2_ship4, size3_ship1, size3_ship2, size3_ship3, size4_ship1, size4_ship2, size5_ship1);

    if (allUsedItems.indexOf(item) == -1) {
        return false;
    } else {
        return true;
    }
}

function refreshDisplay() {

    let display = document.getElementById('display');
    let size2_ships = 4;
    let size3_ships = 3
    let size4_ships = 2;
    let size5_ships = 1;

    //Prüft welches Array (sprich: welches Schiff) bereits platziert wurde und zeigt es dem Spieler dann an.
    if (size2_ship1.length != 0) {
        size2_ships--;
    }
    if (size2_ship2.length != 0) {
        size2_ships--;
    }
    if (size2_ship3.length != 0) {
        size2_ships--;
    }
    if (size2_ship4.length != 0) {
        size2_ships--;
    }

    if (size3_ship1.length != 0) {
        size3_ships--;
    }
    if (size3_ship2.length != 0) {
        size3_ships--;
    }
    if (size3_ship3.length != 0) {
        size3_ships--;
    }

    if (size4_ship1.length != 0) {
        size4_ships--;
    }
    if (size4_ship2.length != 0) {
        size4_ships--;
    }

    if (size5_ship1.length != 0) {
        size5_ships--;
    }

    if (size2_ships == 0 && size3_ships == 0 && size4_ships == 0 && size5_ships == 0) {
        display.style.opacity = "0";
        display.style.display = "none";
        placingPhase = false;

        let surface2 = document.getElementById('surface2');
        let surfaceContent = "";
        shot = size2_ship1.concat(size2_ship2, size2_ship3, size2_ship4, size3_ship1, size3_ship2, size3_ship3, size4_ship1, size4_ship2, size5_ship1);

        for (let i = 0; i <= 100; i++) {
            surfaceContent += `<div class="grid-item" id="`+(i)+`" onclick="select2(event)"></div>`;
        }

        surface2.innerHTML = surfaceContent;
    } else {
        display.innerHTML = '<p> Verfügbare Schiffe: </p> ' + size2_ships + ' <img src="../../Schiffmodelle/U-Boot1-2er.png" alt="noSource" height="52vw"> <br> ' + size3_ships + ' <img src="../../Schiffmodelle/Zerstörer1-3er.png" alt="noSource" height="52vw"> <br> ' + size4_ships + ' <img src="../../Schiffmodelle/Flaggschiff1-4er.png" alt="noSource" height="52vw"> <br> ' + size5_ships + ' <img src="../../Schiffmodelle/Flugzeugträger2-5er.png" alt="noSource" height="52vw"> </p>';
    }
}


function gotHit(currelementId) {
    let found = false;
    console.log(currelementId);
    console.log(gegnerischeSchiffe.indexOf(currelementId));
    for (let i = 0; i < gegnerischeSchiffe.length; i++) {
        for (let j = 0; j < gegnerischeSchiffe[i].length; j++) {
            if (gegnerischeSchiffe[i][j] == currelementId) {
                console.log(gegnerischeSchiffe[i][j]);
                pointer = shotplayer.indexOf(gegnerischeSchiffe[i][j]);
                shotplayer[pointer] = -1;
                return true;
            }
        }
    }

}

let id;

function translate(arr){
    id = (arr[0] * 10) + (arr[1]);
    console.log(id);
    return id;

}
function botHit(){
  
  let nextShot = translate(shotAtNextField(false)); 
  let SLOTelementId = "surface_item_ "+ nextShot;





        document.getElementById(SLOTelementId).style.backgroundColor = "grey";
   
    
  let again;
  let allUsedItems = size2_ship1.concat(size2_ship2, size2_ship3, size2_ship4, size3_ship1, size3_ship2, size3_ship3, size4_ship1, size4_ship2, size5_ship1);

    if (allUsedItems.indexOf(nextShot) != -1) {
        let pointer = shot.indexOf(nextShot);
        shot[pointer] = -1;


        console.log("BRO HAS HIT");
        fieldHasBeenShot.push(nextShot);
        again = nextShot;
        console.log(again);
        while(allUsedItems.indexOf(again) != -1){
            console.log(reapeadcount);
            console.log("BRO HAS HIT AGAIN")
            again = shotAtNextField(true); 
            console.log(again);
            again = translate(again);
            let SLOTelementId = "surface_item_ "+ again;

            let pointer = shot.indexOf(again);
            shot[pointer] = -1;



            
            document.getElementById(SLOTelementId).style.backgroundColor = "grey";
            fieldHasBeenShot.push(nextShot);
        }
        
    }
}

function gameEndBOT(){
   for (let index = 0; index < shot.length; index++) {
        if(shot[index] != -1){
           return false;
       }
    }
    console.log("LOOSE")
    return true;    
}
function gameEndPlayer(){
    for (let index = 0; index < shotplayer.length; index++) {
        if(shotplayer[index] != -1){
           return false;
       }
    }
    console.log("WIN")
    return true;
}

(function () {
    'use strict';
    window.addEventListener('load', function () {
      var canvas = document.getElementById('canvas');
  
      if (!canvas || !canvas.getContext) {
        return false;
      }
  
      /********************
        Random Number
      ********************/
  
      function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }
      
      /********************
        Var
      ********************/
  
      var ctx = canvas.getContext('2d');
      var X = canvas.width = window.innerWidth;
      var Y = canvas.height = window.innerHeight;
      var mouseX = null;
      var mouseY = null;
      var shapeNum = 300;
      var shapes = [];
      var style = {
        black: 'black',
        white: 'white',
        lineWidth: 4,
      };
  
      /********************
        Animation
      ********************/
  
      window.requestAnimationFrame =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(cb) {
          setTimeout(cb, 17);
        };
  
      /********************
        Shape
      ********************/
       
      function Shape(ctx, x, y) {
        this.ctx = ctx;
        this.init(x, y);
      }
      
      Shape.prototype.init = function(x, y) {
        this.x = x;
        this.y = y;
        this.r = rand(10, 25);
        this.ga = Math.random() * Math.random() * Math.random() * Math.random();
        this.v = {
          x: Math.random(),
          y: -1
        };
        this.l = rand(0, 20);
        this.sl = this.l;
      };
  
      Shape.prototype.updateParams = function() {
        var ratio = this.l / this.sl;
        //this.r *= ratio;
        this.l -= 1;
        if (this.l < 0) {
          this.init(X * (Math.random() + Math.random()) / 2, rand(0, Y));
        }
      };
  
      Shape.prototype.updatePosition = function() {
        this.x += Math.random();
        this.y += -Math.random();
      };
      
      Shape.prototype.draw = function() {
        var ctx  = this.ctx;
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = this.ga;
        //ctx.fillStyle = 'rgb(123, 252, 100)';
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.restore();
      };
  
      Shape.prototype.render = function(i) {
        this.updatePosition();
        this.updateParams();
        this.draw();
      };
  
      for (var i = 0; i < shapeNum; i++) {
        var s = new Shape(ctx, X * (Math.random() + Math.random()) / 2, rand(0, Y));
        shapes.push(s);
      }
  
      /********************
        Render
      ********************/
      
      function render() {
        ctx.clearRect(0, 0, X, Y);
        for (var i = 0; i < shapes.length; i++) {
          shapes[i].render(i);
        }
        requestAnimationFrame(render);
      }
  
      render();
  
      /********************
        Event
      ********************/
      
      function onResize() {
        X = canvas.width = window.innerWidth;
        Y = canvas.height = window.innerHeight;
      }
  
      window.addEventListener('resize', function() {
        onResize();
      });
  
      window.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }, false);
  
    });
  })();
