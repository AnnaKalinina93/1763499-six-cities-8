import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';
import { Reviews } from '../../types/reviews';

export const getReviews = (state: State): Reviews  => state[NameSpace.comments].reviews;
export const getReviewsLoading = (state: State): boolean  => state[NameSpace.comments].reviewsLoading;
export const getReviewsError = (state: State): boolean  => state[NameSpace.comments].reviewsError;
export const getIsPostReview = (state: State): boolean  => state[NameSpace.comments].isPostReview;
