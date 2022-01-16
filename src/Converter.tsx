import type { ChangeEvent, VoidFunctionComponent } from 'react';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import type { SupportedCryptos } from './providers';
import { providersCurrentValueSelector } from './store/cryptoSelector';

const currencyStyle = Intl.NumberFormat('es-MX', { maximumFractionDigits: 8, minimumFractionDigits: 1 });

interface Props {
  currentCrypto: SupportedCryptos;
}

const Converter: VoidFunctionComponent<Props> = ({ currentCrypto }) => {
  const [mxn, setMXN] = useState(0);
  const providersCurrentValue = useSelector(providersCurrentValueSelector(currentCrypto));
  const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (!Number.isNaN(Number(event.currentTarget.value))) {
      setMXN(Number(event.currentTarget.value));
    }
  }, []);

  return (
    <section>
      <h2>Convert</h2>
      <div>
        <div>
          MXN $<input onChange={onInputChange} value={mxn} />
        </div>
        {providersCurrentValue.map(({ currentValue, displayName }) => (
          <div key={currentValue}>
            <span>{displayName}</span>
            <span>{currentValue === 0 ? 'Datos no disponibles' : currencyStyle.format(mxn / currentValue)}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Converter;
