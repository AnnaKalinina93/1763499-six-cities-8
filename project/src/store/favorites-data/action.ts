import { ActionType } from '../../types/action';
import { Offers, Offer } from '../../types/offers';
import { createAction } from '@reduxjs/toolkit';

export const favoritesOffersSucceeded = createAction(
  ActionType.FavoriteOffersSucceeded,
  (offers: Offers) => ({
    payload: offers,
  }),
);

export const favoritesOffersRequest = createAction(ActionType.FavoriteOffersRequest);

export const favoritesOffersFailed = createAction(ActionType.FavoriteOffersFailed);

export const favoritesChange = createAction(
  ActionType.FavoritesChange,
  (offer: Offer) => ({
    payload: offer,
  }),
);

export const favoritesOfferReset = createAction(ActionType.FavoritesOfferReset);
