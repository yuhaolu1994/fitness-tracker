import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';

export interface State {
  isAuthenticated: boolean;
};

const initialState: State = {
  isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...initialState,
        isAuthenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        ...initialState,
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
