import { Offer, ServerOffer } from '../types/offers';
import { Review, ReviewServer } from '../types/reviews';
import { AuthInfo, AuthInfoServer } from '../types/users';

export function adaptOffer ( offer: ServerOffer): Offer {
  const adaptedOffer =  Object.assign(
    {},
    offer,
    {
      host: {
        avatarUrl: offer['host']['avatar_url'],
        id: offer['host']['id'],
        isPro: offer['host']['is_pro'],
        name: offer['host']['name'],
      },
      isFavorite: offer['is_favorite'],
      isPremium: offer['is_premium'],
      maxAdults: offer['max_adults'],
      previewImage: offer['preview_image'],
    });

  delete adaptedOffer['host']['id'];
  delete adaptedOffer['host']['avatar_url'];
  delete adaptedOffer['host']['is_pro'];
  delete adaptedOffer['host']['name'];
  delete adaptedOffer['is_favorite'];
  delete adaptedOffer['is_premium'];
  delete adaptedOffer['max_adults'];
  delete adaptedOffer['preview_image'];

  return adaptedOffer as Offer;
}

export function adaptUser (data: AuthInfoServer): AuthInfo {
  const adaptedAuthInfo = Object.assign(
    {},
    data,
    {
      avatarUrl: data['avatar_url'],
      isPro: data['is_pro'],
    });

  delete adaptedAuthInfo['avatar_url'];
  delete adaptedAuthInfo['is_pro'];

  return adaptedAuthInfo as AuthInfo;
}

export function adaptComments (data: ReviewServer): Review {
  const adaptedComments = Object.assign(
    {},
    data,
    {
      user: {
        avatarUrl: data['user']['avatar_url'],
        id: data['user']['id'],
        isPro: data['user']['is_pro'],
        name: data['user']['name'],
      },
    });

  delete adaptedComments['user']['avatar_url'];
  delete adaptedComments['user']['is_pro'];
  delete adaptedComments['user']['id'];
  delete adaptedComments['user']['name'];

  return adaptedComments as Review;
}
