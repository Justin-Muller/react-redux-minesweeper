import React from 'react';
import './../TileList/TileList.css';
import TileContainer from '../../container/TileContainer/TileContainer';

const renderTile = (props, tileIndex) => {
    const { flaggedList, incorrectList, markedList, mineList, valueList, visibleList } = props;

    return (
        <TileContainer
            flagged={flaggedList[tileIndex]}
            id={tileIndex}
            incorrect={incorrectList[tileIndex]}
            key={tileIndex}
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

const renderRows = (props) => {
    const { rowLength } = props;

    let rows = [];

    for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
        rows.push(renderRow(props, rowIndex));
    }

    return rows;
};

const TileList = (props) => {
    const rows = renderRows(props);
    const { columnLength, tileSize } = props;

    const style = {
        width: tileSize * columnLength + 'px'
    };

    return <div className="board" style={style}>{rows}</div>;
};

export default TileList;