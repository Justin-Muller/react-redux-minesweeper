import gameStartReducer from '../gameStartReducer/gameStartReducer';
import incorrectListReducer from '../common/incorrectListReducer/incorrectListReducer';
import visibleListReducer from '../common/visibleListReducer/visibleListReducer';

/**
 * Checks whether the game is won based on whether all tiles that don't contain a mine have been revealed.
 * @function checkWinCondition
 * @param {object} state
 * @param {Number} state.mineLength
 * @param {Array}  state.visibleList
 * @returns {Boolean}
 */
const checkWinCondition = (state) => {
    const { mineLength, visibleList } = state;
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
};

/**
 * Reveals all flags that should be placed when the game is won.
 * @function revealFlags
 * @param {object} state
 * @param {Array}  state.flaggedList
 * @param {Array}  state.mineList
 * @param {Array}  state.visibleList
 * @returns {Object}
 */
const revealFlags = (state) => {
    const { mineList } = state;
    const flaggedList = state.flaggedList.slice(0),
          visibleList = state.visibleList.slice(0);

    for (let id = 0; id < mineList.length; id++) {
        let mine = mineList[id];
        if (mine) {
            flaggedList[id] = true;
            visibleList[id] = true;
        }
    }

    return {
        ...state,
        flaggedList,
        visibleList
    };
};

const toggleFlagMarked = (state, action) => {
    const { flaggedList, markedList } = state;
    const { id } = action;
    const flagged = !flaggedList[id];
    const marked = !markedList[id];

    return {
        ...state,
        flaggedList: flaggedList.slice(0, id)
            .concat([flagged])
            .concat(flaggedList.slice(id + 1)),
        markedList: markedList.slice(0, id)
            .concat([marked])
            .concat(markedList.slice(id + 1))
    };
};

/**
 * @reducer tileClickReducer - Determines if an action is needed to be done based on the tile selected and generates the next state from it. (i.e. if its already revealed or not).
 * @param {object} state - The previous state before the action has occurred.
 * @param {object} action
 * @param {number} action.event - The mouse event that is triggered.
 * @param {number} action.id - The tile that has been interacted with.
 * @returns {object}
 */
const tileClickReducer = (state, action) => {
    const { flaggedList, initialised, markedList, mineLength, mineList } = state;
    const { id } = action;
    const visible = state.visibleList[id];

    if (!initialised) {
        return gameStartReducer(state, action);
    }

    if (visible) {
        return state;
    }

    const flagged = flaggedList[id];
    const marked = markedList[id];
    let mine = mineList[id];

    if (flagged || marked) {
        return toggleFlagMarked(state, action);
    }

    const { visibleList } = visibleListReducer(state, action);

    if (mine) {
        return {
            ...incorrectListReducer(state, action),
            gameOver: true,
            showGameOverMessage: true,
            visibleList
        };
    }

    if (checkWinCondition({mineLength, visibleList})) {
        return {
            ...revealFlags({...state, visibleList}),
            gameOver: true,
            showGameOverMessage: true,
            win: true
        };
    }

    return {
        ...state,
        visibleList
    };
};

export default tileClickReducer;