import type { ChangeEvent, VoidFunctionComponent } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { SupportedCryptos } from './providers';
import { supportedCryptos } from './providers';
import { selectedCryptosSelector } from './store/cryptoSelector';
import { cryptoActions } from './store/cryptoSlice';

const CryptoSelector: VoidFunctionComponent = () => {
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
    <main>
      <section>
        {selectedCrypto.map((crypto) => (
          <div key={crypto}>
            <span onClick={onSwitchCrypto(crypto)}>X</span>
            {crypto}
          </div>
        ))}
        <div>
          <select onChange={onSelectCrypto}>
            <option value="Add">+</option>
            {availableCryptos.map((crypto) => (
              <option key={crypto} value={crypto}>
                {crypto}
              </option>
            ))}
          </select>
        </div>
      </section>
    </main>
  );
};

export default CryptoSelector;
