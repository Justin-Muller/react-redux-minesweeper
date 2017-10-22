/**
 * Returns which flagged locations were not mines.
 * @function incorrectListReducer
 * @param {object} state
 * @param {Number} state.columnLength
 * @param {Array}  state.flaggedList
 * @param {Array}  state.mineList
 * @param {Number} state.rowLength
 * @returns {object}
 */
const incorrectListReducer = (state) => {
    const { columnLength, flaggedList, mineList, rowLength } = state;
    const boardSize = columnLength  * rowLength;
    const incorrectList = (new Array(boardSize)).fill(false);

    for (let id = 0; id < boardSize; id++) {
        let flagged = flaggedList[id];
        let mine = mineList[id];
        if (flagged && !mine) {
            incorrectList[id] = true;
        }
    }

    return {
        ...state,
        incorrectList
    };
};

export default incorrectListReducer;
