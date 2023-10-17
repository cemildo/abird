import canvasConstants from "../constants/canvas-constants";

export default class NormalPig {

    constructor() {
        this.x = canvasConstants.CANVAS_WIDTH * 80 / 100;
        this.y = canvasConstants.CANVAS_HEIGHT * 70 / 100;
        this.radius = 15;
        this.width = 15;
        this.height = 15;
        this.velocityX = 10;
        this.velocityY = 7; 
        this.image = new Image();
        this.src = './images/normal-pig.png';
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