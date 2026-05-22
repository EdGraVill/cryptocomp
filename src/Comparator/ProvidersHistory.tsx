import type { VoidFunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import type { SupportedCryptos } from '../providers';
import { providersHistorySelector } from '../store/cryptoSelector';
import {
  LastUpdate,
  ProviderCard,
  ProviderHistoryContainer,
  ProviderName,
  ResultHistory,
  ResultHistoryDate,
  ResultHistoryPrice,
  ResultHistoryRow,
} from './UI';

const currencyStyle = Intl.NumberFormat('es-MX', { currency: 'MXN', style: 'currency' });
const dateStyle = Intl.DateTimeFormat('es-MX', { dateStyle: 'short', timeStyle: 'medium' });

interface Props {
  currentCrypto: SupportedCryptos;
}

const ProvidersHistory: VoidFunctionComponent<Props> = ({ currentCrypto }) => {
  const providersHistory = useSelector(providersHistorySelector(currentCrypto));

  return (
    <ProviderHistoryContainer>
      {providersHistory.map(({ displayName, history }) => {
        const current = history.slice(-1)[0];
        const previous = history.length > 1 ? history.slice(-2)[0] : null;
        const old = history.slice(0, -1);

        return (
          <ProviderCard key={displayName}>
            <LastUpdate>
              {current?.pricePerUnit && previous && (
                <span>{current.pricePerUnit > previous.pricePerUnit ? '▲' : '▼'}</span>
              )}
              {current?.pricePerUnit && currencyStyle.format(current.pricePerUnit)}
            </LastUpdate>
            <ProviderName>{displayName}</ProviderName>
            <ResultHistory>
              {old
                .reverse()
                .slice(0, 5)
                .map(({ date, pricePerUnit }) => (
                  <ResultHistoryRow key={date}>
                    <ResultHistoryDate>{dateStyle.format(date)}</ResultHistoryDate>
                    <ResultHistoryPrice>{currencyStyle.format(pricePerUnit)}</ResultHistoryPrice>
                  </ResultHistoryRow>
                ))}
            </ResultHistory>
          </ProviderCard>
        );
      })}
    </ProviderHistoryContainer>
  );
};

export default ProvidersHistory;
