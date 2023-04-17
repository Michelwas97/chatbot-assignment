/** Variabelen **/
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const port = process.env.PORT || 4242

app.use(express.static(path.resolve('public')))

const homeRouter = require('./router/home')

// Set cache headers
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'max-age=' + 365 * 24 * 60 * 60);
    next();
});

/** ROUTES **/
app.use(homeRouter)

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
  
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })

http.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})