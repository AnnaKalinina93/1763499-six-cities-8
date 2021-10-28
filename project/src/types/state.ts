import { Offers } from '../types/offers';
import { AuthorizationStatus } from '../const';

export type State = {
  activeCity: string,
  offers: Offers,
  activeSortType: string,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};
