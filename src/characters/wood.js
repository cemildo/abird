import canvasConstants from "../constants/canvas-constants";

export default class Wood {
    constructor() {
        this.x = 0;
        this.y = canvasConstants.CANVAS_HEIGHT - this.getWidth(); 
        this.width = this.getWidth();
        this.height = this.getHeight();
        this.static = true;
        this.image = new Image();
        this.src = './images/wood.png';
    }

    draw(context) {
        context.beginPath();

        this.image.onload = () => {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        this.image.setAttribute('src', this.src);
    }

    getWidth() {
        return canvasConstants.CANVAS_HEIGHT * 6 /100
    }

    getHeight() {
        return canvasConstants.CANVAS_HEIGHT * 6 /100
    }
}