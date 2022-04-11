const initialState = {
  signin: false,
  signup: false,
  error: null,
  token: localStorage.getItem("token"),
  id: localStorage.getItem("id"),
};

export const application = (state = initialState, action) => {
  switch (action.type) {
    case "application/signup/pending":
      return {
        ...state,
        signup: true,
        error: null,
      };
    case "application/signup/fulfilled":
      return {
        ...state,
        signup: false,
        error: null,
      };
    case "application/signup/rejected":
      return {
        ...state,
        signup: false,
        error: action.error,
      };
    case "application/signin/pending":
      return {
        ...state,
        signin: true,
        error: null,
      };
    case "application/signin/fulfilled":
      return {
        ...state,
        signin: false,
        error: null,
      };
    case "application/signin/rejected":
      return {
        ...state,
        signin: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export const createUser = (login, password) => {
  return async (dispatch) => {
    dispatch({ type: "application/signup/pending" });

    const res = await fetch("users/", {
      method: "POST",
      body: JSON.stringify({ login, password }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await res.json();

    if (json.error) {
      dispatch({ type: "application/signup/rejected", error: json.error });
    } else {
      dispatch({ type: "application/signup/fulfilled", error: json });
    }
  };
};

export const auth = (login, password) => {
  return async (dispatch) => {
    dispatch({ type: "application/signin/pending" });

    const res = await fetch("login/", {
      method: "POST",
      body: JSON.stringify({ login, password }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await res.json();

    if (json.error) {
      dispatch({ type: "application/signin/rejected", error: json.error });
    } else {
      dispatch({ type: "application/signin/rejected", error: json });
      console.log(json);
    }
    localStorage.setItem("token", json.token);
    localStorage.setItem("id", json.id);
  };
};
