import { combineReducers } from 'redux';
import { offersData } from './offers-data/offers-data';
import { userProcess } from './user-process/user-process';
import { commentsData } from './comments-data/comments-data';
import { uiState } from './ui-state/ui-state';
import { favoritesOffersData } from './favorites-data/favorites-data';

export enum NameSpace {
  Ui = 'UI_STATE',
  Offers = 'OFFERS',
  Comments = 'COMMENTS',
  User = 'USER',
  Favorites = 'FAVORITES'
}

export const rootReducer = combineReducers({
  [NameSpace.Ui]: uiState,
  [NameSpace.Offers]: offersData,
  [NameSpace.Comments]: commentsData,
  [NameSpace.User]: userProcess,
  [NameSpace.Favorites]: favoritesOffersData,
});

export type RootState = ReturnType<typeof rootReducer>;
