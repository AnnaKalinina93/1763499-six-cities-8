import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';
import { Offers, Offer } from '../../types/offers';

export const getFavoritesOffersLoading  = (state: State): boolean => state[NameSpace.favorites].favoritesOffersLoading;
export const getFavoritesOffersError  = (state: State): boolean => state[NameSpace.favorites].favoritesOffersError;
export const getFavoritesOffers = (state: State): Offers => state[NameSpace.favorites].favoritesOffers;
export const favoritesChange = (state: State): Offer | null => state[NameSpace.favorites].favoritesOffer;

