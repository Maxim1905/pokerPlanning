// мидлвэр это обычная функция которая будет перехватывать опеделенные данные и выполнять с ними логику

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (request, response, next) => {
  // если метод не нужный на "OPTIONS" - метод который проверяет доступность сервера
  if (request.method === "OPTIONS") {
    return null;
  }

  try {
    // достаем токен из запроса
    const token = request.headers.authorization.split(" ")[1]; // "Bearer TOKEN"

    // если нет токена то вернем ошибку
    if (!token) {
      return response.status(401).json({ message: "Нет авторизации" });
    }

    // декодируем токен и добавляем его в поле запроса user
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    request.user = decoded;

    // продолжаем выполнение скрипта командой next()
    next();
  } catch (error) {
    response.status(401).json({ message: "Нет авторизации" });
  }
};
