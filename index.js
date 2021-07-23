var express = require('express')
var http = require('http')

var app = express()

app.use(express.static('./'))
// app.use(express.static('node_modules/'))


var server = http.createServer(app)

const { Server } = require('socket.io')

const io = new Server(server)

app.get('/', function(req, res){
    res.sendFile('web/index.htm', {root:__dirname})
})

server.listen(5000, ()=>{
    console.log('Listening at 5000...')
})

io.on('connection', function(socket){
    console.log('Connected');
    socket.on('msg', (msg)=>{
        console.log(msg);
        io.emit('msg',msg)
    })
    socket.on('disconnect', ()=>{
        console.log('User disconnected...');
    })
})