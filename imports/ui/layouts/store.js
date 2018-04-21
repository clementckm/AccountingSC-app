/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore (name, reducer, sagas, initialState = {}) {
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */

  const middlewares = [
    sagaMiddleware
  ];

  const enhancers = [
    applyMiddleware(...middlewares)
  ];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */
  let store;
  if (!window.store) {
    store = createStore(
      createReducer(name, reducer),
      fromJS(initialState),
      composeEnhancers(...enhancers)
    );

    window.store = store;
  } else {
    store = window.store;
    store.replaceReducer(createReducer(name, reducer));
  }

  store.runSaga = sagaMiddleware.run;
  sagas.map(store.runSaga);
  store.asyncReducers = {}; // Async reducer registry

  return store;
}
