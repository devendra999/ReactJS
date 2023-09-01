import {
    GET_USERS,
    GET_USER,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
} from "../actions/userTypes";

const initialState = {
    users: [],
    user: null,
};
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_USERS:
            return {
                ...state,
                users: payload,
            };
        case CREATE_USER:
            return {
                ...state,
                users: [payload, ...state.users],
            };
        case GET_USER:
            return {
                ...state,
                user: payload,
            };
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map((user) =>
                    user.id == payload.id ? payload : user
                ),
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter((user) => user.id != payload),
            };
        default:
            return state;
    }
};