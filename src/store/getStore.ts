/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StateFromReducersMapObject } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { accountSagas } from './accountSagas';
import { accountReducer, accountReducerName } from './accountSlice';
import { cryptoSagas } from './cryptoSagas';
import { cryptoReducer, cryptoReducerName } from './cryptoSlice';

export const storeSymbol = Symbol('Redux Store');

const reducersMapObject = {
  [accountReducerName]: accountReducer,
  [cryptoReducerName]: cryptoReducer,
};

export type Store = StateFromReducersMapObject<typeof reducersMapObject>;

export function getStore(preloadedState?: Store) {
  const sagaMiddleware = createSagaMiddleware();

  const newStore = configureStore({
    middleware: [sagaMiddleware],
    preloadedState,
    reducer: combineReducers(reducersMapObject),
  });

  if ((globalThis as any)[storeSymbol]) {
    return (globalThis as any)[storeSymbol] as typeof newStore;
  }

  (globalThis as any)[storeSymbol] = newStore;

  sagaMiddleware.run(accountSagas);
  sagaMiddleware.run(cryptoSagas);

  return newStore;
}
