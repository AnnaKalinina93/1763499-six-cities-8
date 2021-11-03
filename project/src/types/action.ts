import { Offers } from '../types/offers';
import { AuthorizationStatus } from '../const';
import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from '../types/state';
import { AppRoute } from '../const';

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
  payload: {
    email: string,
    password: string,
  };
}

export type LoginFailedAction = {
  type: ActionType.LoginFailed;
};

export type RedirectToRouteAction = {
  type: ActionType.RedirectToRoute;
  payload: AppRoute;
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
  RedirectToRouteAction;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
