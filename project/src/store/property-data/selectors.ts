import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';
import { Offers, Offer } from '../../types/offers';
import { Reviews } from '../../types/reviews';

export const getOffer = (state: State): Offer | null  => state[NameSpace.property].offer;
export const getOfferLoading = (state: State): boolean  => state[NameSpace.property].offerLoading;
export const getOfferError = (state: State): boolean  => state[NameSpace.property].offerError;
export const getNearbyOffers = (state: State): Offers  => state[NameSpace.property].nearbyOffers;
export const getNearbyOffersLoading = (state: State): boolean  => state[NameSpace.property].nearbyOffersLoading;
export const getNearbyOffersError = (state: State): boolean  => state[NameSpace.property].nearbyOffersError;
export const getReviews = (state: State): Reviews  => state[NameSpace.property].reviews;
export const getReviewsLoading = (state: State): boolean  => state[NameSpace.property].reviewsLoading;
export const getReviewsError = (state: State): boolean  => state[NameSpace.property].reviewsError;
export const getIsPostReview = (state: State): boolean  => state[NameSpace.property].isPostReview;
