import { connect } from 'react-redux';
import TileList from '../../component/TileList/TileList';

const mapStateToProps = (state) => {
    const { columnLength, flaggedList, incorrectList, markedList,
            mineList, rowLength, valueList, visibleList } = state;

    return {
        columnLength,
        flaggedList,
        incorrectList,
        markedList,
        mineList,
        rowLength,
        valueList,
        visibleList
    };
};

const TileListContainer = connect(
    mapStateToProps
)(TileList);

export default TileListContainer;