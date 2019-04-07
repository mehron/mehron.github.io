const rivalBoardEl = document.querySelector('#rivalBoard');
let table = document.createElement('table');


const boardEl = document.querySelector('#board');
const shipContainerEl = document.querySelector('.ships-container');
const shipEls = document.querySelectorAll('[data-entity=ship]');
const placeholder = document.createElement('span');
const startGameBtn = document.querySelector('#start-game');
placeholder.id = 'placeholder';

let currentShipWidth, currentShipHeight;
let prevPositionX = 0;
let prevPositionY = 0;

let currentShipPositionLeft = '0px';
let currentShipPositionTop = '0px';

let currentShipActive;

let occupiedCells = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];


let rivalBoard = [
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
    ["","","","","","","","","",""],
];

const rivalShipsCoordinates = {
    battleship: [],
    battleshipHits: 0,
    battleshipOrientation: '',
    battleshipKilled: false,
    cruiser1: [],
    cruiser1Hits: 0,
    cruiser1Orientation: '',
    cruiser1Killed: false,
    cruiser2: [],
    cruiser2Hits: 0,
    cruiser2Orientation: '',
    cruiser2Killed: false,
    destroyer1: [],
    destroyer1Hits: 0,
    destroyer1Orientation: '',
    destroyer1Killed:false,
    destroyer2: [],
    destroyer2Hits: 0,
    destroyer2Orientation: '',
    destroyer2Killed:false,
    destroyer3: [],
    destroyer3Hits: 0,
    destroyer3Orientation: '',
    destroyer3Killed:false,
    boat1: [],
    boat1Killed: false,
    boat2: [],
    boat2Killed: false,
    boat3: [],
    boat3Killed: false,
    boat4: [],
    boat4Killed: false,
};

const playerShipsCoordinates = {
    battleship: [],
    battleshipHits: 0,
    battleshipOrientation: '',
    battleshipKilled: false,
    cruiser1: [],
    cruiser1Hits: 0,
    cruiser1Orientation: '',
    cruiser1Killed: false,
    cruiser2: [],
    cruiser2Hits: 0,
    cruiser2Orientation: '',
    cruiser2Killed: false,
    destroyer1: [],
    destroyer1Hits: 0,
    destroyer1Orientation: '',
    destroyer1Killed:false,
    destroyer2: [],
    destroyer2Hits: 0,
    destroyer2Orientation: '',
    destroyer2Killed:false,
    destroyer3: [],
    destroyer3Hits: 0,
    destroyer3Orientation: '',
    destroyer3Killed: false,
    boat1: [],
    boat1Killed: false,
    boat2: [],
    boat2Killed: false,
    boat3: [],
    boat3Killed: false,
    boat4: [],
    boat4Killed: false,
};


function fillRivalBoard(){

    /* choose position for one battleship */

    setRivalBattleship();


    /* set position for cruisers */

    setRivalCruiser(1);
    setRivalCruiser(2);


    /* set positions for destroyer */
    setRivalDestroyer(1);
    setRivalDestroyer(2);
    setRivalDestroyer(3);


    /* set positions for boat */
    setRivalBoat(1);
    setRivalBoat(2);
    setRivalBoat(3);
    setRivalBoat(4);

    for (let i = 0; i < rivalBoard.length; i++) {
        let rowEl = table.insertRow();

        for (let j = 0; j < rivalBoard[i].length; j++) {
            let cellEL = rowEl.insertCell();

            cellEL.setAttribute('data-x', j+"");
            cellEL.setAttribute('data-y', i+"");

            cellEL.addEventListener('click', shoot);

            if (rivalBoard[i][j] === "filled"){
                cellEL.classList.add('filled');
            }
        }
    }

    rivalBoardEl.appendChild(table);
}

fillRivalBoard();


let playerTable = document.createElement('table');


startGameBtn.addEventListener('click', function() {
    let allShips = boardEl.querySelectorAll('.ship');

    for (const ship of allShips) {

        let curShipHeight = ship.offsetHeight/50;
        let curShipWidth = ship.offsetWidth/50;


        if (ship.getAttribute('data-orientation') === 'horizontal') {

            for (let i = ship.offsetLeft/50; i < ship.offsetLeft/50 + curShipWidth; i++) {
                occupiedCells[ship.offsetTop/50].push(i);

                if (curShipWidth === 4) {
                    playerShipsCoordinates.battleship.push(i+1 + ',' + (ship.offsetTop/50 + 1));
                    playerShipsCoordinates.battleshipOrientation = 'h';
                }

                if (curShipWidth === 3) {

                    if (playerShipsCoordinates.cruiser1.length < 3) {
                        playerShipsCoordinates.cruiser1.push(i+1 + ',' + (ship.offsetTop/50 + 1));
                        playerShipsCoordinates.cruiser1Orientation = 'h';
                    } else {
                        playerShipsCoordinates.cruiser2.push(i+1 + ',' + (ship.offsetTop/50 + 1));
                        playerShipsCoordinates.cruiser2Orientation = 'h';
                    }
                }

                if (curShipWidth === 2) {

                    if (playerShipsCoordinates.destroyer1.length < 2) {
                        playerShipsCoordinates.destroyer1.push(i+1 + ',' + (ship.offsetTop/50 + 1));
                        playerShipsCoordinates.destroyer1Orientation = 'h';
                    } else if(playerShipsCoordinates.destroyer2.length < 2) {
                        playerShipsCoordinates.destroyer2.push(i+1 + ',' + (ship.offsetTop/50 + 1));
                        playerShipsCoordinates.destro2Orientation = 'h';
                    } else {
                        playerShipsCoordinates.destroyer3.push(i+1 + ',' + (ship.offsetTop/50 + 1));
                        playerShipsCoordinates.destro3Orientation = 'h';
                    }
                }

                if (curShipWidth === 1) {

                    if (playerShipsCoordinates.boat1.length < 1) {
                        playerShipsCoordinates.boat1.push(i+1 + ',' + (ship.offsetTop/50 + 1));
                    } else if(playerShipsCoordinates.boat2.length < 1) {
                        playerShipsCoordinates.boat2.push(i+1 + ',' + (ship.offsetTop/50 + 1));
                    } else if(playerShipsCoordinates.boat3.length < 1) {
                        playerShipsCoordinates.boat3.push(i+1 + ',' + (ship.offsetTop/50 + 1));
                    } else {
                        playerShipsCoordinates.boat4.push(i+1 + ',' + (ship.offsetTop/50 + 1));
                    }
                }

            }

        } else if(ship.getAttribute('data-orientation') === 'vertical') {

            for (let i = ship.offsetTop/50; i < ship.offsetTop/50 + curShipHeight; i++) {
                occupiedCells[i].push(ship.offsetLeft/50);

                if (curShipWidth === 4) {
                    playerShipsCoordinates.battleship.push((ship.offsetTop/50) + ',' + (i+1));
                    playerShipsCoordinates.battleshipOrientation = 'v';
                }

                if (curShipWidth === 3) {

                    if (playerShipsCoordinates.cruiser1.length < 3) {
                        playerShipsCoordinates.cruiser1.push((ship.offsetTop/50) + ',' + (i+1));
                        playerShipsCoordinates.cruiser1Orientation = 'v';
                    } else {
                        playerShipsCoordinates.cruiser2.push((ship.offsetTop/50) + ',' + (i+1));
                        playerShipsCoordinates.cruiser2Orientation = 'v';
                    }
                }

                if (curShipWidth === 2) {

                    if (playerShipsCoordinates.destroyer1.length < 2) {
                        playerShipsCoordinates.destroyer1.push((ship.offsetTop/50) + ',' + (i+1));
                        playerShipsCoordinates.destroyer1Orientation = 'v';
                    } else if(playerShipsCoordinates.destroyer2.length < 2) {
                        playerShipsCoordinates.destroyer2.push((ship.offsetTop/50) + ',' + (i+1));
                        playerShipsCoordinates.destroyer2Orientation = 'v';
                    } else {
                        playerShipsCoordinates.destroyer3.push((ship.offsetTop/50) + ',' + (i+1));
                        playerShipsCoordinates.destroyer3Orientation = 'v';
                    }
                }

                if (curShipWidth === 1) {

                    if (playerShipsCoordinates.boat1.length < 1) {
                        playerShipsCoordinates.boat1.push((ship.offsetTop/50) + ',' + (i+1));
                    } else if(playerShipsCoordinates.boat2.length < 2) {
                        playerShipsCoordinates.boat2.push((ship.offsetTop/50) + ',' + (i+1));
                    } else if(playerShipsCoordinates.boat3.length < 2) {
                        playerShipsCoordinates.boat3.push((ship.offsetTop/50) + ',' + (i+1));
                    }else  {
                        playerShipsCoordinates.boat4.push((ship.offsetTop/50) + ',' + (i+1));
                    }
                }
            }

        }

    }

    for (let i = 0; i < 10; i++) {
        let rowEl = playerTable.insertRow();

        for (let j = 0; j < 10; j++) {
            let cellEL = rowEl.insertCell();

            cellEL.setAttribute('data-x', ''+(j + 1));
            cellEL.setAttribute('data-y', ''+(i + 1));

            if (occupiedCells[i].includes(j)) {
                cellEL.classList.add('filled');
            }
        }
    }

    boardEl.innerHTML = "";
    boardEl.appendChild(playerTable);

    console.log(occupiedCells);
    console.log(playerShipsCoordinates.battleship)

});


for (const shipEl of shipEls) {
    shipEl.addEventListener('dragstart', dragStart);
    shipEl.addEventListener('dragend', dragEnd);
    shipEl.addEventListener('click', rotate);
}


boardEl.addEventListener('dragover', dragOver);
boardEl.addEventListener('dragenter', dragEnter);
boardEl.addEventListener('dragleave', dragLeave);
boardEl.addEventListener('drop', dragDrop);


function dragStart(e) {
    currentShipWidth = e.target.clientWidth;
    currentShipHeight = e.target.clientHeight;

    currentShipActive = this;

    this.className += ' hold';
    setTimeout(() => (this.className += ' invisible'), 0);
}

function dragEnd() {
    this.className = 'ship';

    if (boardEl.contains(placeholder)) {
        boardEl.removeChild(placeholder);
    }
}

function rotate(e) {
    // let shipWidth = e.target.clientWidth + 3;
    // let shipHeight = e.target.clientHeight + 3;
    // this.style.height = shipWidth + 'px';
    // this.style.width = shipHeight + 'px';

    if (this.getAttribute('data-orientation') === 'horizontal') {
        this.setAttribute('data-orientation', 'vertical');
    } else {
        this.setAttribute('data-orientation', 'horizontal');
    }
}

function dragOver(e) {
    e.preventDefault();


    if (e.target.id !== 'placeholder') {
        placeholder.style.width = currentShipWidth + 'px';
        placeholder.style.height = currentShipHeight + 'px';

        let boardHorizontalPartX = Math.ceil((e.offsetX / boardEl.clientWidth)*10);
        let boardHorizontalPartY = Math.ceil((e.offsetY / boardEl.clientHeight)*10);


        if (prevPositionX !== boardHorizontalPartX ) {
            if ((boardHorizontalPartX - 1)*(boardEl.clientWidth/10) + currentShipWidth > boardEl.clientWidth)  {
                let left = (boardEl.clientWidth - currentShipWidth);
                placeholder.style.left = left + 'px';
                currentShipPositionLeft = left;

            } else {
                let left = (boardHorizontalPartX - 1)*(boardEl.clientWidth/10);
                placeholder.style.left = left + 'px';
                currentShipPositionLeft = left;
            }

            this.append(placeholder);

            prevPositionX = boardHorizontalPartX;
        }

        if (prevPositionY !== boardHorizontalPartY ) {
            let top = (boardHorizontalPartY - 1)*(boardEl.clientWidth/10);

            if (top + currentShipHeight > boardEl.clientWidth) {
                top = boardEl.clientHeight - currentShipHeight;
            }

            placeholder.style.top = top + 'px';
            currentShipPositionTop = top;

            this.append(placeholder);

            prevPositionY = boardHorizontalPartY;
        }

    }



}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave(e) {
}

