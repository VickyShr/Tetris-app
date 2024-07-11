import React from 'react';
import styled from 'styled-components';
import Title from './Title';
import PlayBoard from './PlayBoard';
import StartButton from './StartButton';


const MainBoardWrapper = styled.div`
    position: relative;
    padding: 10px ;
    background-color: ${(props) => props.theme.background};
    display: flex;
    flex-direction:  column;
    justify-content: center;
    align-items: center;
    height: 100%;
    flex: 7 1 0;
  
`


function MainBoard({ score, gridColor, currentBlock, isGameStart, handleGameStart }) {
    return (
        <MainBoardWrapper>
            <Title score={score} />
            <PlayBoard gridColor={gridColor} currentBlock={currentBlock} />

            {
                !isGameStart && <StartButton handleGameStart={handleGameStart} />
            }
        </MainBoardWrapper>
    );
}

export default MainBoard;