import * as uiAct from './ui.actions';


export interface State {
  isLoading: boolean;
}

const initState: State = {
  isLoading: false
};

export function uiReducer(state = initState, action: uiAct.Acciones): State {
  switch (action.type) {

    case uiAct.ACTIVAR_LOGIN:
      return { isLoading: true };

    case uiAct.DESACTIVAR_LOGIN:
      return { isLoading: false };

    default:
      return state;
  }
}
