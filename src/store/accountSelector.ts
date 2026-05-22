import { createSelector } from '@reduxjs/toolkit';
import type { Store } from '.';
import { accountReducerName } from './accountSlice';

export const accountRootStateSelector = (state: Store) => state[accountReducerName];

export const isLoggedSelector = createSelector(accountRootStateSelector, (account) => account.isLogged);
