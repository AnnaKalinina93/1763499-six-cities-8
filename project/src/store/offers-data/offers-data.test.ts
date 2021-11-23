import { offersData } from './offers-data';
import {
  offersRequest,
  offersSucceeded,
  offersFailed,
  offerRequest,
  offerSucceeded,
  offerFailed ,
  nearbyOffersRequest,
  nearbyOffersSucceeded,
  nearbyOffersFailed
} from './action';
import { favoritesChange } from '../favorites-data/action';
import { makeFakeOffer } from '../../utils/mocks';

const offers = new Array(5).fill(null).map(()=>(makeFakeOffer()));
const offer = makeFakeOffer();

describe('Reduser: OffersData', () => {

  it('should change offers loading in state', () => {
    const state = {
      offers: [],
      offersLoading: false,
      offersError: false,
      offer: null,
      offerLoading: false,
      offerError: false,
      nearbyOffers: [],
      nearbyOffersLoading: false,
      nearbyOffersError: false,
    };
    expect(offersData(state, offersRequest()))
      .toEqual({
        offers: [],
        offersLoading: true,
        offersError: false,
        offer: null,
        offerLoading: false,
        offerError: false,
        nearbyOffers: [],
        nearbyOffersLoading: false,
        nearbyOffersError: false,
      });
  });

  it('should add offers in state', () => {
    const state = {
      offers: [],
      offersLoading: true,
      offersError: false,
      offer: null,
      offerLoading: false,
      offerError: false,
      nearbyOffers: [],
      nearbyOffersLoading: false,
      nearbyOffersError: false,
    };
    expect(offersData(state, offersSucceeded(offers)))
      .toEqual({
        offers: offers,
        offersLoading: false,
        offersError: false,
        offer: null,
        offerLoading: false,
        offerError: false,
        nearbyOffers: [],
        nearbyOffersLoading: false,
        nearbyOffersError: false,
      });
  });

  it('should add error offers in state', () => {
    const state = {
      offers: [],
      offersLoading: false,
      offersError: false,
      offer: null,
      offerLoading: false,
      offerError: false,
      nearbyOffers: [],
      nearbyOffersLoading: false,
      nearbyOffersError: false,
    };
    expect(offersData(state, offersFailed()))
      .toEqual({
        offers: [],
        offersLoading: false,
        offersError: true,
        offer: null,
        offerLoading: false,
        offerError: false,
        nearbyOffers: [],
        nearbyOffersLoading: false,
        nearbyOffersError: false,
      });
  });

  it('should change offer loading in state', () => {
    const state = {
      offers: [],
      offersLoading: false,
      offersError: false,
      offer: null,
      offerLoading: false,
      offerError: false,
      nearbyOffers: [],
      nearbyOffersLoading: false,
      nearbyOffersError: false,
    };
    expect(offersData(state, offerRequest()))
      .toEqual({
        offers: [],
        offersLoading: false,
        offersError: false,
        offer: null,
        offerLoading: true,
        offerError: false,
        nearbyOffers: [],
        nearbyOffersLoading: false,
        nearbyOffersError: false,
      });
  });

  it('should add offer in state', () => {
    const state = {
      offers: [],
      offersLoading: false,
      offersError: false,
      offer: null,
      offerLoading: false,
      offerError: false,
      nearbyOffers: [],
      nearbyOffersLoading: false,
      nearbyOffersError: false,
    };
    expect(offersData(state, offerSucceeded(offer)))
      .toEqual({
        offers: [],
        offersLoading: false,
        offersError: false,
        offer: offer,
        offerLoading: false,
        offerError: false,
        nearbyOffers: [],
        nearbyOffersLoading: false,
        nearbyOffersError: false,
      });
  });

  it('should add error offer in state', () => {
    const state = {
      offers: [],
      offersLoading: false,
      offersError: false,
      offer: null,
      offerLoading: false,
      offerError: false,
      nearbyOffers: [],
      nearbyOffersLoading: false,
      nearbyOffersError: false,
    };
    expect(offersData(state, offerFailed()))
      .toEqual({
        offers: [],
        offersLoading: false,
        offersError: false,
        offer: null,
        offerLoading: false,
        offerError: true,
        nearbyOffers: [],
        nearbyOffersLoading: false,
        nearbyOffersError: false,
      });
  });

  it('should change nearby offers loading in state', () => {
    const state = {
      offers: [],
      offersLoading: false,
      offersError: false,
      offer: null,
      offerLoading: false,
      offerError: false,
      nearbyOffers: [],
      nearbyOffersLoading: false,
      nearbyOffersError: false,
    };
    expect(offersData(state, nearbyOffersRequest()))
      .toEqual({
        offers: [],
        offersLoading: false,
        offersError: false,
        offer: null,
        offerLoading: false,
        offerError: false,
        nearbyOffers: [],
        nearbyOffersLoading: true,
        nearbyOffersError: false,
      });
  });

  it('should add nerby offers in state', () => {
    const state = {
      offers: [],
      offersLoading: false,
      offersError: false,
      offer: null,
      offerLoading: false,
      offerError: false,
      nearbyOffers: [],
      nearbyOffersLoading: false,
      nearbyOffersError: false,
    };
    expect(offersData(state, nearbyOffersSucceeded(offers)))
      .toEqual({
        offers: [],
        offersLoading: false,
        offersError: false,
        offer: null,
        offerLoading: false,
        offerError: false,
        nearbyOffers: offers,
        nearbyOffersLoading: false,
        nearbyOffersError: false,
      });
  });

  it('should add error nerby offers in state', () => {
    const state = {
      offers: [],
      offersLoading: false,
      offersError: false,
      offer: null,
      offerLoading: false,
      offerError: false,
      nearbyOffers: [],
      nearbyOffersLoading: false,
      nearbyOffersError: false,
    };
    expect(offersData(state, nearbyOffersFailed()))
      .toEqual({
        offers: [],
        offersLoading: false,
        offersError: false,
        offer: null,
        offerLoading: false,
        offerError: false,
        nearbyOffers: [],
        nearbyOffersLoading: false,
        nearbyOffersError: true,
      });
  });

  it('should change favorites offers in offers in state', () => {
    const pastOffer = makeFakeOffer();
    const updateOffer = makeFakeOffer();
    pastOffer.id = updateOffer.id;
    const firstOffer = makeFakeOffer();
    const secondOffer = makeFakeOffer();

    const state = {
      offers: [firstOffer, pastOffer, secondOffer],
      offersLoading: false,
      offersError: false,
      offer: pastOffer,
      offerLoading: false,
      offerError: false,
      nearbyOffers: [firstOffer, secondOffer, pastOffer],
      nearbyOffersLoading: false,
      nearbyOffersError: false,
    };

    expect(offersData(state, favoritesChange(updateOffer)))
      .toEqual({
        offers: [firstOffer, Object.assign({}, pastOffer , {isFavorite: updateOffer.isFavorite}) , secondOffer],
        offersLoading: false,
        offersError: false,
        offer: Object.assign({}, pastOffer , {isFavorite: updateOffer.isFavorite}),
        offerLoading: false,
        offerError: false,
        nearbyOffers: [firstOffer, secondOffer, Object.assign({}, pastOffer , {isFavorite: updateOffer.isFavorite})],
        nearbyOffersLoading: false,
        nearbyOffersError: false,
      });
  });

});

