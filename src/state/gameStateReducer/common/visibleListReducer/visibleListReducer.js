
/**
 * Reveals an empty tile and all adjacent empty tiles until it reaches the edge of values.
 * Note: Mutating passed in array to save on performance. This function is recursive.
 * @function revealEmptyArea
 * @param {Number} state.boardSize
 * @param {Number} state.columnLength
 * @param {Array}  state.flaggedList
 * @param {Array}  state.markedList
 * @param {Array}  state.valueList
 * @param {Array}  state.visibleList
 * @param {Number} id
 * @returns {Array}
 */
const revealEmptyArea = (state, id) => {
    const { columnLength, flaggedList, markedList, rowLength, valueList } = state;
    const boardSize = columnLength * rowLength;
    let { visibleList } = state;
    visibleList[id] = true;

    if (valueList[id]) {
        return visibleList;
    }

    const wallToTop = id < columnLength;
    const wallToLeft = id % columnLength === 0;
    const wallToRight = id % columnLength === (columnLength - 1);
    const wallToBottom = id >= boardSize - columnLength;

    const topLeftTile = id - columnLength - 1;
    const topTile = id - columnLength;
    const topRightTile = id - columnLength + 1;
    const leftTile = id - 1;
    const rightTile = id + 1;
    const bottomLeftTile = id + columnLength - 1;
    const bottomTile = id + columnLength;
    const bottomRightTile = id + columnLength + 1;

    //TODO - think of a simpler way to calculate this state. Perhaps bit-wise operations?

    //top row
    if (!wallToTop) {
        //top left
        if (!wallToLeft && !visibleList[topLeftTile] && !flaggedList[topLeftTile] && !markedList[topLeftTile]) {
            visibleList = revealEmptyArea(state, topLeftTile);
        }

        //top
        if (!visibleList[topTile] && !flaggedList[topTile] && !markedList[topTile]) {
            visibleList = revealEmptyArea(state, topTile);
        }


        //top right
        if (!wallToRight && !visibleList[topRightTile] && !flaggedList[topRightTile] && !markedList[topRightTile]) {
            visibleList = revealEmptyArea(state, topRightTile);
        }
    }

    //left
    if (!wallToLeft && !visibleList[leftTile] && !flaggedList[leftTile] && !markedList[leftTile]) {
        visibleList = revealEmptyArea(state, leftTile);
    }

    //right
    if (!wallToRight && !visibleList[rightTile] && !flaggedList[rightTile] && !markedList[rightTile]) {
        visibleList = revealEmptyArea(state, rightTile);
    }

    //bottom row
    if (!wallToBottom) {
        //bottom left
        if (!wallToLeft && !visibleList[bottomLeftTile] && !flaggedList[bottomLeftTile] && !markedList[bottomLeftTile]) {
            visibleList = revealEmptyArea(state, bottomLeftTile);
        }

        //bottom
        if (!visibleList[bottomTile] && !flaggedList[bottomTile] && !markedList[bottomTile]) {
            visibleList = revealEmptyArea(state, bottomTile);
        }

        //bottom right
        if (!wallToRight && !visibleList[bottomRightTile] && !flaggedList[bottomRightTile] && !markedList[bottomRightTile]) {
            visibleList = revealEmptyArea(state, bottomRightTile);
        }
    }

    return visibleList;
};


/**
 * Reveals all mines on the map.
 * @function revealMines
 * @param {object} state
 * @param {Array}  state.mineList
 * @param {Array}  state.visibleList
 * @returns {Array}
 */
const revealMines = (state) => {
    const { mineList, visibleList } = state;

    for (let minePosition = 0; minePosition < mineList.length; minePosition++) {
        let mine = mineList[minePosition];
        if (mine) {
            visibleList[minePosition] = true;
        }
    }

    return visibleList;
};


/**
 * @reducer visibleListReducer
 * @param {object} state
 * @param {object} action
 * @returns {object}
 */
const visibleListReducer = (state, action) => {
    const { mineList } = state;
    const { id } = action;
    const mine = mineList[id];

    let visibleList = state.visibleList.slice(0);
    visibleList[id] = true;

    //check if was a mine - reveal mines.
    if (mine) {
        visibleList = revealMines({ ...state, visibleList });
    } else {
        visibleList = revealEmptyArea({ ...state, visibleList }, id);
    }

    return { ...state, visibleList };
};

export default visibleListReducer;