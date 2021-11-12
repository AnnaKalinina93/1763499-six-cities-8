import { ActionType } from '../../types/action';
import { Offer, Offers } from '../../types/offers';
import { createAction } from '@reduxjs/toolkit';

export const offersSucceeded = createAction(
  ActionType.OffersSucceeded,
  (offers: Offers) => ({
    payload: offers,
  }),
);

export const offersRequest = createAction(ActionType.OffersRequest);

export const offersFailed = createAction(ActionType.OffersFailed);

export const offerRequest = createAction(ActionType.OfferRequest);

export const offerSucceeded = createAction(ActionType.OfferSucceeded,
  (offer: Offer) => ({
    payload: offer,
  }),
);

export const offerFailed = createAction(ActionType.OfferFailed);

export const nearbyOffersRequest = createAction(ActionType.NearbyOffersRequest);

export const nearbyOffersSucceeded = createAction(
  ActionType.NearbyOffersSucceeded,
  (offers: Offers) => ({
    payload: offers,
  }),
);

export const nearbyOffersFailed = createAction(ActionType.NearbyOffersFailed);

