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
  loginFailed,
  offerSucceeded,
  offerRequest,
  offerFailed,
  nearbyOffersSucceeded,
  nearbyOffersRequest,
  nearbyOffersFailed,
  commentsRequest,
  commentsSucceeded,
  commentsFailed,
  postReviewSucceeded,
  postReviewReset
} from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { ServerOffers, ServerOffer } from '../types/offers';
import { AuthData } from '../types/auth-data';
import { adaptOffer, adaptComments, adaptUser } from '../services/adapter';
import {  AuthInfoServer } from '../types/users';
import { ReviewsServer, PostReview } from '../types/reviews';

const errorMessages = {
  authorization: 'Вы не авторизованы, не забудьте авторизоваться.',
  login: 'Не получилось авторизоваться, попробуйте еще раз.',
  logout: 'Не удается выйти из аккаунта, попробуйте еще раз.',
  comments: 'Не удалось загрузить отзывы, попробуйте перезагрузить страницу.',
  nearbyOffers: 'Не удалось загрузить места поблизости, попробуйте перезагрузить страницу.',
  postComment: 'Не удалось загрузить отзыв, попробуйте еще раз',
};

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
      dispatch(redirectToRoute(AppRoute.Main));
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    } catch {
      toast.info(errorMessages.logout);
    }
  };

export const fetchComments = (id: string): ThunkActionResult =>
  async (dispatch, _, api): Promise<void> => {
    dispatch(commentsRequest());
    try {
      const { data } = await api.get<ReviewsServer>(`${APIRoute.Comments}/${id}`);
      const reviews = data.map((review) => adaptComments(review));
      dispatch(commentsSucceeded(reviews));
    } catch {
      dispatch(commentsFailed());
      toast.info(errorMessages.comments);
    }
  };

export const postComments = (id: string, { comment, rating }: PostReview): ThunkActionResult =>
  async (dispatch, _, api) => {
    try {
      const { data } = await api.post<ReviewsServer>(`${APIRoute.Comments}/${id}`, { comment, rating });
      const reviews = data.map((review) => adaptComments(review));
      dispatch(postReviewSucceeded(reviews));
      dispatch(postReviewReset());
    } catch {
      dispatch(postReviewReset());
      toast.info(errorMessages.postComment);
    }
  };
