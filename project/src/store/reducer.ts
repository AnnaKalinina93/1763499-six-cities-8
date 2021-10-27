import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';
import { offers } from '../mocks/offers';
import { sortType } from '../const';

const initialState = {
  activeCity: 'Paris',
  offers: offers,
  activeSortType : sortType.Popular,
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
    default:
      return state;
  }
};

export {reducer};
