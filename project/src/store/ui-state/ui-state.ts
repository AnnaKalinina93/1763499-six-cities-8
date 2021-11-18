import { createReducer } from '@reduxjs/toolkit';
import { UiState } from '../../types/state';
import { sortType, citiesList } from '../../const';
import { cityChange, sortTypeChange } from './action';

const initialState: UiState = {
  activeCity: citiesList.Paris,
  activeSortType: sortType.popular,
};

export const uiState = createReducer(initialState, (builder) => {
  builder

    .addCase(cityChange, (state, action) => {
      state.activeCity = action.payload;
    })

    .addCase(sortTypeChange, (state, action) => {
      state.activeSortType = action.payload;
    });
});
