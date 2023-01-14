import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import * as reducers from './reducers';

const reducer = combineReducers(reducers);

export default function configureStore(preloadedState) {
  const store = createStore(reducer, preloadedState, composeWithDevTools());

  return store;
};