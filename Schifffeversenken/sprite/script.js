let name1 = document.getElementById("name");
let test = document.getElementById("test");

function namefunktion() {
    let input = name1.value;

    if (input.length <= 2) {
        return false;
    } else {
        return true;
    }
}

function start() {
    if (namefunktion() != true) {
        test.style.display = 'block';
    } else {
            document.location.href = "./sprite/sprite.html";
    }
} 

function retry() {
    document.location.href = "sprite.html"
}

function newGame() {
    document.location.href = "../index.html"
}
