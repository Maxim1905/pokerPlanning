import React, { useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { Button } from '@material-ui/core';

const Title = styled.span`
  font-size: 24px;
  color: #fff;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  padding: 8px;
`;

export const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const { push } = useHistory();

  const logoutHandler = () => {
    logout();
    push('/');
  };

  return (
    <Nav>
      <Title>Скрам покер!</Title>

      <Button
        variant="contained"
        color="primary"
        // startIcon={<ExitToAppIcon />}
        onClick={logoutHandler}
      >
        Выйти
      </Button>
    </Nav>
  );
};
