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
                const mineList = mineListReducer(state)
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
                const mineList = mineListReducer(state)
            }).toThrow('Cannot have more mines than tiles on the board.');
        });
    });

    describe('When state.mineLength < (state.columnLength * state.rowLength)', function () {
        beforeEach(function () {
            state.mineLength = 1;
            state.columnLength = 2;
            state.rowLength = 2;
        });

        describe('When action.tileIndex = 0', function () {
            beforeEach(function () {
                action.tileIndex = 0;
            });

            it('should return a mineList that does not have a mine in position 0.', function () {
                const {mineList} = mineListReducer(state);
                expect(mineList[action.tileIndex]).toBe(false);
            });
        });
    });



});