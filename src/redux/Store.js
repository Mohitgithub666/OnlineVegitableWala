import {applyMiddleware, createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from './reducers/authReducer';
import city from './reducers/cityReducer';
import product from './reducers/productReducer';
import seller from './reducers/sellerReducer';

const appReducer = combineReducers({
  auth,
  city,
  product,
  seller,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
  timeout: null,
};
const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = null;
store = createStore(persistedReducer, applyMiddleware(...middleware));
export const persistor = persistStore(store);
export default store;
