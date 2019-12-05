
export function reducer(state, action) {
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
