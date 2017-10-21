import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './App.css';
import gameStateReducer from './state/gameStateReducer/gameStateReducer';
import Game from './component/Game/Game';

class App extends Component {
  render() {
    return (
        <Provider store={createStore(gameStateReducer)}>
            <Game />
        </Provider>
    );
  }
}

export default App;
