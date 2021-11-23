import { commentsData } from './comments-data';
import {
  commentsFailed,
  commentsRequest,
  commentsSucceeded,
  postReviewReset,
  postReviewSucceeded
} from './action';
import { makeFakeReview } from '../../utils/mocks';

const reviews =  new Array(2).fill(null).map(()=>(makeFakeReview()));
describe('Reduser: commentsData', () => {
  it('should return "true" reviews loading in state', () => {
    const state = {
      reviews: [],
      reviewsLoading: false,
      reviewsError: false,
      isPostReview: false,
    };
    expect(commentsData(state, commentsRequest()))
      .toEqual({
        reviews: [],
        reviewsLoading: true,
        reviewsError: false,
        isPostReview: false,
      });
  });
  it('should add reviews in state', () => {
    const state = {
      reviews: [],
      reviewsLoading: true,
      reviewsError: false,
      isPostReview: false,
    };
    expect(commentsData(state, commentsSucceeded(reviews)))
      .toEqual({
        reviews: reviews,
        reviewsLoading: false,
        reviewsError: false,
        isPostReview: false,
      });
  });

  it('should add error reviews in state', () => {
    const state = {
      reviews: [],
      reviewsLoading: true,
      reviewsError: false,
      isPostReview: false,
    };
    expect(commentsData(state, commentsFailed()))
      .toEqual({
        reviews: [],
        reviewsLoading: false,
        reviewsError: true,
        isPostReview: false,
      });
  });

  it('should add post comment in state', () => {
    const state = {
      reviews: reviews,
      reviewsLoading: false,
      reviewsError: false,
      isPostReview: false,
    };
    const newReviews = new Array(3).fill(null).map(()=>(makeFakeReview()));
    expect(commentsData(state, postReviewSucceeded(newReviews)))
      .toEqual({
        reviews: newReviews,
        reviewsLoading: false,
        reviewsError: false,
        isPostReview: true,
      });
  });

  it('should reset post review in state', () => {
    const state = {
      reviews: reviews,
      reviewsLoading: false,
      reviewsError: false,
      isPostReview: true,
    };
    expect(commentsData(state, postReviewReset()))
      .toEqual({
        reviews: reviews,
        reviewsLoading: false,
        reviewsError: false,
        isPostReview: false,
      });
  });
});
