import {ActionType, CityChangeAction, OffersChangeAction, ResetCityAction} from '../types/action';
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
