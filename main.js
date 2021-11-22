gameInitialization();

function gameInitialization() {
    var lines = 15, columns = 17;
    var playGround = document.getElementById("playground");
    for (var i = 0; i < lines; ++i) {
        var line = playGround.insertRow(i);
        for (var j = 0; j < columns; ++j) {
            var cell = line.insertCell(j);
        }
    }
    snakeBody(playGround, 7, 1);
    snakeBody(playGround, 7, 2);
    snakeBody(playGround, 7, 3);
    playGround.rows[0].cells[0].setAttribute("apple", "true");
    eatAndAddApple(playGround,0,0,0,0,lines,columns);
    startGame(playGround, lines, columns);
    return false;
}

function snakeBody(playGround, line, col) {
    playGround.rows[line].cells[col].style="background-color: green;";
    playGround.rows[line].cells[col].setAttribute("snake", "true");
    playGround.rows[line].cells[col].setAttribute("nextDirection", "Right");
}

function startGame(playGround, lines, columns) {
    var directionj = 1, directioni = 0 , nextDirection = "Right";
    window.addEventListener('keydown',function(e) {
        var key = e.key; 
        if (key == "ArrowUp" && nextDirection != "Down") {
            directionj = 0, directioni = -1;
            nextDirection = "Up";
        } else if (key == "ArrowDown" && nextDirection != "Up") {
            directionj = 0, directioni = 1;
            nextDirection = "Down";
        } else if (key == "ArrowLeft" && nextDirection != "Right") {
            directionj = -1, directioni = 0;
            nextDirection = "Left";
        } else if (key == "ArrowRight" && nextDirection != "Left") {
            directionj = 1, directioni = 0;
            nextDirection = "Right";
        }
    });
    var iHead = 7, jHead = 3, iTail = 7, jTail = 1, points = 0, speed = 200;
    var g = setInterval(function() {
        checkGameStatus(playGround, jHead, iHead, directioni, directionj, columns, lines, g);
        if (eatAndAddApple(playGround, iHead, jHead, directioni, directionj, lines, columns) == true) {
            ++points;
            document.getElementById("points").innerHTML="Points = " + points;
        } else {
            moveTail(playGround, iTail, jTail);
            if (playGround.rows[iTail].cells[jTail].getAttribute("nextDirection") == "Right") {
                ++jTail;
            } else if (playGround.rows[iTail].cells[jTail].getAttribute("nextDirection") == "Left") {
                --jTail;
            } else if (playGround.rows[iTail].cells[jTail].getAttribute("nextDirection") == "Up") {
                --iTail;
            } else if (playGround.rows[iTail].cells[jTail].getAttribute("nextDirection") == "Down") {
                ++iTail;
            }
        }
        moveHead(playGround, iHead, jHead, directioni, directionj, nextDirection);
        iHead += directioni;
        jHead += directionj; 
    },speed);
}

function checkGameStatus(playGround, jHead, iHead, directioni, directionj, columns, lines, g) {
    if (jHead+directionj < 0 || jHead + directionj >= columns || iHead + directioni < 0 || iHead + directioni >= lines || playGround.rows[iHead+directioni].cells[jHead+directionj].getAttribute("snake") == "true") {
        document.getElementById("status").innerHTML="Game Over <button class=\"btn btn-primary\" type=\"button\" onclick=\"return restart();\">Restart</button>";
        document.getElementById("status").style="color: red; font-size: x-large;"
        clearInterval(g);
    } 
}

function eatAndAddApple(playGround, iHead, jHead, directioni, directionj, lines, columns) {
    if (playGround.rows[iHead+directioni].cells[jHead+directionj].getAttribute("apple") == "true") {
        playGround.rows[iHead+directioni].cells[jHead+directionj].setAttribute("apple", "false")
        do {
            var applei = Math.floor(Math.random() * lines);
            var applej = Math.floor(Math.random() * columns);
        } while (playGround.rows[applei].cells[applej].getAttribute("snake") == "true")
        playGround.rows[applei].cells[applej].style="background-color: violet";
        playGround.rows[applei].cells[applej].setAttribute("apple", "true")
        return true;
    }
    return false;
}

function moveHead(playGround, iHead, jHead, directioni, directionj, nextDirection) {
    playGround.rows[iHead].cells[jHead].setAttribute("snake", "true");
    playGround.rows[iHead+directioni].cells[jHead+directionj].style="background-color: green;";
    playGround.rows[iHead].cells[jHead].setAttribute("nextDirection", nextDirection);
}

function moveTail(playGround, iTail, jTail) {
    playGround.rows[iTail].cells[jTail].setAttribute("snake", "false");
    playGround.rows[iTail].cells[jTail].style="background-color: white;";
}

function restart() {
    location.reload();
    return false;
}
