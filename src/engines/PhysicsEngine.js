import canvasConstants from "../constants/canvas-constants";
import {rectangleCollision} from "../utils/Collision";
export default class PhysicsEngine {
    gravity = 0.4;
    restitution = 0.8;
    damping = 2.98;
    items = [];

    setItems(items) {
        this.items = items;
    }

    run() {
        this.items.forEach(item => {

            item.vy += this.gravity;
            item.y += item.vy;

            this.checkCollisionWithBoundaries(item);
            this.checkCollisionWithOtherItems(item);

        });
    }

    checkCollisionWithOtherItems(item) {
        this.items.forEach(otherItem => {
            if (item !== otherItem) {
                if (rectangleCollision(item, otherItem, true, true)) {
                    this.setVelocity(item, Math.PI / 2);
                    this.setVelocity(otherItem, Math.PI / 2);
                    this.avoidSticking(item, otherItem, Math.PI / 2, item.width);
                }
            }
        });
    }

    avoidSticking(item, otherItem, angle, distance) {
        const overlap = (item.radius + otherItem.radius - distance) / 10;
        const xOffset = overlap * Math.cos(angle);
        const yOffset = overlap * Math.sin(angle);

        item.x += xOffset;
        item.y += yOffset;
        otherItem.x -= xOffset;
        otherItem.y -= yOffset;
    }

    getCoordinatesDifferences(item, otherItem) {
        return {
            x: item.x - otherItem.x,
            y: item.y - otherItem.y,
        };
    }

    setVelocity(item, angle) {
        const magnitude = this.getMagnitude(item.vx, item.vx);
        const direction = Math.atan2(item.vy, item.vy);
        item.vx = magnitude * Math.cos(direction - angle) * this.restitution;
        item.vy = magnitude * Math.sin(direction - angle) * this.restitution;
    }

    getMagnitude(x, y) {
        return Math.hypot(x, y);
    }

    checkCollisionWithBoundaries(item) {
        const kingdom = document.aBird.placerEngine.kingdom;
        if (item.x - item.radius < 0 || item.x + item.radius > kingdom.width) {
            item.vx *= -this.restitution;
        }

        if (item.y - item.radius < 0) {
            item.vy *= -this.restitution;
            item.y = item.static ? item.y : item.radius;
        } else if (item.y + item.height > kingdom.height) {
            item.vy *= -this.restitution;
            item.y =  kingdom.height - item.height;
        }
    }
}
