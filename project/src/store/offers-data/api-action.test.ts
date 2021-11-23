import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import { APIRoute } from '../../const';
import { State } from '../../types/state';
import { adaptOffer } from '../../services/adapter';
import { makeFakeServerOffer } from '../../utils/mocks';
import { fetchNearbyOffers, fetchOfferAction, fetchOffersAction } from './api-action';
import { offersRequest, offersSucceeded, offerRequest, offerSucceeded, offerFailed, nearbyOffersRequest, nearbyOffersSucceeded } from './action';

describe('Async offers data actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should offers when server return 200', async () => {
    const store = mockStore();
    const fakeOffers = new Array(2).fill(null).map(() => (makeFakeServerOffer()));
    const offers = fakeOffers.map((offer) => adaptOffer(offer));
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, fakeOffers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOffersAction());

    expect(store.getActions()).toEqual([
      offersRequest(),
      offersSucceeded(offers),
    ]);
  });

  it('should offer when server return 200', async () => {
    const store = mockStore();
    const fakeOffer = makeFakeServerOffer();

    mockAPI
      .onGet(`${APIRoute.Offers}/${fakeOffer.id}`)
      .reply(200, fakeOffer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOfferAction(fakeOffer.id));

    expect(store.getActions()).toEqual([
      offerRequest(),
      offerSucceeded(adaptOffer(fakeOffer)),
    ]);
  });

  it('should return offer error when server return 404', async () => {
    const store = mockStore();
    const fakeOffer = makeFakeServerOffer();

    mockAPI
      .onGet(`${APIRoute.Offers}/456`)
      .reply(404, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOfferAction(fakeOffer.id));

    expect(store.getActions()).toEqual([
      offerRequest(),
      offerFailed(),
    ]);
  });

  it('should nearby offers when server return 200', async () => {
    const store = mockStore();
    const fakeOffers = new Array(2).fill(null).map(() => (makeFakeServerOffer()));
    const offers = fakeOffers.map((offer) => adaptOffer(offer));
    const id = '3';
    mockAPI
      .onGet(`${APIRoute.Offers}/${id}/nearby`)
      .reply(200, fakeOffers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchNearbyOffers(id));

    expect(store.getActions()).toEqual([
      nearbyOffersRequest(),
      nearbyOffersSucceeded(offers),
    ]);
  });

});
