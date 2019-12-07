import { userState } from '../user/state/user-reducer';

/* Non lazy loading of global state */
export interface State {
    users: userState;
}
