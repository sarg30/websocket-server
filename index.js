const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);


app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


io.on('connection', (socket) => {
    // console.log(`A user connected. User id: ${socket.id}`);
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    // });

    socket.on('message', (msg) => {
        // console.log(`message: ${msg}. Sender: ${socket.id}`);
        io.emit('message', msg);
    })
});


server.listen(4000, () => {
  console.log('server running at http://localhost:4000');
});


/**
 * io.emit() is to send the event to everyone
 * socket.broadcast.emit() is to send to everyone except for certain emitting socket
 * 
 * 
 * To send from client to server, use socket.emit(...) on client
 * then on server, use socket.on(...)
 * 
 * 
 * To send from server to client, use socket.emit(...) or socket.emit(...)
 * and then on client use socket.on(...)
 */