import { ActionType, Actions } from '../types/action';
import { State } from '../types/state';
import { sortType, AuthorizationStatus } from '../const';

const initialState = {
  activeCity: 'Paris',
  offers: [],
  activeSortType: sortType.popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  offersLoading: false,
  offersError: false,
  loginLoading: false,
  offer: null,
  offerLoading: false,
  offerError: false,
  nearbyOffers: [],
  nearbyOffersLoading: false,
  nearbyOffersError: false,
  user: null,
  reviews: [],
  reviewsLoading: false,
  reviewsError: false,
  isPostReview: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.СityСhange:
      return { ...state, activeCity: action.payload };
    case ActionType.OffersRequest:
      return {
        ...state,
        offersLoading: true,
      };
    case ActionType.OffersSucceeded:
      return {
        ...state,
        offers: action.payload,
        offersLoading: false,
        offersError: false,
      };
    case ActionType.OffersFailed:
      return {
        ...state,
        offersLoading: false,
        offersError: true,
      };
    case ActionType.ResetCity:
      return { ...initialState };
    case ActionType.SortTypeChange:
      return { ...state, activeSortType: action.payload };
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
        loginLoading: false,
      };
    case ActionType.RequireLogout:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      };
    case ActionType.LoginRequest:
      return { ...state, loginLoading: true };
    case ActionType.LoginSucceeded:
      return {
        ...state,
        user: action.payload,
        loginLoading: false,
      };
    case ActionType.LoginFailed:
      return { ...state, loginLoading: false };
    case ActionType.OfferRequest:
      return { ...state, offerLoading: true, offerError: false };
    case ActionType.OfferSucceeded:
      return { ...state, offerLoading: false, offer: action.payload };
    case ActionType.OfferFailed:
      return { ...state, offerLoading: false, offerError: true };
    case ActionType.NearbyOffersRequest:
      return { ...state, nearbyOffersLoading: true, nearbyOffers: [] };
    case ActionType.NearbyOffersSucceeded:
      return { ...state, nearbyOffers: action.payload, nearbyOffersLoading: false };
    case ActionType.NearbyOffersFailed:
      return { ...state, nearbyOffersLoading: false, nearbyOffersError: true };
    case ActionType.CommentsRequest:
      return { ...state, reviewsLoading: true };
    case ActionType.CommentsSucceeded:
      return { ...state, reviewsLoading: false, reviews: action.payload };
    case ActionType.CommentsFailed:
      return { ...state, reviewsLoading: false, reviewsError: true };
    case ActionType.PostReviewSucceeded:
      return { ...state, reviews: action.payload, isPostReview: true };
    case ActionType.PostReviewReset:
      return { ...state, isPostReview: false };
    default:
      return state;
  }
};

export { reducer };
