import { createReducer } from '@reduxjs/toolkit';
import { OffersData } from '../../types/state';
import { favoritesChange } from '../favorites-data/action';
import {
  offersFailed,
  offersRequest,
  offersSucceeded,
  offerRequest,
  offerFailed,
  offerSucceeded,
  nearbyOffersRequest,
  nearbyOffersSucceeded,
  nearbyOffersFailed
} from './action';

const initialState: OffersData = {
  offers: [],
  offersLoading: false,
  offersError: false,
  offer: null,
  offerLoading: false,
  offerError: false,
  nearbyOffers: [],
  nearbyOffersLoading: false,
  nearbyOffersError: false,
};

export const offersData = createReducer(initialState, (builder) => {
  builder

    .addCase(offersRequest, (state) => {
      state.offersLoading = true;
    })

    .addCase(offersSucceeded, (state, action) => {
      state.offersLoading = false;
      state.offersError = false;
      state.offers = action.payload;
    })

    .addCase(offersFailed, (state) => {
      state.offersLoading = false;
      state.offersError = true;
    })

    .addCase(offerRequest, (state) => {
      state.offerLoading = true;
      state.offerError = false;
    })

    .addCase(offerSucceeded, (state, action) => {
      state.offerLoading = false;
      state.offer = action.payload;
    })

    .addCase(offerFailed, (state) => {
      state.offerLoading = false;
      state.offerError = true;
    })

    .addCase(nearbyOffersRequest, (state) => {
      state.nearbyOffersLoading = true;
      state.nearbyOffers = [];
    })

    .addCase(nearbyOffersSucceeded, (state, action) => {
      state.nearbyOffersLoading = false;
      state.nearbyOffers = action.payload;
    })

    .addCase(nearbyOffersFailed, (state) => {
      state.nearbyOffersLoading = false;
      state.nearbyOffersError = true;
    })

    .addCase(favoritesChange, (state, action) => {
      const index = state.offers.findIndex((offer) => offer.id === action.payload.id);
      if (index !== -1) {
        state.offers[index].isFavorite = action.payload.isFavorite;
      }
      if (state.offer?.id === action.payload.id) {
        state.offer.isFavorite = action.payload.isFavorite;
      }
      const nearbyIndex = state.nearbyOffers.findIndex((offer) => offer.id === action.payload.id);
      if (nearbyIndex !== -1) {
        state.nearbyOffers[nearbyIndex].isFavorite = action.payload.isFavorite;
      }
    });

});

