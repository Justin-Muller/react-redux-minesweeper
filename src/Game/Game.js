import React, { Component } from 'react';
import Tile from '../Tile/Tile';
import GameOverConfirm from '../GameOverConfirm/GameOverConfirm';

/**
 * Game helpers
 */

//TODO - Move these functions into reducers

/**
 * Checks whether the game is won based on whether all tiles that don't contain a mine have been revealed.
 * @function checkWinCondition
 * @param {Number} mineLength
 * @param {Array} visibleList
 * @returns {Boolean}
 */
function checkWinCondition({mineLength, visibleList}) {
    const invisibleLength = visibleList.reduce(function (accumulator, currentValue) {
        if (!currentValue) {
            return accumulator + 1;
        }
        return accumulator;
    }, 0);

    if (invisibleLength === mineLength) {
        return true;
    }

    return false;
}

/**
 * Returns which flagged locations were not mines.
 * @function getIncorrectList
 * @param {Number} boardSize
 * @param {Array} flaggedList
 * @param {Array} mineList
 * @returns {Array}
 */
function getIncorrectList({boardSize, flaggedList, mineList}) {
    const incorrectList = (new Array(boardSize)).fill(false);

    for (let cellIndex = 0; cellIndex < boardSize; cellIndex++) {
        let flagged = flaggedList[cellIndex];
        let mine = mineList[cellIndex];
        if (flagged && !mine) {
            incorrectList[cellIndex] = true;
        }
    }

    return incorrectList;
}

/**
 * Returns the initial state of the game.
 * @function getInitState
 * @param {Object} props
 * @param {Number} props.columnLength - How many tiles along the X axis the playing area is.
 * @param {Number} props.rowLength - How many tiles along the Y axis the playing area is.
 * @param {Number} props.tileSize - How big the are tiles in pixels.
 * @returns {Object}
 */
function getInitState({columnLength, rowLength, tileSize}) {
    const boardSize = columnLength * rowLength;

    const flaggedList = (new Array(boardSize)).fill(false);
    const incorrectList = (new Array(boardSize)).fill(false);
    const markedList = (new Array(boardSize)).fill(false);
    const mineList = (new Array(boardSize)).fill(false);
    const valueList = (new Array(boardSize)).fill(0);
    const visibleList = (new Array(boardSize)).fill(false);

    return {
        flaggedList,
        gameOver: false,
        incorrectList,
        initialised: false,
        markedList,
        mineList,
        showGameOverMessage: false,
        tileSize,
        valueList,
        visibleList,
        win: false
    };
}

/**
 * Returns the start state of the game.
 * @function getStartState
 * @param {Object} props
 * @param {Number} props.columnLength - How many tiles along the X axis the playing area is.
 * @param {Array}  props.flaggedList
 * @param {Array}  props.markedList
 * @param {Number} props.mineLength - How many mines to generate within the playing area.
 * @param {Number} props.rowLength - How many tiles along the Y axis the playing area is.
 * @param {Number} props.startCell - The first tile to be clicked on the board.
 * @param {Array}  props.visibleList
 * @returns {Object}
 */
function getStartState({columnLength, flaggedList, markedList, mineLength, rowLength, startCell, visibleList}) {
    const boardSize = columnLength * rowLength;
    const mineList = getMineList({boardSize, startCell, mineLength});
    const valueList = getValueList({boardSize, columnLength, mineList});
    const newVisibleList = getVisibleList({boardSize, cellIndex: startCell, columnLength, flaggedList, markedList, valueList, visibleList});

    return {
        initialised: true,
        mineList,
        valueList,
        visibleList: newVisibleList
    };
}

/**
 * Calculates new visibility based on the cell index revealed and the value it contains.
 * @function getVisibleList
 * @param {Number} boardSize
 * @param {Number} cellIndex
 * @param {Number} columnLength
 * @param {Array} flaggedList
 * @param {Array} markedList
 * @param {Array} valueList
 * @param {Array} visibleList
 * @returns {Array}
 */
function getVisibleList({boardSize, cellIndex, columnLength, flaggedList, markedList, valueList, visibleList}) {
    let newVisibleList = visibleList.slice(0);
    newVisibleList[cellIndex] = true;

    newVisibleList = revealEmptyArea({boardSize, cellIndex, columnLength, flaggedList, markedList, valueList, visibleList: newVisibleList});

    return newVisibleList;
}

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
 * Initialises the mines that will be used on the board.
 * @function getMineList
 * @param {Object}  props
 * @param {Number}  props.boardSize - The total board area (columns * rows)
 * @param {Number}  props.columnLength - How many tiles along the X axis the playing area is.
 * @param {Number}  props.mineLength - How many mines to generate within the playing area.
 * @param {Number}  props.startCell - Optional variable which is used to be the first tile to be clicked on the board.
 * @param {Number}  props.rowLength - How many tiles along the Y axis the playing area is.
 * @returns {Array}
 */
