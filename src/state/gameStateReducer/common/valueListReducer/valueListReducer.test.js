import React from 'react';
import ReactDOM from 'react-dom';
import valueListReducer from './valueListReducer';

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
            const expected = [
                0, 1
            ];
            const {valueList} = valueListReducer(state, action);
            expect(valueList).toEqual(expected);
        });
    });

    describe('given a mineList of 2 x 2 with 1 mine', () => {
        beforeEach(() => {
            state.columnLength = 2;
            state.rowLength = 2;
            state.mineList = [
                false, false,
                true,  false
            ];
        });

        it('should return the correct configuration for the values surrounding the mines.', () => {
            const expected = [
                1, 1,
                0, 1
            ];
            const {valueList} = valueListReducer(state, action);
            expect(valueList).toEqual(expected);
        });
    });

    describe('given a mineList of 3 x 3 with 1 mine', () => {
        beforeEach(() => {
            state.columnLength = 3;
            state.rowLength = 3;
            state.mineList = [
                false, false, false,
                false, true,  false,
                false, false ,false
            ];
        });

        it('should return the correct configuration for the values surrounding the mines.', () => {
            const expected = [
                1, 1, 1,
                1, 0, 1,
                1, 1, 1
            ];
            const {valueList} = valueListReducer(state, action);
            expect(valueList).toEqual(expected);
        });
    });

    describe('given a mineList of 4 x 4 with 2 mine', () => {
        beforeEach(() => {
            state.columnLength = 4;
            state.rowLength = 4;
            state.mineList = [
                false, false, false, false,
                false, true,  false, false,
                false, false, true,  false,
                false, false, false, false
            ];
        });

        it('should return the correct configuration for the values surrounding the mines.', () => {
            const expected = [
                1, 1, 1, 0,
                1, 1, 2, 1,
                1, 2, 1, 1,
                0, 1, 1, 1
            ];
            const {valueList} = valueListReducer(state, action);
            expect(valueList).toEqual(expected);
        });
    });

    describe('given a mineList of 5 x 5 with 5 mine', () => {
        beforeEach(() => {
            state.columnLength = 5;
            state.rowLength = 5;
            state.mineList = [
                true,  false, false, false, false,
                false, true,  false, false, false,
                false, true , true,  false, false,
                false, false, false, false, false,
                false, false, false, false, true
            ];
        });

        it('should return the correct configuration for the values surrounding the mines.', () => {
            const expected = [
                1, 2, 1, 0, 0,
                3, 3, 3, 1, 0,
                2, 2, 2, 1, 0,
                1, 2, 2, 2, 1,
                0, 0, 0, 1, 0
            ];
            const {valueList} = valueListReducer(state, action);
            expect(valueList).toEqual(expected);
        });
    });
});