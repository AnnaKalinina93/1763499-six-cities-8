import { createReducer } from '@reduxjs/toolkit';
import { FavoritesData } from '../../types/state';
import {
  favoritesChange,
  favoritesOfferReset,
  favoritesOffersFailed,
  favoritesOffersRequest,
  favoritesOffersSucceeded
} from './action';

const initialState: FavoritesData = {
  favoritesOffers: [],
  favoritesOffersLoading: false,
  favoritesOffersError: false,
  favoritesOffer: null,
};

export const favoritesOffersData = createReducer(initialState, (builder) => {
  builder

    .addCase(favoritesOffersRequest, (state) => {
      state.favoritesOffer = null;
      state.favoritesOffersLoading = true;
      state.favoritesOffersError = false;
    })

    .addCase(favoritesOffersSucceeded, (state, action) => {
      state.favoritesOffersLoading = false;
      state.favoritesOffers = action.payload;
    })

    .addCase(favoritesOffersFailed, (state) => {
      state.favoritesOffersLoading = false;
      state.favoritesOffersError = true;
    })

    .addCase(favoritesChange, (state, action) => {
      state.favoritesOffer = action.payload;
      state.favoritesOffers = state.favoritesOffers.filter((offer) => offer.id !== action.payload.id);
    })

    .addCase(favoritesOfferReset, (state) => {
      state.favoritesOffer = null;
    });

});
