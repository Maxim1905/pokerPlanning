import { useCallback, useEffect, useState } from "react";

// хук для авторизации пользователя на клиенте. Сохраняет или удаляет токен в local storage. Проверяет есть ли валидный токен при перезагрузке
export const useAuth = () => {
  // создаем флаг который говорит отработал ли модуль авторизации
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const storageName = "userData";

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwtToken })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId);
    }

    // выставляем флаг авторизации
    setReady(true);
  }, [login]);

  return {
    login,
    logout,
    token,
    userId,
    ready,
  };
};
