import styled from 'styled-components';

import { Button } from '@material-ui/core';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormDirection = styled.div`
  display: flex;
`;

export const ButtonStyled = styled(Button)`
  margin-right: 16px;
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const Wrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
`;
