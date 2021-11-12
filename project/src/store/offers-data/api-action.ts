import { toast } from 'react-toastify';
import { ThunkActionResult } from '../../types/action';
import {
  offersFailed,
  offersRequest,
  offersSucceeded,
  offerSucceeded,
  offerRequest,
  offerFailed,
  nearbyOffersSucceeded,
  nearbyOffersRequest,
  nearbyOffersFailed
} from './action';
import { APIRoute, errorMessages } from '../../const';
import { ServerOffers, ServerOffer } from '../../types/offers';
import { adaptOffer } from '../../services/adapter';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _, api): Promise<void> => {
    dispatch(offersRequest());
    try {
      const { data } = await api.get<ServerOffers>(APIRoute.Offers);
      const offers = data.map((offer) => adaptOffer(offer));
      dispatch(offersSucceeded(offers));
    } catch {
      dispatch(offersFailed());
    }
  };

export const fetchOfferAction = (id: string): ThunkActionResult =>
  async (dispatch, _, api): Promise<void> => {
    dispatch(offerRequest());
    try {
      const { data } = await api.get<ServerOffer>(`${APIRoute.Offers}/${id}`);
      const offer = adaptOffer(data);
      dispatch(offerSucceeded(offer));
    } catch {
      dispatch(offerFailed());
    }
  };

export const fetchNearbyOffers = (id: string): ThunkActionResult =>
  async (dispatch, _, api): Promise<void> => {
    dispatch(nearbyOffersRequest());
    try {
      const { data } = await api.get<ServerOffers>(`${APIRoute.Offers}/${id}/nearby`);
      const offers = data.map((offer) => adaptOffer(offer));
      dispatch(nearbyOffersSucceeded(offers));
    } catch {
      dispatch(nearbyOffersFailed());
      toast.info(errorMessages.nearbyOffers);
    }
  };
