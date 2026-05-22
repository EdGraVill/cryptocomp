import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ProviderResult, ProviderReturn, SupportedCryptos, SupportedProviders } from '../providers';
import { supportedProviders } from '../providers';
import { supportedCryptos } from '../providers';

export const cryptoStorageKey = '@Crypto';

export type ProviderHistory = Record<SupportedCryptos, ProviderResult[]>;

export type CryptoState = Record<SupportedProviders, { history: ProviderHistory; isFetching: boolean }> & {
  selectedCryptos: SupportedCryptos[];
};

export const getCryptoInitialState = (fetchStoredCrypto = false) => {
  const initialState: CryptoState = {
    ...supportedProviders.reduce(
      (pacc, provider) => ({
        ...pacc,
        [provider]: {
          history: supportedCryptos.reduce(
            (acc, crypto) => ({
              ...acc,
              [crypto]: [],
            }),
            {} as ProviderHistory,
          ),
          isFetching: false,
        },
      }),
      {} as Record<SupportedProviders, { history: ProviderHistory; isFetching: boolean }>,
    ),
    selectedCryptos: ['BTC'],
  };

  const stored = localStorage.getItem(cryptoStorageKey);

  if (fetchStoredCrypto && stored) {
    try {
      const storedState = JSON.parse(stored);

      return storedState as typeof initialState;
    } catch (error) {}
  }

  return initialState;
};

export const {
  actions: cryptoActions,
  name: cryptoReducerName,
  reducer: cryptoReducer,
} = createSlice({
  initialState: getCryptoInitialState(true),
  name: 'Crypto',
  reducers: {
    appendEntry(
      state,
      { payload: { entry, provider } }: PayloadAction<{ entry: ProviderReturn; provider: SupportedProviders }>,
    ) {
      (Object.keys(entry) as SupportedCryptos[]).forEach((crypto) => {
        if (!state[provider].history[crypto].find(({ date }) => date === entry[crypto].date)) {
          state[provider].history[crypto].push(entry[crypto]);
        }
      });

      if (Object.keys(entry).length) {
        state[provider].isFetching = false;
      }
    },
    requestUpdate(state, { payload: provider }: PayloadAction<SupportedProviders>) {
      if (!state[provider].isFetching) {
        state[provider].isFetching = true;
      }
    },
    toggleCrypto(state, { payload: crypto }: PayloadAction<SupportedCryptos>) {
      const cryptoIx = state.selectedCryptos.indexOf(crypto);

      if (cryptoIx === -1) {
        state.selectedCryptos.push(crypto);
      } else {
        state.selectedCryptos.splice(cryptoIx, 1);
      }
    },
  },
});
