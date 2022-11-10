import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";
// import thunk from 'redux-thunk'
import thunkMiddleware from 'redux-thunk';
import authenticationSlice from './slices/auth'
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { createWrapper } from 'next-redux-wrapper';
const combinedReducers = combineReducers({
  auth: authenticationSlice
})


const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    encryptTransform({
      secretKey: String(process.env.PERSIST_KEY),
      onError: function (error) {
        // Handle the error.
        console.log(error)
      },
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, combinedReducers);


const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunkMiddleware]
})



export const persistor = persistStore(store);


export const wrapper = createWrapper(() => store)