import canvasConstants from "../constants/canvas-constants";

export default class Weapon {
 
    constructor() {
        this.x = canvasConstants.CANVAS_WIDTH * 14 / 100;
        this.y = canvasConstants.CANVAS_HEIGHT * 64 / 100; 
        this.radius = 20;
        this.width = 20;
        this.height = 60; 
        this.image = new Image();
        this.src = './images/weapon.png';
        
    }

    draw(context) {
        context.beginPath(); 
        this.image.onload = () => {
            
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        this.image.setAttribute('src', this.src);
    }
}