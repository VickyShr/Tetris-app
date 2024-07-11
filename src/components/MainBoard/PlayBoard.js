import React from 'react';
import styled from 'styled-components';
import { HEIGHT_GRID, WIDTH_GRID } from '../../constants';

const GridContainer = styled.div`
    // revised
    /* width: ${(WIDTH_GRID / HEIGHT_GRID) * 80}vh; */
    height: calc(100% - 30px);
    width: 100%;
    

    display: grid;
    grid-template-rows: repeat(${HEIGHT_GRID}, 1fr);
    grid-template-columns: repeat(${WIDTH_GRID}, 1fr);
    margin: 10px 10px 10px 0px;
`

const Square = styled.div`
    background-color: ${(props) => props.color};
    border: solid 1px ${(props) => props.theme.squareBorder};
`


function PlayBoard({ gridColor, currentBlock }) {
    const squaresRow = Array(HEIGHT_GRID).fill(0).map((_, index) => index);
    const squareColumn = Array(WIDTH_GRID).fill(0).map((_, index) => index);

    let { pivotPoint, blockFill, transitionLevel } = currentBlock;
    let fillSections = [];

    if (blockFill) {
        blockFill = blockFill[transitionLevel]
        fillSections = blockFill.map(([x, y]) => [parseInt(x) + pivotPoint[0], parseInt(y) + pivotPoint[1]])
        fillSections.push(pivotPoint);
    }

    return (
        <GridContainer>
            {
                squaresRow.map((row) => squareColumn.map((column) => {
                    const isBlockFill = fillSections.find(([x, y]) => x === row && y === column);
                    const color = isBlockFill ? currentBlock.color : gridColor[row][column];

                    return (
                        <Square key={`${row}_${column}`} color={color} />
                    )
                }))
            }
        </GridContainer>
    );
}

export default PlayBoard;