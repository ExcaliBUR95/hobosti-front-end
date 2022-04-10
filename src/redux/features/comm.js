const initialState = {
  items: [],
  loadign: true,
  error: null,
};

export const comm = (state = initialState, action) => {
  switch (action.type) {
    case "comm/fetch-comm/pending":
      return {
        ...state,
        loadign: true,
      };
    case "comm/fetch-comm/fulfilled":
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case "comm/fetch-comm/rejected":
      return {
        ...state,
        error: action.error,
      };
    case "comm/post-comm/pending":
      return {
        ...state,
        loadign: true,
      };
    case "comm/post-comm/fulfilled":
      return {
        ...state,
        items: [...state.items, action.payload],
        loading: false,
      };
    case "comm/post-comm/rejected":
      return {
        ...state,
        error: action.error,
      };
    case "comm/delete-comm/pending":
      return {
        ...state,
        loadign: true,
      };
    case "comm/delete-comm/fulfilled":
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
        loading: false,
      };
    case "comm/delete-comm/rejected":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export const fetchComment = () => {
  return async (dispatch) => {
    dispatch({ type: "comm/fetch-comm/pending" });

    try {
      const res = await fetch("/comm");
      const json = await res.json();
      dispatch({ type: "comm/fetch-comm/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "comm/fetch-comm/rejected", error: e.toString() });
    }
  };
};
export const postComm = (text, news, user) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "comm/post-comm/pending" });

    try {
      const res = await fetch("/comm", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.application.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          news,
          user,
        }),
      });
      const json = await res.json();
      console.log(json);
      dispatch({ type: "comm/post-comm/fulfilled", payload: json });
    } catch (e) {
      dispatch({ type: "comm/post-comm/rejected", error: e.toString() });
    }
  };
};

export const deleteComm = (id) => {
  return async (dispatch) => {
    dispatch({ type: "comm/delete-comm/pending" });

    try {
      const res = await fetch(`/comm/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "comm/delete-comm/fulfilled", payload: id });
    } catch (e) {
      dispatch({ type: "comm/delete-comm/rejected", error: e.toString() });
    }
  };
};
