import {Game} from './scripts/game-engine/game.js';
import {Paddle} from './scripts/game/Paddle.js';
import {Ball} from './scripts/game/Ball.js';
import {Score} from './scripts/game/Score.js';
import {Connection} from './scripts/game/Connection.js';


const socket  = io('http://localhost:3000');
const p2Button = document.querySelector('#player2');
const buttonsList = document.querySelector('.buttons-list');

p2Button.addEventListener('click', () => startGame(2));


Game.constructor();
Promise.all([
    Game.SoundManager.loadAll([
        {name: 'pongHit', src: './scripts/game/snd/pong-hit.mp3'}
    ]),
    Game.ImageManager.loadAll([])
])
.then(() => {
    buttonsList.style.display = 'flex';
});


function startGame(players){
    buttonsList.style.display = 'none';
    Game.start();

    const score = new Score();
    const paddle = new Paddle();
    const paddle2 = new Paddle('right');
    const ball = new Ball();
    const connection = new Connection();

    Game.addObject(score);
    Game.addObject(paddle);
    Game.addObject(paddle2);
    Game.addObject(ball);
    Game.addObject(connection);

    connection.update = function(){
        if(this.input.onKey(this.input.key.UP)){
            socket.emit('player', 'up')
        }

        if(this.input.onKey(this.input.key.DOWN)){
            socket.emit('player', 'down')
        }

        socket.emit('ball', {x: ball.x, y: ball.y});
    }

    socket.on('ball', (position)=>{
        ball.x = position.x;
        ball.y = position.y;
    })

    socket.on('start', () => {
        ball.speed = 5;
        ball.resetPosition(); 
    })

    socket.on('p1', (direction) => {
        if(direction === 'up'){
            paddle.goUp();
        }
        if(direction === 'down'){
            paddle.goDown();
        }
    })

    socket.on('p2', (direction) => {
        if(direction === 'up'){
            paddle2.goUp();
        }
        if(direction === 'down'){
            paddle2.goDown();
        }
    })

    socket.on('score', (playersScore) => {
        score.p1Score = playersScore.p1;
        score.p2Score = playersScore.p2;
        ball.resetPosition();
        setTimeout(() => {
            score.checkGameOver();
        }, 50);
    })

    ball.onLeftOut = function(){
        socket.emit('ballOut', 'left');
    }

    ball.onRightOut = function(){
        socket.emit('ballOut', 'right');
    }

    score.onGameOver = function(winner){
        this.game.stop();
        alert(`Winner: ${winner}`);
    }

    socket.emit('startGame');

}