import React from 'react';

/**
 * Pops up a confirm dialog to the user when the user has won or lost the game.
 * @component GameOverConfirm
 * @param {Object}   props
 * @param {Function} props.onConfirm
 * @param {Boolean}  props.show
 * @param {Boolean}  props.win
 * @returns {DOMElement}
 */
const GameOverConfirm = (props) => {
    const { onConfirm, show, win } = props;

    if (show) {
        const messagePrefix = win ? 'You win!' : 'Game Over';
        const message = `${messagePrefix}\n\nWould you like to play again?`;

        //Slight delay to allow board to update before popping up confirm message.
        setTimeout(() => {
            if (window.confirm(message)) {
                onConfirm();
            }
        }, 100);
    }

    return (
        <div></div>
    );
};

export default GameOverConfirm;