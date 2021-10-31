import { Offers } from '../types/offers';
import { AuthorizationStatus } from '../const';
import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';
import {
  AxiosInstance
} from 'axios';
import { State } from '../types/state';

export enum ActionType {
  СityСhange = 'main/cityChange',
  OffersSucsseded = 'main/offersSucsseded',
  OffersRequest = 'main/offersRequest',
  OffersFailed = 'main/offersFailed',
  ResetCity = 'main/resetCity',
  SortTypeChange = 'sort/sortTypeChange',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
}

export type CityChangeAction = {
  type: ActionType.СityСhange;
  payload: string;
};

export type OffersRequestAction = {
  type: ActionType.OffersRequest;
}

export type OffersSucssededAction = {
  type: ActionType.OffersSucsseded;
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
export type Actions = CityChangeAction |
  OffersSucssededAction |
  OffersRequestAction |
  OffersFailedAction |
  ResetCityAction |
  SortTypeChangeAction |
  RequireAuthorizationAction |
  RequireLogoutAction;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
