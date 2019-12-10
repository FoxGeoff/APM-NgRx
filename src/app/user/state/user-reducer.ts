import * as fromRoot from '../../state/app.state';
//import { User } from '../user';
import { InitialState } from '@ngrx/store/src/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

/* Lazy loading of global state */
export interface State extends fromRoot.State {
    users: UserState;
}
/* Lazy loading */
export interface UserState {
    userName: string;
    maskUserName: boolean;
}

/* Initialization */
const initialState: UserState = {
    userName: "Anon",
    maskUserName: true
}

/* Feature Selector */
const getUserFeatureState =
    createFeatureSelector<UserState>('users');

/* Compose Selector(s) - export */
export const getUserName =
    createSelector(
        getUserFeatureState,
        state => state.userName
    );
export const getMaskUserName =
    createSelector(
        getUserFeatureState,
        state => state.maskUserName
    );

export function reducer(state = initialState, action) {
    switch (action.type) {

        case 'MASK_USER_NAME':

            console.log('existing state: ' + JSON.stringify(state));
            console.log('payload maskName: ' + action.payload);

            return {
                ...state,
                maskUserName: action.payload
            };
        case 'USER_NAME':

            console.log('existing state: ' + JSON.stringify(state));
            console.log('payload userName: ' + action.payload);

            return {
                ...state,
                userName: action.payload
            };

        default:
            return state;
    }
}
