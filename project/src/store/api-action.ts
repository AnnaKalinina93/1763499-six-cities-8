import { toast } from 'react-toastify';
import { ThunkActionResult } from '../types/action';
import {
  loginSucceeded,
  offersFailed,
  offersRequest,
  offersSucceeded,
  requireAuthorization,
  requireLogout,
  redirectToRoute,
  loginRequest,
  loginFailed
} from './action';
import { saveToken, dropToken, Token } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { ServerOffers } from '../types/offers';
import { AuthData } from '../types/auth-data';
import { adaptToClient, adaptToUser } from '../services/adapter';
import { AuthInfoServer } from '../types/users';

const errorMessages = {
  authorization: 'Вы не авторизованы, не забудьте авторизоваться.',
  login: 'Не получилось авторизоваться, попробуйте еще раз.',
  logout: 'Не удается выйти из аккаунта, попробуйте еще раз.',
};

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _, api): Promise<void> => {
    dispatch(offersRequest());
    try {
      const { data } = await api.get<ServerOffers>(APIRoute.Offers);
      const offers = data.map((offer) => adaptToClient(offer));
      dispatch(offersSucceeded(offers));
    } catch {
      dispatch(offersFailed());
    }
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _, api) => {
    try {
      const { data } = await api.get<AuthInfoServer>(APIRoute.Login);
      const users = adaptToUser(data);
      dispatch(loginSucceeded(users.email, '', users.avatarUrl));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      toast.info(errorMessages.authorization);
    }
  };

export const loginAction = ({ email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _, api) => {
    dispatch(loginRequest());
    try {
      const { data: { token } } = await api.post<{ token: Token }>(APIRoute.Login, { email, password });
      saveToken(token);
      const { data } = await api.get<AuthInfoServer>(APIRoute.Login);
      const users = adaptToUser(data);
      dispatch(loginSucceeded(email, password, users.avatarUrl));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch {
      dispatch(loginFailed());
      toast.info(errorMessages.login);
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try{
      api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireLogout());
      dispatch(loginSucceeded('', '', ''));
      dispatch(redirectToRoute(AppRoute.Main));
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch {
      toast.info(errorMessages.logout);
    }
  };
