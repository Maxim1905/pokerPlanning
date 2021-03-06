// Инициализация проекта:
// - npm init
// - ответить на базовые вопросы которые предлагает wizard
// - для того чтобы разрабатывать на Ноде нужны базовые зависимости – express, mongoose
// - пакеты для разработки nodemon, concurrently
// - создаем начальные скрипты для запуска фронта и бека
// Чтобы создать базовое приложение на express мы получаем его через require.
// В node.js чтобы получать пакеты у нас есть глобальная функция require.
// npx create-react-app client - создали проект клиентской части в папку client

const express = require("express");
const config = require("config");
// подключаемся к mongoDB
const mongoose = require("mongoose");

const authRoute = require("./routes/auth.routes");
const linkRoute = require("./routes/link.routes");
const redirectRoute = require("./routes/redirect.routes");

const path = require("path");

// сервер
const app = express();

app.use(express.json({ extended: true }));

// регистрируем роуты которые будут обрабатывать апи запросы с фронта
app.use("/api/auth", authRoute);
app.use("/api/link", linkRoute);
app.use("/t", redirectRoute);

// помимо формирования АПИ нужно отдавать фронтенд

if (process.env.NODE_ENV === "production") {
  // добавляем express.static чтобы указать статическую папку
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  // любой "*" get запрос я буду отправлять файл который назодится в папке client-build-index.html
  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = config.get("port") || 5000;
const MONGO_URI = config.get("mongoUri");

// нужно вызвать метод connect который позволит подключиться к базе данных, метод возвращает промис, поэтому оборачиваем в ассинхронную функцию

const start = async () => {
  // try catch чтоб обработать промис
  try {
    // uri и набор опций
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    // выйти из процесса node.js
    process.exit(1);
  }
};

start();

app.listen(PORT, () => console.log(`App has been started on ${PORT}...`));
