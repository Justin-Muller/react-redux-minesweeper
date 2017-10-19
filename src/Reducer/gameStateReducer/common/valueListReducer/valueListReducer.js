//TODO - Do we need to convert incrementValuesAroundMine to a reducer?

/**
 * Returns a new values array by copying from the one passed in to correctly generate the values that are positioned around the board for each mine.
 * @function incrementValuesAroundMine
 * @param {Object} props
 * @param {Number} props.boardSize - The total board area (columns * rows).
 * @param {Number} props.columnLength - How many tiles along the X axis the playing area is.
 * @param {Array}  props.minePosition - The mine to increment values around.
 * @param {Number} props.rowLength - How many tiles along the Y axis the playing area is.
 * @param {Array}  props.valueList - The numeric values for each tile on the board.
 * @returns {Array}
 */
function incrementValuesAroundMine({boardSize, columnLength, minePosition, rowLength, valueList}) {
    const newValueList = valueList.slice(0);  //make a copy of the array.
    const wallToTop = minePosition < columnLength;
    const wallToLeft = minePosition % columnLength === 0;
    const wallToRight = minePosition % columnLength === (columnLength - 1);
    const wallToBottom = minePosition >= boardSize - columnLength;

    //TODO - think of a simpler way to calculate this state. Perhaps bit-wise operations?

    //top row
    if (!wallToTop) {
        //top left
        if (!wallToLeft) {
            newValueList[minePosition - columnLength - 1]++;
        }

        //top
        newValueList[minePosition - columnLength]++;

        //top right
        if (!wallToRight) {
            newValueList[minePosition - columnLength + 1]++;
        }
    }

    //left
    if (!wallToLeft) {
        newValueList[minePosition - 1]++;
    }

    //right
    if (!wallToRight) {
        newValueList[minePosition + 1]++;
    }

    //bottom row
    if (!wallToBottom) {
        //bottom left
        if (!wallToLeft) {
            newValueList[minePosition + columnLength - 1]++;
        }

        //bottom
        newValueList[minePosition + columnLength]++;

        //bottom right
        if (!wallToRight) {
            newValueList[minePosition + columnLength + 1]++;
        }
    }

    return newValueList;
}

/**
 * @reducer valueListReducer - Initialises the numeric values for each tile that represent how many mines are surrounding the tile.
 * @param {object} state
 * @param {object} action
 * @returns {object}
 */
export const valueListReducer = (state, action) => {
    const { columnLength, mineList, rowLength } = state;
    const boardSize = columnLength  * rowLength;
    let valueList = (new Array(boardSize)).fill(0);

    for (let minePosition = 0; minePosition < mineList.length; minePosition++) {
        let mine = mineList[minePosition];
        if (mine) {
            //TODO - Should try to recursively call same function instead of calling helper function?
            valueList = incrementValuesAroundMine({boardSize, columnLength, minePosition, rowLength, valueList});
        }
    }

    return {...state, valueList};
};
