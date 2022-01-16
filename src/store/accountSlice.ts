import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export const accountStorageKey = '@Account';

export const getAccountInitialState = (fetchStoredAccount = false) => {
  const initialState = {
    email: null as null | string,
    firstName: null as null | string,
    isLogged: false,
    lastName: null as null | string,
    phoneNumber: null as null | string,
  };

  const stored = localStorage.getItem(accountStorageKey);

  if (fetchStoredAccount && stored) {
    try {
      const storedState = JSON.parse(stored);

      return storedState as typeof initialState;
    } catch (error) {}
  }

  return initialState;
};

export const {
  actions: accountActions,
  name: accountReducerName,
  reducer: accountReducer,
} = createSlice({
  initialState: getAccountInitialState(true),
  name: 'Account',
  reducers: {
    login(state, { payload }: PayloadAction<Omit<ReturnType<typeof getAccountInitialState>, 'isLogged'>>) {
      return { ...payload, isLogged: true };
    },
    logout() {
      return getAccountInitialState();
    },
  },
});
