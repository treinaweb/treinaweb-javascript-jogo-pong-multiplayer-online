const users = [];
const score = {
    p1: 0,
    p2: 0
}


const PongServer = {
    connect(socket){
        socket.on('startGame', () => this.enterRoom(socket));
        socket.on('player', (direction) => this.handlePlayer(socket, direction));
        socket.on('ball', (position) => this.handleBall(socket, position));
        socket.on('ballOut', (side) => this.handleBallOut(socket, side));
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
            score.p1 = 0;
            score.p2 = 0;
        }
    },

    handlePlayer(socket, direction){
        users.forEach(user => {
            user.emit(`p${socket._p1 ? '1':'2'}`, direction);
        })
    },
    handleBall(socket, position){
        if(socket._p1){
            users.forEach(user => {
                !user._p1 && user.emit('ball', position);
            })
        }
    },
    handleBallOut(socket, side){
        if(socket._p1){
            if(side === 'left'){
                score.p2++;
            }else{
                score.p1++;
            }
            users.forEach((user) => {
                user.emit('score', score);
            })
        }
    }
}


module.exports = PongServer;