import { Offer, ServerOffer } from '../types/offers';

export function adaptToClient( offer: ServerOffer): Offer {
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
