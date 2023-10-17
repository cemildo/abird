import canvasConstants from "../constants/canvas-constants";

export default class SwingArc {

    constructor() {
        this.x = canvasConstants.CANVAS_WIDTH * 15 / 100;
        this.y = canvasConstants.CANVAS_HEIGHT * 68 / 100;
        this.radius = 80; 
        this.static = true; 
    }

    draw(context) {
        const beginAngle = Math.PI * 3 / 4;
        const endAngle = beginAngle + Math.PI / 2; 
        const startX = this.x + this.radius * Math.cos(beginAngle);
        const startY = this.y + this.radius * Math.sin(beginAngle);
        const endX = this.x + this.radius * Math.cos(endAngle);
        const endY = this.y + this.radius * Math.sin(endAngle);

        // Set the line style to dashed with white color
        context.strokeStyle = 'white';
        context.setLineDash([5, 3]);
        context.lineWidth = 2; 

        // Draw the dashed line from the starting point to the center, then to the ending point
        context.beginPath();
 
        context.arc(this.x, this.y, this.radius, beginAngle, endAngle);        

        context.moveTo(startX, startY);
        context.lineTo(this.x, this.y);
        context.lineTo(endX, endY);
        context.stroke();
    }
}