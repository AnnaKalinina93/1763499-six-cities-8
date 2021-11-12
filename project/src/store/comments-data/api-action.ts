import { toast } from 'react-toastify';
import { ThunkActionResult } from '../../types/action';
import {
  commentsRequest,
  commentsSucceeded,
  commentsFailed,
  postReviewSucceeded,
  postReviewReset
} from './action';
import { APIRoute, errorMessages } from '../../const';
import { adaptComments } from '../../services/adapter';
import { ReviewsServer, PostReview } from '../../types/reviews';

export const fetchComments = (id: string): ThunkActionResult =>
  async (dispatch, _, api): Promise<void> => {
    dispatch(commentsRequest());
    try {
      const { data } = await api.get<ReviewsServer>(`${APIRoute.Comments}/${id}`);
      const reviews = data.map((review) => adaptComments(review));
      dispatch(commentsSucceeded(reviews));
    } catch {
      dispatch(commentsFailed());
      toast.info(errorMessages.comments);
    }
  };

export const postComments = (id: string, { comment, rating }: PostReview): ThunkActionResult =>
  async (dispatch, _, api) => {
    try {
      const { data } = await api.post<ReviewsServer>(`${APIRoute.Comments}/${id}`, { comment, rating });
      const reviews = data.map((review) => adaptComments(review));
      dispatch(postReviewSucceeded(reviews));
      dispatch(postReviewReset());
    } catch {
      dispatch(postReviewReset());
      toast.info(errorMessages.postComment);
    }
  };
