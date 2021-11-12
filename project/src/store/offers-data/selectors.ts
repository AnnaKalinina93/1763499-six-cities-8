import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';
import { Offers, Offer } from '../../types/offers';
import { createSelector } from 'reselect';
import { getActiveCity, getActiveSortType } from '../ui-state/selectors';
import { getSortSelectedOffers } from '../../util';

export const getOffers = (state: State): Offers => state[NameSpace.offers].offers;
export const getOffersLoading  = (state: State): boolean => state[NameSpace.offers].offersLoading;
export const getOffersError= (state: State): boolean => state[NameSpace.offers].offersError;
export const getOffer = (state: State): Offer | null  => state[NameSpace.offers].offer;
export const getOfferLoading = (state: State): boolean  => state[NameSpace.offers].offerLoading;
export const getOfferError = (state: State): boolean  => state[NameSpace.offers].offerError;
export const getNearbyOffers = (state: State): Offers  => state[NameSpace.offers].nearbyOffers;
export const getNearbyOffersLoading = (state: State): boolean  => state[NameSpace.offers].nearbyOffersLoading;
export const getNearbyOffersError = (state: State): boolean  => state[NameSpace.offers].nearbyOffersError;


export const getSortOffers = createSelector([getOffers, getActiveCity, getActiveSortType],(offers, activeCity, activeSortType)=>{
  const selectedOffers: Offers = offers.filter(
    (offer) => offer.city.name === activeCity);
  return getSortSelectedOffers(activeSortType, selectedOffers);
});
