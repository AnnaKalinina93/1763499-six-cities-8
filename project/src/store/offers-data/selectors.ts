import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';
import { Offers, Offer } from '../../types/offers';
import { createSelector } from 'reselect';
import { getActiveCity, getActiveSortType } from '../ui-state/selectors';
import { getSortSelectedOffers } from '../../util';

export const getOffers = (state: State): Offers => state[NameSpace.Offers].offers;
export const getOffersLoading = (state: State): boolean => state[NameSpace.Offers].offersLoading;
export const getOffersError = (state: State): boolean => state[NameSpace.Offers].offersError;
export const getOffer = (state: State): Offer | null => state[NameSpace.Offers].offer;
export const getOfferLoading = (state: State): boolean => state[NameSpace.Offers].offerLoading;
export const getOfferError = (state: State): boolean => state[NameSpace.Offers].offerError;
export const getNearbyOffers = (state: State): Offers => state[NameSpace.Offers].nearbyOffers;
export const getNearbyOffersLoading = (state: State): boolean => state[NameSpace.Offers].nearbyOffersLoading;
export const getNearbyOffersError = (state: State): boolean => state[NameSpace.Offers].nearbyOffersError;

export const getSortOffers = createSelector([getOffers, getActiveCity, getActiveSortType], (correntOffers, activeCity, activeSortType) => {
  const selectedOffers: Offers = correntOffers.filter(
    (offer) => offer.city.name === activeCity);
  return getSortSelectedOffers(activeSortType, selectedOffers);
});

