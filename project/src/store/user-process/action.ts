import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../types/action';
import { AuthorizationStatus } from '../../const';
import { AuthInfo } from '../../types/users';

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: authStatus,
  }),
);

export const requireLogout = createAction(ActionType.RequireLogout);

export const loginRequest = createAction(ActionType.LoginRequest);

export const loginSucceeded = createAction(
  ActionType.LoginSucceeded,
  (user: AuthInfo) => ({
    payload: user,
  }),
);

export const loginFailed = createAction(ActionType.LoginFailed);
