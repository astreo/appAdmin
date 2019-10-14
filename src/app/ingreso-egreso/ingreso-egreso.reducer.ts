import { AppState } from './../app.reducer';
import { IngresoEgreso } from './ingreso-egreso.model';
import * as ingresoEgresoAct from './ingreso-egreso.actions';

export interface State {
  items: IngresoEgreso[];
}

export interface AppState extends AppState {
  ingresoEgreso: State;
}

const estadoInicial: State = {
  items: []
};

export function reducer(state = estadoInicial, action: ingresoEgresoAct.acciones): State {
  switch (action.type) {
    case ingresoEgresoAct.SET_ITEMS:
      return {
        items: [
          ...action.items.map(item => {
            return {
              ...item
            };
          })
        ]
      };

    case ingresoEgresoAct.UNSET_ITEMS:
      return {
        items: []
      };

    default:
      return state;
  }
}