function dragDrop(e) {
    this.removeChild(placeholder);
    currentShipActive.style.left = currentShipPositionLeft + 'px';
    currentShipActive.style.top = currentShipPositionTop + 'px';
    this.append(currentShipActive);



    if (!shipContainerEl.firstElementChild) {
        startGameBtn.removeAttribute('disabled');
    }


    //addOccupied(currentShipPositionLeft, currentShipPositionTop, currentShipActive);
}

function addOccupied(currentShipPositionLeft, currentShipPositionTop, currentShipActive){


    let shipSize = currentShipActive.getAttribute('data-ship-size');
    let shipOrientation = currentShipActive.getAttribute('data-ship-orientation');

}

function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function setRivalBattleship() {
    // decide on orientation
    let orientation = "horizontal";
    let random = Math.random();
    if (random < 0.5) {
        orientation = "vertical";
    }

    if (orientation === "horizontal") {
        let row = randomIntFromInterval(0,9);
        let startsAt = randomIntFromInterval(0,6);

        for (let i = 0; i < 4; i++) {
            rivalShipsCoordinates.battleship.push(startsAt + ',' + row);
            rivalBoard[row][startsAt++] = "filled";
        }

        rivalShipsCoordinates.battleshipOrientation = 'h';


    } else if (orientation === "vertical") {
        let col = randomIntFromInterval(0,9);
        let startsAt = randomIntFromInterval(0,6);

        for (let i = 0; i < 4; i++) {
            rivalShipsCoordinates.battleship.push(col + ',' + startsAt);
            rivalBoard[startsAt++][col] = "filled";
        }

        rivalShipsCoordinates.battleshipOrientation = 'v';
    }
}

function setRivalCruiser(num) {
    // decide on orientation
    let orientation = "horizontal";
    let random = Math.random();
    if (random < 0.5) {
        orientation = "vertical";
    }

    let isNotSet = true;

    if (orientation === "horizontal"){

        do {
            let canSet = true;
            let row = randomIntFromInterval(0,9);
            let startsAt = randomIntFromInterval(0,7);

            if (typeof rivalBoard[row - 1] !== "undefined") {
                if (typeof rivalBoard[row + 1] !== "undefined") {
                    if (typeof rivalBoard[row][startsAt - 1] !== "undefined") {
                        if (typeof rivalBoard[row][startsAt + 3] !== "undefined") {
                            for (let i = startsAt-1; i < startsAt + 4; i++) {
                                for (let j = row - 1; j < row + 2; j++) {
                                    if (rivalBoard[j][i] === "filled") {
                                        canSet = false;
                                        break;
                                    }
                                }
                            }

                        }  else {
                            for (let i = startsAt-1; i < startsAt + 3; i++) {
                                for (let j = row - 1; j < row + 2; j++) {
                                    if (rivalBoard[j][i] === "filled") {
                                        canSet = false;
                                        break;
                                    }
                                }
                            }
                        }
                    }  else {
                        for (let i = startsAt; i < startsAt + 4; i++) {
                            for (let j = row - 1; j < row + 2; j++) {
                                if (rivalBoard[j][i] === "filled") {
                                    canSet = false;
                                    break;
                                }
                            }
                        }
                    }
                } else {
                    if (typeof rivalBoard[row][startsAt - 1] !== "undefined") {
                        if (typeof rivalBoard[row][startsAt + 3] !== "undefined") {

                            for (let i = startsAt-1; i < startsAt + 4; i++) {
                                for (let j = row - 1; j < row + 1; j++) {
                                    if (rivalBoard[j][i] === "filled") {
                                        canSet = false;
                                        break;
                                    }
                                }
                            }

                        }  else {
                            for (let i = startsAt-1; i < startsAt + 3; i++) {
                                for (let j = row - 1; j < row + 1; j++) {
                                    if (rivalBoard[j][i] === "filled") {
                                        canSet = false;
                                        break;
                                    }
                                }
                            }
                        }
                    }  else {
                        for (let i = startsAt; i < startsAt + 4; i++) {
                            for (let j = row - 1; j < row + 1; j++) {
                                if (rivalBoard[j][i] === "filled") {
                                    canSet = false;
                                    break;
                                }
                            }
                        }
                    }
                }
            } else {
                if (typeof rivalBoard[row][startsAt - 1] !== "undefined") {
                    if (typeof rivalBoard[row][startsAt + 3] !== "undefined") {

                        for (let i = startsAt-1; i < startsAt + 4; i++) {
                            for (let j = row; j < row + 2; j++) {
                                if (rivalBoard[j][i] === "filled") {
                                    canSet = false;
                                    break;
                                }
                            }
                        }

                    }  else {
                        for (let i = startsAt-1; i < startsAt + 3; i++) {
                            for (let j = row; j < row + 2; j++) {
                                if (rivalBoard[j][i] === "filled") {
                                    canSet = false;
                                    break;
                                }
                            }
                        }
                    }
                }  else {
                    for (let i = startsAt; i < startsAt + 4; i++) {
                        for (let j = row; j < row + 2; j++) {
                            if (rivalBoard[j][i] === "filled") {
                                canSet = false;
                                break;
                            }
                        }
                    }
                }
            }


            if (canSet) {

                for (let i = 0; i < 3; i++) {

                    if (rivalShipsCoordinates.cruiser1.length !== 3) {
                        rivalShipsCoordinates.cruiser1.push(startsAt + ',' + row);
                    } else if(rivalShipsCoordinates.cruiser2.length !== 3) {
                        rivalShipsCoordinates.cruiser2.push(startsAt + ',' + row);
                    }

                    rivalBoard[row][startsAt++] = "filled";
                }
                if (num === 1) {
                    rivalShipsCoordinates.cruiser1Orientation = 'h';
                } else if(num === 2) {
                    rivalShipsCoordinates.cruiser2Orientation = 'h';
                }

                isNotSet = false;
            }
        } while (isNotSet);

    } else if(orientation === "vertical") {
        let isNotSet = true;

        do {

            let canSet = true;
            let col = randomIntFromInterval(0,9);
            let startsAt = randomIntFromInterval(0,7);

            if (typeof rivalBoard[startsAt-1] !== "undefined") {
                if (typeof rivalBoard[startsAt + 3] !== "undefined") {
                    if (typeof rivalBoard[startsAt][col - 1] !== "undefined") {
                        if (typeof rivalBoard[startsAt][col + 1] !== "undefined") {
                            for (let i = startsAt - 1; i < startsAt + 4; i++) {
                                for (let j = col - 1; j < col + 2; j++) {
                                    if (rivalBoard[i][j] === "filled") {
                                        canSet = false;
                                        break;
                                    }
                                }
                            }
                        } else {
                            for (let i = startsAt - 1; i < startsAt + 4; i++) {
                                for (let j = col - 1; j < col + 1; j++) {
                                    if (rivalBoard[i][j] === "filled") {
                                        canSet = false;
                                        break;
                                    }
                                }
                            }
                        }
                    } else {
                        for (let i = startsAt - 1; i < startsAt + 4; i++) {
                            for (let j = col; j < col + 2; j++) {
                                if (rivalBoard[i][j] === "filled") {
                                    canSet = false;
                                    break;
                                }
                            }
                        }
                    }
                } else {
                    if (typeof rivalBoard[startsAt][col - 1] !== "undefined") {
                        if (typeof rivalBoard[startsAt][col + 1] !== "undefined") {
                            for (let i = startsAt - 1; i < startsAt + 3; i++) {
                                for (let j = col - 1; j < col + 2; j++) {
                                    if (rivalBoard[i][j] === "filled") {
                                        canSet = false;
                                        break;
                                    }
                                }
                            }
                        } else {
                            for (let i = startsAt - 1; i < startsAt + 3; i++) {
                                for (let j = col - 1; j < col + 1; j++) {
                                    if (rivalBoard[i][j] === "filled") {
                                        canSet = false;
                                        break;
                                    }
                                }
                            }
                        }
                    } else {
                        for (let i = startsAt - 1; i < startsAt + 3; i++) {
                            for (let j = col; j < col + 2; j++) {
                                if (rivalBoard[i][j] === "filled") {
                                    canSet = false;
                                    break;
                                }
                            }
                        }
                    }
                }
            } else {
                if (typeof rivalBoard[startsAt][col - 1] !== "undefined") {
                    if (typeof rivalBoard[startsAt][col + 1] !== "undefined") {
                        for (let i = startsAt; i < startsAt + 4; i++) {
                            for (let j = col - 1; j < col + 2; j++) {
                                if (rivalBoard[i][j] === "filled") {
                                    canSet = false;
                                    break;
                                }
                            }
                        }
                    } else {
                        for (let i = startsAt; i < startsAt + 4; i++) {
                            for (let j = col - 1; j < col + 1; j++) {
                                if (rivalBoard[i][j] === "filled") {
                                    canSet = false;
                                    break;
                                }
                            }
                        }
                    }
                } else {
                    for (let i = startsAt; i < startsAt + 4; i++) {
                        for (let j = col; j < col + 2; j++) {
                            if (rivalBoard[i][j] === "filled") {
                                canSet = false;
                                break;
                            }
                        }
                    }
                }
            }

            if (canSet) {
                for (let i = 0; i < 3; i++) {

                    if (rivalShipsCoordinates.cruiser1.length !== 3) {
                        rivalShipsCoordinates.cruiser1.push(col + ',' + startsAt);
                    } else if(rivalShipsCoordinates.cruiser2.length !== 3) {
                        rivalShipsCoordinates.cruiser2.push(col + ',' + startsAt);
                    }

                    rivalBoard[startsAt++][col] = "filled";

                }
                if (num === 1) {
                    rivalShipsCoordinates.cruiser1Orientation = 'v';
                } else if(num === 2) {
                    rivalShipsCoordinates.cruiser2Orientation = 'v';
                }
                isNotSet = false;
            }


        } while(isNotSet);

    }

}

