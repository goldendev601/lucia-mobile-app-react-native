import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  authReducer,
  appReducer,
  accountReducer,
  commonReducer,
  luciaAppReducer,
} from '../reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  account: accountReducer,
  common: commonReducer,
  luciaApp: luciaAppReducer
});

const configureStore = () => {
  return createStore(
    rootReducer, /* preloadedState, */
    compose(applyMiddleware(thunkMiddleware)),
  );
};

export default configureStore;
