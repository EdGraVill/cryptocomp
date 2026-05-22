import type { VoidFunctionComponent } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { SupportedCryptos } from '../providers';
import { supportedProviders } from '../providers';
import { isLoggedSelector } from '../store';
import { selectedCryptosSelector } from '../store/cryptoSelector';
import { cryptoActions } from '../store/cryptoSlice';
import Converter from './Converter';
import CryptoSelector from './CryptoSelector';
import Header from './Header';
import ProvidersHistory from './ProvidersHistory';
import { Container } from './UI';

const Comparator: VoidFunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = useSelector(isLoggedSelector);
  const selectedCrypto = useSelector(selectedCryptosSelector);
  const [currentCrypto, setCurrentCrypto] = useState<SupportedCryptos>(selectedCrypto[0]);

  useEffect(() => {
    if (!isLogged) {
      navigate('/welcome', { replace: true });
    }
  }, [isLogged]);

  useEffect(() => {
    const requestUpdate = () =>
      supportedProviders.forEach((provider) => {
        dispatch(cryptoActions.requestUpdate(provider));
      });
    const interval = setInterval(requestUpdate, 15_000);
    requestUpdate();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container>
      <Header />
      <CryptoSelector currentCrypto={currentCrypto} onCyptoSelected={setCurrentCrypto} />
      <ProvidersHistory currentCrypto={currentCrypto} />
      <Converter currentCrypto={currentCrypto} />
    </Container>
  );
};

export default Comparator;
