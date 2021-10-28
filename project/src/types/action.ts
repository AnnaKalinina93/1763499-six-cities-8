import { Offers } from '../types/offers';
import { AuthorizationStatus } from '../const';
import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';
import {
  AxiosInstance
} from 'axios';
import {State} from '../types/state';

export enum ActionType {
  СityСhange = 'main/cityChange',
  OffersChange = 'main/offersChange',
  ResetCity = 'main/resetCity',
  SortTypeChange = 'sort/sortTypeChange',
  LoadOffers = 'main/loadOffers',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
}

export type CityChangeAction = {
  type: ActionType.СityСhange;
  payload: string;
};

export type OffersChangeAction = {
  type: ActionType.OffersChange;
  payload: Offers
};

export type ResetCityAction = {
  type: ActionType.ResetCity;
};

export type SortTypeChangeAction = {
  type: ActionType.SortTypeChange;
  payload : string;
}

// export type LoadOffersAction = {
//   type: ActionType.LoadOffers,
//   payload: Offers,
// }

export type RequireAuthorizationAction = {
  type: ActionType.RequireAuthorization;
  payload: AuthorizationStatus;
}

export type RequireLogoutAction = {
  type: ActionType.RequireLogout;
}
export type Actions = CityChangeAction | OffersChangeAction | ResetCityAction | SortTypeChangeAction | RequireAuthorizationAction | RequireLogoutAction;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
