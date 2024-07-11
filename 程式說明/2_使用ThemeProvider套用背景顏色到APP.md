## 使用ThemeProvider套用背景顏色到APP

為了方便以後的顏色管理，或是能夠快速地切換關燈模式，將遊戲用到的各種顏色定義到一個map，再用ThemeProvider傳到元件中：

 ```JS
/* 
./theme.js 
*/
const defaultStyle = {
    titleFont: "#FFCBB3",
    board: "#8E8E8E",
    background: "#00E3E3",
    sideBackground: "#00E3E3",
    startButtonFont: "#FF5809",
    startButtonColor: "#D2E9FF",
    startButtonBorder: "#ffffff",
    startHoverColor: "#272727",
    startHoverFont: "#FFD700",
    pauseButtonBackground: "#272727",
    pauseButtonFont: "#FF5809",
    pauseHoverColor: "#FFD700",
    pauseHoverFont: "#3C3C3C",
    nextBlockBoard: "#3a506b",
    keyDescribeBoard: "#3a506b",
    blocks: {
        iBlockColor: "#00FFFF",
        jBlockColor: "#007FFF",
        lBlockColor: "#00FF99",
        oBlockColor: "#DC143C",
        sBlockColor: "#FF77FF",
        zBlockColor: "#D94600",
        tBlockColor: "#EDF962",
    },
};

export default {
    style: defaultStyle
};
```



```JS
/* 
./App.js 
*/
import { ThemeProvider } from 'styled-components';
import themes from './theme';

function App() {
  return (
    <ThemeProvider theme={themes["style"]}>

    </ThemeProvider>
  )
}
```