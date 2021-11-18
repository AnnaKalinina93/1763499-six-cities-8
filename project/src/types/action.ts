import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';
import { Action } from 'redux';
import { AxiosInstance } from 'axios';
import { State } from '../types/state';

export enum ActionType {
  СityСhange = 'main/cityChange',
  OffersSucceeded = 'main/offersSucceeded',
  OffersRequest = 'main/offersRequest',
  OffersFailed = 'main/offersFailed',
  ResetCity = 'main/resetCity',
  SortTypeChange = 'sort/sortTypeChange',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  LoginRequest = 'login/loginRequest',
  LoginSucceeded = 'login/loginSucceeded',
  LoginFailed = 'login/loginFailed',
  RedirectToRoute = 'app/redirectToRoute',
  OfferRequest = 'property/offerRequest',
  OfferSucceeded = 'property/offerSucceeded',
  OfferFailed = 'property/offerFailed',
  NearbyOffersRequest = 'property/nearbyOffersRequest',
  NearbyOffersSucceeded = 'property/nearbyOffersSucceeded',
  NearbyOffersFailed = 'property/nearbyOffersFailed',
  CommentsRequest = 'reviews/commentsRequest',
  CommentsSucceeded = 'reviews/commentsSucceeded',
  CommentsFailed = 'reviews/commentsFailed',
  PostReviewSucceeded = 'reviews/postReviewSucceeded',
  PostReviewReset = 'reviews/postReviewReset',
  FavoriteOffersRequest = 'favorite/offersRequest',
  FavoriteOffersSucceeded = 'favorites/offersSucceeded',
  FavoriteOffersFailed = 'favorites/offersFailed',
  FavoritesChange = 'favorites/favoritesChange',
  FavoritesOfferReset = 'favorites/favoritesOfferReset'
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
