import React from 'react';
import ReactDOM from 'react-dom';
import {mineListReducer} from './mineListReducer';

describe('mineListReducer', () => {
    let action,
        state;

    beforeEach(() => {
        action = {};
        state = {};
    });

    describe('When state.mineLength = (state.columnLength * state.rowLength)', () => {
        beforeEach(() => {
            state.mineLength = 4;
            state.columnLength = 2;
            state.rowLength = 2;
        });

        it('should return an error.', () => {
            expect(() => {
                const mineList = mineListReducer(state, action);
            }).toThrow('Cannot have more mines than tiles on the board.');
        });
    });

    describe('When state.mineLength > (state.columnLength * state.rowLength)', () => {
        beforeEach(() => {
            state.mineLength = 5;
            state.columnLength = 2;
            state.rowLength = 2;
        });

        it('should return an error.', () => {
            expect(() => {
                const mineList = mineListReducer(state, action);
            }).toThrow('Cannot have more mines than tiles on the board.');
        });
    });

    describe('When state.mineLength = 1 and state.columnLength = 2 and state.columnLength = 1', () => {
        beforeEach(() => {
            state.mineLength = 1;
            state.columnLength = 2;
            state.rowLength = 1;
        });

        describe('When action.tileIndex = 0', () => {
            beforeEach(() => {
                action.tileIndex = 0;
            });

            it('should return a mineList that does not have a mine in position 0.', () => {
                const {mineList} = mineListReducer(state, action);
                expect(mineList[action.tileIndex]).toBe(false);
            });

            it('should return a mineList that has a mine in position 1.', () => {
                const {mineList} = mineListReducer(state, action);
                expect(mineList[1]).toBe(true);
            });
        });
    });

    describe('When state.mineLength = 5 and state.columnLength = 10 and state.columnLength = 10', () => {
        beforeEach(() => {
            state.mineLength = 5;
            state.columnLength = 10;
            state.rowLength = 10;
        });

        describe('When action.tileIndex = 5', () => {
            beforeEach(() => {
                action.tileIndex = 5;
            });

            it('should return a mineList that does not have a mine in position 5.', () => {
                const {mineList} = mineListReducer(state, action);
                expect(mineList[action.tileIndex]).toBe(false);
            });

            it('should return a mineList that contains 5 mines.', () => {
                const {mineList} = mineListReducer(state, action);
                const mineCount = mineList.reduce(function (acc, value) {
                    return value ? acc + 1 : acc;
                }, 0);
                expect(mineCount).toBe(5);
            });
        });
    });
});