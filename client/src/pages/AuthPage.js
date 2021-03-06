import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
  const { login } = useContext(AuthContext);

  const message = useMessage();
  const [form, setForm] = useState({ email: "", password: "" });
  const { loading, error, request, clearError } = useHttp();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  // на каждое изменение мы получаем значение формы в state
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  // метод для регистрации
  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });

      message(data.message);
    } catch (error) {}
  };

  // метод для логина
  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      login(data.token, data.userId);
      message(data.message);
    } catch (error) {}
  };
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>

        <div className="card blue-grey darken-1">
          <div class="card-content white-text">
            <span className="card-title">Авторизация</span>
          </div>
          <div className="container">
            <div class="input-field">
              <input
                placeholder="Введите email"
                id="email"
                name="email"
                type="text"
                value={form.email}
                onChange={changeHandler}
              />

              <label htmlFor="email">Email:</label>
            </div>

            <div class="input-field">
              <input
                placeholder="Введите пароль"
                id="password"
                name="password"
                type="text"
                value={form.password}
                onChange={changeHandler}
              />

              <label htmlFor="password">Password:</label>
            </div>
          </div>

          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>

            <button
              className="btn green darken-4"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
