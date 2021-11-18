import { toast } from 'react-toastify';
import { ThunkActionResult } from '../../types/action';
import {
  loginSucceeded,
  requireAuthorization,
  requireLogout,
  loginRequest,
  loginFailed
} from './action';
import { redirectToRoute } from '../middlewares/action';
import { saveToken, dropToken } from '../../services/token';
import { APIRoute, AppRoute, AuthorizationStatus, errorMessages } from '../../const';
import { AuthData } from '../../types/auth-data';
import { adaptUser } from '../../services/adapter';
import {  AuthInfoServer } from '../../types/users';
import { favoritesOfferReset } from '../favorites-data/action';

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _, api) => {
    try {
      const { data } = await api.get<AuthInfoServer>(APIRoute.Login);
      const user = adaptUser(data);
      dispatch(loginSucceeded(user));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      toast.info(errorMessages.authorization);
    }
  };

export const loginAction = ({ email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _, api) => {
    dispatch(loginRequest());
    try {
      const { data } = await api.post<AuthInfoServer>(APIRoute.Login, { email, password });
      saveToken(data.token);
      const user = adaptUser(data);
      dispatch(loginSucceeded(user));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch {
      dispatch(loginFailed());
      toast.info(errorMessages.login);
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _, api) => {
    try {
      api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireLogout());
      dispatch(favoritesOfferReset());
      dispatch(redirectToRoute(AppRoute.Main));
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch {
      toast.info(errorMessages.logout);
    }
  };
