export default class NormalPig {

    x = canvas.width / 2;  
    y = canvas.height / 2;  
    radius = 50;               
    dotRadius = 5; 

    draw(context) {
        img.src = 'path_to_your_image.jpg';

        // Define the destination rectangle
        const destX = 50;  // X-coordinate of the top-left corner of the destination rectangle
        const destY = 50;  // Y-coordinate of the top-left corner of the destination rectangle
        const destWidth = 200;  // Width of the destination rectangle
        const destHeight = 150;  // Height of the destination rectangle

        // Wait for the image to load
        img.onload = function () {
        // Draw the image into the destination rectangle
           context.drawImage(img, destX, destY, destWidth, destHeight);
        };
    }
}