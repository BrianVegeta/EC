import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers/reducers';

export default function configureStore(initialState) {
  const store = createStore(reducers, initialState, composeWithDevTools(
    applyMiddleware(thunkMiddleware),
  ));
  return store;
}
