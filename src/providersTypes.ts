import type { SupportedCryptos } from './providers';

export type CoinGeckoResponse = Array<{
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  id: string;
  image: string;
  last_updated: string;
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  max_supply: number;
  name: string;
  price_change_24h: number;
  price_change_percentage_24h: number;
  roi: null;
  symbol: SupportedCryptos;
  total_supply: number;
  total_volume: number;
}>;

export type CryptoCompareResponse = {
  RAW: Record<
    SupportedCryptos,
    {
      MXN: {
        CHANGE24HOUR: number;
        CHANGEDAY: number;
        CHANGEHOUR: number;
        CHANGEPCT24HOUR: number;
        CHANGEPCTDAY: number;
        CHANGEPCTHOUR: number;
        CIRCULATINGSUPPLY: number;
        CIRCULATINGSUPPLYMKTCAP: number;
        CONVERSIONSYMBOL: '';
        CONVERSIONTYPE: string;
        FLAGS: string;
        FROMSYMBOL: string;
        HIGH24HOUR: number;
        HIGHDAY: number;
        HIGHHOUR: number;
        IMAGEURL: string;
        LASTMARKET: string;
        LASTTRADEID: string;
        LASTUPDATE: number;
        LASTVOLUME: number;
        LASTVOLUMETO: number;
        LOW24HOUR: number;
        LOWDAY: number;
        LOWHOUR: number;
        MARKET: string;
        MEDIAN: number;
        MKTCAP: number;
        MKTCAPPENALTY: number;
        OPEN24HOUR: number;
        OPENDAY: number;
        OPENHOUR: number;
        PRICE: number;
        SUPPLY: number;
        TOPTIERVOLUME24HOUR: number;
        TOPTIERVOLUME24HOURTO: number;
        TOSYMBOL: string;
        TOTALTOPTIERVOLUME24H: number;
        TOTALTOPTIERVOLUME24HTO: number;
        TOTALVOLUME24H: number;
        TOTALVOLUME24HTO: number;
        TYPE: string;
        VOLUME24HOUR: number;
        VOLUME24HOURTO: number;
        VOLUMEDAY: number;
        VOLUMEDAYTO: number;
        VOLUMEHOUR: number;
        VOLUMEHOURTO: number;
      };
    }
  >;
};
