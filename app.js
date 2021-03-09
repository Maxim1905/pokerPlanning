// Инициализация проекта:
// - npm init
// - ответить на базовые вопросы которые предлагает wizard
// - для того чтобы разрабатывать на Ноде нужны базовые зависимости – express, mongoose
// - пакеты для разработки nodemon, concurrently
// - создаем начальные скрипты для запуска фронта и бека
// Чтобы создать базовое приложение на express мы получаем его через require.
// В node.js чтобы получать пакеты у нас есть глобальная функция require.
// npx create-react-app client - создали проект клиентской части в папку client

const express = require('express');
const config = require('config');
// подключаемся к mongoDB
const mongoose = require('mongoose');
const socketio = require('socket.io');
const http = require('http');

const authRoute = require('./routes/auth.routes');
const linkRoute = require('./routes/link.routes');
const redirectRoute = require('./routes/redirect.routes');

const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require('./utils/users');

// сервер
const app = express();

// const server = http.createServer(app);
// const io = socketio(server);

app.use(express.json({ extended: true }));

// регистрируем роуты которые будут обрабатывать апи запросы с фронта
app.use('/api/auth', authRoute);
app.use('/api/link', linkRoute);
app.use('/t', redirectRoute);

// io.on('connection', (socket) => {
//   socket.on('joinRoom', ({ username, room }) => {
//     const user = userJoin(socket.id, username, room);

//     socket.join(user.room);

//     // Welcome current user
//     socket.emit('message', formatMessage(username, 'Welcome to chat!'));

//     // Broadcast when a user connects
//     socket.broadcast
//       .to(user.room)
//       .emit(
//         'message',
//         formatMessage(username, `A ${user.username} join to the chat`)
//       );

//     // Send users and room info
//     io.to(user.room).emit('roomUsers', {
//       room: user.room,
//       users: getRoomUsers(user.room),
//     });
//   });

//   // Listen for chatMessage
//   socket.on('chatMessage', (msg) => {
//     const user = getCurrentUser(socket.id);

//     io.to(user.room).emit('message', formatMessage(user.username, msg));
//   });

//   // Runs when client disconnects
//   socket.on('disconnect', () => {
//     const user = userLeave(socket.id);

//     if (user) {
//       io.to(user.room).emit(
//         'message',
//         formatMessage('Chat Bot', `A ${user.username} left chat`)
//       );

//       // Send users and room info
//       io.to(user.room).emit('roomUsers', {
//         room: user.room,
//         users: getRoomUsers(user.room),
//       });
//     }
//   });
// });

const PORT = config.get('port') || 5000;
const MONGO_URI = config.get('mongoUri');

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
