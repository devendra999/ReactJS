const fieldReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_FIELD':
            return {
                ...state,
                fields: [...state.fields, action.payload],
            }

        case 'EDIT_FIELD':
            return {
                ...state,
                fields: state.fields.map((curElem) => curElem.id === action.payload.id ? action.payload : curElem)

            }

        case 'REMOVE_FIELD':
            return {
                ...state,
                fields: state.fields.filter((curElem) => curElem.id !== action.payload)

            }



        default: return state;
    }
}

export default fieldReducer