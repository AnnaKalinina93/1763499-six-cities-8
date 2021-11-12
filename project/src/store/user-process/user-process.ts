import { createReducer } from '@reduxjs/toolkit';
import { UserProcess } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import {
  loginFailed,
  loginRequest,
  loginSucceeded,
  requireAuthorization,
  requireLogout
} from './action';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  loginLoading: false,
  user: null,
};

const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
      state.loginLoading = false;
    })

    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = null;
    })

    .addCase(loginRequest, (state) => {
      state.loginLoading = true;
    })

    .addCase(loginSucceeded, (state, action) => {
      state.loginLoading = false;
      state.user = action.payload;
    })

    .addCase(loginFailed, (state) => {
      state.loginLoading = false;
    });
});

export { userProcess };
