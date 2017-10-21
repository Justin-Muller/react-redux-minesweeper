import React from 'react';
import GameOverConfirmContainer from '../../container/GameOverConfirmContainer/GameOverConfirmContainer';
import TileListContainer from '../../container/TileListContainer/TileListContainer';

const Game = (props) => {
    return (
        <div>
            <TileListContainer />
            <GameOverConfirmContainer />
        </div>
    );
};

export default Game;