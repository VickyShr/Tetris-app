import React from 'react';
import styled from 'styled-components';
import AllNextBlocks from './AllNextBlocks';
import PauseButton from './PauseButton';
import KeyDescribe from './KeyDescribe';

const SideBarWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.sideBackground} ;
    border-radius: 30px 0px 0px 30px;
    padding: 10px ;
    // revised
    flex: 3 1 0;
    border: 3px solid red;
    
`

function SideBar({ blocks, handlePause, isPause, isGameStart }) {
    return (
        <SideBarWrapper>
            <AllNextBlocks blocks={blocks} />
            <PauseButton
                handlePause={handlePause}
                isPause={isPause}
                isGameStart={isGameStart}
            />
            <KeyDescribe></KeyDescribe>
        </SideBarWrapper>
    );
}

export default SideBar;