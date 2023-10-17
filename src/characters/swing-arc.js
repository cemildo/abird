export default class SwingArc {

    x = canvas.width / 2;  
    y = canvas.height / 2;  
    radius = 50;               
    dotRadius = 5; 

    draw(context) {
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        context.strokeStyle = 'white';  // Set the stroke color to white
        context.lineWidth = 5;         // Set the stroke width
        context.stroke();              // Stroke the circle
 
        context.beginPath();
        context.arc(centerX, centerY, dotRadius, 0, 2 * Math.PI);
        context.fillStyle = 'white';   // Set the fill color to white
        context.fill();   
    }
}