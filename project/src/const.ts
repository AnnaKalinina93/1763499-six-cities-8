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

export const ratingMap  = {
  1:'terribly',
  2:'badly',
  3:'not bad',
  4:'good',
  5:'perfect',
};

export const citiesList = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
};

export const MIN_REVIEWS = 50;

export const URL_MARKER_DEFAULT = 'img/pin.svg';

export const URL_MARKER_CURRENT = 'img/pin-active.svg';

export enum TypeCard {
  City = 'CITIES',
  Property = 'PROPERTY',
  NearPlaces = 'NEAR-PLACES'
}
