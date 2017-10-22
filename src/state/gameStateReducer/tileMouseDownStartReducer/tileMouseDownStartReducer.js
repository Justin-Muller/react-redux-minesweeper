/**
 * @reducer tileMouseDownStartReducer
 * @param {object} state - The previous state before the action has occurred.
 * @param {object} action
 * @param {number} action.event - The mouse event that is triggered.
 * @param {number} action.id - The tile that has been interacted with.
 * @returns {object}
 */
const tileMouseDownStartReducer = (state, action) => {
    const { id } = action;

    return {
        ...state,
        mouseDownTargetId: id
    };
};

export default tileMouseDownStartReducer;