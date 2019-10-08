import { User } from './user.model';
import * as authAct from './auth.actions';


export interface State {
  user: User;
}

const estadoInicial: State = {
  user: null
};

export function authReducer(state = estadoInicial, action: authAct.acciones): State {
  switch (action.type) {
    case authAct.SET_USER:
      return {
        user: {... action.user}
      };

    default:
      return state;
  }
 }
