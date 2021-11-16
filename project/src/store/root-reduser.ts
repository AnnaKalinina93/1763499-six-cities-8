import { combineReducers } from 'redux';
import { offersData } from './offers-data/offers-data';
import { userProcess } from './user-process/user-process';
import { commentsData } from './comments-data/comments-data';
import { uiState } from './ui-state/ui-state';
import { favoritesOffersData } from './favorites-data/favorites-data';

export enum NameSpace {
  ui = 'UI_STATE',
  offers = 'OFFERS',
  comments = 'COMMENTS',
  user = 'USER',
  favorites = 'FAVORITES'
}

export const rootReducer = combineReducers({
  [NameSpace.ui]: uiState,
  [NameSpace.offers]: offersData,
  [NameSpace.comments]: commentsData,
  [NameSpace.user]: userProcess,
  [NameSpace.favorites]: favoritesOffersData,
});

export type RootState = ReturnType<typeof rootReducer>;