function setRivalDestroyer(num) {
    let orientation = "horizontal";
    let random = Math.random();
    if (random < 0.5) {
        orientation = "vertical";
    }

    let isNotSet = true;


    if (orientation === "horizontal"){

        do {
            let canSet = true;
            let row = randomIntFromInterval(0,9);
            let startsAt = randomIntFromInterval(0,8);

            if (typeof rivalBoard[row - 1] !== "undefined") {
                if (typeof rivalBoard[row + 1] !== "undefined") {
                    if (typeof rivalBoard[row][startsAt - 1] !== "undefined") {
                        if (typeof rivalBoard[row][startsAt + 2] !== "undefined") {
                            for (let i = startsAt - 1; i < startsAt + 3; i++) {
                                for (let j = row - 1; j < row + 2; j++) {
                                    if (rivalBoard[j][i] === "filled") {
                                        canSet = false;
                                    }
                                }
                            }

                        } else {
                            for (let i = startsAt - 1; i < startsAt + 2; i++) {
                                for (let j = row - 1; j < row + 2; j++) {
                                    if (rivalBoard[j][i] === "filled") {
                                        canSet = false;
                                    }
                                }
                            }
                        }
                    } else {
                        for (let i = startsAt; i < startsAt + 3; i++) {
                            for (let j = row - 1; j < row + 2; j++) {
                                if (rivalBoard[j][i] === "filled") {
                                    canSet = false;
                                }
                            }
                        }
                    }
                } else {
                    if (typeof rivalBoard[row][startsAt - 1] !== "undefined") {
                        if (typeof rivalBoard[row][startsAt + 2] !== "undefined") {
                            for (let i = startsAt - 1; i < startsAt + 3; i++) {
                                for (let j = row - 1; j < row + 1; j++) {
                                    if (rivalBoard[j][i] === "filled") {
                                        canSet = false;
                                    }
                                }
                            }
                        } else {
                            for (let i = startsAt - 1; i < startsAt + 2; i++) {
                                for (let j = row - 1; j < row + 1; j++) {
                                    if (rivalBoard[j][i] === "filled") {
                                        canSet = false;
                                    }
                                }
                            }
                        }
                    } else {
                        for (let i = startsAt; i < startsAt + 3; i++) {
                            for (let j = row - 1; j < row + 1; j++) {
                                if (rivalBoard[j][i] === "filled") {
                                    canSet = false;
                                }
                            }
                        }
                    }
                }
            } else {
                if (typeof rivalBoard[row][startsAt - 1] !== "undefined") {
                    if (typeof rivalBoard[row][startsAt + 2] !== "undefined") {
                        for (let i = startsAt - 1; i < startsAt + 3; i++) {
                            for (let j = row; j < row + 2; j++) {
                                if (rivalBoard[j][i] === "filled") {
                                    canSet = false;
                                }
                            }
                        }
                    } else {
                        for (let i = startsAt - 1; i < startsAt + 2; i++) {
                            for (let j = row; j < row + 2; j++) {
                                if (rivalBoard[j][i] === "filled") {
                                    canSet = false;
                                }
                            }
                        }
                    }
                } else {
                    for (let i = startsAt; i < startsAt + 3; i++) {
                        for (let j = row; j < row + 2; j++) {
                            if (rivalBoard[j][i] === "filled") {
                                canSet = false;
                            }
                        }
                    }
                }
            }


            if (canSet) {

                for (let i = 0; i < 2; i++) {

                    if (rivalShipsCoordinates.destroyer1.length !== 2) {
                        rivalShipsCoordinates.destroyer1.push(startsAt + ',' + row);
                    } else if (rivalShipsCoordinates.destroyer2.length !== 2){
                        rivalShipsCoordinates.destroyer2.push(startsAt + ',' + row);
                    } else if (rivalShipsCoordinates.destroyer3.length !== 2){
                        rivalShipsCoordinates.destroyer3.push(startsAt + ',' + row);
                    }

                    rivalBoard[row][startsAt++] = "filled";
                }

                if (num === 1) {
                    rivalShipsCoordinates.destroyer1Orientation = 'h';
                } else if(num === 2) {
                    rivalShipsCoordinates.destroyer2Orientation = 'h';
                } else if(num === 3) {
                    rivalShipsCoordinates.destroyer3Orientation = 'h';
                }

                isNotSet = false;
            }
        } while (isNotSet);

    } else if(orientation === "vertical") {
        let isNotSet = true;

        do {

            let canSet = true;
            let col = randomIntFromInterval(0,9);
            let startsAt = randomIntFromInterval(0,8);

            if (typeof rivalBoard[startsAt - 1] !== "undefined") {
                if (typeof rivalBoard[startsAt + 2] !== "undefined") {
                    if (typeof rivalBoard[startsAt][col - 1] !== "undefined") {
                        if (typeof  rivalBoard[startsAt][col + 1] !== "undefined") {
                            for (let i = startsAt - 1; i < startsAt + 3; i++) {
                                for (let j = col - 1; j < col + 2; j++) {
                                    if (rivalBoard[i][j] === "filled") {
                                        canSet = false;
                                        break;
                                    }
                                }
                            }
                        } else {
                            for (let i = startsAt - 1; i < startsAt + 3; i++) {
                                for (let j = col - 1; j < col + 1; j++) {
                                    if (rivalBoard[i][j] === "filled") {
                                        canSet = false;
                                        break;
                                    }
                                }
                            }
                        }
                    } else {
                        for (let i = startsAt - 1; i < startsAt + 3; i++) {
                            for (let j = col; j < col + 2; j++) {
                                if (rivalBoard[i][j] === "filled") {
                                    canSet = false;
                                    break;
                                }
                            }
                        }
                    }
                } else {
                    if (typeof rivalBoard[startsAt][col - 1] !== "undefined") {
                        if (typeof  rivalBoard[startsAt][col + 1] !== "undefined") {
                            for (let i = startsAt - 1; i < startsAt + 2; i++) {
                                for (let j = col - 1; j < col + 2; j++) {
                                    if (rivalBoard[i][j] === "filled") {
                                        canSet = false;
                                        break;
                                    }
                                }
                            }
                        } else {
                            for (let i = startsAt - 1; i < startsAt + 2; i++) {
                                for (let j = col - 1; j < col + 1; j++) {
                                    if (rivalBoard[i][j] === "filled") {
                                        canSet = false;
                                        break;
                                    }
                                }
                            }
                        }
                    } else {
                        for (let i = startsAt - 1; i < startsAt + 2; i++) {
                            for (let j = col; j < col + 2; j++) {
                                if (rivalBoard[i][j] === "filled") {
                                    canSet = false;
                                    break;
                                }
                            }
                        }
                    }
                }
            } else {
                if (typeof rivalBoard[startsAt][col - 1] !== "undefined") {
                    if (typeof  rivalBoard[startsAt][col + 1] !== "undefined") {
                        for (let i = startsAt; i < startsAt + 3; i++) {
                            for (let j = col - 1; j < col + 2; j++) {
                                if (rivalBoard[i][j] === "filled") {
                                    canSet = false;
                                    break;
                                }
                            }
                        }
                    } else {
                        for (let i = startsAt; i < startsAt + 3; i++) {
                            for (let j = col - 1; j < col + 1; j++) {
                                if (rivalBoard[i][j] === "filled") {
                                    canSet = false;
                                    break;
                                }
                            }
                        }
                    }
                } else {
                    for (let i = startsAt; i < startsAt + 3; i++) {
                        for (let j = col; j < col + 2; j++) {
                            if (rivalBoard[i][j] === "filled") {
                                canSet = false;
                                break;
                            }
                        }
                    }
                }
            }

            if (canSet) {
                for (let i = 0; i < 2; i++) {

                    if (rivalShipsCoordinates.destroyer1.length !== 2) {
                        rivalShipsCoordinates.destroyer1.push(col + ',' + startsAt);
                    } else if (rivalShipsCoordinates.destroyer2.length !== 2){
                        rivalShipsCoordinates.destroyer2.push(col + ',' + startsAt);
                    } else if (rivalShipsCoordinates.destroyer3.length !== 2){
                        rivalShipsCoordinates.destroyer3.push(col + ',' + startsAt);
                    }

                    rivalBoard[startsAt++][col] = "filled";
                }

                if (num === 1) {
                    rivalShipsCoordinates.destroyer1Orientation = 'v';
                } else if(num === 2) {
                    rivalShipsCoordinates.destroyer2Orientation = 'v';
                } else if(num === 3) {
                    rivalShipsCoordinates.destroyer3Orientation = 'v';
                }
                isNotSet = false;
            }


        } while(isNotSet);

    }

}

function setRivalBoat(num) {
    let isNotSet = true;

    do {
        let canSet = true;
        let row = randomIntFromInterval(0,9);
        let col = randomIntFromInterval(0,9);


        //check top
        if (typeof rivalBoard[row - 1] !== "undefined") {
            if (rivalBoard[row-1][col] === "filled") {
                canSet = false;
            }
        }

        //check bottom
        if (typeof rivalBoard[row + 1] !== "undefined") {
            if (rivalBoard[row + 1][col] === "filled") {
                canSet = false;
            }
        }

        //check right
        if (typeof rivalBoard[row][col+1] !== "undefined") {
            if (rivalBoard[row][col+1] === "filled") {
                canSet = false;
            }
        }

        //check left
        if (typeof rivalBoard[row][col-1] !== "undefined") {
            if (rivalBoard[row][col-1] === "filled") {
                canSet = false;
            }
        }

        //check right top
        if (typeof rivalBoard[row+1] !== "undefined" && typeof rivalBoard[row + 1][col + 1] !== "undefined") {
            if (rivalBoard[row+1][col+1] === "filled") {
                canSet = false;
            }
        }


        //check right bottom
        if (typeof rivalBoard[row-1] !== "undefined" && typeof rivalBoard[row-1][col+1] !== "undefined") {
            if (rivalBoard[row-1][col+1] === "filled") {
                canSet = false;
            }
        }

        //check left top
        if (typeof rivalBoard[row+1] !== "undefined" && typeof rivalBoard[row+1][col-1] !== "undefined") {
            if (rivalBoard[row+1][col-1] === "filled") {
                canSet = false;
            }
        }


        //check left bottom
        if (typeof rivalBoard[row-1] !== "undefined" && typeof rivalBoard[row-1][col-1] !== "undefined") {
            if (rivalBoard[row-1][col-1] === "filled") {
                canSet = false;
            }
        }

        if (canSet) {

            if (rivalShipsCoordinates.boat1.length < 1) {
                rivalShipsCoordinates.boat1.push(col+','+row);
            } else if (rivalShipsCoordinates.boat2.length < 1) {
                rivalShipsCoordinates.boat2.push(col+','+row);
            } else if (rivalShipsCoordinates.boat3.length < 1) {
                rivalShipsCoordinates.boat3.push(col+','+row);
            } else if (rivalShipsCoordinates.boat4.length < 1) {
                rivalShipsCoordinates.boat4.push(col+','+row);
            }

            rivalBoard[row][col] = "filled";


            isNotSet = false;
        }

    } while (isNotSet);

}


