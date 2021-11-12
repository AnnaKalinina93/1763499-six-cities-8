export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Main = '/',
  Room = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const ratingMap = {
  1: 'terribly',
  2: 'badly',
  3: 'not bad',
  4: 'good',
  5: 'perfect',
};

export const citiesList = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
};

export type CitiesList = {
  Paris: string,
  Cologne: string,
  Brussels: string,
  Amsterdam: string,
  Hamburg: string,
  Dusseldorf: string,
}
export const MIN_REVIEWS = 50;

export const URL_MARKER_DEFAULT = 'img/pin.svg';

export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export enum TypeCard {
  City = 'CITIES',
  Property = 'PROPERTY',
  NearPlaces = 'NEAR-PLACES'
}

export const sortType = {
  popular: 'Popular',
  priceLowToHigh: 'Price: low to high',
  priceHighToLow: 'Price: high to low',
  topRated: 'Top rated first',
};

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Favorites = '/favorites',
  Comments = '/comments',
}

export const errorMessages = {
  authorization: 'Вы не авторизованы, не забудьте авторизоваться.',
  login: 'Не получилось авторизоваться, попробуйте еще раз.',
  logout: 'Не удается выйти из аккаунта, попробуйте еще раз.',
  comments: 'Не удалось загрузить отзывы, попробуйте перезагрузить страницу.',
  nearbyOffers: 'Не удалось загрузить места поблизости, попробуйте перезагрузить страницу.',
  postComment: 'Не удалось загрузить отзыв, попробуйте еще раз',
};
