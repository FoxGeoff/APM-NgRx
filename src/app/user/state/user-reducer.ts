import * as fromRoot from '../../state/app.state';
//import { User } from '../user';
import { InitialState } from '@ngrx/store/src/models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../user';

/* Lazy loading of global state */
export interface State extends fromRoot.State {
    users: UserState;
}
/* Lazy loading */
export interface UserState {
    userName: string; //TODO: remove
    currentUser: User;
    maskUserName: boolean;
}

/* Initialization */
const initialState: UserState = {
    userName: "Missing",
    currentUser: new User(),
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
export const getCurrentUser =
    createSelector(
        getUserFeatureState,
        state => state.currentUser
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
        case 'CURRENT_USER':

            console.log('existing state: ' + JSON.stringify(state));
            console.log('payload currentUser: ' + action.payload);

            return {
                ...state,
                currentUser: action.payload
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
