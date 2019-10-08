import { Action } from '@ngrx/store';

export const ACTIVAR_LOGIN = '[UI Loading] Cargando...';
export const DESACTIVAR_LOGIN = '[UI Loading] Fin de Carga...';

export class ActivarLoginAction implements Action {
  readonly type = ACTIVAR_LOGIN;
}

export class DesactivarLoginAction implements Action {
  readonly type = DESACTIVAR_LOGIN;
}

export type Acciones = ActivarLoginAction | DesactivarLoginAction;
