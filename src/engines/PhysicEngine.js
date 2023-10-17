import canvasConstants from "../constants/canvas-constants";

export default class PhysicEngine {
    gravity = 0.1;
    restitution = 0.8;
    damping = 0.98;
    items = [];

    setItems(items){
        this.items = items;
    }

    run(context) { 
        this.items.forEach(item => {
            item.velocityY += this.gravity;

            // Update position based on velocity
            item.x += item.static ? 0 : item.velocityX;
            item.y += item.static ? 0 : item.velocityY;
    
            // Apply damping to simulate velocity loss over time
            item.velocityX *= this.damping;
            item.velocityY *= this.damping;
    
            // Check for collision with the walls
            this.checkCollisionWithBoundries(item);
            this.checkCollisionWithOtherItems(item);
            item.draw(context);
        }) 
    }

    checkCollisionWithOtherItems(item) {
        this.items.forEach(otheritem => {
            if (item !== otheritem) {
                const coordinates = this.getCoordinatesDifferences(item, otheritem);
                const distance = Math.sqrt(coordinates.x **2 + coordinates.y**2);

                if (distance < item.radius + otheritem.radius) {
            
                    const angle = Math.atan2(coordinates.y, coordinates.x);
                    this.setVelocity(item, angle);
                    this.setVelocity(otheritem, angle);

                    this.avoidSticking(item, otheritem, angle, distance);
                }
            }
        });
    }



    avoidSticking(item, otheritem, angle, distance) {
        const overlap = (item.radius + otheritem.radius - distance) / 2;
        const xOffset = overlap * Math.cos(angle);
        const yOffset = overlap * Math.sin(angle);

        item.x += item.static ? 0 : xOffset;
        item.y += item.static ? 0 : yOffset;
        otheritem.x -= xOffset;
        otheritem.y -= yOffset;
    }

    getCoordinatesDifferences(item, otheritem) {
        return {
            x: item.x - otheritem.x,
            y: item.y - otheritem.y
        }
    }

    setVelocity(item, angle) {
        const magnitude = this.getMagnitute(item.velocityX, item.velocityY);
        const direction = Math.atan2(item.velocityY, item.velocityX);
        item.velocityX = magnitude * Math.cos(direction - angle) * this.restitution;
        item.velocityY = magnitude * Math.sin(direction - angle) * this.restitution;
    }

    getMagnitute(x, y) {
        return Math.sqrt(x ** 2 + y ** 2);
    }

    checkCollisionWithBoundries(item) {
        if (item.x - item.radius < 0 || item.x + item.radius > canvasConstants.CANVAS_WIDTH) {
            item.velocityX *= -this.restitution;
        }

        if (item.y - item.radius < 0) {
            item.velocityY *= -this.restitution;
            item.y = item.static ? item.y: item.radius;
        } else if (item.y + item.radius > canvasConstants.CANVAS_HEIGHT) {
            item.velocityY *= -this.restitution;
            item.y = item.static ? item.y: canvasConstants.CANVAS_HEIGHT - item.radius;
        }
    }
}