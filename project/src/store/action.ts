import {
  ActionType,
  CityChangeAction,
  OffersSucssededAction,
  ResetCityAction,
  SortTypeChangeAction,
  RequireAuthorizationAction,
  RequireLogoutAction, OffersRequestAction,
  OffersFailedAction
} from '../types/action';
import { Offers } from '../types/offers';
import { AuthorizationStatus } from '../const';

export const cityChange = (city: string): CityChangeAction => ({
  type: ActionType.СityСhange,
  payload: city,
});

export const offersSucsseded = (offers: Offers): OffersSucssededAction => ({
  type: ActionType.OffersSucsseded,
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

export const requireAuthorization = (authStatus: AuthorizationStatus): RequireAuthorizationAction  => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
});

export const requireLogout = (): RequireLogoutAction => ({
  type: ActionType.RequireLogout,
});
