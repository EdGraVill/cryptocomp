import type { ChangeEvent, VoidFunctionComponent } from 'react';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import type { SupportedCryptos } from '../providers';
import { providersCurrentValueSelector } from '../store/cryptoSelector';
import {
  ConverterContainer,
  ConverterInput,
  ConverterResult,
  ConverterResultContainer,
  ConverterResultProvider,
  ConverterTitle,
} from './UI';

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
    <ConverterContainer>
      <ConverterTitle>Convert</ConverterTitle>
      <div>
        MXN $<ConverterInput onChange={onInputChange} value={mxn} />
      </div>
      {providersCurrentValue.map(({ currentValue, displayName }) => (
        <ConverterResultContainer key={currentValue}>
          <ConverterResultProvider>{displayName}</ConverterResultProvider>
          <ConverterResult>
            {currentValue === 0 ? 'Datos no disponibles' : currencyStyle.format(mxn / currentValue)}
          </ConverterResult>
        </ConverterResultContainer>
      ))}
    </ConverterContainer>
  );
};

export default Converter;