function getMineList({boardSize, columnLength, mineLength, startCell, rowLength}) {
    if (mineLength > (boardSize - 1)) {
        throw new Error('Cannot have more mines than tiles on the board.');
    }

    let mineList = (new Array(boardSize)).fill(false);
    let possibleMines = [];

    for (let i = 0; i < boardSize; i++) {
        if (i === startCell) {
            continue;
        }
        possibleMines.push(i);
    }

    for (let i = 0; i < mineLength; i++) {
        let minePosition = Math.floor(Math.random() * possibleMines.length);
        let mineIndex = possibleMines.splice(minePosition, 1)[0];
        mineList[mineIndex] = true;
    }

    return mineList;
}

/**
 * Initialises the numeric values for each tile that represent how many mines are surrounding the tile.
 * @function getValueList
 * @param {Object} props
 * @param {Number} props.boardSize - The total board area (columns * rows)
 * @param {Number} props.columnLength - How many tiles along the X axis the playing area is.
 * @param {Array}  props.mineList - Array of mine positions.
 * @param {Number} props.rowLength - How many tiles along the Y axis the playing area is.
 * @param {Array}  props.valueList
 * @returns {Array}
 */
function getValueList({boardSize, columnLength, mineList, rowLength}) {
    let valueList = new Array(boardSize);
    valueList.fill(0);

    for (let minePosition = 0; minePosition < mineList.length; minePosition++) {
        let mine = mineList[minePosition];
        if (mine) {
            valueList = incrementValuesAroundMine({boardSize, columnLength, minePosition, rowLength, valueList});
        }
    }

    return valueList;
}

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
 * Reveals all mines on the map.
 * @function revealMines
 * @param {Array} mineList
 * @param {Array} visibleList
 * @returns {Array}
 */
function revealMines({mineList, visibleList}) {
    const newVisibleList = visibleList.slice(0);

    for (let minePosition = 0; minePosition < mineList.length; minePosition++) {
        let mine = mineList[minePosition];
        if (mine) {
            newVisibleList[minePosition] = true;
        }
    }

    return newVisibleList;
}

/**
 * Reveals all flags that should be placed when the game is won.
 * @function revealFlags
 * @param {Array} flaggedList
 * @param {Array} mineList
 * @param {Array} visibleList
 * @returns {Object}
 */
function revealFlags({flaggedList, mineList, visibleList}) {
    const newFlaggedList = flaggedList.slice(0),
        newVisibleList = visibleList.slice(0);

    for (let cellIndex = 0; cellIndex < mineList.length; cellIndex++) {
        let mine = mineList[cellIndex];
        if (mine) {
            newFlaggedList[cellIndex] = true;
            newVisibleList[cellIndex] = true;
        }
    }

    return {
        flaggedList: newFlaggedList,
        visibleList: newVisibleList
    };
}

/**
 * @component Game
 * @param {Object} props
 * @param {Number} [props.columnLength=8] - How many tiles along the X axis the playing area is.
 * @param {Number} [props.mineLength=20] - How many mines to generate within the playing area.
 * @param {Number} [props.rowLength=13] - How many tiles along the Y axis the playing area is.
 * @param {Number} [props.tileSize=44] - How big the are tiles in pixels.
 * @returns {DOMElement}
 */
export default class Game extends Component {
    constructor({columnLength=8, mineLength=20, rowLength=13, tileSize=44}) {
        console.log('columnLength:', columnLength);

        const props = {columnLength, mineLength, rowLength, tileSize};
        super(props);
        this.state = getInitState(props);
    }

    /**
     * @method handleGameOverConfirm
     */
    handleGameOverConfirm() {
        this.restart();
    }

    /**
     * @method handleTileMouseDown
     * @param {Object} event
     * @param {Number} cellIndex
     */
    handleTileMouseDown(event, cellIndex) {
        //TODO: test windows
        //ignore right click
        if (event.nativeEvent && event.nativeEvent.which > 1) {
            return;
        }

        if (this.state.gameOver) {
            return;
        }

        //short delay to allow for tapping on a touch device to reveal tile.
        let longClickTimerStart = setTimeout(() => {
            if (longClickTimerStart) {
                //if held for longer, treated as a long click - letting go wont reveal tile.
                let longClickTimerEnd = setTimeout(() => {
                    if (longClickTimerEnd) {
                        this.handleTileAltClick(cellIndex);
                    }
                }, 200);
                //TODO ^-- Make this time configurable in the settings menu later...

                this.setState({
                    longClickTimerEnd: longClickTimerEnd
                });
            }
        }, 300);
        //TODO ^-- Make this time configurable in the settings menu later...

        this.setState({
            longClickTimerStart: longClickTimerStart
        });
    }

    /**
     * @method handleTileMouseUp
     * @param {Object} event
     * @param {Number} cellIndex
     */
    handleTileMouseUp(event, cellIndex) {
        if (this.state.gameOver) {
            return this.setState({
                showGameOverMessage: true
            });
        }

        //TODO: test windows
        //ignore right click
        if (event.nativeEvent && event.nativeEvent.which > 1) {
            return;
        }

        if (this.state.longClickTimerStart) {
            clearTimeout(this.state.longClickTimerStart);
        }

        if (this.state.longClickTimerEnd) {
            clearTimeout(this.state.longClickTimerEnd);
        } else {
            this.handleTileClick(cellIndex);
        }

        this.setState({
            longClickTimerStart: false,
            longClickTimerEnd: false
        });
    }

