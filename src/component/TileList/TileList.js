import React from 'react';
import TileContainer from '../../container/TileContainer/TileContainer';

const renderTile = (props, tileIndex) => {
    const { flaggedList, incorrectList, markedList, mineList, valueList, visibleList } = props;

    return (
        <TileContainer
            id={tileIndex}
            flagged={flaggedList[tileIndex]}
            incorrect={incorrectList[tileIndex]}
            marked={markedList[tileIndex]}
            mine={mineList[tileIndex]}
            value={valueList[tileIndex]}
            visible={visibleList[tileIndex]}
        />);
};

const renderRow = (props, rowIndex) => {
    const { columnLength } = props;
    let tiles = [];

    for (let columnIndex = 0; columnIndex < columnLength; columnIndex++) {
        let tileIndex = columnIndex + (rowIndex * columnLength);
        tiles.push(renderTile(props, tileIndex));
    }

    return (<div className="row" key={rowIndex}>{tiles}</div>);
};

const TileList = (props) => {
    const { rowLength } = props;

    let rows = [];

    for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
        rows.push(renderRow(props, rowIndex));
    }

    return rows;
};

export default TileList;