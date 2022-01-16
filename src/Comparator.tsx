import type { VoidFunctionComponent } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CryptoSelector from './CryptoSelector';
import { supportedProviders } from './providers';
import { isLoggedSelector } from './store';
import { cryptoActions } from './store/cryptoSlice';

const Comparator: VoidFunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = useSelector(isLoggedSelector);

  useEffect(() => {
    if (!isLogged) {
      navigate('/welcome', { replace: true });
    }
  }, [isLogged]);

  useEffect(() => {
    const interval = setInterval(() => {
      supportedProviders.forEach((provider) => {
        dispatch(cryptoActions.requestUpdate(provider));
      });
    }, 15_000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <CryptoSelector />
    </div>
  );
};

export default Comparator;
