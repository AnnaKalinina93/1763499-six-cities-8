import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../types/action';
import { Reviews } from '../../types/reviews';

export const commentsRequest = createAction(ActionType.CommentsRequest);

export const commentsSucceeded = createAction(
  ActionType.CommentsSucceeded,
  (reviews: Reviews) => ({
    payload: reviews,
  }),
);

export const commentsFailed = createAction(ActionType.CommentsFailed);

export const postReviewSucceeded = createAction(
  ActionType.PostReviewSucceeded,
  (reviews: Reviews) => ({
    payload: reviews,
  }),
);

export const postReviewReset = createAction(ActionType.PostReviewReset);
