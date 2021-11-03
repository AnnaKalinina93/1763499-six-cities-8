import { ActionType, Actions } from '../types/action';
import { State } from '../types/state';
import { sortType, AuthorizationStatus } from '../const';

const initialState = {
  activeCity: 'Paris',
  offers: [],
  activeSortType: sortType.popular,
  authorizationStatus: AuthorizationStatus.Unknown,
  offersLoading: false,
  offersError: false,
  email: '',
  password: '',
  loginLoading: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.СityСhange:
      return { ...state, activeCity: action.payload };
    case ActionType.OffersRequest:
      return {
        ...state,
        offersLoading: true,
      };
    case ActionType.OffersSucceeded:
      return {
        ...state,
        offers: action.payload,
        offersLoading: false,
        offersError: false,
      };
    case ActionType.OffersFailed:
      return {
        ...state,
        offersLoading: false,
        offersError: true,
      };
    case ActionType.ResetCity:
      return { ...initialState };
    case ActionType.SortTypeChange:
      return { ...state, activeSortType: action.payload };
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
        loginLoading: false,
      };
    case ActionType.RequireLogout:
      return { ...state, authorizationStatus: AuthorizationStatus.NoAuth };
    case ActionType.LoginRequest:
      return { ...state, loginLoading: true };
    case ActionType.LoginSucceeded:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        loginLoading: false,
      };
    case ActionType.LoginFailed:
      return { ...state, loginLoading: false };
    default:
      return state;
  }
};

export { reducer };
