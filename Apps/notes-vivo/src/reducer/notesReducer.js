const notesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };

    case "EDIT_NOTE":
      let updatedData;
      updatedData = state.notes.map((note) => {
        if (note.id === action.payload?.id) {
          return action.payload;
        }
        return note;
      });

      updatedData = updatedData.sort((a, b) => b.time - a.time);

      console.log(updatedData);
      return {
        ...state,
        notes: updatedData,
      };

    case "SEARCH_NOTE":
      return {
        ...state,
        filter: {
          ...state.filter,
          text: action.payload,
        },
      };

    case "CLEAR_SEARCH_NOTE":
      return {
        ...state,
        filter: {
          ...state.filter,
          text: "",
        },
      };

    case "REMOVE_SELECTED":
      const newData = state.notes.filter(
        (note) => !action.payload.includes(note.id)
      );

      return {
        ...state,
        notes: newData,
      };

    case "SET_THEME":
      let newtheme = state.theme;
      console.log(newtheme);
      return {
        ...state,
        theme: !newtheme,
      };

    default:
      return state;
  }
};

export default notesReducer;
