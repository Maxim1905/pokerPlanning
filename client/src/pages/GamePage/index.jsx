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
  const socket = io('http://localhost:3000');

  console.log(socket.id); // undefined

  socket.on('connect', () => {
    console.log(socket.id); // "G5p5..."
  });

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
