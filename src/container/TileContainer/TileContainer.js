import { connect } from 'react-redux';
import Tile from '../../component/Tile/Tile';

const mapStateToProps = (state) => {
    const { gameOver, tileSize } = state;
    return {
        disabled: gameOver,
        tileSize
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMouseDown: (event, id) => {
            dispatch({
                type: 'TILE_MOUSE_DOWN',
                event,
                id
            });
        },

        onMouseUp: (event, id) => {
            dispatch({
                type: 'TILE_MOUSE_UP',
                event,
                id
            });
        },

        onRightClick: (id) => {
            dispatch({
                type: 'TILE_MOUSE_UP',
                id
            });
        }
    };
};

const TileContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Tile);

export default TileContainer;