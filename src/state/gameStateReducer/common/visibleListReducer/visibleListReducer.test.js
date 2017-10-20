import React from 'react';
import ReactDOM from 'react-dom';
import {visibleListReducer} from './visibleListReducer';

describe('visibleListReducer', () => {
    let action,
        state;

    beforeEach(() => {
        //default settings for action (makes sure the tests don't auto fail if they are not set).
        action = {
            tileIndex: 0
        };

        //default settings for state (makes sure the tests don't auto fail if they are not set).
        state = {
            columnLength: 0,
            rowLength: 0,
            flaggedList: [],
            markedList: [],
            valueList: []
        };
    });

    describe('Given an initial board state of a 2 x 2 grid', () => {
        beforeEach(() => {
            state.columnLength = 2;
            state.rowLength = 2;
            state.visibleList = [
                false, false,
                false, false
            ];
            state.flaggedList = [
                false, false,
                false, false
            ];
            state.markedList = [
                false, false,
                false, false
            ];
        });

        describe('and all available positions are flagged', () => {
            beforeEach(() => {
                state.flaggedList = [
                    false, true,
                    true,  true
                ];
            });

            it('should only reveal one tile.', () => {
                const expected = [
                    true,  false,
                    false, false
                ];
                const {visibleList} = visibleListReducer(state, action);
                expect(visibleList).toEqual(expected);
            });
        });

        describe('and all positions are marked', () => {
            beforeEach(() => {
                state.markedList = [
                    false, true,
                    true,  true
                ];
            });

            it('should only reveal one tile.', () => {
                const expected = [
                    true,  false,
                    false, false
                ];
                const {visibleList} = visibleListReducer(state, action);
                expect(visibleList).toEqual(expected);
            });
        });

        describe('and the value list is all 0', () => {
            beforeEach(() => {
                state.valueList = [
                    0, 0,
                    0, 0
                ]
            });

            it('should reveal all tiles.', () => {
                const expected = [
                    true, true,
                    true, true
                ];
                const {visibleList} = visibleListReducer(state, action);
                expect(visibleList).toEqual(expected);
            });
        });

        describe('and has a value list with 1 mine in an opposite corner', () => {
            beforeEach(() => {
                state.valueList = [
                    1, 1,
                    1, 0
                ]
            });

            it('should reveal one tile.', () => {
                const expected = [
                    true,  false,
                    false, false
                ];
                const {visibleList} = visibleListReducer(state, action);
                expect(visibleList).toEqual(expected);
            });
        });
    });

    describe('Given an initial board state of a 3 x 3 grid', () => {
        beforeEach(() => {
            state.columnLength = 3;
            state.rowLength = 3;
            state.visibleList = [
                false, false, false,
                false, false, false,
                false, false, false
            ];
            state.flaggedList = [
                false, false, false,
                false, false, false,
                false, false, false
            ];
            state.markedList = [
                false, false, false,
                false, false, false,
                false, false, false
            ];
        });

        describe('with a mine in the bottom right corner', () => {
            beforeEach(() => {
                state.valueList = [
                    0, 0, 0,
                    0, 1, 1,
                    0, 1, 0
                ]
            });

            it('should reveal 8 tiles.', () => {
                const expected = [
                    true, true, true,
                    true, true, true,
                    true, true, false
                ];
                const {visibleList} = visibleListReducer(state, action);
                expect(visibleList).toEqual(expected);
            });
        });
    });

    describe('Given an initial board state of a 4 x 4 grid', () => {
        beforeEach(() => {
            state.columnLength = 4;
            state.rowLength = 4;
            state.visibleList = [
                false, false, false, false,
                false, false, false, false,
                false, false, false, false,
                false, false, false, false
            ];
            state.flaggedList = [
                false, false, false, false,
                false, false, false, false,
                false, false, false, false,
                false, false, false, false
            ];
            state.markedList = [
                false, false, false, false,
                false, false, false, false,
                false, false, false, false,
                false, false, false, false
            ];
        });

        describe('with a mine in the top right corner', () => {
            beforeEach(() => {
                state.valueList = [
                    0, 0, 1, 0,
                    0, 0, 1, 1,
                    0, 0, 0, 0,
                    0, 0, 0, 0
                ]
            });

            it('should reveal 15 tiles.', () => {
                const expected = [
                    true, true, true, false,
                    true, true, true, true,
                    true, true, true, true,
                    true, true, true, true
                ];
                const {visibleList} = visibleListReducer(state, action);
                expect(visibleList).toEqual(expected);
            });
        });
    });

    describe('Given an initial board state of a 5 x 5 grid', () => {
        beforeEach(() => {
            state.columnLength = 5;
            state.rowLength = 5;
            state.visibleList = [
                false, false, false, false, false,
                false, false, false, false, false,
                false, false, false, false, false,
                false, false, false, false, false,
                false, false, false, false, false
            ];
            state.flaggedList = [
                false, false, false, false, false,
                false, false, false, false, false,
                false, false, false, false, false,
                false, false, false, false, false,
                false, false, false, false, false
            ];
            state.markedList = [
                false, false, false, false, false,
                false, false, false, false, false,
                false, false, false, false, false,
                false, false, false, false, false,
                false, false, false, false, false
            ];
        });

        describe('with a mine in the bottom left corner', () => {
            beforeEach(() => {
                state.valueList = [
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0,
                    1, 1, 0, 0, 0,
                    0, 1, 0, 0, 0
                ]
            });

            it('should reveal 24 tiles.', () => {
                const expected = [
                    true,  true, true, true, true,
                    true,  true, true, true, true,
                    true,  true, true, true, true,
                    true,  true, true, true, true,
                    false, true, true, true, true
                ];
                const {visibleList} = visibleListReducer(state, action);
                expect(visibleList).toEqual(expected);
            });
        });
    });
});