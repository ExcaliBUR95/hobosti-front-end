const initialState = {
  loading: false,
  item: [],
  error: null,
};

export const cats = (state = initialState, action) => {
  switch (action.type) {
    case "cats/fetch-cats-pending":
      return {
        ...state,
        loading: true,
      };
    case "cats/fetch-cats/fulfilled":
      return {
        ...state,
        item: action.payload,
        loading: false,
      };
    case "cats/fetch-cats/rejected":
      return {
        ...state,
        error: action.e,
      };
    default:
      return state;
  }
};

export const fetchCats = () => {
  return async (dispatch) => {
    dispatch({ type: "cats/fetch-cats/pending" });

    try {
      const res = await fetch("/cats");
      const json = await res.json();

      dispatch({ type: "cats/fetch-cats/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "cats/fetch-cats/rejected", error: e.toString() });
    }
  };
};
