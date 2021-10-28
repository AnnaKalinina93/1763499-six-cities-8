import {ActionType, CityChangeAction, OffersChangeAction, ResetCityAction, SortTypeChangeAction, RequireAuthorizationAction, RequireLogoutAction} from '../types/action';
import { Offers } from '../types/offers';
import {AuthorizationStatus} from '../const';

export const cityChange = (city: string): CityChangeAction => ({
  type: ActionType.СityСhange,
  payload: city,
});

export const offersChange = (offers: Offers): OffersChangeAction => ({
  type: ActionType.OffersChange,
  payload: offers,
});

export const resetCity = (): ResetCityAction => ({
  type: ActionType.ResetCity,
});

export const sortTypeChange = (sortType: string): SortTypeChangeAction => ({
  type: ActionType.SortTypeChange,
  payload: sortType,
});

// export const loadOffers = (offers: Offers) : LoadOffersAction => ({
//   type: ActionType.LoadOffers,
//   payload: offers,
// });

export const requireAuthorization = (authStatus: AuthorizationStatus): RequireAuthorizationAction  => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
});

export const requireLogout = (): RequireLogoutAction => ({
  type: ActionType.RequireLogout,
});
