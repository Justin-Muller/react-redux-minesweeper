import tileClickReducer from '../tileClickReducer/tileClickReducer';

/**
 * @reducer tileMouseUpReducer
 * @param {object} state - The previous state before the action has occurred.
 * @param {object} action
 * @param {number} action.event - The mouse event that is triggered.
 * @param {number} action.id - The tile that has been interacted with.
 * @returns {object}
 */
const tileMouseUpReducer = (state, action) => {
    const { mouseDownTargetId } = state;
    const { id } = action;

    if (mouseDownTargetId === id) {
        return {
            ...tileClickReducer(state, action),
            mouseDownTargetId: -1
        };
    }

    return state;
};

export default tileMouseUpReducer;