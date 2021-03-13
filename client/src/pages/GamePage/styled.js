import styled, { keyframes, css } from 'styled-components';

import { Button } from '@material-ui/core';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 16px 8px;
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

export const Table = styled.div`
  min-width: 33.8rem;
  min-height: 15.1rem;
  border-radius: 2.8rem;
  background: #d7e9ff;
`;

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-10px);
  }
`;

const cardHover = css`
  &:hover {
    animation: ${bounce} 600ms;
    animation-fill-mode: forwards;
  }
`;

export const CardInHand = styled.div`
  min-height: 90px;
  min-width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 19px;
  font-weight: 600;
  border: 2px solid #1976d2;
  font-size: 32px;
  font-weight: 500;
  color: #1976d2;
  background: ${({ disabled }) => (disabled ? 'lightgray' : 'white')};

  cursor: pointer;

  &:not(:first-of-type) {
    margin-left: 8px;
  }

  ${({ disabled }) => !disabled && cardHover}
`;

export const CardOnTable = styled.div`
  min-height: 90px;
  min-width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  font-size: 19px;
  font-weight: 600;
  border: 2px solid #1976d2;
  background: ${({ isShow }) => (isShow ? '#fff' : 'red')};
`;

export const Cards = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background: #d7e9ff;
`;

export const CardZone = styled.div`
  display: flex;
  justify-content: center;
`;

export const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
