import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import { Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import {
  Container,
  Table,
  CardInHand,
  CardOnTable,
  Cards,
  CardZone,
  TableWrapper,
} from './styled';

const FIBONACCI = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, '?'];
const socket = io();

export const GamePage = () => {
  const [showCard, setShowCards] = useState(false);
  const [cards, setCards] = useState([]);
  const [cardsDisabled, setCardsDisabled] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    // Попасть в комнату
    socket.emit('joinRoom', { username: 'max', room: id });
    socket.on('message', (message) => console.log('message', message));
  }, [id]);

  useEffect(() => {
    socket.on('gradesList', (cards) => setCards(cards));
  }, [setCards, cards]);

  const chooseCardHandler = (number) => {
    if (!cardsDisabled) {
      socket.emit('gradesList', number);
      setCardsDisabled(true);
    }

    return;
  };

  const token = JSON.parse(localStorage.getItem('userData')).token;

  if (!token) {
    return 'Уходи';
  }

  const showCards = () => {
    setShowCards(true);
    socket.emit('deletGrades', []);
  };

  return (
    <Container>
      <TableWrapper>
        <Table />

        <CardZone>
          {cards.map((card) => (
            <CardOnTable isShow={showCard}>{showCard && card}</CardOnTable>
          ))}
        </CardZone>
      </TableWrapper>

      <Cards>
        {FIBONACCI.map((number) => (
          <CardInHand
            disabled={cardsDisabled}
            key={number}
            onClick={() => chooseCardHandler(number)}
          >
            {number}
          </CardInHand>
        ))}

        <Button
          variant="contained"
          color="primary"
          onClick={showCards}
          disabled={cards.length === 0}
        >
          Открыть карты
        </Button>
      </Cards>
    </Container>
  );
};
