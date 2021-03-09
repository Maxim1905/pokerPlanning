import { useEffect } from 'react';

import {
  Container,
  FormDirection,
  ButtonStyled,
  FormStyled,
  Wrapper,
  Table,
  Card,
  Cards,
} from './styled';

import { io } from 'socket.io-client';

const FIBONACCI = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, '?'];

export const GamePage = () => {
  useEffect(() => {
    const socket = io();

    socket.on('connect', () =>
      socket.emit('hello', `Hi there! I am ${window.navigator.userAgent}`)
    );
  }, []);

  return (
    <Container>
      <Table />

      <Cards>
        {FIBONACCI.map((number) => (
          <Card>{number}</Card>
        ))}
      </Cards>
    </Container>
  );
};
