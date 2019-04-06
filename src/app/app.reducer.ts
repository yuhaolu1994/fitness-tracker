import * as fromUi from './shared/ui.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

// define a State that merged the substate
export interface State {
  ui: fromUi.State;
}

// group the reducers, actual app reducer
export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer
};

// selector util function, feature selector for subreducer
export const getUiState = createFeatureSelector<fromUi.State>('ui');
// get property from the feature state
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);