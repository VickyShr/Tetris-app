import theme from "./theme";

export const BLOCK_DELTA_SPEED = 30;
export const BLOCK_LIMITED_SPEED = 30;

export const WIDTH_GRID = 10;
export const HEIGHT_GRID = 20;

export const INITIAL_SPEED = 500;
export const DELTA_SPEED = 200;
export const MIN_SPEED = 100;

export const SQUARE_COLOR = theme.style.board;

export const PIVOT_POINT = [0, Math.ceil(WIDTH_GRID / 2) - 1];

export const NEXT_BLOCK_WIDTTH = 5;
export const NEXT_BLOCK_HEIGHT = 4;

// 鍵值對照表 ： https://www.yiwuku.com/javascript-keycode.html
export const ARROW_DOWN = 40
export const ARROW_LEFT = 37;
export const ARROW_RIGHT = 39;
export const ARROW_SPACE = 32;
export const TRANSITION_KEY1 = 38;

export const BLOCKS_MAP = {
    iBlock: {
        color: theme.style.blocks.iBlockColor,
        blockFill: [[[1, 0], [-1, 0], [-2, 0]],
        [[0, -1], [0, 1], [0, 2]],
        [[-1, 0], [1, 0], [2, 0]],
        [[0, -1], [0, -2], [0, 1]]],
        transPosCheck: [[[0, -1], [1, -1], [-2, 1], [-2, 2], [-1, 1], [-1, 2], [0, 1], [0, 2]],
        [[-1, -1], [-1, 0], [1, 0], [2, 0], [1, 1], [1, 2], [2, 1], [2, 2]],
        [[-1, 1], [0, 1], [0, -2], [0, -1], [1, -2], [1, -1], [2, -2], [2, -1]],
        [[1, 0], [1, 1], [-2, -2], [-1, -2], [-2, -1], [-1, -1], [-2, 0], [-1, 0]]]
    },
    jBlock: {
        color: theme.style.blocks.jBlockColor,
        blockFill: [[[0, -1], [-1, -1], [0, 1]],
        [[-1, 0], [-1, 1], [1, 0]],
        [[0, -1], [1, 1], [0, 1]],
        [[-1, 0], [1, 0], [1, -1]]],
        transPosCheck: [[[-1, 0], [-1, 1], [1, 0], [1, 1]],
        [[0, -1], [1, -1], [0, 1], [1, 1]],
        [[-1, -1], [-1, 0], [1, -1], [1, 0]],
        [[-1, -1], [0, -1], [-1, 1], [0, 1]]]
    },
    lBlock: {
        color: theme.style.blocks.lBlockColor,
        blockFill: [[[0, -1], [0, 1], [-1, 1]],
        [[-1, 0], [1, 0], [1, 1]],
        [[0, -1], [0, 1], [1, -1]],
        [[-1, 0], [1, 0], [-1, -1]]],
        transPosCheck: [[[-1, -1], [-1, 0], [1, 0], [1, 1]],
        [[0, -1], [1, -1], [-1, 1], [0, 1]],
        [[-1, -1], [-1, 0], [1, 0], [1, 1]],
        [[0, -1], [1, -1], [-1, 1], [0, 1]]]
    },
    oBlock: {
        color: theme.style.blocks.oBlockColor,
        blockFill: [[[0, 1], [-1, 0], [-1, 1]],
        [[0, 1], [-1, 0], [-1, 1]],
        [[0, 1], [-1, 0], [-1, 1]],
        [[0, 1], [-1, 0], [-1, 1]]],
        transPosCheck: [[[0, 0]], [[0, 0]], [[0, 0]], [[0, 0]]]
    },
    sBlock: {
        color: theme.style.blocks.sBlockColor,
        blockFill: [[[0, -1], [-1, 0], [-1, 1]],
        [[-1, 0], [0, 1], [1, 1]],
        [[1, 0], [1, -1], [0, 1]],
        [[0, -1], [-1, -1], [1, 0]]],
        transPosCheck: [[[-1, -1], [0, 1], [1, 1]],
        [[1, -1], [1, 0], [-1, 1]],
        [[-1, -1], [0, -1], [1, 1]],
        [[-1, 0], [-1, 1], [1, -1]]]
    },
    zBlock: {
        color: theme.style.blocks.zBlockColor,
        blockFill: [[[-1, 0], [-1, -1], [0, 1]],
        [[1, 0], [0, 1], [-1, 1]],
        [[0, -1], [1, 0], [1, 1]],
        [[-1, 0], [0, -1], [1, -1]]],
        transPosCheck: [[[-1, 1], [1, 1], [1, 0]],
        [[0, -1], [1, -1], [1, 1]],
        [[-1, -1], [-1, 0], [1, -1]],
        [[-1, -1], [-1, 1], [0, 1]]]
    },
    tBlock: {
        color: theme.style.blocks.tBlockColor,
        blockFill: [[[0, 1], [0, -1], [-1, 0]],
        [[-1, 0], [1, 0], [0, 1]],
        [[0, -1], [1, 0], [0, 1]],
        [[-1, 0], [1, 0], [0, -1]]],
        transPosCheck: [[[-1, -1], [-1, 1], [1, 0], [1, 1]],
        [[0, -1], [1, -1], [1, 1], [-1, 1]],
        [[-1, -1], [-1, 0], [1, -1], [1, 1]],
        [[-1, -1], [1, -1], [-1, 1], [0, 1]]]
    },
}

