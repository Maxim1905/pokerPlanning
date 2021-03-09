import { useState, useContext } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useHistory } from 'react-router-dom';
import shortid from 'shortid';
import { AuthContext } from '../../context/auth.context';
import { Form, Field } from 'react-final-form';
import { TextField, Button } from '@material-ui/core';

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import {
  Container,
  FormDirection,
  ButtonStyled,
  FormStyled,
  Wrapper,
} from './styled';

export const CreatePage = () => {
  const history = useHistory();
  const [link, setLink] = useState();
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  const pressHandler = async (event) => {
    if (event.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          {
            from: link,
          },
          { Authorization: `Bearer ${auth.token}` }
        );

        history.push(`/game/${data.link._id}`);
      } catch (error) {}
    }
  };

  return (
    <Container>
      <Wrapper>
        <Form
          subscription={{ submitting: true }}
          onSubmit={(data) => {
            const gameId = shortid.generate(data.name);

            history.push(`/game/${gameId}`);
          }}
        >
          {({ handleSubmit, form }) => (
            <>
              <FormStyled onSubmit={handleSubmit}>
                <Field
                  name="name"
                  render={({ input, meta }) => (
                    <TextField label="Название игры" {...input} meta={meta} />
                  )}
                />
                <FormDirection>
                  <ButtonStyled
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    startIcon={<ExitToAppIcon />}
                  >
                    Создать игру
                  </ButtonStyled>

                  <button type="submit">Submit</button>
                </FormDirection>
              </FormStyled>
            </>
          )}
        </Form>
      </Wrapper>
    </Container>
  );
};
