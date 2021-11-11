import { Offer, Offers } from '../types/offers';
import { AuthorizationStatus } from '../const';
import { AuthInfo } from './users';
import { Reviews } from './reviews';
import {RootState} from '../store/root-reduser';


export type State = RootState;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  loginLoading: boolean,
  user: AuthInfo | null,
};

export type MainData = {
  activeCity: string,
  offers: Offers,
  activeSortType: string,
  offersLoading: boolean,
  offersError: boolean,
}

export type PropertyData = {
  offer: Offer | null,
  offerLoading: boolean,
  offerError: boolean,
  nearbyOffers: Offers,
  nearbyOffersLoading: boolean,
  nearbyOffersError: boolean,
  reviews: Reviews,
  reviewsLoading: boolean,
  reviewsError: boolean,
  isPostReview: boolean,
}
