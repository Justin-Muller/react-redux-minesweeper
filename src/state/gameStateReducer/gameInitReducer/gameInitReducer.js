/**
 * @reducer gameInitReducer - Resets the board to its init state.
 * @param {object} state - The previous state before the action has occurred.
 * @param {number} state.columnLength - How many tiles along the X axis the playing area is.
 * @param {Number} state.rowLength - How many tiles along the Y axis the playing area is.
 * @returns {object}
 */
const gameInitReducer = (state) => {
    const { columnLength, rowLength } = state;
    const boardSize = columnLength * rowLength;

    return {
        ...state,
        flaggedList: (new Array(boardSize)).fill(false),
        gameOver: false,
        incorrectList: (new Array(boardSize)).fill(false),
        initialised: false,
        mouseDownTargetId: -1,
        markedList: (new Array(boardSize)).fill(false),
        mineList: (new Array(boardSize)).fill(false),
        showGameOverMessage: false,
        valueList: (new Array(boardSize)).fill(0),
        visibleList: (new Array(boardSize)).fill(false),
        win: false
    };
};

export default gameInitReducer;