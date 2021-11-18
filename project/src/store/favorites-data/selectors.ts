import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';
import { Offers, Offer } from '../../types/offers';

export const getFavoritesOffersLoading = (state: State): boolean => state[NameSpace.Favorites].favoritesOffersLoading;
export const getFavoritesOffersError = (state: State): boolean => state[NameSpace.Favorites].favoritesOffersError;
export const getFavoritesOffers = (state: State): Offers => state[NameSpace.Favorites].favoritesOffers;
export const favoritesChange = (state: State): Offer | null => state[NameSpace.Favorites].favoritesOffer;

