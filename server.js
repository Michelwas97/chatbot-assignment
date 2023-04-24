/** Variabelen **/
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const session = require('express-session')
const port = process.env.PORT || 4242
const formatMessage = require('./utils/messages');

app.use(express.static(path.resolve('public')))

const botName = 'ChatterMate Bot';
const sessionLength = (1000 * 60 * 60 * 24) * 7; // 1 day

const homeRouter = require('./router/home')
const chatlobbyRouter = require('./router/chatlobby')

// Set cache headers
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'max-age=' + 365 * 24 * 60 * 60);
    next();
});

app.use(session({
  name: 'chatsession',
  secret: "chatsecretsessiondata",
  saveUninitialized:true,
  cookie: { maxAge: sessionLength },
  resave: false
}));

/** ROUTES **/
app.use(homeRouter)
app.use(chatlobbyRouter)

app.set('view engine', 'ejs')

io.on('connection', (socket) => {
    console.log('a user connected')
    // io.emit('history', history)
  
    socket.on('message', (message) => {
      // while (history.length > historySize) {
      //   history.shift()
      // }
      // history.push(message)
  
      io.emit('message', message)
    })

    socket.broadcast.emit('message', formatMessage(botName, 'A new user has joined the chat!'));

    // Listen for chatMessage
    socket.on('chatMessage', (msg) => {
      io.emit('message', formatMessage('user', msg));
    });
  
    socket.on('disconnect', () => {
      socket.broadcast.emit('message', formatMessage(botName,'A user has left the chat.'));
    })
  })

http.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})