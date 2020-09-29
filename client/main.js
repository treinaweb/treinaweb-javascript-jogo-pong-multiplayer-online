import {Game} from './scripts/game-engine/game.js';
import {Paddle} from './scripts/game/Paddle.js';
import {PaddleAI} from './scripts/game/PaddleAI.js';
import {Ball} from './scripts/game/Ball.js';
import {Score} from './scripts/game/Score.js';


const p1Button = document.querySelector('#player1');
const p2Button = document.querySelector('#player2');
const buttonsList = document.querySelector('.buttons-list');


p1Button.addEventListener('click', () => startGame(1));
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
    const paddleAI = new PaddleAI(ball);

    Game.addObject(score);
    Game.addObject(paddle);
    //Game.addObject(paddle2);
    //Game.addObject(paddleAI);
    Game.addObject(ball);

    if(players === 1){
        Game.addObject(paddleAI);
    }else{
        Game.addObject(paddle2);
    }


    paddle.update = function(){
        if(this.input.onKey(this.input.key.W)){
            this.goUp();
        }

        if(this.input.onKey(this.input.key.S)){
            this.goDown();
        }
    }

    paddle2.update = function(){
        if(this.input.onKey(this.input.key.UP)){
            this.goUp();
        }

        if(this.input.onKey(this.input.key.DOWN)){
            this.goDown();
        }
    }

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

}