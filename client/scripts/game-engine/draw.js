export class Draw{
    constructor(canvasContext, canvasWidth, canvasHeight){
        this.ctx = canvasContext;        
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.center = {x: canvasWidth/2, y: canvasHeight/2};

        this.fontOptions = {
            family: 'Press Start 2P',
            size: 20,
            h: 'center',
            v: 'middle'
        }
        this.setText();
    }

    drawRect(x, y, width, height, color = 'white'){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    drawCircle(cx, cy, r, color = 'white'){
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.arc(cx, cy, r, 50, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    setText(options = {}){
        this.fontOptions = {...this.fontOptions, ...options};
        this.ctx.font = `${this.fontOptions.size}px "${this.fontOptions.family}"`;        
        this.ctx.textAlign = this.fontOptions.h;
        this.ctx.textBaseline = this.fontOptions.v;        
    }

    drawText(x, y, text, color = 'white'){
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, x, y);
    }

    drawImage(image, x, y, width, height){
        x = x ?? 0;
        y = y ?? 0;
        width = width ?? image.width;
        height = height ?? image.height;
        this.ctx.drawImage(image.element, x, y, width, height);
    }

    drawSprite(sprite, number, x, y, width, height){
        x = x ?? 0;
        y = y ?? 0;
        width = width ?? sprite.width;
        height = height ?? sprite.height;
        this.ctx.drawImage(
            sprite.image.element,
            sprite.sprites[number].x,
            sprite.sprites[number].y,
            sprite.width,
            sprite.height,
            x, 
            y, 
            width, 
            height);
    }

    clearCanvas(){
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
}