import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import * as reducers from './reducers';
import * as auth from '../components/auth/service';
import * as ads from '../components/ads/service';

const reducer = combineReducers(reducers);
const middlewares = [thunk.withExtraArgument({api: {auth, ads}})]

export default function configureStore(preloadedState) {
  const store = createStore(reducer, preloadedState, composeWithDevTools(applyMiddleware(...middlewares)));

  return store;
};