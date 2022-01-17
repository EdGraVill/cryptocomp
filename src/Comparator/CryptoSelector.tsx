import type { ChangeEvent, VoidFunctionComponent } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { SupportedCryptos } from '../providers';
import { supportedCryptos } from '../providers';
import { selectedCryptosSelector } from '../store/cryptoSelector';
import { cryptoActions } from '../store/cryptoSlice';
import { CryptoOption, RemoveCrypto, SelectCrypto, SelectorContainer } from './UI';

interface Props {
  currentCrypto: SupportedCryptos;
  onCyptoSelected(crypto: SupportedCryptos): void;
}

const CryptoSelector: VoidFunctionComponent<Props> = ({ currentCrypto, onCyptoSelected }) => {
  const dispatch = useDispatch();
  const selectedCrypto = useSelector(selectedCryptosSelector);
  const availableCryptos = useMemo(
    () => supportedCryptos.filter((value) => !selectedCrypto.includes(value)),
    [selectedCrypto],
  );
  const onSwitchCrypto = useCallback(
    (crypto: SupportedCryptos) => () => {
      dispatch(cryptoActions.toggleCrypto(crypto));
    },
    [dispatch],
  );
  const onSelectCrypto = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      if (event.currentTarget.value !== 'Add') {
        dispatch(cryptoActions.toggleCrypto(event.currentTarget.value as SupportedCryptos));
      }
    },
    [dispatch],
  );

  return (
    <SelectorContainer>
      {selectedCrypto.map((crypto) => (
        <CryptoOption isSelected={crypto === currentCrypto} key={crypto}>
          {crypto !== currentCrypto && <RemoveCrypto onClick={onSwitchCrypto(crypto)}>X</RemoveCrypto>}
          <span onClick={() => onCyptoSelected(crypto)}>{crypto}</span>
        </CryptoOption>
      ))}
      {availableCryptos.length && (
        <SelectCrypto onChange={onSelectCrypto}>
          <option value="Add">Agregar</option>
          {availableCryptos.map((crypto) => (
            <option key={crypto} value={crypto}>
              {crypto}
            </option>
          ))}
        </SelectCrypto>
      )}
    </SelectorContainer>
  );
};

export default CryptoSelector;
