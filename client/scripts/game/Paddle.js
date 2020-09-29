import { GameObject } from '../game-engine/gameObject.js';

export class Paddle extends GameObject{
    constructor(side = 'left'){
        super();
        this.speed = 3;
        this.width = 20;
        this.height = 100;
        this.centerY = this.game.canvas.center.y;
        if(side === 'left'){
            this.left = this.game.canvas.left + 5;
        }else{
            this.right = this.game.canvas.right - 5;
        }
    }

    goUp(){
        if(this.top > this.game.canvas.top){
            this.y -= this.speed;
        }
    }

    goDown(){
        if(this.bottom < this.game.canvas.bottom){
            this.y += this.speed;
        }
    }

    draw(){
        this.drawing.drawRect(this.x, this.y, this.width, this.height);
    }
}