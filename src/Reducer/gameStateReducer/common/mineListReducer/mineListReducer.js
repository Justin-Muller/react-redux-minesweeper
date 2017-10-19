/**
 * @reducer mineListReducer - Initialises the mines that will be used on the board.
 * @param {object} state
 * @param {object} action
 * @param {number} action.tileIndex - variable which is used to be the first tile to be clicked on the board.
 * @param {string} action.type
 * @returns {object}
 */
export const mineListReducer = (state = {}, action= {}) => {
    const {tileIndex} = action;
    const {columnLength, mineLength, rowLength} = state;
    const boardSize = columnLength  * rowLength;

    if (mineLength > (boardSize - 1)) {
        throw new Error('Cannot have more mines than tiles on the board.');
    }

    const mineList = (new Array(boardSize)).fill(false);
    let possibleMines = [];

    for (let i = 0; i < boardSize; i++) {
        if (i === tileIndex) {
            continue;
        }
        possibleMines.push(i);
    }

    for (let i = 0; i < mineLength; i++) {
        let minePosition = Math.floor(Math.random() * possibleMines.length);
        let mineIndex = possibleMines.splice(minePosition, 1)[0];
        mineList[mineIndex] = true;
    }

    return {...state, mineList};
};
