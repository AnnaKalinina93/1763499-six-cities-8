import { ActionType } from '../types/action';
import { Offer, Offers } from '../types/offers';
import { AuthorizationStatus, AppRoute } from '../const';
import { Reviews } from '../types/reviews';
import { AuthInfo } from '../types/users';
import {createAction} from '@reduxjs/toolkit';


export const cityChange = createAction(
  ActionType.СityСhange,
  (city: string) => ({
    payload: city,
  }),
);

export const offersSucceeded = createAction(
  ActionType.OffersSucceeded,
  (offers: Offers) => ({
    payload: offers,
  }),
);

export const offersRequest = createAction(ActionType.OffersRequest);


export const offersFailed = createAction(ActionType.OffersFailed);

export const offerRequest = createAction(ActionType.OfferRequest);


export const offerSucceeded = createAction(ActionType.OfferSucceeded,
  (offer: Offer) => ({
    payload: offer,
  }),
);

export const offerFailed = createAction(ActionType.OfferFailed);

export const resetCity = createAction(ActionType.ResetCity);

export const sortTypeChange = createAction(
  ActionType.SortTypeChange,
  (sortType: string) => ({
    payload: sortType,
  }),
);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: authStatus,
  }),
);

export const requireLogout = createAction(ActionType.RequireLogout);

export const loginRequest = createAction(ActionType.LoginRequest);

export const loginSucceeded = createAction(
  ActionType.LoginSucceeded,
  (user: AuthInfo) => ({
    payload: user,
  }),
);


export const loginFailed = createAction(ActionType.LoginFailed);

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: AppRoute) => ({
    payload: url,
  }),
);

export const nearbyOffersRequest = createAction(ActionType.NearbyOffersRequest);

export const nearbyOffersSucceeded = createAction(
  ActionType.NearbyOffersSucceeded,
  (offers: Offers) => ({
    payload: offers,
  }),
);

export const nearbyOffersFailed = createAction(ActionType.NearbyOffersFailed);

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
