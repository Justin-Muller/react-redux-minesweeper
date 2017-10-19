import React, { Component } from 'react';

import './App.css';
import Game from './Game/Game';

/**
 * Update these values manually to change the game's difficulty.
 *
 * @param {object}  defaults - The game's defaults to initialize the board with.
 * @param {number} [defaults.mineLength=20] - How many mines to generate on the board.
 * @param {number} [defaults.columnLength=8] - How many tiles to create on the x-axis.
 * @param {number} [defaults.rowLength=13] - How many tiles to create on the y-axis.
 * @param {number} [defaults.tileSize=44] - How big the tiles are in pixels.
 */
const defaults = {
    mineLength: 20,
    columnLength: 8,
    rowLength: 13,
    tileSize: 44
};

class App extends Component {
  render() {
    return (
        <Game columnLength={defaults.columnLength}
              mineLength={defaults.mineLength}
              rowLength={defaults.rowLength}
              tileSize={defaults.tileSize} />
    );
  }
}

export default App;
