import {
    WIDTH_GRID,
    HEIGHT_GRID,
    BLOCKS_MAP,
    SQUARE_COLOR,
    ARROW_DOWN,
    ARROW_LEFT,
    ARROW_RIGHT,
} from './constants';


export function isTouchBottom(fillSections, gridColor) {
    let collision = fillSections.find(([x, y]) => {
        if (x < 0) {
            return false;
        }
        return (x >= HEIGHT_GRID) || (gridColor[x][y] !== SQUARE_COLOR);
    })

    return collision;
}

export function isTouchLeftOrRight(fillSections, gridColor) {
    let collision = fillSections.find(([x, y]) => {
        if (x < 0) {
            return false;
        }

        return (y < 0) || (y >= WIDTH_GRID) || (gridColor[x][y] !== SQUARE_COLOR);
    })

    return collision;
}



function isGameOver(fillSections) {
    let gameOver = fillSections.find(([x, y]) => {
        return x < 0;
    })

    return gameOver;
}


function handleSameLevelBlocks(fillSections, fillColor, gridColor) {
    let levels = null;
    let retainLevels = Array(gridColor.length).fill(true);
    let clearLevels = 0;
    let topZeroLevels = null;
    let newGridColor = [];

    levels = new Set(fillSections.map(([x, y]) => x));
    levels = Array.from(levels);
    levels.forEach((i) => {
        if (i < 0) {
            return;
        }

        let isRetain = gridColor[i].find((eachBox) => eachBox === SQUARE_COLOR);
        if (!isRetain) {
            retainLevels[i] = false;
            clearLevels++;
        }
    })

    if (!clearLevels) {
        newGridColor = gridColor;
        return ({ fillSections, clearLevels, newGridColor });
    }

    for (let i = 0; i < gridColor.length; i++) {
        retainLevels[i] && newGridColor.push(gridColor[i]);
    }

    topZeroLevels = Array(clearLevels).fill(0).map(() => Array(gridColor[0].length).fill(SQUARE_COLOR));
    newGridColor = topZeroLevels.concat(newGridColor);

    fillSections = fillSections.map(([x, y]) => {
        if (x >= 0) return [x, y];

        x += clearLevels
        newGridColor[x][y] = x >= 0 ? fillColor : newGridColor[x][y];

        return [x, y];
    })

    return ({ fillSections, clearLevels, newGridColor });
}

export function handleBottomCollision(fillSections, gridColor, fillColor) {
    let clearLevels = null;
    let gameover = null;
    let newGridColor = gridColor.map((row) => [...row]);

    fillSections = fillSections.map(([x, y]) => {
        return [x - 1, y];
    })

    for (let i = 0; i < fillSections.length; i++) {
        let [x, y] = [fillSections[i][0], fillSections[i][1]];
        if (x >= 0) {
            newGridColor[x][y] = fillColor;
        }
    }

    let res = handleSameLevelBlocks(fillSections, fillColor, newGridColor);
    fillSections = res["fillSections"];
    clearLevels = res["clearLevels"];
    newGridColor = res["newGridColor"];

    gameover = isGameOver(fillSections);

    return { clearLevels, newGridColor, gameover };
}

function isTransCollision(currentBlock, gridColor) {
    let collision = null, transCheckSections = null;;
    let curPivot = [...currentBlock.pivotPoint];
    let { transPosCheck, blockFill } = BLOCKS_MAP[currentBlock.curBlock];
    let minY = 0, maxY = WIDTH_GRID - 1;


    transPosCheck = transPosCheck[currentBlock.transitionLevel];
    transCheckSections = transPosCheck.map(([x, y]) => [x + curPivot[0], y + curPivot[1]]);

    transCheckSections.forEach(([x, y]) => minY = y < minY ? y : minY);
    transCheckSections.forEach(([x, y]) => maxY = y > maxY ? y : maxY);

    curPivot[1] = minY < 0 ? curPivot[1] - minY : curPivot[1];
    curPivot[1] = maxY > WIDTH_GRID - 1 ? curPivot[1] - (maxY - WIDTH_GRID + 1) : curPivot[1];

    if (curPivot[1] !== currentBlock.pivotPoint[1]) {
        let checkPos = null;

        blockFill = blockFill[currentBlock.transitionLevel]
        checkPos = blockFill.concat(transPosCheck);

        transCheckSections = checkPos.map(([x, y]) => [x + curPivot[0], y + curPivot[1]]);
        transCheckSections.push(curPivot);
    }

    collision = isTouchBottom(transCheckSections, gridColor) || isTouchLeftOrRight(transCheckSections, gridColor);
    curPivot = collision ? currentBlock.pivotPoint : curPivot;

    return [collision, curPivot]
}

export const handleTransition = (currentBlock, gridColor) => {
    let [isCollision, curPivot] = isTransCollision(currentBlock, gridColor);
    let curLevel = currentBlock.transitionLevel;
    curLevel = isCollision ? curLevel : (curLevel + 1) % 4;

    return [curLevel, curPivot];
}


export const changeMoveDirection = (keyCode, currentBlock, gridColor) => {
    let newfillSections = [];
    let directionChange = [];
    let newPivot = [...currentBlock["pivotPoint"]];
    let blockFill = currentBlock["blockFill"][currentBlock.transitionLevel];

    switch (keyCode) {
        case ARROW_LEFT:
        case ARROW_RIGHT:
            directionChange[0] = 0;
            directionChange[1] = keyCode === ARROW_LEFT ? -1 : 1;
            break;
        case ARROW_DOWN:
            directionChange[0] = 1;
            directionChange[1] = 0;
            break;
        default:
            return;
    }

    newPivot[0] += directionChange[0];
    newPivot[1] += directionChange[1];

    newfillSections = blockFill.map(([x, y]) => [parseInt(x) + newPivot[0], parseInt(y) + newPivot[1]])
    newfillSections.push(newPivot);

    if (isTouchBottom(newfillSections, gridColor)) {
        return;
    }

    if (isTouchLeftOrRight(newfillSections, gridColor)) {
        return;
    }

    return newPivot;
}


export const straightDownToBottom = (currentBlock, gridColor) => {
    const newPivot = [...currentBlock["pivotPoint"]];
    const blockFill = currentBlock["blockFill"][currentBlock.transitionLevel];
    let newfillSections = blockFill.map(([x, y]) => [parseInt(x) + newPivot[0], parseInt(y) + newPivot[1]]);
    newfillSections.push(newPivot);

    while (!isTouchBottom(newfillSections, gridColor)) {
        newPivot[0]++;
        newfillSections = blockFill.map(([x, y]) => [parseInt(x) + newPivot[0], parseInt(y) + newPivot[1]]);
        newfillSections.push(newPivot);
    }

    newPivot[0]--;

    return newPivot;
}