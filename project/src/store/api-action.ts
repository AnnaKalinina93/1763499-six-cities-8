import {ThunkActionResult} from '../types/action';
import {offersChange, requireAuthorization, requireLogout} from './action';
import {saveToken, dropToken, Token} from '../services/token';
import {APIRoute, AuthorizationStatus} from '../const';
import {ServerOffers} from '../types/offers';
import {AuthData} from '../types/auth-data';
import { adaptToClient } from '../services/adapter';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<ServerOffers>(APIRoute.Offers);
    const offers= data.map((offer) => adaptToClient(offer));
    dispatch(offersChange(offers));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      });
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };


export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
