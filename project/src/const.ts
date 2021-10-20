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

export const RatingTitle  = {
  5: 'perfect',
  4:'good',
  3:'not bad',
  2:'badly',
  1:'terribly',
};

export enum Cities {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export const MinReviews = 50;
