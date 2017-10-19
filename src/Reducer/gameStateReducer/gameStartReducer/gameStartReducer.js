import {mineListReducer} from './../common/mineListReducer/mineListReducer';
import {valueListReducer} from './../common/valueListReducer/valueListReducer';
import {visibleListReducer} from './../common/visibleListReducer/visibleListReducer';

/**
 * @reducer gameStartReducer - Start the game by using the first tile to be revealed to initialise a valid board state.
 * @param {object} state - The previous state before the action has occurred.
 * @param {object} action
 * @param {number} action.tileIndex - The tile to use as the first tile to be revealed.
 * @returns {object}
 */
export const gameStartReducer = (state, action) => {
    return {
        ...visibleListReducer(valueListReducer(mineListReducer(state, action), action), action),
        initialised: true
    };
};