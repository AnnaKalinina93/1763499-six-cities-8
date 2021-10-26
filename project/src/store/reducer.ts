import {ActionType, Actions} from '../types/action';
import {State} from '../types/state';
import { offers } from '../mocks/offers';

const initialState = {
  activeCity: 'Paris',
  offers: offers,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.СityСhange:
      return {...state, activeCity: action.payload};
    case ActionType.OffersChange:
      return {...state, offers: action.payload};
    case ActionType.ResetCity:
      return {...initialState};
    default:
      return state;
  }
};

export {reducer};
