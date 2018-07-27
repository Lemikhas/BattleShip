const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const ShipGame = require('./game');

const app = express();

const clientPath = `${__dirname}/../client`;
console.log(`Serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

let waitingPlayer = null;

io.on('connection', (sock) => {
    if (waitingPlayer){
        //start game
        new ShipGame(waitingPlayer, sock);
        waitingPlayer = null;
    }else{
        waitingPlayer = sock;
        waitingPlayer.emit('message', 'Waiting for opponent...');
    }
});

server.on('error', (err) => {
    console.log('Server error:', err);
});

server.listen(3000, () => {
    console.log('BattleShips started on 3000');
});