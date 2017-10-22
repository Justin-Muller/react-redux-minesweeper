import React from 'react';
import './../TileList/TileList.css';
import TileContainer from '../../container/TileContainer/TileContainer';

const renderTile = (props, id) => {
    const { flaggedList, incorrectList, markedList, mineList, valueList, visibleList } = props;

    return (
        <TileContainer
            flagged={flaggedList[id]}
            id={id}
            incorrect={incorrectList[id]}
            key={id}
            marked={markedList[id]}
            mine={mineList[id]}
            value={valueList[id]}
            visible={visibleList[id]}
        />);
};

const renderRow = (props, rowIndex) => {
    const { columnLength } = props;
    let tiles = [];

    for (let columnIndex = 0; columnIndex < columnLength; columnIndex++) {
        let id = columnIndex + (rowIndex * columnLength);
        tiles.push(renderTile(props, id));
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