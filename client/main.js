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
    }

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

    ball.onLeftOut = function(){
        score.p2Point();
        this.resetPosition();
    }

    ball.onRightOut = function(){
        score.p1Point();
        this.resetPosition();
    }

    score.onGameOver = function(winner){
        this.game.stop();
        alert(`Winner: ${winner}`);
    }

    socket.emit('startGame');

}