import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { useHttp } from '../../hooks/http.hook';
import { useMessage } from '../../hooks/message.hook';
import { Form } from 'react-final-form';
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

export const AuthPage = () => {
  const { login } = useContext(AuthContext);

  const message = useMessage();

  const [form, setForm] = useState({ email: '', password: '' });
  const { loading, error, request, clearError } = useHttp();

  useEffect(() => {
    console.log('error', error);
    clearError();
  }, [error, message, clearError]);

  // на каждое изменение мы получаем значение формы в state
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // метод для регистрации
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });

      message(data.message);
    } catch (error) {}
  };

  // метод для логина
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      login(data.token, data.userId);
      message(data.message);
    } catch (error) {}
  };
  return (
    <Container>
      <Wrapper>
        <Form
          subscription={{ submitting: true }}
          onSubmit={(data) => console.log(data)}
        >
          {({ handleSubmit, form }) => (
            <FormStyled onSubmit={handleSubmit}>
              <TextField
                placeholder="Введите email"
                id="email"
                label="email"
                name="email"
                value={form.email}
                onChange={changeHandler}
              />

              <TextField
                placeholder="Введите пароль"
                id="password"
                name="password"
                label="password"
                value={form.password}
                onChange={changeHandler}
              />
            </FormStyled>
          )}
        </Form>
        <FormDirection>
          <ButtonStyled
            variant="contained"
            color="primary"
            startIcon={<ExitToAppIcon />}
            disabled={loading}
            onClick={loginHandler}
          >
            Войти
          </ButtonStyled>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<AssignmentIndIcon />}
            onClick={registerHandler}
            disabled={loading}
          >
            Регистрация
          </Button>
        </FormDirection>
      </Wrapper>
    </Container>
  );
};
