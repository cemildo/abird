import canvasConstants from "../constants/canvas-constants";

export default class RedBird {
    constructor() {
        this.x = canvasConstants.CANVAS_WIDTH * 14 / 100;
        this.y = canvasConstants.CANVAS_HEIGHT * 70 / 100; 
        this.radius = 10;
        this.velocityX = 0;
        this.velocityY = 0; 
        this.image = new Image();
        this.static = true;
        this.current = true;
        this.src = './images/red-bird.png';
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.closePath();
        context.clip();
         
        this.image.onload =  () => {  
            context.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        };

        this.image.setAttribute('src', this.src);
    }
}