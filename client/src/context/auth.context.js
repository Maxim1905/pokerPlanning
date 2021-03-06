import { createContext } from "react";

const noop = () => {};

// для передачи данных регистрации/авторизации не по древовидной структуре приложения а через контекст

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
});
