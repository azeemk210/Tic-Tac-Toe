let boxes = document.querySelectorAll('.box');
let msg = document.querySelector('#msg');
let msgContainer = document.querySelector('.msg-container');
let resetBtn = document.querySelector('#reset');
let playAgaianBtn = document.querySelector('#play-again');

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnO) {
            box.innerText = 'O';
            turnO = false;
        }
        else {
            box.innerText = 'X';
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            msg.innerText = 'It\'s a draw!';
            msgContainer.classList.remove("hide");
        }


        checkWinner();
    })
});

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
}

const disabledBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    
}

const showWinner = (winner) => {
    msg.innerText = 'Congratulations! Player ' + winner + ' wins!';
    msgContainer.classList.remove("hide");
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
}

playAgaianBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);

