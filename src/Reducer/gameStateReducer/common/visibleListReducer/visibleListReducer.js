//TODO - Do we need to convert revealEmptyArea to a reducer?

/**
 * Reveals an empty cell and all adjacent empty cells until it reaches the edge of values.
 * Note: Mutating passed in array to save on performance. This function is recursive.
 * @function revealEmptyArea
 * @param {Number} boardSize
 * @param {Number} cellIndex
 * @param {Array} flaggedList
 * @param {Array} markedList
 * @param {Array} valueList
 * @param {Array} visibleList
 * @returns {Array}
 */
function revealEmptyArea({boardSize, cellIndex, columnLength, flaggedList, markedList, valueList, visibleList}) {
    visibleList[cellIndex] = true;

    if (valueList[cellIndex]) {
        return visibleList;
    }

    const wallToTop = cellIndex < columnLength;
    const wallToLeft = cellIndex % columnLength === 0;
    const wallToRight = cellIndex % columnLength === (columnLength - 1);
    const wallToBottom = cellIndex >= boardSize - columnLength;

    const topLeftCell = cellIndex - columnLength - 1;
    const topCell = cellIndex - columnLength;
    const topRightCell = cellIndex - columnLength + 1;
    const leftCell = cellIndex - 1;
    const rightCell = cellIndex + 1;
    const bottomLeftCell = cellIndex + columnLength - 1;
    const bottomCell = cellIndex + columnLength;
    const bottomRightCell = cellIndex + columnLength + 1;

    //TODO - think of a simpler way to calculate this state. Perhaps bit-wise operations?

    //top row
    if (!wallToTop) {
        //top left
        if (!wallToLeft && !visibleList[topLeftCell] && !flaggedList[topLeftCell] && !markedList[topLeftCell]) {
            visibleList = revealEmptyArea({boardSize, columnLength, cellIndex: topLeftCell, flaggedList, markedList, valueList, visibleList});
        }

        //top
        if (!visibleList[topCell] && !flaggedList[topCell] && !markedList[topCell]) {
            visibleList = revealEmptyArea({boardSize, columnLength, cellIndex: topCell, flaggedList, markedList, valueList, visibleList});
        }


        //top right
        if (!wallToRight && !visibleList[topRightCell] && !flaggedList[topRightCell] && !markedList[topRightCell]) {
            visibleList = revealEmptyArea({boardSize, columnLength, cellIndex: topRightCell, flaggedList, markedList, valueList, visibleList});
        }
    }

    //left
    if (!wallToLeft && !visibleList[leftCell] && !flaggedList[leftCell] && !markedList[leftCell]) {
        visibleList = revealEmptyArea({boardSize, columnLength, cellIndex: leftCell, flaggedList, markedList, valueList, visibleList});
    }

    //right
    if (!wallToRight && !visibleList[rightCell] && !flaggedList[rightCell] && !markedList[rightCell]) {
        visibleList = revealEmptyArea({boardSize, columnLength, cellIndex: rightCell, flaggedList, markedList, valueList, visibleList});
    }

    //bottom row
    if (!wallToBottom) {
        //bottom left
        if (!wallToLeft && !visibleList[bottomLeftCell] && !flaggedList[bottomLeftCell] && !markedList[bottomLeftCell]) {
            visibleList = revealEmptyArea({boardSize, columnLength, cellIndex: bottomLeftCell, flaggedList, markedList, valueList, visibleList});
        }

        //bottom
        if (!visibleList[bottomCell] && !flaggedList[bottomCell] && !markedList[bottomCell]) {
            visibleList = revealEmptyArea({boardSize, columnLength, cellIndex: bottomCell, flaggedList, markedList, valueList, visibleList});
        }

        //bottom right
        if (!wallToRight && !visibleList[bottomRightCell] && !flaggedList[bottomRightCell] && !markedList[bottomRightCell]) {
            visibleList = revealEmptyArea({boardSize, columnLength, cellIndex: bottomRightCell, flaggedList, markedList, valueList, visibleList});
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

    //TODO - Make naming consistent with cellIndex vs. tileIndex.
    //TODO - Could potentially convert reveal empty area to a reducer.
    visibleList = revealEmptyArea({boardSize, cellIndex: tileIndex, columnLength, flaggedList, markedList, valueList, visibleList});

    return {...state, visibleList};
};
