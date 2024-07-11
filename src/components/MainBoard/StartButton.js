import styled from "styled-components";

const Mask = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: center;
    justify-content: center;
`

const Button = styled.button`
    border: 2px solid ${props => props.theme.startButtonBorder};;
    color: 	${props => props.theme.StartButtonFont};
    background-color: 	${props => props.theme.startButtonColor};
    border-radius: 50px;
    font-size: 30px;
    padding: 5px 25px; 
    cursor: pointer;

    &:hover {
    color:${props => props.theme.startHoverFont};
    background-color: ${props => props.theme.startHoverColor};
    transition: all 0.1s ease-in-out;
    }
`

function StartButton({ handleGameStart }) {
    return (
        <Mask>
            <Button onClick={handleGameStart}>
                Start
            </Button>

        </Mask>
    )
}

export default StartButton;