import { makeFakeOffer } from '../../utils/mocks';
import {
  favoritesChange,
  favoritesOfferReset,
  favoritesOffersFailed,
  favoritesOffersRequest,
  favoritesOffersSucceeded
} from './action';
import { favoritesOffersData } from './favorites-data';

const fakeFavoritesOffers = new Array(2).fill(null).map(() => (makeFakeOffer()));

describe('Reduser: favoritesData', () => {
  it('should return "true" favorites offers loading in state', () => {
    const state = {
      favoritesOffers: [],
      favoritesOffersLoading: false,
      favoritesOffersError: false,
      favoritesOffer: null,
    };
    expect(favoritesOffersData(state, favoritesOffersRequest()))
      .toEqual({
        favoritesOffers: [],
        favoritesOffersLoading: true,
        favoritesOffersError: false,
        favoritesOffer: null,
      });
  });

  it('should return favorites offers in state', () => {
    const state = {
      favoritesOffers: [],
      favoritesOffersLoading: true,
      favoritesOffersError: false,
      favoritesOffer: null,
    };
    expect(favoritesOffersData(state, favoritesOffersSucceeded(fakeFavoritesOffers)))
      .toEqual({
        favoritesOffers: fakeFavoritesOffers,
        favoritesOffersLoading: false,
        favoritesOffersError: false,
        favoritesOffer: null,
      });
  });

  it('should return error favorites offers in state', () => {
    const state = {
      favoritesOffers: [],
      favoritesOffersLoading: true,
      favoritesOffersError: false,
      favoritesOffer: null,
    };
    expect(favoritesOffersData(state, favoritesOffersFailed()))
      .toEqual({
        favoritesOffers: [],
        favoritesOffersLoading: false,
        favoritesOffersError: true,
        favoritesOffer: null,
      });
  });

  it('should return favorites offer and change offers in state', () => {

    const fakeOffer = makeFakeOffer();
    const firstOffer = makeFakeOffer();
    const secondOffer = makeFakeOffer();
    const fakeOffers = [firstOffer, fakeOffer, secondOffer];
    const state = {
      favoritesOffers: fakeOffers,
      favoritesOffersLoading: false,
      favoritesOffersError: false,
      favoritesOffer: null,
    };

    expect(favoritesOffersData(state, favoritesChange(fakeOffer)))
      .toEqual({
        favoritesOffers: [firstOffer, secondOffer],
        favoritesOffersLoading: false,
        favoritesOffersError: false,
        favoritesOffer: fakeOffer,
      });
  });

  it('should return reset favorites offer in state', () => {
    const state = {
      favoritesOffers: fakeFavoritesOffers,
      favoritesOffersLoading: false,
      favoritesOffersError: false,
      favoritesOffer: makeFakeOffer(),
    };
    expect(favoritesOffersData(state, favoritesOfferReset()))
      .toEqual({
        favoritesOffers: fakeFavoritesOffers,
        favoritesOffersLoading: false,
        favoritesOffersError: false,
        favoritesOffer: null,
      });
  });
});
