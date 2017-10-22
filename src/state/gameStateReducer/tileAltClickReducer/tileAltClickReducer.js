/**
 * @reducer tileAltClickReducer - Determines if an action is needed to be done based on the tile selected and generates the next state from it. (i.e. if its already revealed or not).
 * @param {object} state - The previous state before the action has occurred.
 * @param {object} action
 * @param {number} action.event - The mouse event that is triggered.
 * @param {number} action.id - The tile that has been interacted with.
 * @returns {object}
 */
const tileAltClickReducer = (state, action) => {
    const { flaggedList, gameOver, markedList, visibleList } = state;
    const { id } = action;
    const visible = visibleList[id];

    let flagged = flaggedList[id];
    let marked = markedList[id];

    if (gameOver || visible) {
        return state;
    }

    flagged = !(flagged || marked);
    marked = false;

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

export default tileAltClickReducer;