import { Offers } from '../types/offers';

export enum ActionType {
  СityСhange = 'main/cityChange',
  OffersChange = 'main/offersChange',
  ResetCity = 'main/resetCity',
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

export type Actions = CityChangeAction | OffersChangeAction | ResetCityAction;

