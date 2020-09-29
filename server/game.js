const users = [];


const PongServer = {
    connect(socket){
        socket.on('startGame', () => this.enterRoom(socket));
    },
    disconnect(socket){
        const userIndex = users.findIndex(user => user.id === socket.id);
        users.splice(userIndex, 1);
    },

    enterRoom(socket){
        if(users.length === 0){
            socket._p1 = true;
        }else{
            socket._p1 = false;
        }

        users.push(socket);

        if(users.length === 2){
            users.forEach(user => user.emit('start') );
        }
    }
}


module.exports = PongServer;