import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';
import { Offers } from '../../types/offers';


export const getActiveCity = (state: State): string => state[NameSpace.main].activeCity;
export const getOffers = (state: State): Offers => state[NameSpace.main].offers;
export const getActiveSortType = (state: State): string => state[NameSpace.main].activeSortType;
export const getOffersLoading  = (state: State): boolean => state[NameSpace.main].offersLoading;
export const getOffersError= (state: State): boolean => state[NameSpace.main].offersError;
