import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import { APIRoute, AppRoute, AuthorizationStatus } from '../../const';
import { State } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from './api-action';
import { loginRequest, loginSucceeded, requireAuthorization, requireLogout } from './action';
import { makeFakeServerUser } from '../../utils/mocks';
import { AuthData } from '../../types/auth-data';
import { redirectToRoute } from '../middlewares/action';
import { adaptUser } from '../../services/adapter';
import { favoritesOfferReset } from '../favorites-data/action';


describe('Async user process actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    const fakeUser = makeFakeServerUser();

    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, fakeUser);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      loginSucceeded(adaptUser(fakeUser)),
      requireAuthorization(AuthorizationStatus.Auth),
    ]);
  });

  it('should dispatch RequriedAuthorization, LoginSucceeded and RedirectToRoute when POST /login', async () => {
    const user = makeFakeServerUser();
    const fakeUser: AuthData = { email: user.email, password: '1dfg456' };
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, user);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loginAction(fakeUser));

    expect(store.getActions()).toEqual([
      loginRequest(),
      loginSucceeded(adaptUser(user)),
      requireAuthorization(AuthorizationStatus.Auth),
      redirectToRoute(AppRoute.Main),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('guess-token', user.token);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([
      requireLogout(),
      favoritesOfferReset(),
      redirectToRoute(AppRoute.Main),
      requireAuthorization(AuthorizationStatus.NoAuth),
    ]);
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('guess-token');
  });
});
