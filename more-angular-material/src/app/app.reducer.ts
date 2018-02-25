import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface State{
  ui:fromUi.State;
  auth:fromAuth.State;
}

export const reducers:ActionReducerMap<State>={
  ui:fromUi.uiReducer,
  auth:fromAuth.authReducer
};
//createFEatureSelcetor makes it easier to pull functions from states (different states)
export const getUiState= createFeatureSelector<fromUi.State>('ui');

//createSelector , to use getUIState and projects it to fromUI.getIsLoading (returns the isLoading=true/false) directly
export const getIsLoading = createSelector(getUiState,fromUi.getIsLoading);


export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
