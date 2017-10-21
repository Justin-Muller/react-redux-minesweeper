import './../TileList/Game.css';
import React, { Component } from 'react';
import TileListContainer from '../../container/TileListContainer/TileListContainer';
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

    for (let tileIndex = 0; tileIndex < boardSize; tileIndex++) {
        let flagged = flaggedList[tileIndex];
        let mine = mineList[tileIndex];
        if (flagged && !mine) {
            incorrectList[tileIndex] = true;
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
 * @param {Number} props.startTile - The first tile to be clicked on the board.
 * @param {Array}  props.visibleList
 * @returns {Object}
 */
function getStartState({columnLength, flaggedList, markedList, mineLength, rowLength, startTile, visibleList}) {
    const boardSize = columnLength * rowLength;
    const mineList = getMineList({boardSize, startTile, mineLength});
    const valueList = getValueList({boardSize, columnLength, mineList});
    const newVisibleList = getVisibleList({boardSize, tileIndex: startTile, columnLength, flaggedList, markedList, valueList, visibleList});

    return {
        initialised: true,
        mineList,
        valueList,
        visibleList: newVisibleList
    };
}

/**
 * Calculates new visibility based on the tile index revealed and the value it contains.
 * @function getVisibleList
 * @param {Number} boardSize
 * @param {Number} tileIndex
 * @param {Number} columnLength
 * @param {Array} flaggedList
 * @param {Array} markedList
 * @param {Array} valueList
 * @param {Array} visibleList
 * @returns {Array}
 */
function getVisibleList({boardSize, tileIndex, columnLength, flaggedList, markedList, valueList, visibleList}) {
    let newVisibleList = visibleList.slice(0);
    newVisibleList[tileIndex] = true;

    newVisibleList = revealEmptyArea({boardSize, tileIndex, columnLength, flaggedList, markedList, valueList, visibleList: newVisibleList});

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
 * @param {Number}  props.startTile - Optional variable which is used to be the first tile to be clicked on the board.
 * @param {Number}  props.rowLength - How many tiles along the Y axis the playing area is.
 * @returns {Array}
 */
function getMineList({boardSize, columnLength, mineLength, startTile, rowLength}) {
    if (mineLength > (boardSize - 1)) {
        throw new Error('Cannot have more mines than tiles on the board.');
    }

    let mineList = (new Array(boardSize)).fill(false);
    let possibleMines = [];

    for (let i = 0; i < boardSize; i++) {
        if (i === startTile) {
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
 * Reveals an empty tile and all adjacent empty tiles until it reaches the edge of values.
 * Note: Mutating passed in array to save on performance. This function is recursive.
 * @function revealEmptyArea
 * @param {Number} boardSize
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

    for (let tileIndex = 0; tileIndex < mineList.length; tileIndex++) {
        let mine = mineList[tileIndex];
        if (mine) {
            newFlaggedList[tileIndex] = true;
            newVisibleList[tileIndex] = true;
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
 * @param {Number} [props.columnLength] - How many tiles along the X axis the playing area is.
 * @param {Number} [props.mineLength] - How many mines to generate within the playing area.
 * @param {Number} [props.rowLength] - How many tiles along the Y axis the playing area is.
 * @param {Number} [props.tileSize] - How big the are tiles in pixels.
 * @returns {DOMElement}
 */
export default class Game extends Component {
    constructor(props) {
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
     * @param {Number} tileIndex
     */
    handleTileMouseDown(event, tileIndex) {
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
                        this.handleTileAltClick(tileIndex);
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
     * @param {Number} tileIndex
     */
    handleTileMouseUp(event, tileIndex) {
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
            this.handleTileClick(tileIndex);
        }

        this.setState({
            longClickTimerStart: false,
            longClickTimerEnd: false
        });
    }

    /**
     * @method handleTileAltClick
     * @param {Number} tileIndex
     */
    handleTileAltClick(tileIndex) {
        const flaggedList = this.state.flaggedList.slice(0);
        const markedList = this.state.markedList.slice(0);
        const visible = this.state.visibleList[tileIndex];

        let flagged = flaggedList[tileIndex];
        let marked = markedList[tileIndex];

        if (this.state.gameOver || visible) {
            return;
        }

        flagged = !(flagged || marked);
        marked = false;

        flaggedList[tileIndex] = flagged;
        markedList[tileIndex] = marked;

        this.setState({
            flaggedList,
            markedList
        });
    }

    /**
     * @method handleTileClick
     * @param {Object} tileIndex
     */
    handleTileClick(tileIndex) {
        if (!this.state.initialised) {
            return this.startGame(tileIndex);
        }

        let visibleList = this.state.visibleList.slice(0);
        let visible = visibleList[tileIndex];

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
        let flagged = flaggedList[tileIndex];
        let incorrectList = this.state.incorrectList.slice(0);
        let marked = markedList[tileIndex];
        let mine = mineList[tileIndex];
        let value = valueList[tileIndex];

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
                visibleList = revealEmptyArea({boardSize, columnLength, tileIndex, flaggedList, markedList, rowLength, valueList, visibleList});
            }
        }

        flaggedList[tileIndex] = flagged;
        markedList[tileIndex] = marked;
        visibleList[tileIndex] = visible;

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

        return (
            <div className="viewport">
                <div className="board" style={style}>
                    <TileListContainer />
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
     * @param {Number} startTile
     */
    startGame(startTile) {
        let {columnLength, mineLength, rowLength} = this.props;
        let {flaggedList, markedList, visibleList} = this.state;
        let startState = getStartState({columnLength, flaggedList, markedList, mineLength, rowLength, startTile, visibleList});
        this.setState(startState);
    }
};
