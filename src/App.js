import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './App.css';
import gameStateReducer from './state/gameStateReducer/gameStateReducer';
import Game from './component/Game/Game';

/**
 * Update these values manually to change the game's difficulty.
 * Will add a game menu to update these values in the future.
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

const store = createStore(gameStateReducer);

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Game columnLength={defaults.columnLength}
                  mineLength={defaults.mineLength}
                  rowLength={defaults.rowLength}
                  tileSize={defaults.tileSize} />
        </Provider>
    );
  }
}

export default App;
