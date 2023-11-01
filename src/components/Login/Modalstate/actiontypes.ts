export const CHANGE_OPEN = 'CHANGE_OPEN';
export const CHANGE_TYPE = 'CHANGE_TYPE';
export const CHANGE_LOADING = 'CHANGE_LOADING';

export type LoginActionType = typeof CHANGE_OPEN | typeof CHANGE_TYPE | typeof CHANGE_LOADING;

export type LoginType = 'login' | 'register' | 'forgot';

export interface LoginState {
    open: boolean;
    type: LoginType;
    loading: boolean;
}