import {ActionType, CityChangeAction, OffersChangeAction, ResetCityAction, SortTypeChangeAction} from '../types/action';
import { Offers } from '../types/offers';

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
