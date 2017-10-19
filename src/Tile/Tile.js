import React from 'react';

/* Tile helpers */

function getTileAttributes({classNames, onMouseDown, onMouseUp, onRightClick, style}) {
    let attributes = {
        className: classNames.join(' '),
        type: 'button',
        style
    };

    //check if a touch device like a smart phone or tablet
    if ('ontouchstart' in window) {
        attributes.onTouchStart = (event) => onMouseDown(event);
        attributes.onTouchEnd = (event) => onMouseUp(event);
    } else {
        //Otherwise use mouse events instead
        attributes.onContextMenu = onRightClick;
        attributes.onMouseDown = (event) => onMouseDown(event);
        attributes.onMouseUp = (event) => onMouseUp(event);
    }

    return attributes;
}

function getTileClassNames({disabled, flagged, incorrect, marked, mine, value, visible}) {
    const classNames = ['tile'];

    if (disabled) {
        classNames.push('tile-disabled');
    }

    if (incorrect) {
        classNames.push('tile-incorrect');
    } else if (flagged) {
        classNames.push('tile-flag');
    }

    if (visible) {
        classNames.push('tile-revealed');
        if (mine) {
            classNames.push('tile-mine');
        }
    }

    return classNames;
}

function getTileDisplayValue({disabled, flagged, incorrect, marked, mine, value, visible}) {
    if (incorrect) {
        return '\u2715';
    }

    if (flagged) {
        return '\u2691';
    }

    if (visible) {
        if (mine) {
            return '\u2739';
        }

        if (value) {
            return value;
        }
    }

    if (marked) {
        return '?';
    }

    return '\u00A0';
}

/**
 * The tile can contain either a mine, a number (value), a flag (flagged), a question mark (marked) or blank (value = 0). The tile will initially be invisible (visible = false) until the user has clicked on the tile to reveal a value or mine.
 * @component Tile
 * @param {Object}   props
 * @param {Boolean}  props.disabled - Disables the tile by greying out tile. Note: Does not stop click event from propagating.
 * @param {Boolean}  props.flagged - Displays a flag icon in the tile.
 * @param {Boolean}  props.incorrect - Displays a mine icons with a cross in the tile.
 * @param {Boolean}  props.marked - Displays a question mark in the tile.
 * @param {Boolean}  props.mine - Only displays mine when visible flag is true.
 * @param {Function} props.onMouseDown - Click/Touch handler called when the tile has left click/touch pressed down.
 * @param {Function} props.onMouseOver - Hover handler called when tile is hovered over.
 * @param {Function} props.onMouseUp - Click/Touch handler called when tile has left click/touch is released.
 * @param {Function} props.onRightClick - Click/Touch handler called when tile is right clicked.
 * @param {Number}   props.value - Only displays value when visible flag is true.
 * @param {Boolean}  props.visible - Visible flag to show/hide the value or mine in the tile.
 * @returns {DOMElement}
 */
export default function Tile({disabled, flagged, incorrect, marked, mine, onMouseDown, onMouseUp, onRightClick, tileSize, value, visible}) {
    const classNames = getTileClassNames({disabled, flagged, incorrect, marked, mine, value, visible});
    const displayValue = getTileDisplayValue({disabled, flagged, incorrect, marked, mine, value, visible});
    const style = { width: tileSize + 'px', height: tileSize + 'px' };
    const attributes = getTileAttributes({classNames, onMouseDown, onMouseUp, onRightClick, style});

    return (
        <button {...attributes}>{displayValue}</button>
    );
}
