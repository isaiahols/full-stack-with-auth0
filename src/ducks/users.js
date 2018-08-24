const initialState = {
    user: {
        // id: '',
        // user_name: '',
        // email: '',
        // picture: '',
        // auth_id: '',
    },
    something:''
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return Object.assign({}, state, { user: action.payload })
        default:
            return state;
    }
}



const UPDATE_USER = 'UPDATE-USER'

export function updateUser(userObj) {
    return {
        type: UPDATE_USER,
        payload: userObj
    }
}
