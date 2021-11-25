import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import { APIRoute, AppRoute } from '../../const';
import { State } from '../../types/state';
import { makeFakeServerOffer } from '../../utils/mocks';
import { adaptOffer } from '../../services/adapter';
import { fetchFavoritesOffersAction, postChangeFavorites } from './api-action';
import { favoritesChange, favoritesOffersFailed, favoritesOffersRequest, favoritesOffersSucceeded } from './action';
import { redirectToRoute } from '../middlewares/action';

describe('Async favorites data actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should favorites offers when server return 200', async () => {
    const store = mockStore();
    const fakeFavoritesOffers = new Array(2).fill(null).map(() => (makeFakeServerOffer()));
    const favoritesOffers = fakeFavoritesOffers.map((offer) => adaptOffer(offer));
    mockAPI
      .onGet(APIRoute.Favorites)
      .reply(200, fakeFavoritesOffers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFavoritesOffersAction());

    expect(store.getActions()).toEqual([
      favoritesOffersRequest(),
      favoritesOffersSucceeded(favoritesOffers),
    ]);
  });

  it('should redirect to "Login" page when server didn\'t return favorites offers', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Favorites)
      .reply(401,[]);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchFavoritesOffersAction());

    expect(store.getActions()).toEqual([
      favoritesOffersRequest(),
      favoritesOffersFailed(),
      redirectToRoute(AppRoute.Login),
    ]);
  });


  it('should change favorites offer when server return 200', async () => {
    const store = mockStore();
    const favoritesOffer = makeFakeServerOffer();
    const status = 1;
    const id = favoritesOffer.id;

    mockAPI
      .onPost(`${APIRoute.Favorites}/${id}/${status}`)
      .reply(200, favoritesOffer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postChangeFavorites(id, status));

    expect(store.getActions()).toEqual([
      favoritesChange(adaptOffer(favoritesOffer)),
    ]);
  });


  it('should redirect to "Login" page when server didn\'t change favorites offer', async () => {
    const store = mockStore();
    const id = '2';
    const status = 1;
    mockAPI
      .onPost(`${APIRoute.Favorites}/${id}/${status}`)
      .reply(401,[]);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postChangeFavorites(id, status));

    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Login),
    ]);
  });

});
