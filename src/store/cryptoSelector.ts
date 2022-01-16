import { createSelector } from '@reduxjs/toolkit';
import type { Store } from '.';
import type { SupportedProviders } from '../providers';
import { cryptoReducerName } from './cryptoSlice';

export const cryptoRootStateSelector = (state: Store) => state[cryptoReducerName];

export const providerHistorySelector = (provider: SupportedProviders) =>
  createSelector(cryptoRootStateSelector, (crypto) => crypto[provider].history);

export const isProviderLoadingSelector = (provider: SupportedProviders) =>
  createSelector(cryptoRootStateSelector, (crypto) => crypto[provider].isFetching);

export const selectedCryptosSelector = createSelector(cryptoRootStateSelector, (crypto) => crypto.selectedCryptos);
