import React from 'react';
import styled from 'styled-components';



const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: thick double  ${props => props.theme.pauseButtonFont};
    border-radius: 5px;
    background-color: ${props => props.theme.pauseButtonBackground};
    color: ${props => props.theme.pauseButtonFont};
    width: 80%;
    height: 8%;
    font-size: 15px;
    padding: 5px 25px; 
    margin-top: 12px;
    cursor: pointer;
    
    &:hover {
    color: ${props => props.theme.pauseHoverColor};
    background-color: ${props => props.theme.pauseHoverFont};
    transition: all 0.1s ease-in-out;
    }
`

function PauseButton({ handlePause, isPause, isGameStart }) {
    return (
        <Button onClick={handlePause}>
            {isGameStart && isPause ? "Continue" : "Pause"}
        </Button>
    );
}

export default PauseButton;