import React from 'react';
import ReactDOM from 'react-dom';
import {valueListReducer} from './valueListReducer';

describe('valueListReducer', () => {
    let action,
        state;

    beforeEach(() => {
        action = {};
        state = {};
    });

    describe('given a mineList of 2 x 1 with 1 mine', () => {
        beforeEach(() => {
            state.columnLength = 2;
            state.rowLength = 1;
            state.mineList = [true, false];
        });

        it('should return the correct configuration for the values surrounding the mines.', () => {
            const expected = [0, 1];
            const {valueList} = valueListReducer(state, action);
            expect();
        });
    });

    describe('given a mineList of 2 x 2 with 1 mine', () => {

    });

    describe('given a mineList of 3 x 3 with 1 mine', () => {

    });

    describe('given a mineList of 4 x 4 with 2 mine', () => {

    });

    describe('given a mineList of 5 x 5 with 5 mine', () => {

    });
});