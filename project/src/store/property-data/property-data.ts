import { createReducer } from '@reduxjs/toolkit';
import { PropertyData } from '../../types/state';
import {
  commentsFailed,
  commentsRequest,
  commentsSucceeded,
  nearbyOffersFailed,
  nearbyOffersRequest,
  nearbyOffersSucceeded,
  offerFailed,
  offerRequest,
  offerSucceeded,
  postReviewReset,
  postReviewSucceeded
} from '../action';

const initialState: PropertyData = {
  offer: null,
  offerLoading: false,
  offerError: false,
  nearbyOffers: [],
  nearbyOffersLoading: false,
  nearbyOffersError: false,
  reviews: [],
  reviewsLoading: false,
  reviewsError: false,
  isPostReview: false,
};

const propertyData = createReducer(initialState, (builder) => {
  builder

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

    .addCase(commentsRequest, (state) => {
      state.reviewsLoading = true;
    })

    .addCase(commentsSucceeded, (state, action) => {
      state.reviewsLoading = false;
      state.reviews = action.payload;
    })

    .addCase(commentsFailed, (state, action) => {
      state.reviewsLoading = false;
      state.reviewsError = true;
    })

    .addCase(postReviewSucceeded, (state, action) => {
      state.isPostReview = true;
      state.reviews = action.payload;
    })

    .addCase(postReviewReset, (state) => {
      state.isPostReview = false;
    });
});

export { propertyData };
