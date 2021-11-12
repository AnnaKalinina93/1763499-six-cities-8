import { createReducer } from '@reduxjs/toolkit';
import { CommentsData } from '../../types/state';
import {
  commentsFailed,
  commentsRequest,
  commentsSucceeded,
  postReviewReset,
  postReviewSucceeded
} from './action';

const initialState: CommentsData = {
  reviews: [],
  reviewsLoading: false,
  reviewsError: false,
  isPostReview: false,
};

export const commentsData = createReducer(initialState, (builder) => {
  builder

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
