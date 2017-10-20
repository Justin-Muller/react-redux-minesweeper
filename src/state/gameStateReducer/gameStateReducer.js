import {gameInitReducer} from './gameInitReducer/gameInitReducer';
import {gameStartReducer} from './gameStartReducer/gameStartReducer';
import {tileClickReducer} from './tileClickReducer/tileClickReducer';
import {tileAltClickReducer} from './tileAltClickReducer/tileAltClickReducer';

/**
 * @reducer gameStateReducer
 * @param {object}  state
 * @param {number}  state.columnLength
 * @param {array}   state.flaggedList
 * @param {boolean} state.gameOver
 * @param {array}   state.incorrectList
 * @param {boolean} state.initialised
 * @param {array}   state.markedList
 * @param {number}  state.mineLength
 * @param {array}   state.mineList
 * @param {number}  state.rowLength
 * @param {boolean} state.showGameOverMessage
 * @param {array}   state.valueList
 * @param {array}   state.visibleList
 * @param {boolean} state.win
 * @param {object}  action
 */
const gameStateReducer = (state, action) => {
    const actionTypeMap = {
            GAME_INIT: gameInitReducer,
            GAME_START: gameStartReducer,
            TILE_CLICK: tileClickReducer,
            TILE_ALT_CLICK: tileAltClickReducer
        },
        actionTypeReducer = actionTypeMap[action.type];

    if (actionTypeReducer) {
        return actionTypeReducer(state, action);
    }

    return state;
};

export default gameStateReducer;