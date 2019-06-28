const express = require('express')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')
const SERVER_PORT = process.env.PORT || 1234

const app = express();
const server = http.createServer(app)
const io = socketio(server)

let usersockets = {}

app.use('/', express.static(path.join(__dirname, 'frontend')))

io.on('connection', (socket) => {
    console.log("New socket formed from " + socket.id)
    socket.emit('connected')    
    

    /*socket.on("Room1", function(room){
        
    })*/

    socket.on('login', (data) => {
        // username is in data.user
        usersockets[socket.id] = data.user
        //for signalling the connection of new user
        //socket.broadcast.emit("new_user",data.user)
        console.log(usersockets)
        socket.join(data.Room1);
        socket.join(data.Room2);
        socket.broadcast.in(data.Room1).emit("new_user", data.user);
        socket.broadcast.in(data.Room2).emit("new_user", data.user);
    })
    
    socket.on('send_msg1', (data) => {
        // if we use io.emit, everyone gets it
        // if we use socket.broadcast.emit, only others get it
        if (data.message.startsWith('@')) {
            //data.message = "@a: hello"
            // split at :, then remove @ from beginning
            let recipient = data.message.split(':')[0].substr(1)
            let rcptSocket = recipient;
            //send message to all
            io.to(rcptSocket).emit('recv_msg1', data)
        } else {
            io.sockets.in("Room1").emit('recv_msg1', data)            
        }
    })

    socket.on('send_msg2', (data) => {
        // if we use io.emit, everyone gets it
        // if we use socket.broadcast.emit, only others get it
        if (data.message.startsWith('@')) {
            //data.message = "@a: hello"
            // split at :, then remove @ from beginning
            let recipient = data.message.split(':')[0].substr(1)
            let rcptSocket = recipient;
            //send message to all
            io.to(rcptSocket).emit('recv_msg2', data)
        } else {
            io.sockets.in("Room2").emit('recv_msg2', data)            
        }
    })

})

server.listen((SERVER_PORT), () => console.log('Website open on http://localhost:1234'))