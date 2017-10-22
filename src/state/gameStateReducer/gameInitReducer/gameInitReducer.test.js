import React from 'react';
import ReactDOM from 'react-dom';
import gameInitReducer from './gameInitReducer';

describe('gameInitReducer', () => {
    let action,
        state;

    beforeEach(() => {
        action = {};
        state = {};
    });

    describe('Given a state.columnLength = 2 and state.rowLength = 2', () => {
        beforeEach(() => {
            state.columnLength = 2;
            state.rowLength = 2;
        });

        it('should return a flaggedList array with size 4 set to false.', () => {
            const expected = [false, false, false, false];
            const {flaggedList} = gameInitReducer(state, action);
            expect(flaggedList).toEqual(expected);
        });

        it('should return a gameOver flag set to false.', () => {
            const expected = false;
            const {gameOver} = gameInitReducer(state, action);
            expect(gameOver).toEqual(expected);
        });

        it('should return a incorrectList array with size 4 set to false.', () => {
            const expected = [false, false, false, false];
            const {incorrectList} = gameInitReducer(state, action);
            expect(incorrectList).toEqual(expected);
        });

        it('should return a initialised flag set to false.', () => {
            const expected = false;
            const {initialised} = gameInitReducer(state, action);
            expect(initialised).toEqual(expected);
        });

        it('should return a markedList array with size 4 set to false.', () => {
            const expected = [false, false, false, false];
            const {markedList} = gameInitReducer(state, action);
            expect(markedList).toEqual(expected);
        });

        it('should return a mineList array with size 4 set to false.', () => {
            const expected = [false, false, false, false];
            const {mineList} = gameInitReducer(state, action);
            expect(mineList).toEqual(expected);
        });

        it('should return a showGameOverMessage flag set to false.', () => {
            const expected = false;
            const {showGameOverMessage} = gameInitReducer(state, action);
            expect(showGameOverMessage).toEqual(expected);
        });

        it('should return a valueList array with size 4 set to 0.', () => {
            const expected = [0, 0, 0, 0];
            const {valueList} = gameInitReducer(state, action);
            expect(valueList).toEqual(expected);
        });

        it('should return a visibleList array with size 4 set to false.', () => {
            const expected = [false, false, false, false];
            const {visibleList} = gameInitReducer(state, action);
            expect(visibleList).toEqual(expected);
        });

        it('should return a win flag set to false.', () => {
            const expected = false;
            const {win} = gameInitReducer(state, action);
            expect(win).toEqual(expected);
        });
    });
});