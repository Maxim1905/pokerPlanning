// подключаем роутер из экспресса и экспортируем его
const { Router } = require("express");
const router = Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// обрабатываем два пост запроса

// префикс /api/auth/
router.post(
  "/register",
  // middleware проверка полей
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при регистрации",
        });
      }
      // с фронта прилетает запрос, в его теле получаем поля
      const { email, password } = request.body;

      // проверяем наличие такого пользователя по email
      const candidate = await User.findOne({ email });

      // если есть то вернем статус ошибки с сообщением
      if (candidate) {
        return response
          .status(400)
          .json({ message: "Такой пользователь уже существует" });
      }
      // если нет, то хэшируем пароль и создаем нового пользователя
      const hashPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashPassword });

      // дожидаемся сохранения в БД и возврашаем статус успешного создания
      await user.save();

      response.status(201).json({ message: "Пользователь создан" });
    } catch (error) {
      response
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

// префикс /api/auth/login
router.post(
  "/login",
  [
    check("email", "Введите корректный email").normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists(),
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при входе в систему",
        });
      }

      const { email, password } = request.body;

      // если такой пользователь уже есть то мы не можем войти
      const user = await User.findOne({ email });

      if (!user) {
        return response.status(400).json({ message: "Пользователь не найден" });
      }

      // совпадают ли пароли
      const isMatch = bcrypt.compare(password, user.password);

      if (!isMatch) {
        return response
          .status(400)
          .json({ message: "Неверный пароль попробуйте снова" });
      }

      const jwtSecret = config.get("jwtSecret");

      // тут мы уже можем сделать авторизацию
      //  expiresIn через сколько истечет срок токена
      const token = jwt.sign({ userId: user.id }, jwtSecret, {
        expiresIn: "1h",
      });

      response.json({ token, userId: user.id });
    } catch (error) {
      response
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

module.exports = router;
