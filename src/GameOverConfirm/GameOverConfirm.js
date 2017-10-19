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
export default function GameOverConfirm(props) {
    if (props.show) {
        const messagePrefix = props.win ? 'You win!' : 'Game Over';
        const message = `${messagePrefix}\n\nWould you like to play again?`

        //Slight delay to allow board to update before popping up confirm message.
        setTimeout(function () {
            if (window.confirm(message)) {
                props.onConfirm();
            }
        }, 100);
    }

    return (
        <div></div>
    );
}
