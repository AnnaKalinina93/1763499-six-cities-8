import { createReducer } from '@reduxjs/toolkit';
import { MainData } from '../../types/state';
import { sortType } from '../../const';
import {
  cityChange,
  offersFailed,
  offersRequest,
  offersSucceeded,
  sortTypeChange
} from '../action';

const initialState: MainData = {
  activeCity: 'Paris',
  offers: [],
  activeSortType: sortType.popular,
  offersLoading: false,
  offersError: false,
};

const mainData = createReducer(initialState, (builder) => {
  builder
    .addCase(cityChange, (state, action) => {
      state.activeCity = action.payload;
    })

    .addCase(offersRequest, (state) => {
      state.offersLoading = true;
    })

    .addCase(offersSucceeded,(state, action) => {
      state.offersLoading = false;
      state.offersError = false;
      state.offers = action.payload;
    })

    .addCase(offersFailed,(state) => {
      state.offersLoading = false;
      state.offersError = true;
    })

    .addCase(sortTypeChange, (state, action) => {
      state.activeSortType = action.payload;
    });

});

export { mainData };