function shoot() {

    
    if (this.className !== "filled") {
        this.classList.add('empty');
        this.classList.add('no-hover');
        this.innerHTML = '<span class="z"></span>';
        this.removeEventListener('click', shoot);
    } else {
        this.classList.add('hit');
        this.innerHTML = '<span class="x"></span>';
        this.removeEventListener('click', shoot);
        this.classList.add('no-hover');

        let coordinateX = Number(this.getAttribute('data-x'));
        let coordinateY = Number(this.getAttribute('data-y'));

        let leftTopCellCheck = 'td[data-x="'+ Number(coordinateX - 1) +'"][data-y="'+ Number(coordinateY - 1) +'"]';
        let rightTopCellCheck = 'td[data-x="'+ Number(coordinateX + 1) +'"][data-y="'+ Number(coordinateY - 1) +'"]';

        let leftBottomCellCheck = 'td[data-x="'+ Number(coordinateX - 1) +'"][data-y="'+ Number(coordinateY + 1) +'"]';
        let rightBottomCellCheck = 'td[data-x="'+ Number(coordinateX + 1) +'"][data-y="'+ Number(coordinateY + 1) +'"]';


        if (table.querySelector(leftTopCellCheck) !== null) {
            table.querySelector(leftTopCellCheck).innerHTML = '<span class="z"></span>';
            table.querySelector(leftTopCellCheck).removeEventListener('click', shoot);
            table.querySelector(leftTopCellCheck).classList.add('no-hover');
            table.querySelector(leftTopCellCheck).classList.add('empty');
        }

        if (table.querySelector(rightTopCellCheck) !== null) {
            table.querySelector(rightTopCellCheck).innerHTML = '<span class="z"></span>';
            table.querySelector(rightTopCellCheck).removeEventListener('click', shoot);
            table.querySelector(rightTopCellCheck).classList.add('no-hover');
            table.querySelector(rightTopCellCheck).classList.add('empty');
        }

        if (table.querySelector(leftBottomCellCheck) !== null) {
            table.querySelector(leftBottomCellCheck).innerHTML = '<span class="z"></span>';
            table.querySelector(leftBottomCellCheck).removeEventListener('click', shoot);
            table.querySelector(leftBottomCellCheck).classList.add('no-hover');
            table.querySelector(leftBottomCellCheck).classList.add('empty');
        }

        if (table.querySelector(rightBottomCellCheck) !== null) {
            table.querySelector(rightBottomCellCheck).innerHTML = '<span class="z"></span>';
            table.querySelector(rightBottomCellCheck).removeEventListener('click', shoot);
            table.querySelector(rightBottomCellCheck).classList.add('no-hover');
            table.querySelector(rightBottomCellCheck).classList.add('empty');
        }

        //check if ship still has any cells left TODO: same for other ships
        let coordinates = coordinateX + ',' + coordinateY;
        
        if (rivalShipsCoordinates.battleship.includes(coordinates)) {
                rivalShipsCoordinates.battleshipHits++;

                if (rivalShipsCoordinates.battleshipHits === 4){

                    rivalShipsCoordinates.battleshipKilled = true;

                    if (rivalShipsCoordinates.battleshipOrientation === 'v') {
                    let startFrom = rivalShipsCoordinates.battleship[0];
                    let startFromArr = startFrom.split(',');

                    let CellX = Number(startFromArr[0]);
                    let topCellY = Number(startFromArr[1]) - 1;
                    let bottomCellY = Number(startFromArr[1]) + 4;


                    let topCell = 'td[data-x="'+ CellX +'"][data-y="'+ topCellY +'"]';
                    let bottomCell = 'td[data-x="'+ Number(startFromArr[0]) +'"][data-y="'+ bottomCellY +'"]';

                    if (table.querySelector(topCell) !== null) {
                        table.querySelector(topCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(topCell).removeEventListener('click', shoot);
                        table.querySelector(topCell).classList.add('no-hover');
                        table.querySelector(topCell).classList.add('empty');
                    }

                    if (table.querySelector(bottomCell) !== null) {
                        table.querySelector(bottomCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(bottomCell).removeEventListener('click', shoot);
                        table.querySelector(bottomCell).classList.add('no-hover');
                        table.querySelector(bottomCell).classList.add('empty');

                    }
                } else if (rivalShipsCoordinates.battleshipOrientation === 'h') {
                    let startFrom = rivalShipsCoordinates.battleship[0];
                    let startFromArr = startFrom.split(',');

                    let CellY = Number(startFromArr[1]);
                    let leftCellX = Number(startFromArr[0]) - 1;
                    let rightCellX = Number(startFromArr[0]) + 4;


                    let leftCell = 'td[data-x="'+ leftCellX +'"][data-y="'+ CellY +'"]';
                    let rightCell = 'td[data-x="'+ rightCellX +'"][data-y="'+ CellY +'"]';


                    if (table.querySelector(leftCell) !== null) {
                        table.querySelector(leftCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(leftCell).removeEventListener('click', shoot);
                        table.querySelector(leftCell).classList.add('no-hover');
                        table.querySelector(leftCell).classList.add('empty');
                    }

                    console.log(rightCell);

                    if (table.querySelector(rightCell) !== null) {
                        table.querySelector(rightCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(rightCell).removeEventListener('click', shoot);
                        table.querySelector(rightCell).classList.add('no-hover');
                        table.querySelector(rightCell).classList.add('empty');
                    }

                }
            }

        } else if(rivalShipsCoordinates.cruiser1.includes(coordinates)) {

            rivalShipsCoordinates.cruiser1Hits++;

            if (rivalShipsCoordinates.cruiser1Hits === 3){
                rivalShipsCoordinates.cruiser1Killed = true;
                if (rivalShipsCoordinates.cruiser1Orientation === 'v') {
                    let startFrom = rivalShipsCoordinates.cruiser1[0];
                    let startFromArr = startFrom.split(',');

                    let CellX = Number(startFromArr[0]);
                    let topCellY = Number(startFromArr[1]) - 1;
                    let bottomCellY = Number(startFromArr[1]) + 3;


                    let topCell = 'td[data-x="'+ CellX +'"][data-y="'+ topCellY +'"]';
                    let bottomCell = 'td[data-x="'+ Number(startFromArr[0]) +'"][data-y="'+ bottomCellY +'"]';

                    if (table.querySelector(topCell) !== null) {
                        table.querySelector(topCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(topCell).removeEventListener('click', shoot);
                        table.querySelector(topCell).classList.add('no-hover');
                        table.querySelector(topCell).classList.add('empty');

                    }

                    if (table.querySelector(bottomCell) !== null) {
                        table.querySelector(bottomCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(bottomCell).removeEventListener('click', shoot);
                        table.querySelector(bottomCell).classList.add('no-hover');
                        table.querySelector(bottomCell).classList.add('empty');
                    }
                } else if (rivalShipsCoordinates.cruiser1Orientation === 'h') {
                    let startFrom = rivalShipsCoordinates.cruiser1[0];
                    let startFromArr = startFrom.split(',');

                    let CellY = Number(startFromArr[1]);
                    let leftCellX = Number(startFromArr[0]) - 1;
                    let rightCellX = Number(startFromArr[0]) + 3;


                    let leftCell = 'td[data-x="'+ leftCellX +'"][data-y="'+ CellY +'"]';
                    let rightCell = 'td[data-x="'+ rightCellX +'"][data-y="'+ CellY +'"]';


                    if (table.querySelector(leftCell) !== null) {
                        table.querySelector(leftCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(leftCell).removeEventListener('click', shoot);
                        table.querySelector(leftCell).classList.add('no-hover');
                        table.querySelector(leftCell).classList.add('empty');
                    }

                    console.log(rightCell);

                    if (table.querySelector(rightCell) !== null) {
                        table.querySelector(rightCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(rightCell).removeEventListener('click', shoot);
                        table.querySelector(rightCell).classList.add('no-hover');
                        table.querySelector(rightCell).classList.add('empty');
                    }

                }
            }
        } else if(rivalShipsCoordinates.cruiser2.includes(coordinates)) {

            rivalShipsCoordinates.cruiser2Hits++;

            if (rivalShipsCoordinates.cruiser2Hits === 3){
                rivalShipsCoordinates.cruiser2Killed = true;
                if (rivalShipsCoordinates.cruiser2Orientation === 'v') {
                    console.log('me');
                    let startFrom = rivalShipsCoordinates.cruiser2[0];
                    let startFromArr = startFrom.split(',');

                    let CellX = Number(startFromArr[0]);
                    let topCellY = Number(startFromArr[1]) - 1;
                    let bottomCellY = Number(startFromArr[1]) + 3;


                    let topCell = 'td[data-x="'+ CellX +'"][data-y="'+ topCellY +'"]';
                    let bottomCell = 'td[data-x="'+ Number(startFromArr[0]) +'"][data-y="'+ bottomCellY +'"]';

                    if (table.querySelector(topCell) !== null) {
                        table.querySelector(topCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(topCell).removeEventListener('click', shoot);
                        table.querySelector(topCell).classList.add('no-hover');
                        table.querySelector(topCell).classList.add('empty');
                    }

                    if (table.querySelector(bottomCell) !== null) {
                        table.querySelector(bottomCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(bottomCell).removeEventListener('click', shoot);
                        table.querySelector(bottomCell).classList.add('no-hover');
                        table.querySelector(bottomCell).classList.add('empty');
                    }
                } else if (rivalShipsCoordinates.cruiser2Orientation === 'h') {
                    console.log('cruiser2 h');
                    let startFrom = rivalShipsCoordinates.cruiser2[0];
                    let startFromArr = startFrom.split(',');

                    let CellY = Number(startFromArr[1]);
                    let leftCellX = Number(startFromArr[0]) - 1;
                    let rightCellX = Number(startFromArr[0]) + 3;


                    let leftCell = 'td[data-x="'+ leftCellX +'"][data-y="'+ CellY +'"]';
                    let rightCell = 'td[data-x="'+ rightCellX +'"][data-y="'+ CellY +'"]';


                    if (table.querySelector(leftCell) !== null) {
                        table.querySelector(leftCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(leftCell).removeEventListener('click', shoot);
                        table.querySelector(leftCell).classList.add('no-hover');
                        table.querySelector(leftCell).classList.add('empty');
                    }

                    if (table.querySelector(rightCell) !== null) {
                        table.querySelector(rightCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(rightCell).removeEventListener('click', shoot);
                        table.querySelector(rightCell).classList.add('no-hover');
                        table.querySelector(rightCell).classList.add('empty');

                    }

                }
            }
        } else if(rivalShipsCoordinates.destroyer1.includes(coordinates)) {

            rivalShipsCoordinates.destroyer1Hits++;

            if (rivalShipsCoordinates.destroyer1Hits === 2){
                rivalShipsCoordinates.destroyer1Killed = true;
                if (rivalShipsCoordinates.destroyer1Orientation === 'v') {
                    console.log('me');
                    let startFrom = rivalShipsCoordinates.destroyer1[0];
                    let startFromArr = startFrom.split(',');

                    let CellX = Number(startFromArr[0]);
                    let topCellY = Number(startFromArr[1]) - 1;
                    let bottomCellY = Number(startFromArr[1]) + 2;


                    let topCell = 'td[data-x="'+ CellX +'"][data-y="'+ topCellY +'"]';
                    let bottomCell = 'td[data-x="'+ Number(startFromArr[0]) +'"][data-y="'+ bottomCellY +'"]';

                    if (table.querySelector(topCell) !== null) {
                        table.querySelector(topCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(topCell).removeEventListener('click', shoot);
                        table.querySelector(topCell).classList.add('no-hover');
                        table.querySelector(topCell).classList.add('empty');

                    }

                    if (table.querySelector(bottomCell) !== null) {
                        table.querySelector(bottomCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(bottomCell).removeEventListener('click', shoot);
                        table.querySelector(bottomCell).classList.add('no-hover');
                        table.querySelector(bottomCell).classList.add('empty');

                    }
                } else if (rivalShipsCoordinates.destroyer1Orientation === 'h') {
                    console.log('cruiser2 h');
                    let startFrom = rivalShipsCoordinates.destroyer1[0];
                    let startFromArr = startFrom.split(',');

                    let CellY = Number(startFromArr[1]);
                    let leftCellX = Number(startFromArr[0]) - 1;
                    let rightCellX = Number(startFromArr[0]) + 2;


                    let leftCell = 'td[data-x="'+ leftCellX +'"][data-y="'+ CellY +'"]';
                    let rightCell = 'td[data-x="'+ rightCellX +'"][data-y="'+ CellY +'"]';


                    if (table.querySelector(leftCell) !== null) {
                        table.querySelector(leftCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(leftCell).removeEventListener('click', shoot);
                        table.querySelector(leftCell).classList.add('no-hover');
                        table.querySelector(leftCell).classList.add('empty');
                    }

                    if (table.querySelector(rightCell) !== null) {
                        table.querySelector(rightCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(rightCell).removeEventListener('click', shoot);
                        table.querySelector(rightCell).classList.add('no-hover');
                        table.querySelector(rightCell).classList.add('empty');
                    }

                }
            }
        } else if(rivalShipsCoordinates.destroyer2.includes(coordinates)) {

            rivalShipsCoordinates.destroyer2Hits++;

            if (rivalShipsCoordinates.destroyer2Hits === 2){
                rivalShipsCoordinates.destroyer2Killed = true;
                if (rivalShipsCoordinates.destroyer2Orientation === 'v') {
                    console.log('me');
                    let startFrom = rivalShipsCoordinates.destroyer2[0];
                    let startFromArr = startFrom.split(',');

                    let CellX = Number(startFromArr[0]);
                    let topCellY = Number(startFromArr[1]) - 1;
                    let bottomCellY = Number(startFromArr[1]) + 2;


                    let topCell = 'td[data-x="'+ CellX +'"][data-y="'+ topCellY +'"]';
                    let bottomCell = 'td[data-x="'+ Number(startFromArr[0]) +'"][data-y="'+ bottomCellY +'"]';

                    if (table.querySelector(topCell) !== null) {
                        table.querySelector(topCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(topCell).removeEventListener('click', shoot);
                        table.querySelector(topCell).classList.add('no-hover');
                        table.querySelector(topCell).classList.add('empty');

                    }

                    if (table.querySelector(bottomCell) !== null) {
                        table.querySelector(bottomCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(bottomCell).removeEventListener('click', shoot);
                        table.querySelector(bottomCell).classList.add('no-hover');
                        table.querySelector(bottomCell).classList.add('empty');
                    }
                } else if (rivalShipsCoordinates.destroyer2Orientation === 'h') {
                    console.log('cruiser2 h');
                    let startFrom = rivalShipsCoordinates.destroyer2[0];
                    let startFromArr = startFrom.split(',');

                    let CellY = Number(startFromArr[1]);
                    let leftCellX = Number(startFromArr[0]) - 1;
                    let rightCellX = Number(startFromArr[0]) + 2;


                    let leftCell = 'td[data-x="'+ leftCellX +'"][data-y="'+ CellY +'"]';
                    let rightCell = 'td[data-x="'+ rightCellX +'"][data-y="'+ CellY +'"]';


                    if (table.querySelector(leftCell) !== null) {
                        table.querySelector(leftCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(leftCell).removeEventListener('click', shoot);
                        table.querySelector(leftCell).classList.add('no-hover');
                        table.querySelector(leftCell).classList.add('empty');
                    }

                    if (table.querySelector(rightCell) !== null) {
                        table.querySelector(rightCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(rightCell).removeEventListener('click', shoot);
                        table.querySelector(rightCell).classList.add('no-hover');
                        table.querySelector(rightCell).classList.add('empty');
                    }

                }
            }
        } else if(rivalShipsCoordinates.destroyer3.includes(coordinates)) {

            rivalShipsCoordinates.destroyer3Hits++;

            if (rivalShipsCoordinates.destroyer3Hits === 2){
                rivalShipsCoordinates.destroyer3Killed = true;
                if (rivalShipsCoordinates.destroyer3Orientation === 'v') {
                    let startFrom = rivalShipsCoordinates.destroyer3[0];
                    let startFromArr = startFrom.split(',');

                    let CellX = Number(startFromArr[0]);
                    let topCellY = Number(startFromArr[1]) - 1;
                    let bottomCellY = Number(startFromArr[1]) + 2;


                    let topCell = 'td[data-x="'+ CellX +'"][data-y="'+ topCellY +'"]';
                    let bottomCell = 'td[data-x="'+ Number(startFromArr[0]) +'"][data-y="'+ bottomCellY +'"]';

                    if (table.querySelector(topCell) !== null) {
                        table.querySelector(topCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(topCell).removeEventListener('click', shoot);
                        table.querySelector(topCell).classList.add('no-hover');
                        table.querySelector(topCell).classList.add('empty');

                    }

                    if (table.querySelector(bottomCell) !== null) {
                        table.querySelector(bottomCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(bottomCell).removeEventListener('click', shoot);
                        table.querySelector(bottomCell).classList.add('no-hover')
                        table.querySelector(bottomCell).classList.add('empty');

                    }
                } else if (rivalShipsCoordinates.destroyer3Orientation === 'h') {
                    console.log('cruiser2 h');
                    let startFrom = rivalShipsCoordinates.destroyer3[0];
                    let startFromArr = startFrom.split(',');

                    let CellY = Number(startFromArr[1]);
                    let leftCellX = Number(startFromArr[0]) - 1;
                    let rightCellX = Number(startFromArr[0]) + 2;


                    let leftCell = 'td[data-x="'+ leftCellX +'"][data-y="'+ CellY +'"]';
                    let rightCell = 'td[data-x="'+ rightCellX +'"][data-y="'+ CellY +'"]';


                    if (table.querySelector(leftCell) !== null) {
                        table.querySelector(leftCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(leftCell).removeEventListener('click', shoot);
                        table.querySelector(leftCell).classList.add('no-hover');
                        table.querySelector(rightCell).classList.add('empty');
                    }

                    if (table.querySelector(rightCell) !== null) {
                        table.querySelector(rightCell).innerHTML = '<span class="z"></span>';
                        table.querySelector(rightCell).removeEventListener('click', shoot);
                        table.querySelector(rightCell).classList.add('no-hover');
                        table.querySelector(rightCell).classList.add('empty');

                    }

                }
            }
        } else if(rivalShipsCoordinates.boat1.includes(coordinates)) {

            rivalShipsCoordinates.boat1Killed = true;

            let coordinates = rivalShipsCoordinates.boat1[0];
            let coordinatesArr = coordinates.split(',');

            let xCor = coordinatesArr[0];
            let yCor = coordinatesArr[1];

            let topCellY = Number(yCor) - 1;
            let bottomCellY = Number(yCor) + 1;

            let leftCellX = Number(xCor) - 1;
            let rightCellX = Number(xCor) + 1;

            let topCell = 'td[data-x="'+ xCor +'"][data-y="'+ topCellY +'"]';
            let bottomCell ='td[data-x="'+ xCor +'"][data-y="'+ bottomCellY +'"]';
            let leftCell = 'td[data-x="'+ leftCellX +'"][data-y="'+ yCor +'"]';
            let rightCell = 'td[data-x="'+ rightCellX +'"][data-y="'+ yCor +'"]';

            console.log(topCell, bottomCell, leftCell, rightCell);

            if (table.querySelector(topCell) !== null) {
                table.querySelector(topCell).innerHTML = '<span class="z"></span>';
                table.querySelector(topCell).removeEventListener('click', shoot);
                table.querySelector(topCell).classList.add('no-hover');
                table.querySelector(topCell).classList.add('empty');
            }

            if (table.querySelector(bottomCell) !== null) {
                table.querySelector(bottomCell).innerHTML = '<span class="z"></span>';
                table.querySelector(bottomCell).removeEventListener('click', shoot);
                table.querySelector(bottomCell).classList.add('no-hover');
                table.querySelector(bottomCell).classList.add('empty');
            }

            if (table.querySelector(rightCell) !== null) {
                table.querySelector(rightCell).innerHTML = '<span class="z"></span>';
                table.querySelector(rightCell).removeEventListener('click', shoot);
                table.querySelector(rightCell).classList.add('no-hover');
                table.querySelector(rightCell).classList.add('empty');
            }

            if (table.querySelector(leftCell) !== null) {
                table.querySelector(leftCell).innerHTML = '<span class="z"></span>';
                table.querySelector(leftCell).removeEventListener('click', shoot);
                table.querySelector(leftCell).classList.add('no-hover');
                table.querySelector(leftCell).classList.add('empty');
            }

        } else if(rivalShipsCoordinates.boat2.includes(coordinates)) {
            rivalShipsCoordinates.boat2Killed = true;

            let coordinates = rivalShipsCoordinates.boat2[0];
            let coordinatesArr = coordinates.split(',');

            let xCor = coordinatesArr[0];
            let yCor = coordinatesArr[1];

            let topCellY = Number(yCor) - 1;
            let bottomCellY = Number(yCor) + 1;

            let leftCellX = Number(xCor) - 1;
            let rightCellX = Number(xCor) + 1;

            let topCell = 'td[data-x="'+ xCor +'"][data-y="'+ topCellY +'"]';
            let bottomCell ='td[data-x="'+ xCor +'"][data-y="'+ bottomCellY +'"]';
            let leftCell = 'td[data-x="'+ leftCellX +'"][data-y="'+ yCor +'"]';
            let rightCell = 'td[data-x="'+ rightCellX +'"][data-y="'+ yCor +'"]';

            console.log(topCell, bottomCell, leftCell, rightCell);

            if (table.querySelector(topCell) !== null) {
                table.querySelector(topCell).innerHTML = '<span class="z"></span>';
                table.querySelector(topCell).removeEventListener('click', shoot);
                table.querySelector(topCell).classList.add('no-hover');
                table.querySelector(topCell).classList.add('empty');
            }

            if (table.querySelector(bottomCell) !== null) {
                table.querySelector(bottomCell).innerHTML = '<span class="z"></span>';
                table.querySelector(bottomCell).removeEventListener('click', shoot);
                table.querySelector(bottomCell).classList.add('no-hover');
                table.querySelector(bottomCell).classList.add('empty');
            }

            if (table.querySelector(rightCell) !== null) {
                table.querySelector(rightCell).innerHTML = '<span class="z"></span>';
                table.querySelector(rightCell).removeEventListener('click', shoot);
                table.querySelector(rightCell).classList.add('no-hover');
                table.querySelector(rightCell).classList.add('empty');
            }

            if (table.querySelector(leftCell) !== null) {
                table.querySelector(leftCell).innerHTML = '<span class="z"></span>';
                table.querySelector(leftCell).removeEventListener('click', shoot);
                table.querySelector(leftCell).classList.add('no-hover');
                table.querySelector(leftCell).classList.add('empty');
            }

        } else if(rivalShipsCoordinates.boat3.includes(coordinates)) {
            rivalShipsCoordinates.boat3Killed = true;


            let coordinates = rivalShipsCoordinates.boat3[0];
            let coordinatesArr = coordinates.split(',');

            let xCor = coordinatesArr[0];
            let yCor = coordinatesArr[1];

            let topCellY = Number(yCor) - 1;
            let bottomCellY = Number(yCor) + 1;

            let leftCellX = Number(xCor) - 1;
            let rightCellX = Number(xCor) + 1;

            let topCell = 'td[data-x="'+ xCor +'"][data-y="'+ topCellY +'"]';
            let bottomCell ='td[data-x="'+ xCor +'"][data-y="'+ bottomCellY +'"]';
            let leftCell = 'td[data-x="'+ leftCellX +'"][data-y="'+ yCor +'"]';
            let rightCell = 'td[data-x="'+ rightCellX +'"][data-y="'+ yCor +'"]';

            console.log(topCell, bottomCell, leftCell, rightCell);

            if (table.querySelector(topCell) !== null) {
                table.querySelector(topCell).innerHTML = '<span class="z"></span>';
                table.querySelector(topCell).removeEventListener('click', shoot);
                table.querySelector(topCell).classList.add('no-hover');
                table.querySelector(topCell).classList.add('empty');
            }

            if (table.querySelector(bottomCell) !== null) {
                table.querySelector(bottomCell).innerHTML = '<span class="z"></span>';
                table.querySelector(bottomCell).removeEventListener('click', shoot);
                table.querySelector(bottomCell).classList.add('no-hover');
                table.querySelector(bottomCell).classList.add('empty');
            }

            if (table.querySelector(rightCell) !== null) {
                table.querySelector(rightCell).innerHTML = '<span class="z"></span>';
                table.querySelector(rightCell).removeEventListener('click', shoot);
                table.querySelector(rightCell).classList.add('no-hover');
                table.querySelector(rightCell).classList.add('empty');
            }

            if (table.querySelector(leftCell) !== null) {
                table.querySelector(leftCell).innerHTML = '<span class="z"></span>';
                table.querySelector(leftCell).removeEventListener('click', shoot);
                table.querySelector(leftCell).classList.add('no-hover');
                table.querySelector(leftCell).classList.add('empty');
            }

        } else if(rivalShipsCoordinates.boat4.includes(coordinates)) {

            rivalShipsCoordinates.boat4Killed = true;
            let coordinates = rivalShipsCoordinates.boat4[0];
            let coordinatesArr = coordinates.split(',');

            let xCor = coordinatesArr[0];
            let yCor = coordinatesArr[1];

            let topCellY = Number(yCor) - 1;
            let bottomCellY = Number(yCor) + 1;

            let leftCellX = Number(xCor) - 1;
            let rightCellX = Number(xCor) + 1;

            let topCell = 'td[data-x="'+ xCor +'"][data-y="'+ topCellY +'"]';
            let bottomCell ='td[data-x="'+ xCor +'"][data-y="'+ bottomCellY +'"]';
            let leftCell = 'td[data-x="'+ leftCellX +'"][data-y="'+ yCor +'"]';
            let rightCell = 'td[data-x="'+ rightCellX +'"][data-y="'+ yCor +'"]';

            console.log(topCell, bottomCell, leftCell, rightCell);

            if (table.querySelector(topCell) !== null) {
                table.querySelector(topCell).innerHTML = '<span class="z"></span>';
                table.querySelector(topCell).removeEventListener('click', shoot);
                table.querySelector(topCell).classList.add('no-hover');
                table.querySelector(topCell).classList.add('empty');
            }

            if (table.querySelector(bottomCell) !== null) {
                table.querySelector(bottomCell).innerHTML = '<span class="z"></span>';
                table.querySelector(bottomCell).removeEventListener('click', shoot);
                table.querySelector(bottomCell).classList.add('no-hover');
                table.querySelector(bottomCell).classList.add('empty');
            }

            if (table.querySelector(rightCell) !== null) {
                table.querySelector(rightCell).innerHTML = '<span class="z"></span>';
                table.querySelector(rightCell).removeEventListener('click', shoot);
                table.querySelector(rightCell).classList.add('no-hover');
                table.querySelector(rightCell).classList.add('empty');
            }

            if (table.querySelector(leftCell) !== null) {
                table.querySelector(leftCell).innerHTML = '<span class="z"></span>';
                table.querySelector(leftCell).removeEventListener('click', shoot);
                table.querySelector(leftCell).classList.add('no-hover');
                table.querySelector(leftCell).classList.add('empty');
            }

        }

        if (rivalShipsCoordinates.battleshipKilled && rivalShipsCoordinates.cruiser1Killed && rivalShipsCoordinates.cruiser2Killed
            && rivalShipsCoordinates.destroyer1Killed && rivalShipsCoordinates.destroyer2Killed && rivalShipsCoordinates.destroyer3Killed
            && rivalShipsCoordinates.boat1Killed && rivalShipsCoordinates.boat2Killed && rivalShipsCoordinates.boat3Killed && rivalShipsCoordinates.boat4Killed) {

            alert('Game over. You won!')
        }

    }
}


let computerLastFireIsHit = false;
let lastHitCoordinates = {x:0, y:0};


function computerFire() {
    let isShot = true;

    if (computerLastFireIsHit) {

        let possibleShootingCoordinate = [];

        let currentRowSelector = 'tr:nth-child(' + Number(lastHitCoordinates.y) + ')';
        let currentColSelector = 'td:nth-child(' + Number(lastHitCoordinates.x) + ')';

        let possibleTopRowSelector = 'tr:nth-child(' + Number(lastHitCoordinates.y - 1) + ')';
        let possibleBottomRowSelector = 'tr:nth-child(' + Number(lastHitCoordinates.y + 1) + ')';

        let possibleLeftColSelector = 'td:nth-child(' + Number(lastHitCoordinates.x - 1) + ')';
        let possibleRightColSelector = 'td:nth-child(' + Number(lastHitCoordinates.x + 1) + ')';


        let possibleTopRowEl = playerTable.querySelector(possibleTopRowSelector);
        let currentRowEl = playerTable.querySelector(currentRowSelector);
        let possibleBottomRowEl = playerTable.querySelector(possibleBottomRowSelector);


        let aboveCell;
        possibleTopRowEl !== null ? aboveCell =  possibleTopRowEl.querySelector(currentColSelector) : aboveCell = null;

        let belowCell;
        possibleBottomRowEl !== null ? belowCell = possibleBottomRowEl.querySelector(currentColSelector) : belowCell = null;

        let leftCell = currentRowEl.querySelector(possibleLeftColSelector);
        let rightCell = currentRowEl.querySelector(possibleRightColSelector);

        console.log(aboveCell);
        console.log(belowCell);
        console.log(leftCell);
        console.log(rightCell);

        if (rightCell !== null) {
            possibleShootingCoordinate.push(rightCell);
        }

        if (belowCell !== null) {
            possibleShootingCoordinate.push(belowCell);
        }

        if (leftCell !== null) {
            possibleShootingCoordinate.push(leftCell);
        }

        if (aboveCell !== null) {
            possibleShootingCoordinate.push(aboveCell);
        }

        let shotNext = true;

        do {

            let randomCell = randomIntFromInterval(1, possibleShootingCoordinate.length);
            randomCell = possibleShootingCoordinate[randomCell - 1];

            if (randomCell !== null) {
                if (randomCell.classList.contains('filled')) {
                    randomCell.classList.add('hit');
                    randomCell.innerHTML = '<span class="x"></span>';
                    randomCell.removeEventListener('click', shoot);
                    randomCell.classList.add('no-hover');

                    let randomCellX = Number(randomCell.getAttribute('data-x'));
                    let randomCellY = Number(randomCell.getAttribute('data-y'));

                    if (playerShipsCoordinates.battleship.includes(randomCellX + ',' + randomCellY)) {
                        playerShipsCoordinates.battleshipHits++;

                        if (playerShipsCoordinates.battleshipHits === 4) {
                            playerShipsCoordinates.battleshipKilled = true;

                            let startsFrom = playerShipsCoordinates.battleship[0];
                            startsFrom = startsFrom.split(',');

                            let posX = startsFrom[0];
                            let posY = startsFrom[1];

                            if (playerShipsCoordinates.battleshipOrientation === 'h') {
                                let leftCellSelector = '[data-x="'+ Number(posX - 1) +'"][data-y="'+ Number(posY) +'"]';
                                let rightCellSelector = '[data-x="'+ (Number(posX) + 4) +'"][data-y="'+ Number(posY) +'"]';

                                let leftCell = playerTable.querySelector(leftCellSelector);
                                let rightCell = playerTable.querySelector(rightCellSelector);

                                if (leftCell !== null && !leftCell.classList.contains('empty')) {
                                    leftCell.innerHTML = '<span class="z"></span>';
                                    leftCell.removeEventListener('click', shoot);
                                    leftCell.classList.add('no-hover');
                                    leftCell.classList.add('empty');
                                }

                                if (rightCell !== null && !rightCell.classList.contains('empty')) {
                                    rightCell.innerHTML = '<span class="z"></span>';
                                    rightCell.removeEventListener('click', shoot);
                                    rightCell.classList.add('no-hover');
                                    rightCell.classList.add('empty');
                                }
                            } else if (playerShipsCoordinates.battleshipOrientation === 'y') {
                                let topCellSelector = '[data-x="'+ Number(posX) +'"][data-y="'+ (Number(posY) - 1) +'"]';
                                let bottomCellSelector = '[data-x="'+ Number(posX) +'"][data-y="'+ (Number(posY) + 4) +'"]';

                                let topCell = playerTable.querySelector(topCellSelector);
                                let bottomCell = playerTable.querySelector(bottomCellSelector);

                                if (topCell !== null && !topCell.classList.contains('empty')) {
                                    topCell.innerHTML = '<span class="z"></span>';
                                    topCell.removeEventListener('click', shoot);
                                    topCell.classList.add('no-hover');
                                    topCell.classList.add('empty');
                                }

                                if (bottomCell !== null && !bottomCell.classList.contains('empty')) {
                                    bottomCell.innerHTML = '<span class="z"></span>';
                                    bottomCell.removeEventListener('click', shoot);
                                    bottomCell.classList.add('no-hover');
                                    bottomCell.classList.add('empty');
                                }
                            }
                        }


                    } else if (playerShipsCoordinates.cruiser1.includes(randomCellX + ',' + randomCellY)) {
                        playerShipsCoordinates.cruiser1Hits++;


                        if (playerShipsCoordinates.cruiser1Hits === 3) {
                            playerShipsCoordinates.cruiser1Killed = true;

                            let startsFrom = playerShipsCoordinates.cruiser1[0];
                            startsFrom = startsFrom.split(',');

                            let posX = startsFrom[0];
                            let posY = startsFrom[1];

                            if (playerShipsCoordinates.cruiser1Orientation === 'h') {
                                let leftCellSelector = '[data-x="'+ Number(posX - 1) +'"][data-y="'+ Number(posY) +'"]';
                                let rightCellSelector = '[data-x="'+ (Number(posX) + 3) +'"][data-y="'+ Number(posY) +'"]';

                                let leftCell = playerTable.querySelector(leftCellSelector);
                                let rightCell = playerTable.querySelector(rightCellSelector);

                                if (leftCell !== null && !leftCell.classList.contains('empty')) {
                                    leftCell.innerHTML = '<span class="z"></span>';
                                    leftCell.removeEventListener('click', shoot);
                                    leftCell.classList.add('no-hover');
                                    leftCell.classList.add('empty');
                                }

                                if (rightCell !== null && !rightCell.classList.contains('empty')) {
                                    rightCell.innerHTML = '<span class="z"></span>';
                                    rightCell.removeEventListener('click', shoot);
                                    rightCell.classList.add('no-hover');
                                    rightCell.classList.add('empty');
                                }
                            } else if (playerShipsCoordinates.cruiser1Orientation === 'y') {
                                let topCellSelector = '[data-x="'+ Number(posX) +'"][data-y="'+ (Number(posY) - 1) +'"]';
                                let bottomCellSelector = '[data-x="'+ Number(posX) +'"][data-y="'+ (Number(posY) + 3) +'"]';

                                let topCell = playerTable.querySelector(topCellSelector);
                                let bottomCell = playerTable.querySelector(bottomCellSelector);

                                if (topCell !== null && !topCell.classList.contains('empty')) {
                                    topCell.innerHTML = '<span class="z"></span>';
                                    topCell.removeEventListener('click', shoot);
                                    topCell.classList.add('no-hover');
                                    topCell.classList.add('empty');
                                }

                                if (bottomCell !== null && !bottomCell.classList.contains('empty')) {
                                    bottomCell.innerHTML = '<span class="z"></span>';
                                    bottomCell.removeEventListener('click', shoot);
                                    bottomCell.classList.add('no-hover');
                                    bottomCell.classList.add('empty');
                                }
                            }
                        }


                    } else if (playerShipsCoordinates.cruiser2.includes(randomCellX + ',' + randomCellY)) {
                        playerShipsCoordinates.cruiser2Hits++;

                        if (playerShipsCoordinates.cruiser2Hits === 3) {
                            playerShipsCoordinates.cruiser2Killed = true;

                            let startsFrom = playerShipsCoordinates.cruiser2[0];
                            startsFrom = startsFrom.split(',');

                            let posX = startsFrom[0];
                            let posY = startsFrom[1];

                            if (playerShipsCoordinates.cruiser2Orientation === 'h') {
                                let leftCellSelector = '[data-x="'+ Number(posX - 1) +'"][data-y="'+ Number(posY) +'"]';
                                let rightCellSelector = '[data-x="'+ (Number(posX) + 3) +'"][data-y="'+ Number(posY) +'"]';

                                let leftCell = playerTable.querySelector(leftCellSelector);
                                let rightCell = playerTable.querySelector(rightCellSelector);

                                if (leftCell !== null && !leftCell.classList.contains('empty')) {
                                    leftCell.innerHTML = '<span class="z"></span>';
                                    leftCell.removeEventListener('click', shoot);
                                    leftCell.classList.add('no-hover');
                                    leftCell.classList.add('empty');
                                }

                                if (rightCell !== null && !rightCell.classList.contains('empty')) {
                                    rightCell.innerHTML = '<span class="z"></span>';
                                    rightCell.removeEventListener('click', shoot);
                                    rightCell.classList.add('no-hover');
                                    rightCell.classList.add('empty');
                                }
                            } else if (playerShipsCoordinates.cruiser2Orientation === 'y') {
                                let topCellSelector = '[data-x="'+ Number(posX) +'"][data-y="'+ (Number(posY) - 1) +'"]';
                                let bottomCellSelector = '[data-x="'+ Number(posX) +'"][data-y="'+ (Number(posY) + 3) +'"]';

                                let topCell = playerTable.querySelector(topCellSelector);
                                let bottomCell = playerTable.querySelector(bottomCellSelector);

                                if (topCell !== null && !topCell.classList.contains('empty')) {
                                    topCell.innerHTML = '<span class="z"></span>';
                                    topCell.removeEventListener('click', shoot);
                                    topCell.classList.add('no-hover');
                                    topCell.classList.add('empty');
                                }

                                if (bottomCell !== null && !bottomCell.classList.contains('empty')) {
                                    bottomCell.innerHTML = '<span class="z"></span>';
                                    bottomCell.removeEventListener('click', shoot);
                                    bottomCell.classList.add('no-hover');
                                    bottomCell.classList.add('empty');
                                }
                            }
                        }


                    } else if (playerShipsCoordinates.destroyer1.includes(randomCellX + ',' + randomCellY)) {
                        playerShipsCoordinates.destroyer1Hits++;

                        if (playerShipsCoordinates.destroyer1 === 2) {
                            playerShipsCoordinates.destroyer1Killed = true;

                            let startsFrom = playerShipsCoordinates.destroyer1[0];
                            startsFrom = startsFrom.split(',');

                            let posX = startsFrom[0];
                            let posY = startsFrom[1];

                            if (playerShipsCoordinates.destroyer1Orientation === 'h') {
                                let leftCellSelector = '[data-x="'+ Number(posX - 1) +'"][data-y="'+ Number(posY) +'"]';
                                let rightCellSelector = '[data-x="'+ (Number(posX) + 2) +'"][data-y="'+ Number(posY) +'"]';

                                let leftCell = playerTable.querySelector(leftCellSelector);
                                let rightCell = playerTable.querySelector(rightCellSelector);

                                if (leftCell !== null && !leftCell.classList.contains('empty')) {
                                    leftCell.innerHTML = '<span class="z"></span>';
                                    leftCell.removeEventListener('click', shoot);
                                    leftCell.classList.add('no-hover');
                                    leftCell.classList.add('empty');
                                }

                                if (rightCell !== null && !rightCell.classList.contains('empty')) {
                                    rightCell.innerHTML = '<span class="z"></span>';
                                    rightCell.removeEventListener('click', shoot);
                                    rightCell.classList.add('no-hover');
                                    rightCell.classList.add('empty');
                                }
                            } else if (playerShipsCoordinates.destroyer1Orientation === 'y') {
                                let topCellSelector = '[data-x="'+ Number(posX) +'"][data-y="'+ (Number(posY) - 1) +'"]';
                                let bottomCellSelector = '[data-x="'+ Number(posX) +'"][data-y="'+ (Number(posY) + 2) +'"]';

                                let topCell = playerTable.querySelector(topCellSelector);
                                let bottomCell = playerTable.querySelector(bottomCellSelector);

                                if (topCell !== null && !topCell.classList.contains('empty')) {
                                    topCell.innerHTML = '<span class="z"></span>';
                                    topCell.removeEventListener('click', shoot);
                                    topCell.classList.add('no-hover');
                                    topCell.classList.add('empty');
                                }

                                if (bottomCell !== null && !bottomCell.classList.contains('empty')) {
                                    bottomCell.innerHTML = '<span class="z"></span>';
                                    bottomCell.removeEventListener('click', shoot);
                                    bottomCell.classList.add('no-hover');
                                    bottomCell.classList.add('empty');
                                }
                            }
                        }

                    } else if (playerShipsCoordinates.destroyer2.includes(randomCellX + ',' + randomCellY)) {
                        playerShipsCoordinates.destroyer2Hits++;

                        if (playerShipsCoordinates.destroyer2 === 2) {
                            playerShipsCoordinates.destroyer2Killed = true;

                            let startsFrom = playerShipsCoordinates.destroyer2[0];
                            startsFrom = startsFrom.split(',');

                            let posX = startsFrom[0];
                            let posY = startsFrom[1];

                            if (playerShipsCoordinates.destroyer2Orientation === 'h') {
                                let leftCellSelector = '[data-x="'+ Number(posX - 1) +'"][data-y="'+ Number(posY) +'"]';
                                let rightCellSelector = '[data-x="'+ (Number(posX) + 2) +'"][data-y="'+ Number(posY) +'"]';

                                let leftCell = playerTable.querySelector(leftCellSelector);
                                let rightCell = playerTable.querySelector(rightCellSelector);

                                if (leftCell !== null && !leftCell.classList.contains('empty')) {
                                    leftCell.innerHTML = '<span class="z"></span>';
                                    leftCell.removeEventListener('click', shoot);
                                    leftCell.classList.add('no-hover');
                                    leftCell.classList.add('empty');
                                }

                                if (rightCell !== null && !rightCell.classList.contains('empty')) {
                                    rightCell.innerHTML = '<span class="z"></span>';
                                    rightCell.removeEventListener('click', shoot);
                                    rightCell.classList.add('no-hover');
                                    rightCell.classList.add('empty');
                                }
                            } else if (playerShipsCoordinates.destroyer2Orientation === 'y') {
                                let topCellSelector = '[data-x="'+ Number(posX) +'"][data-y="'+ (Number(posY) - 1) +'"]';
                                let bottomCellSelector = '[data-x="'+ Number(posX) +'"][data-y="'+ (Number(posY) + 2) +'"]';

                                let topCell = playerTable.querySelector(topCellSelector);
                                let bottomCell = playerTable.querySelector(bottomCellSelector);

                                if (topCell !== null && !topCell.classList.contains('empty')) {
                                    topCell.innerHTML = '<span class="z"></span>';
                                    topCell.removeEventListener('click', shoot);
                                    topCell.classList.add('no-hover');
                                    topCell.classList.add('empty');
                                }

                                if (bottomCell !== null && !bottomCell.classList.contains('empty')) {
                                    bottomCell.innerHTML = '<span class="z"></span>';
                                    bottomCell.removeEventListener('click', shoot);
                                    bottomCell.classList.add('no-hover');
                                    bottomCell.classList.add('empty');
                                }
                            }
                        }

                    } else if (playerShipsCoordinates.destroyer3.includes(randomCellX + ',' + randomCellY)) {
                        playerShipsCoordinates.destroyer3Hits++;


                        if (playerShipsCoordinates.destroyer3 === 2) {
                            playerShipsCoordinates.destroyer3Killed = true;

                            let startsFrom = playerShipsCoordinates.destroyer3[0];
                            startsFrom = startsFrom.split(',');

                            let posX = startsFrom[0];
                            let posY = startsFrom[1];

                            if (playerShipsCoordinates.destroyer3Orientation === 'h') {
                                let leftCellSelector = '[data-x="'+ Number(posX - 1) +'"][data-y="'+ Number(posY) +'"]';
                                let rightCellSelector = '[data-x="'+ (Number(posX) + 2) +'"][data-y="'+ Number(posY) +'"]';

                                let leftCell = playerTable.querySelector(leftCellSelector);
                                let rightCell = playerTable.querySelector(rightCellSelector);

                                if (leftCell !== null && !leftCell.classList.contains('empty')) {
                                    leftCell.innerHTML = '<span class="z"></span>';
                                    leftCell.removeEventListener('click', shoot);
                                    leftCell.classList.add('no-hover');
                                    leftCell.classList.add('empty');
                                }

                                if (rightCell !== null && !rightCell.classList.contains('empty')) {
                                    rightCell.innerHTML = '<span class="z"></span>';
                                    rightCell.removeEventListener('click', shoot);
                                    rightCell.classList.add('no-hover');
                                    rightCell.classList.add('empty');
                                }
                            } else if (playerShipsCoordinates.destroyer3Orientation === 'y') {
                                let topCellSelector = '[data-x="'+ Number(posX) +'"][data-y="'+ (Number(posY) - 1) +'"]';
                                let bottomCellSelector = '[data-x="'+ Number(posX) +'"][data-y="'+ (Number(posY) + 2) +'"]';

                                let topCell = playerTable.querySelector(topCellSelector);
                                let bottomCell = playerTable.querySelector(bottomCellSelector);

                                if (topCell !== null && !topCell.classList.contains('empty')) {
                                    topCell.innerHTML = '<span class="z"></span>';
                                    topCell.removeEventListener('click', shoot);
                                    topCell.classList.add('no-hover');
                                    topCell.classList.add('empty');
                                }

                                if (bottomCell !== null && !bottomCell.classList.contains('empty')) {
                                    bottomCell.innerHTML = '<span class="z"></span>';
                                    bottomCell.removeEventListener('click', shoot);
                                    bottomCell.classList.add('no-hover');
                                    bottomCell.classList.add('empty');
                                }
                            }
                        }

                    } else if (playerShipsCoordinates.boat1.includes(randomCellX + ',' + randomCellY)) {
                        playerShipsCoordinates.boat1Killed = true;

                        if (playerShipsCoordinates.boat1 === 2) {
                            playerShipsCoordinates.boat1Killed = true;

                            let startsFrom = playerShipsCoordinates.boat1[0];
                            startsFrom = startsFrom.split(',');

                            let posX = startsFrom[0];
                            let posY = startsFrom[1];

                            let leftCellSelector = '[data-x="'+ Number(posX - 1) +'"][data-y="'+ Number(posY) +'"]';
                            let rightCellSelector = '[data-x="'+ (Number(posX) + 1) +'"][data-y="'+ Number(posY) +'"]';

                            let leftCell = playerTable.querySelector(leftCellSelector);
                            let rightCell = playerTable.querySelector(rightCellSelector);

                            if (leftCell !== null && !leftCell.classList.contains('empty')) {
                                leftCell.innerHTML = '<span class="z"></span>';
                                leftCell.removeEventListener('click', shoot);
                                leftCell.classList.add('no-hover');
                                leftCell.classList.add('empty');
                            }

                            if (rightCell !== null && !rightCell.classList.contains('empty')) {
                                rightCell.innerHTML = '<span class="z"></span>';
                                rightCell.removeEventListener('click', shoot);
                                rightCell.classList.add('no-hover');
                                rightCell.classList.add('empty');
                                }

                        }

                    } else if (playerShipsCoordinates.boat2.includes(randomCellX + ',' + randomCellY)) {
                        playerShipsCoordinates.boatKilled = true;


                        if (playerShipsCoordinates.boat2 === 2) {
                            playerShipsCoordinates.boat2Killed = true;

                            let startsFrom = playerShipsCoordinates.boat2[0];
                            startsFrom = startsFrom.split(',');

                            let posX = startsFrom[0];
                            let posY = startsFrom[1];

                            let leftCellSelector = '[data-x="'+ Number(posX - 1) +'"][data-y="'+ Number(posY) +'"]';
                            let rightCellSelector = '[data-x="'+ (Number(posX) + 1) +'"][data-y="'+ Number(posY) +'"]';

                            let leftCell = playerTable.querySelector(leftCellSelector);
                            let rightCell = playerTable.querySelector(rightCellSelector);

                            if (leftCell !== null && !leftCell.classList.contains('empty')) {
                                leftCell.innerHTML = '<span class="z"></span>';
                                leftCell.removeEventListener('click', shoot);
                                leftCell.classList.add('no-hover');
                                leftCell.classList.add('empty');
                            }

                            if (rightCell !== null && !rightCell.classList.contains('empty')) {
                                rightCell.innerHTML = '<span class="z"></span>';
                                rightCell.removeEventListener('click', shoot);
                                rightCell.classList.add('no-hover');
                                rightCell.classList.add('empty');
                            }

                        }


                    } else if (playerShipsCoordinates.boat3.includes(randomCellX + ',' + randomCellY)) {
                        playerShipsCoordinates.boat3Killed = true;

                        if (playerShipsCoordinates.boat3 === 2) {
                            playerShipsCoordinates.boat3Killed = true;

                            let startsFrom = playerShipsCoordinates.boat3[0];
                            startsFrom = startsFrom.split(',');

                            let posX = startsFrom[0];
                            let posY = startsFrom[1];

                            let leftCellSelector = '[data-x="'+ Number(posX - 1) +'"][data-y="'+ Number(posY) +'"]';
                            let rightCellSelector = '[data-x="'+ (Number(posX) + 1) +'"][data-y="'+ Number(posY) +'"]';

                            let leftCell = playerTable.querySelector(leftCellSelector);
                            let rightCell = playerTable.querySelector(rightCellSelector);

                            if (leftCell !== null && !leftCell.classList.contains('empty')) {
                                leftCell.innerHTML = '<span class="z"></span>';
                                leftCell.removeEventListener('click', shoot);
                                leftCell.classList.add('no-hover');
                                leftCell.classList.add('empty');
                            }

                            if (rightCell !== null && !rightCell.classList.contains('empty')) {
                                rightCell.innerHTML = '<span class="z"></span>';
                                rightCell.removeEventListener('click', shoot);
                                rightCell.classList.add('no-hover');
                                rightCell.classList.add('empty');
                            }

                        }

                    } else if (playerShipsCoordinates.boat4.includes(randomCellX + ',' + randomCellY)) {
                        playerShipsCoordinates.boat4Killed = true;

                        if (playerShipsCoordinates.boat4 === 2) {
                            playerShipsCoordinates.boat4Killed = true;

                            let startsFrom = playerShipsCoordinates.boat4[0];
                            startsFrom = startsFrom.split(',');

                            let posX = startsFrom[0];
                            let posY = startsFrom[1];

                            let leftCellSelector = '[data-x="'+ Number(posX - 1) +'"][data-y="'+ Number(posY) +'"]';
                            let rightCellSelector = '[data-x="'+ (Number(posX) + 1) +'"][data-y="'+ Number(posY) +'"]';

                            let leftCell = playerTable.querySelector(leftCellSelector);
                            let rightCell = playerTable.querySelector(rightCellSelector);

                            if (leftCell !== null && !leftCell.classList.contains('empty')) {
                                leftCell.innerHTML = '<span class="z"></span>';
                                leftCell.removeEventListener('click', shoot);
                                leftCell.classList.add('no-hover');
                                leftCell.classList.add('empty');
                            }

                            if (rightCell !== null && !rightCell.classList.contains('empty')) {
                                rightCell.innerHTML = '<span class="z"></span>';
                                rightCell.removeEventListener('click', shoot);
                                rightCell.classList.add('no-hover');
                                rightCell.classList.add('empty');
                            }

                        }
                    }


                    let topLeftSelector = '[data-x="'+Number(randomCellX - 1)+'"][data-y="'+ Number(randomCellY - 1) +'"]';
                    let topRightSelector = '[data-x="'+Number(randomCellX + 1)+'"][data-y="'+ Number(randomCellY - 1) +'"]';
                    let bottomLeftSelector = '[data-x="'+Number(randomCellX - 1)+'"][data-y="'+ Number(randomCellY + 1) +'"]';
                    let bottomRightSelector = '[data-x="'+Number(randomCellX + 1)+'"][data-y="'+ Number(randomCellY + 1) +'"]';

                    let topLeftEl = playerTable.querySelector(topLeftSelector);
                    let topRightEl = playerTable.querySelector(topRightSelector);
                    let bottomLeftEl = playerTable.querySelector(bottomLeftSelector);
                    let bottomRightEl = playerTable.querySelector(bottomRightSelector);

                    if (topLeftEl !== null) {
                        topLeftEl.innerHTML = '<span class="z"></span>';
                        topLeftEl.removeEventListener('click', shoot);
                        topLeftEl.classList.add('no-hover');
                        topLeftEl.classList.add('empty');
                    }

                    if (topRightEl !== null) {
                        topRightEl.innerHTML = '<span class="z"></span>';
                        topRightEl.removeEventListener('click', shoot);
                        topRightEl.classList.add('no-hover');
                        topRightEl.classList.add('empty');
                    }

                    if (bottomLeftEl !== null) {
                        bottomLeftEl.innerHTML = '<span class="z"></span>';
                        bottomLeftEl.removeEventListener('click', shoot);
                        bottomLeftEl.classList.add('no-hover');
                        bottomLeftEl.classList.add('empty');
                    }

                    if (bottomRightEl !== null) {
                        bottomRightEl.innerHTML = '<span class="z"></span>';
                        bottomRightEl.removeEventListener('click', shoot);
                        bottomRightEl.classList.add('no-hover');
                        bottomRightEl.classList.add('empty');
                    }

                    lastHitCoordinates.x = randomCellX;
                    lastHitCoordinates.y = randomCellY;

                    shotNext = false;
                } else {
                    randomCell.innerHTML = '<span class="z"></span>';
                    randomCell.removeEventListener('click', shoot);
                    randomCell.classList.add('no-hover');
                    randomCell.classList.add('empty');

                    shotNext = false;

                    computerLastFireIsHit = false;
                }

            }

        } while (shotNext);

    }

    else {


    let hitCells = playerTable.querySelectorAll('.hit');
    hitCells.forEach(function (el) {
        let elX = Number(el.getAttribute('data-x'));
        let elY = Number(el.getAttribute('data-y'));

        let elLeftSelector = '[data-x="'+ Number(elX - 1) +'"][data-y="'+ elY +'"]';
        let elRightSelector = '[data-x="'+ Number(elX + 1) +'"][data-y="'+ elY +'"]';

        let elTopSelector = '[data-x="'+ elX +'"][data-y="'+ Number(elY - 1) +'"]';
        let elBottomSelector = '[data-x="'+ elX +'"][data-y="'+ Number(elY + 1) +'"]';

        let elLeftCell = playerTable.querySelector(elLeftSelector);
        let elRightCell = playerTable.querySelector(elRightSelector);
        let elTopCell = playerTable.querySelector(elTopSelector);
        let elBottomCell = playerTable.querySelector(elBottomSelector);

        console.log(elLeftCell);
        console.log(elRightCell);
        console.log(elTopCell);
        console.log(elBottomCell);

        if (elTopCell !== null && !elTopCell.classList.contains('empty') && !elTopCell.classList.contains('hit')) {
            checkNextCell(elTopCell);

        } else if (elRightCell !== null && !elRightCell.classList.contains('empty') && !elRightCell.classList.contains('hit')) {
            checkNextCell(elRightCell);
        } else if (elBottomCell !== null && !elBottomCell.classList.contains('empty') && !elBottomCell.classList.contains('hit')) {
            checkNextCell(elBottomCell);
        } else if (elLeftCell !== null && !elLeftCell.classList.contains('empty') && !elLeftCell.classList.contains('hit')) {
            checkNextCell(elLeftCell);
        }


    });


    do {

        let row = randomIntFromInterval(1, 10);
        let col = randomIntFromInterval(1, 10);

        // let row = 9;
        // let col = 2;


        let selectRow = 'tr:nth-child(' + row + ')';
        let tableRow = playerTable.querySelector(selectRow);

        let selectCol = 'td:nth-child(' + col + ')';


        if (tableRow.querySelector(selectCol).classList.contains('hit')) {
            continue;
        }

        if (tableRow.querySelector(selectCol).classList.contains('empty')) {
            continue;
        }


        if (!tableRow.querySelector(selectCol).classList.contains('filled')) {
            tableRow.querySelector(selectCol).innerHTML = '<span class="z"></span>';
            tableRow.querySelector(selectCol).removeEventListener('click', shoot);
            tableRow.querySelector(selectCol).classList.add('no-hover');
            tableRow.querySelector(selectCol).classList.add('empty');

            isShot = false;
        } else {
            tableRow.querySelector(selectCol).classList.add('hit');
            tableRow.querySelector(selectCol).innerHTML = '<span class="x"></span>';
            tableRow.querySelector(selectCol).removeEventListener('click', shoot);
            tableRow.querySelector(selectCol).classList.add('no-hover');

            if (playerShipsCoordinates.battleship.includes(col + ',' + row)) {
                playerShipsCoordinates.battleshipHits++;
            }

            let aboveRowSelector = 'tr:nth-child(' + Number(row - 1) + ')';
            let belowRowSelector = 'tr:nth-child(' + Number(row + 1) + ')';
            let rightColSelector = 'td:nth-child(' + Number(col + 1) + ')';
            let leftColSelector = 'td:nth-child(' + Number(col - 1) + ')';

            let aboveRow = playerTable.querySelector(aboveRowSelector);
            let belowRow = playerTable.querySelector(belowRowSelector);

            let leftTopCellCheck, rightTopCellCheck, leftBottomCellCheck, rightBottomCellCheck;

            if (aboveRow !== null) {
                leftTopCellCheck = aboveRow.querySelector(leftColSelector);
                rightTopCellCheck = aboveRow.querySelector(rightColSelector);
            } else {
                leftTopCellCheck = null;
                rightTopCellCheck = null;
            }

            if (belowRow !== null) {
                leftBottomCellCheck = belowRow.querySelector(leftColSelector);
                rightBottomCellCheck = belowRow.querySelector(rightColSelector);
            } else {
                leftBottomCellCheck = null;
                rightBottomCellCheck = null;
            }




            if (leftTopCellCheck !== null && !leftTopCellCheck.classList.contains('empty')) {
                leftTopCellCheck.innerHTML = '<span class="z"></span>';
                leftTopCellCheck.removeEventListener('click', shoot);
                leftTopCellCheck.classList.add('no-hover');
                leftTopCellCheck.classList.add('empty');
            }

            if (rightTopCellCheck !== null && !rightTopCellCheck.classList.contains('empty')) {
                rightTopCellCheck.innerHTML = '<span class="z"></span>';
                rightTopCellCheck.removeEventListener('click', shoot);
                rightTopCellCheck.classList.add('no-hover');
                rightTopCellCheck.classList.add('empty');
            }

            if (leftBottomCellCheck !== null && !leftBottomCellCheck.classList.contains('empty')) {
                leftBottomCellCheck.innerHTML = '<span class="z"></span>';
                leftBottomCellCheck.removeEventListener('click', shoot);
                leftBottomCellCheck.classList.add('no-hover');
                leftBottomCellCheck.classList.add('empty');
            }

            if (rightBottomCellCheck !== null && !rightBottomCellCheck.classList.contains('empty')) {
                rightBottomCellCheck.innerHTML = '<span class="z"></span>';
                rightBottomCellCheck.removeEventListener('click', shoot);
                rightBottomCellCheck.classList.add('no-hover');
                rightBottomCellCheck.classList.add('empty');
            }

            computerLastFireIsHit = true;
            lastHitCoordinates.x = col;
            lastHitCoordinates.y = row;


            isShot = false;
        }

    } while (isShot);

    }

    if (playerShipsCoordinates.battleshipKilled && playerShipsCoordinates.cruiser1Killed && playerShipsCoordinates.cruiser2Killed
        && playerShipsCoordinates.destroyer1Killed && playerShipsCoordinates.destroyer2Killed && playerShipsCoordinates.destroyer3Killed
        && playerShipsCoordinates.boat1Killed && playerShipsCoordinates.boat2Killed && playerShipsCoordinates.boat3Killed && playerShipsCoordinates.boat4Killed) {

        alert('Game over. You won!')
    }


}

function checkNextCell(cell) {

    let cellToHit = cell;

    if (!cellToHit.classList.contains('filled')) {
        cellToHit.innerHTML = '<span class="z"></span>';
        cellToHit.removeEventListener('click', shoot);
        cellToHit.classList.add('no-hover');
        cellToHit.classList.add('empty');

        isShot = false;
    } else {
        cellToHit.classList.add('hit');
        cellToHit.innerHTML = '<span class="x"></span>';
        cellToHit.removeEventListener('click', shoot);
        cellToHit.classList.add('no-hover');

        let cellToHitX = Number(cellToHit.getAttribute('data-x'));
        let cellToHitY = Number(cellToHit.getAttribute('data-y'));

        if (playerShipsCoordinates.battleship.includes(cellToHitX + ',' + cellToHitY)) {
            playerShipsCoordinates.battleshipHits++;
        }

        let topLeftSelector = '[data-x="'+Number(cellToHitX - 1)+'"][data-y="'+ Number(cellToHitY - 1) +'"]';
        let topRightSelector = '[data-x="'+Number(cellToHitX + 1)+'"][data-y="'+ Number(cellToHitY - 1) +'"]';
        let bottomLeftSelector = '[data-x="'+Number(cellToHitX - 1)+'"][data-y="'+ Number(cellToHitY + 1) +'"]';
        let bottomRightSelector = '[data-x="'+Number(cellToHitX + 1)+'"][data-y="'+ Number(cellToHitY + 1) +'"]';

        let topLeftEl = playerTable.querySelector(topLeftSelector);
        let topRightEl = playerTable.querySelector(topRightSelector);
        let bottomLeftEl = playerTable.querySelector(bottomLeftSelector);
        let bottomRightEl = playerTable.querySelector(bottomRightSelector);

        if (topLeftEl !== null) {
            topLeftEl.innerHTML = '<span class="z"></span>';
            topLeftEl.removeEventListener('click', shoot);
            topLeftEl.classList.add('no-hover');
            topLeftEl.classList.add('empty');
        }

        if (topRightEl !== null) {
            topRightEl.innerHTML = '<span class="z"></span>';
            topRightEl.removeEventListener('click', shoot);
            topRightEl.classList.add('no-hover');
            topRightEl.classList.add('empty');
        }

        if (bottomLeftEl !== null) {
            bottomLeftEl.innerHTML = '<span class="z"></span>';
            bottomLeftEl.removeEventListener('click', shoot);
            bottomLeftEl.classList.add('no-hover');
            bottomLeftEl.classList.add('empty');
        }

        if (bottomRightEl !== null) {
            bottomRightEl.innerHTML = '<span class="z"></span>';
            bottomRightEl.removeEventListener('click', shoot);
            bottomRightEl.classList.add('no-hover');
            bottomRightEl.classList.add('empty');
        }

        lastHitCoordinates.x = cellToHitX;
        lastHitCoordinates.y = cellToHitY;
    }
}


let shootComp = document.querySelector('#shoot_comp');
shootComp.addEventListener('click', function () {
    computerFire();
});