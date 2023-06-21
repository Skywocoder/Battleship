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

document.addEventListener('DOMContentLoaded', function () {
    let surface = document.getElementById('surface');
    let surfaceContent = "";

    for (let i = 0; i <= 100; i++) {
        surfaceContent += `<div class="grid-item" id="surface_item_ ` + (i) + `" onclick="select(event)"></div>`;
    }

    surface.innerHTML = surfaceContent;
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
    let elementId = event.target.id;

    document.getElementById(elementId).style.backgroundColor = "grey";
    gotHit(elementId);
    setTimeout(function () {
        document.getElementById(elementId).style.backgroundColor = "";
    }, 200);
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
                element.innerHTML = '<img src="../../Schiffmodelle/U-Boot1-2er.png" alt="noSource" height="48vw">';
            } else if (size2_ship2.length == 0) {
                element.innerHTML = '<img src="../../Schiffmodelle/U-Boot2-2er.png" alt="noSource" height="48vw">';
                size2_ship2 = currArray;
            } else if (size2_ship3.length == 0) {
                element.innerHTML = '<img src="../../Schiffmodelle/U-Boot1-2er.png" alt="noSource" height="48vw">';
                size2_ship3 = currArray;
            } else if (size2_ship4.length == 0) {
                element.innerHTML = '<img src="../../Schiffmodelle/U-Boot2-2er.png" alt="noSource" height="48vw">';
                size2_ship4 = currArray;
            } else {
                document.getElementById(slot1).style.backgroundColor = "rgba(156, 23, 37,0.753)";
                document.getElementById(slot2).style.backgroundColor = "rgba(156, 23, 37,0.753)";
                console.log("Du kannst kein Schiff dieser Größe mehr platzieren.");
            }
            break;
        case 3:
            if (size3_ship1.length == 0) {
                element.innerHTML = '<img src="../../Schiffmodelle/Zerstörer1-3er.png" alt="noSource" height="48vw">';
                size3_ship1 = currArray;
            } else if (size3_ship2.length == 0) {
                element.innerHTML = '<img src="../../Schiffmodelle/Zerstörer2-3er.png" alt="noSource" height="48vw">';
                size3_ship2 = currArray;
            } else if (size3_ship3.length == 0) {
                element.innerHTML = '<img src="../../Schiffmodelle/Zerstörer1-3er.png" alt="noSource" height="48vw">';
                size3_ship3 = currArray;
            } else {
                document.getElementById(slot1).style.backgroundColor = "rgba(156, 23, 37,0.753)";
                document.getElementById(slot2).style.backgroundColor = "rgba(156, 23, 37,0.753)";
                console.log("Du kannst kein Schiff dieser Größe mehr platzieren.");
            }
            break;
        case 4:
            if (size4_ship1.length == 0) {
                element.innerHTML = '<img src="../../Schiffmodelle/Flaggschiff1-4er.png" alt="noSource" height="48vw">';
                size4_ship1 = currArray;
            } else if (size4_ship2.length == 0) {
                element.innerHTML = '<img src="../../Schiffmodelle/Flaggschiff2-4er.png" alt="noSource" height="48vw">';
                size4_ship2 = currArray;
            } else {
                document.getElementById(slot1).style.backgroundColor = "rgba(156, 23, 37,0.753)";
                document.getElementById(slot2).style.backgroundColor = "rgba(156, 23, 37,0.753)";
                console.log("Du kannst kein Schiff dieser Größe mehr platzieren.");
            }
            break;
        case 5:
            if (size5_ship1.length == 0) {
                element.innerHTML = '<img src="../../Schiffmodelle/Flugzeugträger1-5er.png" alt="noSource" height="60vw">';
                size5_ship1 = currArray;
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

    let display = document.getElementById('display_content');
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
        placingPhase = false;

        let surface2 = document.getElementById('surface2');
        let surfaceContent = "";

        for (let i = 0; i <= 100; i++) {
            surfaceContent += `<div class="grid-item" id="surface2_item_ ` + (i) + `" onclick="select2(event)"></div>`;
        }

        surface2.innerHTML = surfaceContent;
    } else {
        display.innerHTML = '<p> Verfügbare Schiffe: ' + size2_ships + ' U-Boot(e) | ' + size3_ships + ' Zerstörer | ' + size4_ships + ' Flaggschniff(e) | ' + size5_ships + ' Flugzeugträger </p>';
    }
}

//Für Malte um den Bot einzubinden: Hat der Spieler durch seine Eingabe einen Treffer gelandet?
//elementId ist die eindeutige Identifizierung des Feldes.
function gotHit(elementId) {

}