import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';
import { sortType, AuthorizationStatus } from '../const';

const initialState = {
  activeCity: 'Paris',
  offers: [],
  activeSortType : sortType.popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  isDataLoaded: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.СityСhange:
      return {...state, activeCity: action.payload};
    case ActionType.OffersChange:
      return {...state, offers: action.payload};
    case ActionType.ResetCity:
      return {...initialState};
    case ActionType.SortTypeChange:
      return {...state, activeSortType: action.payload};
    case ActionType.RequireAuthorization:
      return {...state,
        authorizationStatus: action.payload,
        isDataLoaded: true,
      };
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
};

export {reducer};
