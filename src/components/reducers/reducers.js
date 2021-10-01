const initialState = {
  data: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      const { id, data } = action.payload;
      return {
        ...state,
        data: [...state.data, { id: id, data: data }],
      };

    case "DELETE":
      const newList = state.data.filter((element) => element.id !== action.id);
      return {
        ...state,
        data: newList,
      };

    default:
      return state;
  }
};

export default reducer;
