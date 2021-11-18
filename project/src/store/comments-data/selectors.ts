import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';
import { Reviews } from '../../types/reviews';

export const getReviews = (state: State): Reviews => state[NameSpace.Comments].reviews;
export const getReviewsLoading = (state: State): boolean => state[NameSpace.Comments].reviewsLoading;
export const getReviewsError = (state: State): boolean => state[NameSpace.Comments].reviewsError;
export const getIsPostReview = (state: State): boolean => state[NameSpace.Comments].isPostReview;
