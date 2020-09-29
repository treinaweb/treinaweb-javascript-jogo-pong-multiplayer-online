const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const game = require('./server/game');
const PORT = 3000;

io.on('connection', (socket) => {
    game.connect(socket);
    socket.on('disconnect', () => {
        game.disconnect(socket);
    })
})

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
})