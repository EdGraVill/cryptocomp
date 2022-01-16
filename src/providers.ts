import type { CoinGeckoResponse, CryptoCompareResponse } from './providersTypes';

export const supportedProviders = ['cryptoCompare', 'coinGecko'] as const;
export type SupportedProviders = typeof supportedProviders[number];

export const supportedCryptos = ['BTC', 'ETH', 'XRP', 'BNB', 'USDT', 'SOL', 'USDC', 'ADA'] as const;
export type SupportedCryptos = typeof supportedCryptos[number];

export interface ProviderResult {
  date: number;
  pricePerUnit: number;
}

export type ProviderReturn = Record<SupportedCryptos, ProviderResult>;

export interface ProviderInfo {
  displayName: string;
  fetchLatest(cryptos?: SupportedCryptos[]): Promise<ProviderReturn>;
}

export const providers: Record<SupportedProviders, ProviderInfo> = {
  coinGecko: {
    displayName: 'CoinGecko',
    async fetchLatest(crypto = ['BTC']) {
      const url = new URL('/api/v3/coins/markets', 'https://api.coingecko.com/');
      url.searchParams.append('vs_currency', 'mxn');
      url.searchParams.append('symbols', crypto.map((sym) => sym.toLowerCase()).join(','));

      const request = await fetch(url.toString());
      const response: CoinGeckoResponse = await request.json();

      return response.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.symbol.toUpperCase()]: {
            date: new Date(curr.last_updated).getTime(),
            pricePerUnit: curr.current_price,
          },
        }),
        {} as ProviderReturn,
      );
    },
  },
  cryptoCompare: {
    displayName: 'CryptoCompare',
    async fetchLatest(crypto = ['BTC']) {
      const url = new URL('/data/pricemultifull', 'https://min-api.cryptocompare.com/');
      url.searchParams.append('fsyms', crypto.join(','));
      url.searchParams.append('tsyms', 'MXN');

      const request = await fetch(url.toString());
      const response: CryptoCompareResponse = await request.json();

      return crypto.reduce(
        (acc, curr) => ({
          ...acc,
          [curr]: {
            date: response.RAW[curr].LASTUPDATE,
            pricePerUnit: response.RAW[curr].PRICE,
          },
        }),
        {} as ProviderReturn,
      );
    },
  },
  // stormGain: {
  //   displayName: 'StormGain',
  //   async fetchLatest(crypto = ['BTC']) {},
  // },
};
