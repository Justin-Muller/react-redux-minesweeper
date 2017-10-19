import React from 'react';
import ReactDOM from 'react-dom';
import {mineListReducer} from './mineListReducer';

describe('mineListReducer', function () {
    let action,
        state;

    beforeEach(function () {
        action = {};
        state = {};
    });

    describe('When state.mineLength = (state.columnLength * state.rowLength)', function () {
        beforeEach(function () {
            state.mineLength = 4;
            state.columnLength = 2;
            state.rowLength = 2;
        });

        it('should return an error.', function () {
            expect(() => {
                const mineList = mineListReducer(state, action);
            }).toThrow('Cannot have more mines than tiles on the board.');
        });
    });

    describe('When state.mineLength > (state.columnLength * state.rowLength)', function () {
        beforeEach(function () {
            state.mineLength = 5;
            state.columnLength = 2;
            state.rowLength = 2;
        });

        it('should return an error.', function () {
            expect(() => {
                const mineList = mineListReducer(state, action);
            }).toThrow('Cannot have more mines than tiles on the board.');
        });
    });

    describe('When state.mineLength = 1 and state.columnLength = 2 and state.columnLength = 1', function () {
        beforeEach(function () {
            state.mineLength = 1;
            state.columnLength = 2;
            state.rowLength = 1;
        });

        describe('When action.tileIndex = 0', function () {
            beforeEach(function () {
                action.tileIndex = 0;
            });

            it('should return a mineList that does not have a mine in position 0.', function () {
                const {mineList} = mineListReducer(state, action);
                expect(mineList[action.tileIndex]).toBe(false);
            });

            it('should return a mineList that has a mine in position 1.', function () {
                const {mineList} = mineListReducer(state, action);
                expect(mineList[1]).toBe(true);
            });
        });
    });

    describe('When state.mineLength = 5 and state.columnLength = 10 and state.columnLength = 10', function () {
        beforeEach(function () {
            state.mineLength = 5;
            state.columnLength = 10;
            state.rowLength = 10;
        });

        describe('When action.tileIndex = 5', function () {
            beforeEach(function () {
                action.tileIndex = 5;
            });

            it('should return a mineList that does not have a mine in position 5.', function () {
                const {mineList} = mineListReducer(state, action);
                expect(mineList[action.tileIndex]).toBe(false);
            });

            it('should return a mineList that contains 5 mines.', function () {
                const {mineList} = mineListReducer(state, action);
                const mineCount = mineList.reduce(function (acc, value) {
                    return value ? acc + 1 : acc;
                }, 0);
                expect(mineCount).toBe(5);
            });
        });
    });
});