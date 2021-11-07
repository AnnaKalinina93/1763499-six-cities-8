import {
  ActionType,
  CityChangeAction,
  OffersSucceededAction,
  ResetCityAction,
  SortTypeChangeAction,
  RequireAuthorizationAction,
  RequireLogoutAction, OffersRequestAction,
  OffersFailedAction,
  LoginRequestAction,
  LoginSucceededAction,
  RedirectToRouteAction,
  LoginFailedAction,
  OfferRequestAction,
  OfferSucceededAction,
  OfferFailedAction,
  NearbyOffersRequestAction,
  NearbyOffersSucceededAction,
  NearbyOffersFailedAction,
  CommentsRequestAction,
  CommentsSucceededAction,
  CommentsFailedAction
} from '../types/action';
import { Offer, Offers } from '../types/offers';
import { AuthorizationStatus, AppRoute } from '../const';
import { Reviews } from '../types/reviews';

export const cityChange = (city: string): CityChangeAction => ({
  type: ActionType.СityСhange,
  payload: city,
});

export const offersSucceeded = (offers: Offers): OffersSucceededAction => ({
  type: ActionType.OffersSucceeded,
  payload: offers,
});

export const offersRequest = (): OffersRequestAction => ({
  type: ActionType.OffersRequest,
});

export const offersFailed = (): OffersFailedAction => ({
  type: ActionType.OffersFailed,
});

export const offerRequest = (): OfferRequestAction => ({
  type: ActionType.OfferRequest,
});

export const offerSucceeded = (offer: Offer): OfferSucceededAction => ({
  type: ActionType.OfferSucceeded,
  payload: offer,
});

export const offerFailed = (): OfferFailedAction => ({
  type: ActionType.OfferFailed,
});

export const resetCity = (): ResetCityAction => ({
  type: ActionType.ResetCity,
});

export const sortTypeChange = (sortType: string): SortTypeChangeAction => ({
  type: ActionType.SortTypeChange,
  payload: sortType,
});

export const requireAuthorization = (authStatus: AuthorizationStatus): RequireAuthorizationAction => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
});

export const requireLogout = (): RequireLogoutAction => ({
  type: ActionType.RequireLogout,
});

export const loginRequest = (): LoginRequestAction => ({
  type: ActionType.LoginRequest,
});

export const loginSucceeded = (email: string, password: string, avatarUrl: string): LoginSucceededAction => ({
  type: ActionType.LoginSucceeded,
  payload: {
    email,
    password,
    avatarUrl,
  },
});

export const loginFailed = (): LoginFailedAction => ({
  type: ActionType.LoginFailed,
});

export const redirectToRoute = (url: AppRoute): RedirectToRouteAction => ({
  type: ActionType.RedirectToRoute,
  payload: url,
});

export const nearbyOffersRequest = (): NearbyOffersRequestAction => ({
  type: ActionType.NearbyOffersRequest,
});

export const nearbyOffersSucceeded = (offers: Offers): NearbyOffersSucceededAction => ({
  type: ActionType.NearbyOffersSucceeded,
  payload: offers,
});

export const nearbyOffersFailed = (): NearbyOffersFailedAction => ({
  type: ActionType.NearbyOffersFailed,
});

export const commentsRequest = (): CommentsRequestAction => ({
  type: ActionType.CommentsRequest,
});

export const commentsSucceeded = (reviews: Reviews): CommentsSucceededAction => ({
  type: ActionType.CommentsSucceeded,
  payload: reviews,
});

export const commentsFailed = (): CommentsFailedAction => ({
  type: ActionType.CommentsFailed,
});