    /**
     * @method handleTileAltClick
     * @param {Number} cellIndex
     */
    handleTileAltClick(cellIndex) {
        const flaggedList = this.state.flaggedList.slice(0);
        const markedList = this.state.markedList.slice(0);
        const visible = this.state.visibleList[cellIndex];

        let flagged = flaggedList[cellIndex];
        let marked = markedList[cellIndex];

        if (this.state.gameOver || visible) {
            return;
        }

        flagged = !(flagged || marked);
        marked = false;

        flaggedList[cellIndex] = flagged;
        markedList[cellIndex] = marked;

        this.setState({
            flaggedList,
            markedList
        });
    }

    /**
     * @method handleTileClick
     * @param {Object} cellIndex
     */
    handleTileClick(cellIndex) {
        if (!this.state.initialised) {
            return this.startGame(cellIndex);
        }

        let visibleList = this.state.visibleList.slice(0);
        let visible = visibleList[cellIndex];

        if (visible) {
            return;
        }

        const columnLength = this.props.columnLength;
        const rowLength = this.props.rowLength;
        const boardSize = columnLength * rowLength;
        const markedList = this.state.markedList.slice(0);
        const mineLength = this.props.mineLength;
        const mineList = this.state.mineList.slice(0);
        const valueList = this.state.valueList.slice(0);

        let flaggedList = this.state.flaggedList.slice(0);
        let flagged = flaggedList[cellIndex];
        let incorrectList = this.state.incorrectList.slice(0);
        let marked = markedList[cellIndex];
        let mine = mineList[cellIndex];
        let value = valueList[cellIndex];

        let gameOver = false;
        let showGameOverMessage = false;
        let win = false;

        if (flagged) {
            flagged = false;
            marked = true;
        } else if (marked) {
            flagged = true;
            marked = false;
        } else {
            visible = true;
        }

        if (visible) {
            if (mine) {
                gameOver = true;
                showGameOverMessage = true;
                visibleList = revealMines({mineList, visibleList});
                incorrectList = getIncorrectList({boardSize, flaggedList, mineList});
            } else if (value === 0) {
                visibleList = revealEmptyArea({boardSize, columnLength, cellIndex, columnLength, flaggedList, markedList, rowLength, valueList, visibleList});
            }
        }

        flaggedList[cellIndex] = flagged;
        markedList[cellIndex] = marked;
        visibleList[cellIndex] = visible;

        if (!gameOver && checkWinCondition({mineLength, visibleList})) {
            gameOver = true;
            win = true;
            showGameOverMessage = true;
            let revealFlagsObj = revealFlags({
                flaggedList,
                mineList,
                visibleList
            });

            flaggedList = revealFlagsObj.flaggedList;
            visibleList = revealFlagsObj.visibleList;
        }

        this.setState({
            flaggedList,
            gameOver,
            incorrectList,
            markedList,
            showGameOverMessage,
            visibleList,
            win
        });
    }

    /**
     * @method render
     */
    render() {
        const style = {
            width: this.props.tileSize * this.props.columnLength + 'px'
        };
        let rows = [];

        for (let rowIndex = 0; rowIndex < this.props.rowLength; rowIndex++) {
            let tiles = [];

            for (let columnIndex = 0; columnIndex < this.props.columnLength; columnIndex++) {
                let cellIndex = columnIndex + (rowIndex * this.props.columnLength);
                let tile = (
                    <Tile
                        disabled={this.state.gameOver}
                        flagged={this.state.flaggedList[cellIndex]}
                        incorrect={this.state.incorrectList[cellIndex]}
                        marked={this.state.markedList[cellIndex]}
                        mine={this.state.mineList[cellIndex]}
                        onMouseDown={(event) => this.handleTileMouseDown(event, cellIndex)}
                        onMouseUp={(event) => this.handleTileMouseUp(event, cellIndex)}
                        onRightClick={() => this.handleTileAltClick(cellIndex)}
                        tileSize={this.props.tileSize}
                        value={this.state.valueList[cellIndex]}
                        visible={this.state.visibleList[cellIndex]}
                    />);

                tiles.push(tile);
            }

            let row = <div className="row">{tiles}</div>;
            rows.push(row);
        }

        return (
            <div className="viewport">
                <div className="board" style={style}>
                    {rows}
                </div>
                <GameOverConfirm show={this.state.showGameOverMessage}
                                 win={this.state.win}
                                 onConfirm={() => this.handleGameOverConfirm()} />
            </div>
        );
    }

    /**
     * @method restart
     */
    restart() {
        this.setState(getInitState(this.props));
    }

    /**
     * @method startGame
     * @param {Number} startCell
     */
    startGame(startCell) {
        let {columnLength, mineLength, rowLength} = this.props;
        let {flaggedList, markedList, visibleList} = this.state;
        let startState = getStartState({columnLength, flaggedList, markedList, mineLength, rowLength, startCell, visibleList});
        this.setState(startState);
    }
};
