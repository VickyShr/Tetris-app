import React from 'react';
import styled from 'styled-components';
import NextBlock from './NextBlock';

const NextBlocksWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    height: 45%;
    background-color: ${(props) => props.theme.nextBlockBoard};
    width: 80%;
    border-radius: 15px 5px 5px 5px;
    padding: 5px;
`


function AllNextBlocks({ blocks }) {
    let nextBlocksNum = 3;
    let nextBlockArr = Array(nextBlocksNum).fill(0).map((_, index) => index);

    return (
        <NextBlocksWrapper>
            {
                nextBlockArr.map((index) => {
                    let block = blocks.legth !== 0 ? blocks[index] : null;
                    return <NextBlock key={index} block={block} />
                })
            }
        </NextBlocksWrapper>
    );
}

export default AllNextBlocks;