import tileAltClickReducer from '../tileAltClickReducer/tileAltClickReducer';

/**
 * @reducer tileMouseDownEndReducer
 * @param {object} state - The previous state before the action has occurred.
 * @param {object} action
 * @param {number} action.event - The mouse event that is triggered.
 * @param {number} action.id - The tile that has been interacted with.
 * @returns {object}
 */
const tileMouseDownEndReducer = (state, action) => {
    const { mouseDownTargetId } = state;
    const { id } = action;

    //TODO - Need to check still hovering original square?
    if (mouseDownTargetId === id) {
        return {
            ...tileAltClickReducer(state, action),
            mouseDownTargetId: -1
        };
    }

    return state;
};

export default tileMouseDownEndReducer;