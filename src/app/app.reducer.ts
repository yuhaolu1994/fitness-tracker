import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

// 1. define a State that merged the substate
export interface State {
  ui: fromUi.State;
  auth: fromAuth.State;
}

// 2. group the reducers, actual app reducer
export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer
};

// 3. selector util function, feature selector for subreducer
export const getUiState = createFeatureSelector<fromUi.State>('ui');
// 4. get property from the feature state
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuthenticated);
