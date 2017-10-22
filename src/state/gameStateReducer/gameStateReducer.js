import gameInitReducer from './gameInitReducer/gameInitReducer';
import gameStartReducer from './gameStartReducer/gameStartReducer';
import tileAltClickReducer from './tileAltClickReducer/tileAltClickReducer';
import tileMouseDownStartReducer from './tileMouseDownStartReducer/tileMouseDownStartReducer';
import tileMouseDownEndReducer from './tileMouseDownEndReducer/tileMouseDownEndReducer';
import tileMouseUpReducer from './tileMouseUpReducer/tileMouseUpReducer';

/**
 * Update these values manually to change the game's difficulty.
 * Will add a game menu to update these values in the future.
 *
 * @param {object}  defaults - The game's defaults to initialize the board with.
 * @param {number} [defaults.mineLength=20] - How many mines to generate on the board.
 * @param {number} [defaults.columnLength=8] - How many tiles to create on the x-axis.
 * @param {number} [defaults.rowLength=13] - How many tiles to create on the y-axis.
 * @param {number} [defaults.tileSize=44] - How big the tiles are in pixels.
 */
const defaults = {
    mineLength: 20,
    columnLength: 8,
    rowLength: 13,
    tileSize: 44
};

/**
 * @reducer gameStateReducer
 * @param {object}  state
 * @param {number}  state.columnLength        - How many tiles along the X axis the playing area is.
 * @param {array}   state.flaggedList         -
 * @param {boolean} state.gameOver            -
 * @param {array}   state.incorrectList       -
 * @param {boolean} state.initialised         -
 * @param {array}   state.markedList          -
 * @param {number}  state.mineLength          - How many mines to generate within the playing area.
 * @param {array}   state.mineList            -
 * @param {number}  state.rowLength           - How many tiles along the Y axis the playing area is.
 * @param {boolean} state.showGameOverMessage -
 * @param {Number}  state.tileSize            - How big the are tiles in pixels.
 * @param {array}   state.valueList           -
 * @param {array}   state.visibleList         -
 * @param {boolean} state.win                 -
 * @param {object}  action
 * @param {string}  action.type               - An action for the reducer to handle. Actions = GAME_INIT, GAME_START, TILE_CLICK, TILE_ALT_CLICK
 */
const gameStateReducer = (state, action) => {
    if (typeof state === 'undefined') {
        return gameInitReducer(defaults);
    }

    const actionTypeMap = {
            GAME_INIT: gameInitReducer,
            GAME_START: gameStartReducer,
            TILE_ALT_CLICK: tileAltClickReducer,
            TILE_MOUSE_DOWN_START: tileMouseDownStartReducer,
            TILE_MOUSE_DOWN_END: tileMouseDownEndReducer,
            TILE_MOUSE_UP: tileMouseUpReducer
        },
        actionTypeReducer = actionTypeMap[action.type];

    if (actionTypeReducer) {
        return actionTypeReducer(state, action);
    }

    return state;
};

export default gameStateReducer;