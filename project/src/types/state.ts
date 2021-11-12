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

export type OffersData = {
  offers: Offers,
  offersLoading: boolean,
  offersError: boolean,
  offer: Offer | null,
  offerLoading: boolean,
  offerError: boolean,
  nearbyOffers: Offers,
  nearbyOffersLoading: boolean,
  nearbyOffersError: boolean,
}

export type CommentsData = {
  reviews: Reviews,
  reviewsLoading: boolean,
  reviewsError: boolean,
  isPostReview: boolean,
}

export type UiState = {
  activeCity: string,
  activeSortType: string,
}
