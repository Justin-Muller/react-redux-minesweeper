import { connect } from 'react-redux';
import GameOverConfirm from '../../component/GameOverConfirm/GameOverConfirm';

const mapStateToProps = (state) => {
    const { showGameOverMessage, win } = state;

    return {
        show: showGameOverMessage,
        win
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onConfirm: () => {
            dispatch({
                type: 'GAME_INIT'
            });
        }
    }
};

const GameOverConfirmContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameOverConfirm);

export default GameOverConfirmContainer;


/*
show={this.state.showGameOverMessage}
win={this.state.win}
onConfirm={() => this.handleGameOverConfirm()} />
    */