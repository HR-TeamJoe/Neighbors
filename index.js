const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const controller = require('./server/controller.js');
const db = require('./db/models/db.js');
const Session = require('./db/models/session.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const socket = require('socket.io')
const Room = require('./db/models/room.js');
const Message = require('./db/models/messages.js');

const extendDefaultFields = (defaults, session) => ({ // config for holding session in db
  userId: session.userId,
});
const port = process.env.PORT || 8080;
const app = express();
module.exports = app;

require('./server/passport')(passport);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'MrButtonPHDnotMDmaybeDRnotSure',
  store: new SequelizeStore({
    db,
    extendDefaultFields,
    table: 'Session',
  }),
  saveUninitialized: false,
  resave: true,
  proxy: undefined,
  secure: true,
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
require('./server/routes.js')(app, passport);
app.use(controller.publicRoutes, express.static(path.join(__dirname, '/public')));


var server = app.listen(port);

const io = socket(server);

io.on('connection', function(socket) {
  var foundRoom;
  var fullName;

  socket.on('findRoom', (data) => {
    controller.findRoom(data)
    .then((roomObject) => {
      foundRoom = roomObject;
      socket.join(roomObject.roomId);
      io.to(foundRoom.roomId).emit('entered', data.fullName);
      fullName = data.fullName;
      controller.getMessages(roomObject)
        .then((messages) => {
      socket.emit('server:message', messages)
      console.log('+++messages in index.js socket.on: ', messages)
      console.log('+++fullName in entered emit: ', data.fullName)
    })
    })

  })
  
  socket.on('new message', (messageData) => {
    console.log('+++messageData in index.js: ', messageData)
    var sendThis = {
      message: messageData.message,
      room_id: foundRoom.id,
      user_id: messageData.user_id
    }
    io.to(foundRoom.roomId).emit('server:new message', sendThis);
    controller.saveMessages(sendThis);
  })

  socket.on('disconnect', function() {
    io.to(foundRoom.roomId).emit('disconnected', fullName);
  })
})

console.log(`Neighborly running on: ${port}`);

