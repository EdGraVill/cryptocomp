import { createSelector } from '@reduxjs/toolkit';
import type { Store } from '.';
import type { SupportedCryptos, SupportedProviders } from '../providers';
import { providers, supportedProviders } from '../providers';
import { cryptoReducerName } from './cryptoSlice';

export const cryptoRootStateSelector = (state: Store) => state[cryptoReducerName];

export const providerHistorySelector = (provider: SupportedProviders) =>
  createSelector(cryptoRootStateSelector, (cryptoRoot) => cryptoRoot[provider].history);

export const providersHistorySelector = (crypto: SupportedCryptos) =>
  createSelector(cryptoRootStateSelector, (cryptoRoot) =>
    supportedProviders.map((provider) => ({
      displayName: providers[provider].displayName,
      history: cryptoRoot[provider].history[crypto],
    })),
  );

export const providersCurrentValueSelector = (crypto: SupportedCryptos) =>
  createSelector(cryptoRootStateSelector, (cryptoRoot) =>
    supportedProviders.map((provider) => ({
      currentValue: cryptoRoot[provider].history[crypto].slice(-1)[0]?.pricePerUnit ?? 0,
      displayName: providers[provider].displayName,
    })),
  );

export const isProviderLoadingSelector = (provider: SupportedProviders) =>
  createSelector(cryptoRootStateSelector, (cryptoRoot) => cryptoRoot[provider].isFetching);

export const selectedCryptosSelector = createSelector(
  cryptoRootStateSelector,
  (cryptoRoot) => cryptoRoot.selectedCryptos,
);
