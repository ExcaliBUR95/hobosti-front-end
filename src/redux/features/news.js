const initialState = {
  loading: true,
  items: [],
  error: null,
};

export const news = (state = initialState, action) => {
  switch (action.type) {
    case "news/fetch-news/pending":
      return {
        ...state,
        loading: true,
      };
    case "news/fetch-news/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case "todos/fetch-todos/rejected":
      return {
        ...state,
        loading: false,
        items: [],
        error: action.error,
      };
    default:
      return state;
  }
};

export const fetchNews = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "news/fetch-news/pending" });

    try {
      const res = await fetch("/news");
      const json = await res.json();

      dispatch({ type: "news/fetch-news/fulfilled", payload: json });
    } catch (error) {
      dispatch({ type: "news/fetch-news/rejected", error: error.toString() });
    }
  };
};
//{
// headers: {
//       Authorization: `Bearer ${state.application.token}`,
// },
// }
