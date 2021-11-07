import { Offer, Offers } from '../types/offers';
import { AuthorizationStatus } from '../const';
import { AuthInfo } from './users';
import { Reviews } from './reviews';

export type State = {
  activeCity: string,
  offers: Offers,
  activeSortType: string,
  authorizationStatus: AuthorizationStatus,
  offersLoading: boolean,
  offersError: boolean,
  email: string,
  password: string,
  avatarUrl: string,
  offer: Offer | null,
  loginLoading: boolean,
  offerLoading: boolean,
  offerError: boolean,
  nearbyOffers: Offers,
  nearbyOffersLoading: boolean,
  nearbyOffersError: boolean,
  user: AuthInfo | null,
  reviews: Reviews,
  reviewsLoading: boolean,
  reviewsError: boolean,
};
