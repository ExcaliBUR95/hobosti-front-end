import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { application } from "./features/application";
import { news } from "./features/news";
import { cats } from "./features/cats";
import { comm } from "./features/comm";

export const store = createStore(
  combineReducers({ application, news, cats, comm }),
  composeWithDevTools(applyMiddleware(thunk))
);
