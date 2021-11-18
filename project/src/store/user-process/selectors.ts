import { NameSpace } from '../root-reduser';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { AuthInfo } from '../../types/users';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getLoginLoading = (state: State): boolean => state[NameSpace.User].loginLoading;
export const getUser = (state: State): AuthInfo | null => state[NameSpace.User].user;
