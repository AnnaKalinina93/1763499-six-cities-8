import { userProcess } from './user-process';
import {
  loginFailed,
  loginRequest,
  loginSucceeded,
  requireAuthorization,
  requireLogout
} from './action';
import { AuthorizationStatus } from '../../const';
import { makeFakeUser } from '../../utils/mocks';


describe('Reduser: userProcess', () => {
  it('should return "true" authorization status in state', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      loginLoading: false,
      user: null,
    };
    expect(userProcess(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        loginLoading: false,
        user: null,
      });
  });

  it('should return "NoAuth" authorization status and "null" in user in state', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      loginLoading: false,
      user: makeFakeUser(),
    };
    expect(userProcess(state, requireLogout()))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        loginLoading: false,
        user: null,
      });
  });

  it('should return "true" loading login in state', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      loginLoading: false,
      user: null,
    };
    expect(userProcess(state, loginRequest()))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        loginLoading: true,
        user: null,
      });
  });

  it('should add user in state', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      loginLoading: true,
      user: null,
    };
    const newUser = makeFakeUser();
    expect(userProcess(state, loginSucceeded(newUser)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        loginLoading: false,
        user: newUser,
      });
  });

  it('should add error login in state', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      loginLoading: true,
      user: null,
    };
    expect(userProcess(state, loginFailed()))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        loginLoading: false,
        user: null,
      });
  });
});
