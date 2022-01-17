import type { ChangeEvent, VoidFunctionComponent } from 'react';
import { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { accountActions, isLoggedSelector } from '../store';
import { Button, Container, Input, Label, NameContainer, Subtitle, Title } from './UI';

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
    <Container>
      <Title>Welcome!</Title>
      <NameContainer>
        <Subtitle>Name</Subtitle>
        <Label sub>
          <Input onChange={setInputField('firstName')} value={userDetails.firstName} />
          First
        </Label>
        <Label sub>
          <Input onChange={setInputField('lastName')} value={userDetails.lastName} />
          Last
        </Label>
      </NameContainer>
      <Label>
        Email
        <Input onChange={setInputField('email')} value={userDetails.email} />
      </Label>
      <Label>
        Phone Number
        <Input onChange={setInputField('phoneNumber')} value={userDetails.phoneNumber} />
      </Label>
      <Button onClick={onLogin(userDetails)}>Submit</Button>
    </Container>
  );
};

export default Welcome;
