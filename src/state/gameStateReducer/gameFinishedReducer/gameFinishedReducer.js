/**
 * @reducer gameFinishedReducer
 * @param {object} state - The previous state before the action has occurred.
 * @returns {object}
 */
const gameFinishedReducer = (state) => {
    return {
        ...state,
        showGameOverMessage: false
    };
};

export default gameFinishedReducer;