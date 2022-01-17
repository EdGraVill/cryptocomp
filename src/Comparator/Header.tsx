import type { VoidFunctionComponent } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accountActions, accountRootStateSelector } from '../store';
import { HeaderContainer, Logout } from './UI';

const Header: VoidFunctionComponent = () => {
  const dispatch = useDispatch();
  const { firstName } = useSelector(accountRootStateSelector);
  const onLogout = useCallback(() => {
    dispatch(accountActions.logout());
  }, [dispatch]);

  return (
    <HeaderContainer>
      <div>Hello, {firstName}</div>
      <Logout onClick={onLogout}>Exit</Logout>
    </HeaderContainer>
  );
};

export default Header;
