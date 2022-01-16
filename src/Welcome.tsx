import type { ChangeEvent, VoidFunctionComponent } from 'react';
import { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { accountActions, isLoggedSelector } from './store';

const Welcome: VoidFunctionComponent = () => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({ email: '', firstName: '', lastName: '', phoneNumber: '' });
  const navigate = useNavigate();
  const isLogged = useSelector(isLoggedSelector);

  useEffect(() => {
    if (isLogged) {
      navigate('/', { replace: true });
    }
  }, [isLogged]);

  const setInputField = useCallback(
    (fieldName: keyof typeof userDetails) => (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;

      setUserDetails((previousValue) => ({
        ...previousValue,
        [fieldName]: value,
      }));
    },
    [],
  );

  const onLogin = useCallback(
    (user: typeof userDetails) => () => {
      dispatch(accountActions.login(user));
    },
    [dispatch],
  );

  return (
    <div>
      <h1>Welcome!</h1>
      <div>
        <input onChange={setInputField('firstName')} value={userDetails.firstName} />
        <input onChange={setInputField('lastName')} value={userDetails.lastName} />
      </div>
      <input onChange={setInputField('email')} value={userDetails.email} />
      <input onChange={setInputField('phoneNumber')} value={userDetails.phoneNumber} />
      <button onClick={onLogin(userDetails)}>Submit</button>
    </div>
  );
};

export default Welcome;
