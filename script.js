var boxes = document.querySelectorAll(".btn");
var resetbtn = document.querySelector("#reset");
var winMsg = document.getElementById("win-message");
var newGame = document.getElementById("newGame");
var turnO = true;
var count = 0;
// if turnO is true => turnX is false
// if turnO is false => turnX is true
// alternating turns

var winPatterns = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [2, 5, 8],
    [1, 4, 7],
    [3, 4, 5],
    [2, 4, 6],
    [6, 7, 8]];


const initialize = () => {
    turnO = true;
    winMsg.classList.add("hide");
    newGame.classList.add("hide");
    resetbtn.classList.remove("hide");
    count = 0;
    enableBoxes();
}

const enableBoxes = () => {
    for(box of boxes){
        box.innerText = "";
        box.classList.remove("red");
        box.classList.remove("blue");
        box.disabled = false;
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.classList.add("red");
            turnO = false;
        }
        else {
            box.innerText = "X";
            box.classList.add("blue");
            turnO = true;
        }
        box.disabled = true;
        count++;
        checkWin();
    })
})

const showWinner = (winner) => {
    console.log("Winner is : " + winner);
    winMsg.innerText = `Player ${winner} Won`;
    winMsg.classList.remove("hide");
    newGame.classList.remove("hide");
    resetbtn.classList.add("hide");
}

const gameDraw = () => {
    console.log("Game DRAW");
    winMsg.innerText = `Game DRAW`;
    winMsg.classList.remove("hide");
    newGame.classList.remove("hide");
    resetbtn.classList.add("hide");
}

const disableBoxes = () => {
    for(box of boxes){
        box.disabled = true;
    }
}

const checkWin = () => {
    for (let pattern of winPatterns) {
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]].innerText,
        // boxes[pattern[1]].innerText,
        // boxes[pattern[2]].innerText);

        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        // console.log(pos1val, pos2val, pos3val);

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                disableBoxes();
                showWinner(pos1val);
                return;
            }
            else if(count == 9){
                gameDraw();
            }
        }
    }
}

resetbtn.addEventListener("click", initialize);
newGame.addEventListener("click", initialize);