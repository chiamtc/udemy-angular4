import {Action} from '@ngrx/store';
import {AuthActions, SET_UNAUTHENTICATED, SET_AUTHENTICATED} from "./auth.action";

export interface State {
  isAuthenticated: boolean
}

const initialState: State = {
  isAuthenticated: false
};

export function authReducer(state = initialState, action: Action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export const getIsAuth = (state:State)=> state.isAuthenticated;
