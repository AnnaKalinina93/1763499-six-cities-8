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
  LoginFailedAction
} from '../types/action';
import { Offers } from '../types/offers';
import { AuthorizationStatus, AppRoute } from '../const';

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
