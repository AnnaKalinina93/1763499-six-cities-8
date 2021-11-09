import { Offer, Offers } from '../types/offers';
import { AuthorizationStatus } from '../const';
import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from '../types/state';
import { AppRoute } from '../const';
import { Reviews } from './reviews';
import { AuthInfo } from './users';

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
}

export type CityChangeAction = {
  type: ActionType.СityСhange;
  payload: string;
};

export type OffersRequestAction = {
  type: ActionType.OffersRequest;
}

export type OffersSucceededAction = {
  type: ActionType.OffersSucceeded;
  payload: Offers
};

export type OffersFailedAction = {
  type: ActionType.OffersFailed;
}

export type OfferRequestAction = {
  type: ActionType.OfferRequest;
}

export type OfferSucceededAction = {
  type: ActionType.OfferSucceeded;
  payload: Offer;
}

export type OfferFailedAction = {
  type: ActionType.OfferFailed;
}

export type ResetCityAction = {
  type: ActionType.ResetCity;
};

export type SortTypeChangeAction = {
  type: ActionType.SortTypeChange;
  payload: string;
}

export type RequireAuthorizationAction = {
  type: ActionType.RequireAuthorization;
  payload: AuthorizationStatus;
}

export type RequireLogoutAction = {
  type: ActionType.RequireLogout;
}

export type LoginRequestAction = {
  type: ActionType.LoginRequest;
}

export type LoginSucceededAction = {
  type: ActionType.LoginSucceeded;
  payload: AuthInfo;
}

export type LoginFailedAction = {
  type: ActionType.LoginFailed;
};

export type RedirectToRouteAction = {
  type: ActionType.RedirectToRoute;
  payload: AppRoute;
};

export type NearbyOffersRequestAction = {
  type: ActionType.NearbyOffersRequest;
};

export type NearbyOffersSucceededAction = {
  type: ActionType.NearbyOffersSucceeded;
  payload: Offers;
};

export type NearbyOffersFailedAction = {
  type: ActionType.NearbyOffersFailed;
};

export type CommentsRequestAction = {
  type: ActionType.CommentsRequest;
};

export type CommentsSucceededAction = {
  type: ActionType.CommentsSucceeded;
  payload: Reviews;
};

export type CommentsFailedAction = {
  type: ActionType.CommentsFailed;
};

export type PostReviewSucceededAction = {
  type: ActionType.PostReviewSucceeded;
  payload: Reviews,
};

export type PostReviewResetAction = {
  type: ActionType.PostReviewReset;
};

export type Actions = CityChangeAction |
  OffersSucceededAction |
  OffersRequestAction |
  OffersFailedAction |
  ResetCityAction |
  SortTypeChangeAction |
  RequireAuthorizationAction |
  RequireLogoutAction |
  LoginRequestAction |
  LoginSucceededAction |
  LoginFailedAction |
  RedirectToRouteAction |
  OfferRequestAction |
  OfferSucceededAction |
  OfferFailedAction |
  NearbyOffersRequestAction |
  NearbyOffersSucceededAction |
  NearbyOffersFailedAction |
  CommentsRequestAction |
  CommentsSucceededAction |
  CommentsFailedAction |
  PostReviewSucceededAction |
  PostReviewResetAction;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
