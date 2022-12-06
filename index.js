const express = require('express')
const {join} = require('path')
const http = require('http')
const {Server} = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static(join(__dirname,'public')))

app.get('/',(req,res)=>{
    res.render('index.html')
})

io.on('connection',(socket)=>{
    // console.log('conected');
    socket.on('mensaje',(data)=>{
        data['idSecion'] = socket.id 
        io.emit('mensaje',data)
    })
})

server.listen(process.env.PORT || 3000)









