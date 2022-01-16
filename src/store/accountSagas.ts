import { takeLatest } from 'redux-saga/effects';
import { accountStorageKey, accountActions } from './accountSlice';

export function* loginEffect({ payload }: ReturnType<typeof accountActions['login']>) {
  localStorage.setItem(accountStorageKey, JSON.stringify({ ...payload, isLogged: true }));
}

export function* logoutEffect() {
  localStorage.removeItem(accountStorageKey);
}

export function* accountSagas() {
  yield takeLatest(accountActions.login, loginEffect);
  yield takeLatest(accountActions.logout, logoutEffect);
}
