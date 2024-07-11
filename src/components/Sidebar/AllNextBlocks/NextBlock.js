import React from 'react';
import styled from 'styled-components';
import { BLOCKS_MAP, NEXT_BLOCK_HEIGHT, NEXT_BLOCK_WIDTTH } from '../../../constants';

const Blocks = styled.div`
    width: 90%;
    height: 100%;
    display: grid;
    grid-template-rows: repeat(${NEXT_BLOCK_HEIGHT}, 1fr);
    grid-template-columns: repeat(${NEXT_BLOCK_WIDTTH}, 1fr);
    grid-gap: 1.2px;
    margin-bottom: 10px;

    &:nth-child(1) {
        margin-top: 10px;
    }
`
const BlockSquare = styled.div`
    background-color: ${(props) => props.color ? props.color : props.theme.nextBlockBoard};
`

function NextBlock({ block }) {
    const blockRow = Array(NEXT_BLOCK_HEIGHT).fill(0).map((_, index) => index);
    const blockColumn = Array(NEXT_BLOCK_WIDTTH).fill(0).map((_, index) => index);
    const pivotPoint = [2, 2]
    let boardColor = null;
    let fillBlocks = null;
    let fillColor = null;

    if (block) {
        let blockData = BLOCKS_MAP[block];
        let blockFill = blockData['blockFill'][0];

        fillBlocks = blockFill.map(([x, y]) => [x + pivotPoint[0], y + pivotPoint[1]]);
        fillBlocks.push(pivotPoint);

        fillColor = blockData['color']
    }

    return (
        <Blocks>
            {
                blockRow.map((row) => blockColumn.map((column) => {
                    let isFillBlock = false;

                    if (fillBlocks !== null) {
                        isFillBlock = fillBlocks.find(([x, y]) => {
                            return (row === x && column === y)
                        });
                    }

                    boardColor = isFillBlock ? fillColor : null;

                    return (
                        <BlockSquare key={`${row}_${column}`} color={boardColor}></BlockSquare>
                    )
                }))
            }
        </Blocks>
    )
}

export default NextBlock;