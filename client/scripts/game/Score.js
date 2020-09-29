import { GameObject } from '../game-engine/gameObject.js';

export class Score extends GameObject{
    constructor(){
        super();
        this.canCollide = false;
        this.p1Score = 0;
        this.p2Score = 0;
        this.maxScore = 3;
        this.winner = null;
    }

    p1Point(){
        this.p1Score++;
        this.checkGameOver();
    }
    p2Point(){
        this.p2Score++;
        this.checkGameOver();
    }
    checkGameOver(){
        if(this.p1Score >= this.maxScore){
            this.winner = 'P1';
        }
        if(this.p2Score >= this.maxScore){
            this.winner = 'P2';
        }
        if(this.winner){
            this.onGameOver(this.winner);
        }
    }

    draw(){
        this.drawing.setText({h: 'left'});
        this.drawing.drawText(30, 20, `P1 - ${this.p1Score}`);
        this.drawing.setText({h: 'right'});
        this.drawing.drawText(this.game.canvas.right - 30, 20, `P2 - ${this.p2Score}`);
        
        this.drawing.drawRect(this.game.canvas.center.x - 3, 0, 6, this.game.canvas.height);
    }

    onGameOver(winner){}
}