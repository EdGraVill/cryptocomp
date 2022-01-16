import type { VoidFunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import type { SupportedCryptos } from './providers';
import { providersHistorySelector } from './store/cryptoSelector';

const currencyStyle = Intl.NumberFormat('es-MX', { currency: 'MXN', style: 'currency' });
const dateStyle = Intl.DateTimeFormat('es-MX', { dateStyle: 'short', timeStyle: 'medium' });

interface Props {
  currentCrypto: SupportedCryptos;
}

const ProvidersHistory: VoidFunctionComponent<Props> = ({ currentCrypto }) => {
  const providersHistory = useSelector(providersHistorySelector(currentCrypto));

  console.log({ providersHistory });

  return (
    <section>
      {providersHistory.map(({ displayName, history }) => {
        const current = history.slice(-1)[0];
        const previous = history.length > 1 ? history.slice(-2)[0] : null;
        const old = history.slice(0, -1);

        return (
          <div key={displayName}>
            <div>
              <h3>
                {current?.pricePerUnit && previous && (
                  <span>{current.pricePerUnit > previous.pricePerUnit ? '▲' : '▼'}</span>
                )}
                {current?.pricePerUnit && currencyStyle.format(current.pricePerUnit)}
              </h3>
              <h2>{displayName}</h2>
            </div>
            <div>
              {old
                .reverse()
                .slice(0, 5)
                .map(({ date, pricePerUnit }) => (
                  <div key={date}>
                    <div>{dateStyle.format(date)}</div>
                    <div>{currencyStyle.format(pricePerUnit)}</div>
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ProvidersHistory;
