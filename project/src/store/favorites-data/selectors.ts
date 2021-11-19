import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';
import { Offers, Offer } from '../../types/offers';
import { createSelector } from 'reselect';

export const getFavoritesOffersLoading = (state: State): boolean => state[NameSpace.Favorites].favoritesOffersLoading;
export const getFavoritesOffersError = (state: State): boolean => state[NameSpace.Favorites].favoritesOffersError;
export const getFavoritesOffers = (state: State): Offers => state[NameSpace.Favorites].favoritesOffers;

export const getFavoritesChangeOffers = createSelector([getFavoritesOffers], (offers) => {
  const sortOffers = offers.reduce<{ [key: string]: Offers }>((acc: { [key: string]: Offers }, currentOffer: Offer) => {
    if (currentOffer.isFavorite) {
      if (!acc[currentOffer.city.name]) {
        acc[currentOffer.city.name] = [];
      }

      acc[currentOffer.city.name].push(currentOffer);
    }

    return acc;
  }, {});
  return sortOffers;
});
