import * as uiAct from './shared/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as authAct from './auth/auth.reducer';

export interface AppState {
  ui: uiAct.State;
  auth: authAct.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiAct.uiReducer,
  auth: authAct.authReducer
};
