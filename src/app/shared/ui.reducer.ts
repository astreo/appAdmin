import * as uiAct from './ui.actions';


export interface State {
  isLoading: boolean;
}

const initState: State = {
  isLoading: false
};

export function reducer(state = initState, action: uiAct.Acciones): State {
  switch (action.type) {

    case uiAct.ACTIVAR_LOADING:
      return { isLoading: true };

    case uiAct.DESACTIVAR_LOADING:
      return { isLoading: false };

    default:
      return state;
  }
}
