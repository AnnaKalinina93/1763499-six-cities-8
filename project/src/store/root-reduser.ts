import { combineReducers } from 'redux';
import { offersData } from './offers-data/offers-data';
import { userProcess } from './user-process/user-process';
import { commentsData } from './comments-data/comments-data';
import { uiState } from './ui-state/ui-state';

export enum NameSpace {
  ui = 'UI_STATE',
  offers = 'OFFERS',
  comments = 'COMMENTS',
  user = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.ui]: uiState,
  [NameSpace.offers]: offersData,
  [NameSpace.comments]: commentsData,
  [NameSpace.user]: userProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
