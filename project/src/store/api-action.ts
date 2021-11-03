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
import { adaptToClient } from '../services/adapter';

const LOGIN_FAIL_MESSAGE = 'Не получилось авторизоваться, попробуйте еще раз.';
const AUTH_FAIL_MESSAGE = 'Вы не авторизованы, не забудьте авторизоваться.';

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
      const { data: { email } } = await api.get<{ email: string }>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(loginSucceeded(email, ''));
    } catch {
      toast.info(AUTH_FAIL_MESSAGE);
    }
  };

export const loginAction = ({ email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _, api) => {
    dispatch(loginRequest());
    try {
      const { data: { token } } = await api.post<{ token: Token }>(APIRoute.Login, { email, password });
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(loginSucceeded(email, password));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch {
      dispatch(loginFailed());
      toast.info(LOGIN_FAIL_MESSAGE);
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
    dispatch(loginSucceeded('', ''));
    dispatch(redirectToRoute(AppRoute.Main));
  };
