import * as uiAct from './shared/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';
import * as authAct from './auth/auth.reducer';
import * as ingresoEgresoAct from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
  ui: uiAct.State;
  auth: authAct.State;
  ingresoEgreso: ingresoEgresoAct.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiAct.reducer,
  auth: authAct.reducer,
  ingresoEgreso: ingresoEgresoAct.reducer
};
