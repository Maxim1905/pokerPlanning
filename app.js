const http = require('http'),
  express = require('express'),
  socketio = require('socket.io');

const config = require('config');
// подключаемся к mongoDB
const mongoose = require('mongoose');

const authRoute = require('./routes/auth.routes');
const linkRoute = require('./routes/link.routes');

const SERVER_PORT = config.get('port') || 5000;
const MONGO_URI = config.get('mongoUri');

const onlineClients = new Set();

function generateRandomNumber() {
  return Math.floor(Math.random() * 1000).toString();
}

let gradesList = [];

const users = [];

// Join user to chat
const userJoin = (id, username, room) => {
  const user = { id, username, room };

  users.push(user);

  return user;
};

const startServer = async () => {
  // Создан новый express сервер
  const app = express();

  // Создан новый http сервер как обертка для express сервера
  const server = http.createServer(app);

  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  // подвязка socket.io к серверу
  const io = socketio(server);

  // example on how to serve a simple API
  app.get('/random', (req, res) => res.send(generateRandomNumber()));
  app.use('/api/auth', authRoute);
  app.use('/api/link', linkRoute);

  // will fire for every new websocket connection
  io.on('connection', (socket) => {
    let currentUser = {};

    console.info(`Socket ${socket.id} has connected.`);

    onlineClients.add(socket.id);

    socket.on('joinRoom', ({ username, room }) => {
      const user = userJoin(socket.id, username, room);
      currentUser = userJoin(socket.id, username, room);

      socket.join(user.room);

      // Welcome current user
      socket.emit('message', `Твоя комната ${user.room}`);

      // Broadcast when a user connects
      socket.broadcast
        .to(user.room)
        .emit('message', `A ${user.username} join to the chat`);

      socket.emit('gradesList', gradesList);
    });

    socket.on('disconnect', () => {
      onlineClients.delete(socket.id);
      console.info(`Socket ${socket.id} has disconnected.`);
    });

    socket.on('deletGrades', () => {
      gradesList = [];
    });

    socket.on('gradesList', (grade) => {
      gradesList.push(grade);
      socket.broadcast.to(currentUser.room).emit('gradesList', gradesList);

      socket.emit('gradesList', gradesList);
    });
  });

  // должен прослушивать сервер, а не приложение, иначе socket.io не будет работать правильно
  server.listen(SERVER_PORT, () =>
    console.info(`Listening on port ${SERVER_PORT}.`)
  );
};

startServer();
