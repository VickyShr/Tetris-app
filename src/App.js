import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import themes from './theme';
import MainBoard from './components/MainBoard';
import SideBar from './components/Sidebar'
import {
  WIDTH_GRID,
  HEIGHT_GRID,
  INITIAL_SPEED,
  DELTA_SPEED,
  MIN_SPEED,
  BLOCKS_MAP,
  SQUARE_COLOR,
  PIVOT_POINT,
  TRANSITION_KEY1,
  ARROW_SPACE,
  ARROW_DOWN,
  ARROW_RIGHT,
  ARROW_LEFT,
} from './constants';
import { produceNextBlock } from './components/Sidebar/AllNextBlocks/ProduceNextBlock';
import { isTouchBottom, handleBottomCollision, changeMoveDirection, handleTransition, straightDownToBottom } from './controlBlock';
import background from "./images/tetris.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  height: 100vh;
  background-image: url(${background});
  background-repeat: repeat-x;
  background-size: 28%;
  background-position: 0% 85%;
  background-color: rgba(237, 242,244, .9);



  // revised
  @media (max-width: 700px) {
    background-color: red;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: min(90vh, 155vw);
  /* height: 90vh; */
  width: min(67vh, 95%);
  /* width: 67vh; */
  /* max-width: 500px; */
`



function App() {
  const defaultBlock = {
    curBlock: null,
    color: null,
    blockFill: null,
    transitionLevel: 0,
    pivotPoint: PIVOT_POINT,
  }

  let defaultGridColor = Array(HEIGHT_GRID).fill(0).map(() => Array(WIDTH_GRID).fill(SQUARE_COLOR));
  const [gridColor, setGridColor] = useState(defaultGridColor);
  const [nextBlocks, setNextBlocks] = useState([])
  const [isGameStart, setGameStart] = useState(false);
  const [isPause, setGamePause] = useState(false);
  const [currentBlock, setCurrentBlock] = useState(defaultBlock);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isNewBlock, setIsNewBlock] = useState(0);

  useEffect(() => {
    if (!isGameStart) {
      return;
    }

    setCurrentBlock(() => {
      let curBlock = produceNextBlock(nextBlocks, setNextBlocks);
      let { color, blockFill } = BLOCKS_MAP[curBlock];

      return {
        ...defaultBlock,
        curBlock: curBlock,
        blockFill: blockFill,
        color: color,
      }
    })

  }, [isNewBlock, isGameStart])


  useEffect(() => {
    if (!isGameStart || isPause) {
      return;
    }

    const blockIntervalId = setInterval(() => {
      setCurrentBlock((prevBlock) => {
        let newPivot = [prevBlock.pivotPoint[0] + 1, prevBlock.pivotPoint[1]];
        let blockFill = prevBlock["blockFill"][prevBlock.transitionLevel];

        let fillSections = blockFill.map(([x, y]) => [parseInt(x) + newPivot[0], parseInt(y) + newPivot[1]])
        fillSections.push(newPivot);

        let collision = isTouchBottom(fillSections, gridColor);

        if (collision) {
          let { clearLevels, newGridColor, gameover } = handleBottomCollision(fillSections, gridColor, prevBlock.color);
          let newScore = score + clearLevels

          setGridColor(newGridColor);
          setScore(newScore);
          setSpeed(() => {
            let newSpeed = INITIAL_SPEED - Math.floor(newScore / 5) * DELTA_SPEED;
            newSpeed = Math.max(MIN_SPEED, newSpeed);

            return newSpeed;
          })
          setIsNewBlock(prev => prev + 1);
          setGameStart(!gameover);

          return prevBlock;
        }

        return {
          ...prevBlock,
          pivotPoint: newPivot,
        }
      })
    }, speed);

    return (() => { clearInterval(blockIntervalId) });
  }, [isGameStart, isPause, isNewBlock]);

  const handleKeyDown = useCallback((event) => {
    const { keyCode } = event;

    event.preventDefault();

    setCurrentBlock((prevBlock) => {
      let { transitionLevel, pivotPoint } = prevBlock;

      switch (keyCode) {
        case ARROW_DOWN:
        case ARROW_LEFT:
        case ARROW_RIGHT:
          pivotPoint = changeMoveDirection(keyCode, prevBlock, gridColor) || pivotPoint;
          break;
        case ARROW_SPACE:
          pivotPoint = straightDownToBottom(prevBlock, gridColor) || pivotPoint;
          break;
        case TRANSITION_KEY1:
          [transitionLevel, pivotPoint] = handleTransition(prevBlock, gridColor);
          break;
      }

      return {
        ...prevBlock,
        pivotPoint: pivotPoint,
        transitionLevel: transitionLevel
      };
    });
  }, [currentBlock]);


  useEffect(() => {
    if (!isGameStart || isPause) {
      return;
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }

  }, [handleKeyDown, isPause])

  const handleGameStart = () => {
    setGridColor(defaultGridColor);
    setNextBlocks([])
    setCurrentBlock(defaultBlock);
    setScore(0);
    setGameStart(true);
    setSpeed(INITIAL_SPEED);
    setIsNewBlock(0);
  }

  const handlePause = () => {
    setGamePause((prev) => !prev);
  }

  return (
    <ThemeProvider theme={themes["style"]}>
      <Container>
        <Wrapper>
          <SideBar
            blocks={nextBlocks}
            handlePause={handlePause}
            isPause={isPause}
            isGameStart={isGameStart}
          />
          <MainBoard
            score={score}
            gridColor={gridColor}
            currentBlock={currentBlock}
            isGameStart={isGameStart}
            handleGameStart={handleGameStart}
          />
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
