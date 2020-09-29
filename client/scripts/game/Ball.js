import { GameObject } from '../game-engine/gameObject.js';

export class Ball extends GameObject{
    constructor(){
        super();
        this.speed = 5;
        this.size = 10;
        this.width = this.height = this.size;
        this.resetPosition();
    }

    resetPosition(){
        const speed = this.speed;
        this.speed = 0;
        this.xDirection = this.randomDirection();
        this.yDirection = this.randomDirection();
        this.centerX = this.game.canvas.center.x;
        this.centerY = this.game.canvas.center.y;
        setTimeout(() => {
            this.speed = speed;
        }, 500)
    }

    randomDirection(){
        return Math.random() * 100 > 50 ? 1 : -1;
    }

    invertX(){
        this.xDirection *= -1;
        this.game.SoundManager.play('pongHit');
    }
    
    invertY(){
        this.yDirection *= -1;
        this.game.SoundManager.play('pongHit');
    }

    goUp(){
        if(this.top > this.game.canvas.top){
            this.y -= this.speed;
        }else{
            this.invertY();
        }
    }

    goDown(){
        if(this.bottom < this.game.canvas.bottom){
            this.y += this.speed;
        }else{
            this.invertY();
        }
    }

    goLeft(){
        if(this.left > this.game.canvas.left){
            this.x -= this.speed;
        }else{
            this.invertX();
            this.onLeftOut();
        }
    }

    goRight(){
        if(this.right < this.game.canvas.right){
            this.x += this.speed;
        }else{
            this.invertX();
            this.onRightOut();
        }
    }
    
    update(){
        if(this.yDirection > 0){
            this.goDown();
        }else{
            this.goUp();
        }

        if(this.xDirection > 0){
            this.goRight();
        }else{
            this.goLeft();
        }
    }

    draw(){
        this.drawing.drawCircle(this.center.x, this.center.y, this.size);
    }

    onCollision(){
        this.invertX();
    }

    onLeftOut(){}
    
    onRightOut(){}
}