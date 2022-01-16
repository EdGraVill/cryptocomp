import { call, put, select, takeEvery } from 'redux-saga/effects';
import type { ProviderReturn, SupportedCryptos } from '../providers';
import { providers } from '../providers';
import { cryptoRootStateSelector, selectedCryptosSelector } from './cryptoSelector';
import type { CryptoState } from './cryptoSlice';
import { cryptoActions, cryptoStorageKey } from './cryptoSlice';

export function* requestUpdateEffect({ payload: provider }: ReturnType<typeof cryptoActions['requestUpdate']>) {
  const selectedCryptos: SupportedCryptos[] = yield select(selectedCryptosSelector);

  const response: ProviderReturn = yield call(providers[provider].fetchLatest, selectedCryptos);

  yield put(cryptoActions.appendEntry({ entry: response, provider }));
}

export function* updateEffect() {
  const state: CryptoState = yield select(cryptoRootStateSelector);

  localStorage.setItem(cryptoStorageKey, JSON.stringify(state));
}

export function* cryptoSagas() {
  yield takeEvery(cryptoActions.requestUpdate, requestUpdateEffect);
  yield takeEvery(cryptoActions.appendEntry, updateEffect);
  yield takeEvery(cryptoActions.toggleCrypto, updateEffect);
}
