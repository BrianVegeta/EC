import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import makeRootReducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(makeRootReducer(), initialState, composeWithDevTools(
    applyMiddleware(thunkMiddleware),
  ));

  store.asyncReducers = {};
  // module.hot.accept('../reducers', () => {
  // const reducers = require('../reducers').default;
  // store.replaceReducer(reducers(store.asyncReducers));
  // });

  return store;
}
