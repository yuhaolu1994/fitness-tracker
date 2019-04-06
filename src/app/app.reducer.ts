import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

// define a State that merged the substate
export interface State {
  ui: fromUi.State;
  auth: fromAuth.State;
}

// group the reducers, actual app reducer
export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer
};

// selector util function, feature selector for subreducer
export const getUiState = createFeatureSelector<fromUi.State>('ui');
// get property from the feature state
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuthenticated);