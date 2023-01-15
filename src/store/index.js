import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import * as reducers from "./reducers";
import * as auth from "../components/auth/service";
import * as ads from "../components/ads/service";
import * as notifications from './notifications';

const reducer = combineReducers(reducers);

const failuredRedirections =
  (router, redirections) => (store) => (next) => (action) => {
    const result = next(action);
    if (action.error) {
      const redirection = redirections[action.payload.status];

      if (redirection) {
        router.navigate(redirection);
      }
    }

    return result;
  };

export default function configureStore(preloadedState, { router }) {
  const middlewares = [
    thunk.withExtraArgument({ api: { auth, ads }, router,notifications }),
    failuredRedirections(router, {
      401: "/login",
      404: "/404",
    }),
  ];
  const store = createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  return store;
}
