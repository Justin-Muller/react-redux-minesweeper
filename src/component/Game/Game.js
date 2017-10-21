import React from 'react';
import './Game.css';
import GameOverConfirmContainer from '../../container/GameOverConfirmContainer/GameOverConfirmContainer';
import TileListContainer from '../../container/TileListContainer/TileListContainer';

const Game = (props) => {
    const { columnLength, tileSize } = props;

    const style = {
        width: tileSize * columnLength + 'px'
    };

    return (
        <div className="viewport">
            <div className="board" style={style}>
                <TileListContainer />
            </div>
            <GameOverConfirmContainer />
        </div>
    );
};

export default Game;