import canvasConstants from "../constants/canvas-constants";
export default class PhysicsEngine {
    gravity = 0.1;
    restitution = 0.8;
    damping = 0.98;
    items = [];

    setItems(items) {
        this.items = items;
    }

    run(context) {
        this.items.forEach(item => {
            if (!item.static) {
                item.velocityY += this.gravity;
                item.x += item.velocityX;
                item.y += item.velocityY;
                item.velocityX *= this.damping;
                item.velocityY *= this.damping;
            }

            this.checkCollisionWithBoundaries(item);
            this.checkCollisionWithOtherItems(item);

            item.draw(context);
        });
    }

    checkCollisionWithOtherItems(item) {
        this.items.forEach(otherItem => {
            if (item !== otherItem) {
                const { x, y } = this.getCoordinatesDifferences(item, otherItem);
                const distance = Math.hypot(x, y);

                if (distance < item.radius + otherItem.radius) {
                    const angle = Math.atan2(y, x);
                    this.setVelocity(item, angle);
                    this.setVelocity(otherItem, angle);
                    this.avoidSticking(item, otherItem, angle, distance);
                }
            }
        });
    }

    avoidSticking(item, otherItem, angle, distance) {
        const overlap = (item.radius + otherItem.radius - distance) / 2;
        const xOffset = overlap * Math.cos(angle);
        const yOffset = overlap * Math.sin(angle);

        if (!item.static) {
            item.x += xOffset;
            item.y += yOffset;
        }

        if(!otherItem.static) {
            otherItem.x -= xOffset;
            otherItem.y -= yOffset;
        } 
    }

    getCoordinatesDifferences(item, otherItem) {
        return {
            x: item.x - otherItem.x,
            y: item.y - otherItem.y,
        };
    }

    setVelocity(item, angle) {
        const magnitude = this.getMagnitude(item.velocityX, item.velocityY);
        const direction = Math.atan2(item.velocityY, item.velocityX);
        item.velocityX = magnitude * Math.cos(direction - angle) * this.restitution;
        item.velocityY = magnitude * Math.sin(direction - angle) * this.restitution;
    }

    getMagnitude(x, y) {
        return Math.hypot(x, y);
    }

    checkCollisionWithBoundaries(item) {
        if (item.x - item.radius < 0 || item.x + item.radius > canvasConstants.CANVAS_WIDTH) {
            item.velocityX *= -this.restitution;
        }

        if (item.y - item.radius < 0) {
            item.velocityY *= -this.restitution;
            item.y = item.static ? item.y : item.radius;
        } else if (item.y + item.radius > canvasConstants.CANVAS_HEIGHT) {
            item.velocityY *= -this.restitution;
            item.y = item.static ? item.y : canvasConstants.CANVAS_HEIGHT - item.radius;
        }
    }
}
