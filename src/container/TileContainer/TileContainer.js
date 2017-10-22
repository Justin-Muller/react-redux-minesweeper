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
        onMouseDown: ({ disabled, event, id }) => {

            //TODO: test windows
            //ignore right click
            if (event.nativeEvent && event.nativeEvent.which > 1) {
                return;
            }

            if (disabled) {
                return;
            }

            //short delay to allow for tapping on a touch device to reveal tile.
            setTimeout(() => {
                dispatch({
                    type: 'TILE_MOUSE_DOWN_END',
                    id
                });
            }, 500);
            //TODO ^-- Make this time configurable in the settings menu later...

            dispatch({
                type: 'TILE_MOUSE_DOWN_START',
                id
            });
        },

        onMouseUp: ({ disabled, event, id }) => {
            dispatch({
                type: 'TILE_MOUSE_UP',
                event,
                id
            });
        },

        onRightClick: ({ disabled, id }) => {
            dispatch({
                type: 'TILE_ALT_CLICK',
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