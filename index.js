
const { createServer } = require('node:http');
const { join } = require('node:path');
// const { Server } = require('socket.io');

const express = require("express")
const app = express()
const server = createServer(app);
const cors = require("cors")
const http = require('http').Server(app);
const dist = {};
const PORT = 4000
const io = require("socket.io")(server, 
    { 
    cors: {    
      origin: "*",    
    }});
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

function send(msg)
{
  socket.emit("update", msg)
}

io.on('connection', (socket) => {
  socket.emit("update", {[socket.id.toString()]: 0})
  socket.on('msg', (msg) => {
    console.log('message: ',msg);
    console.log("--------");
    console.log(Object.keys(dist));
    console.log("BEFORE ", dist);
    dist[(Object.keys(msg))[0]] = msg[(Object.keys(msg))[0]] ;
    console.log("AFTER ", dist);
    console.log("--------");
    // setSourceMapsEnabled(dist);
    socket.broadcast.emit("update", dist)
    socket.emit("update", dist)
    console.log(dist);
  });
  socket.on('disconnect', (id) => {
    console.log('id: ', socket.id);
    delete dist[socket.id];
    // setSourceMapsEnabled(dist);
   // socket.broadcast.emit("update", dist)
    console.log(dist);
  });
});

server.listen(4000, () => {
  console.log('server running at http://localhost:4000');
});
