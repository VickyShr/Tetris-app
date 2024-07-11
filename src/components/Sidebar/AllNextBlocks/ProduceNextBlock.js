import { BLOCKS_MAP } from "../../../constants";

function randomBlock(blocks) {
    const allBlocksName = Object.keys(BLOCKS_MAP);
    let pos = parseInt(Math.random() * 7);

    if (blocks.indexOf(allBlocksName[pos]) !== -1) {
        pos = parseInt(Math.random() * 7);
    }

    blocks.push(allBlocksName[pos]);

    return;
}

export function produceNextBlock(nextBlocks, setNextBlocks) {
    let newNextBlocks = [...nextBlocks];
    let newBlock = null;

    while (newNextBlocks.length < 3) {
        randomBlock(newNextBlocks)
    }

    newBlock = newNextBlocks.shift();
    randomBlock(newNextBlocks);

    setNextBlocks(newNextBlocks);

    return newBlock;
}