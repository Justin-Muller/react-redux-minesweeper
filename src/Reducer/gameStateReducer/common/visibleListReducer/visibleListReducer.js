//TODO - Do we need to convert revealEmptyArea to a reducer?

/**
 * Reveals an empty tile and all adjacent empty tiles until it reaches the edge of values.
 * Note: Mutating passed in array to save on performance. This function is recursive.
 * @function revealEmptyArea
 * @param {Number} boardSize
 * @param {Number} columnLength
 * @param {Number} tileIndex
 * @param {Array} flaggedList
 * @param {Array} markedList
 * @param {Array} valueList
 * @param {Array} visibleList
 * @returns {Array}
 */
function revealEmptyArea({boardSize, tileIndex, columnLength, flaggedList, markedList, valueList, visibleList}) {
    visibleList[tileIndex] = true;

    if (valueList[tileIndex]) {
        return visibleList;
    }

    const wallToTop = tileIndex < columnLength;
    const wallToLeft = tileIndex % columnLength === 0;
    const wallToRight = tileIndex % columnLength === (columnLength - 1);
    const wallToBottom = tileIndex >= boardSize - columnLength;

    const topLeftTile = tileIndex - columnLength - 1;
    const topTile = tileIndex - columnLength;
    const topRightTile = tileIndex - columnLength + 1;
    const leftTile = tileIndex - 1;
    const rightTile = tileIndex + 1;
    const bottomLeftTile = tileIndex + columnLength - 1;
    const bottomTile = tileIndex + columnLength;
    const bottomRightTile = tileIndex + columnLength + 1;

    //TODO - think of a simpler way to calculate this state. Perhaps bit-wise operations?

    //top row
    if (!wallToTop) {
        //top left
        if (!wallToLeft && !visibleList[topLeftTile] && !flaggedList[topLeftTile] && !markedList[topLeftTile]) {
            visibleList = revealEmptyArea({boardSize, columnLength, tileIndex: topLeftTile, flaggedList, markedList, valueList, visibleList});
        }

        //top
        if (!visibleList[topTile] && !flaggedList[topTile] && !markedList[topTile]) {
            visibleList = revealEmptyArea({boardSize, columnLength, tileIndex: topTile, flaggedList, markedList, valueList, visibleList});
        }


        //top right
        if (!wallToRight && !visibleList[topRightTile] && !flaggedList[topRightTile] && !markedList[topRightTile]) {
            visibleList = revealEmptyArea({boardSize, columnLength, tileIndex: topRightTile, flaggedList, markedList, valueList, visibleList});
        }
    }

    //left
    if (!wallToLeft && !visibleList[leftTile] && !flaggedList[leftTile] && !markedList[leftTile]) {
        visibleList = revealEmptyArea({boardSize, columnLength, tileIndex: leftTile, flaggedList, markedList, valueList, visibleList});
    }

    //right
    if (!wallToRight && !visibleList[rightTile] && !flaggedList[rightTile] && !markedList[rightTile]) {
        visibleList = revealEmptyArea({boardSize, columnLength, tileIndex: rightTile, flaggedList, markedList, valueList, visibleList});
    }

    //bottom row
    if (!wallToBottom) {
        //bottom left
        if (!wallToLeft && !visibleList[bottomLeftTile] && !flaggedList[bottomLeftTile] && !markedList[bottomLeftTile]) {
            visibleList = revealEmptyArea({boardSize, columnLength, tileIndex: bottomLeftTile, flaggedList, markedList, valueList, visibleList});
        }

        //bottom
        if (!visibleList[bottomTile] && !flaggedList[bottomTile] && !markedList[bottomTile]) {
            visibleList = revealEmptyArea({boardSize, columnLength, tileIndex: bottomTile, flaggedList, markedList, valueList, visibleList});
        }

        //bottom right
        if (!wallToRight && !visibleList[bottomRightTile] && !flaggedList[bottomRightTile] && !markedList[bottomRightTile]) {
            visibleList = revealEmptyArea({boardSize, columnLength, tileIndex: bottomRightTile, flaggedList, markedList, valueList, visibleList});
        }
    }

    return visibleList;
}

/**
 * @reducer visibleListReducer
 * @param {object} state
 * @param {object} action
 * @returns {object}
 */
export const visibleListReducer = (state, action) => {
    const {columnLength, flaggedList, markedList, rowLength, valueList} = state;
    const {tileIndex} = action;
    const boardSize = columnLength * rowLength;

    let visibleList = state.visibleList.slice(0);
    visibleList[tileIndex] = true;

    visibleList = revealEmptyArea({boardSize, tileIndex, columnLength, flaggedList, markedList, valueList, visibleList});

    return {...state, visibleList};
};
