import { toast } from 'react-toastify';
import { ThunkActionResult } from '../../types/action';
import { APIRoute, AppRoute, errorMessages } from '../../const';
import { ServerOffer, ServerOffers } from '../../types/offers';
import { adaptOffer } from '../../services/adapter';
import { favoritesChange, favoritesOffersFailed, favoritesOffersRequest, favoritesOffersSucceeded } from './action';
import { redirectToRoute } from '../middlewares/action';

export const fetchFavoritesOffersAction = (): ThunkActionResult =>
  async (dispatch, _, api): Promise<void> => {
    dispatch(favoritesOffersRequest());
    try {
      const { data } = await api.get<ServerOffers>(APIRoute.Favorites);
      const offers = data.map((offer) => adaptOffer(offer));
      dispatch(favoritesOffersSucceeded(offers));
    } catch {
      dispatch(favoritesOffersFailed());
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

export const postAddToFavorites = (id: string, status: number): ThunkActionResult =>
  async (dispatch, _, api) => {
    try {
      const { data } = await api.post<ServerOffer>(`${APIRoute.Favorites}/${id}/${status}`);
      const offer = adaptOffer(data);
      dispatch(favoritesChange(offer));
    } catch {
      toast.info(errorMessages.postAddtoFavorites);
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };
