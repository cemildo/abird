import {
  circle, emitter, frame,
  line,
  particleEffect, particles,
  rectangle, remove,
  sprite,
  stage
} from "../utils/Display";
import {assets, contain, wait} from "../utils/Asset";
import {
  movingCircleCollision
} from "../utils/Collision";

export default class PlayerEngine {
  bird;
  draggableArea;
  isReady = false;
  dust;
  restarted = false;

  initialActions() {
    this.setRouteContainer();
    this.setPlayer();
    this.setDraggableAreaLine();
    this.restrictDraggingOutOfDraggableArea();
  }

  setPlayer() {
    const weapon = this.getWeaponInfo();
    const shootingHillContainer = this.getShootingHillContainer();

    this.restarted = true;
    this.bird = this.bird || sprite(assets["red-bird-1.png"], 0, 0);
    this.bird.height = 50;
    this.bird.width = 50;
    this.bird.diameter = 50;
    this.bird.x = shootingHillContainer.x + weapon.x - 20;
    this.bird.y = shootingHillContainer.y + weapon.y;
    this.bird.draggable = true;
    this.bird.radius = 25;

    //Set the ball's velocity
    this.bird.vx = 0;
    this.bird.vy = 0;

    //Set the ball's gravity, friction and mass
    this.bird.gravity = 0.4;
    this.bird.frictionX = 5;
    this.bird.frictionY = 5;

    //Set the mass based on the ball's diameter
    this.bird.mass = 0.75 + (this.bird.diameter / 32);
    this.setParticleEffect();
  }

  move() {
    this.checkCollisionBetweenBirdAndKingdom();
    this.updateParticles();

    if (!this.isReady) {
      return;
    }

    this.bird.vy += this.bird.gravity;
    this.bird.vx *= this.bird.frictionX;
    this.bird.x += this.bird.vx;
    this.bird.y += this.bird.vy;
    const stageCollision = contain(this.bird, stage.localBounds, true);

    if (stageCollision === "bottom") {
      this.bird.frictionX = 0.4;
      this.bird.draggable = false;
      this.dust.stop();

      if(this.restarted) {
        this.bird.vy = 0;
        this.removeCurrentBird();
        this.restarted = false;
        this.isReady = false;
      }

    } else {
      this.bird.frictionX = 1;
    }
  }

  getWeaponInfo() {
    return this.getShootingHillContainer()
    .children
    .find(a => a.tilesetFrame.frame.name);
  }

  getShootingHillContainer() {
    return stage.children
    .find(a => a.name === 'shooting-hill');
  }

  setDraggableAreaLine() {
    const diameter = 300;
    let x = this.bird.x;
    let y = this.bird.y;

    const x_start = x - diameter / 2 + this.bird.width / 2;
    const y_start = y - diameter / 2 + this.bird.height / 2;

    this.draggableArea = circle(diameter, 'none', "white", 5, x_start, y_start);
  }

  restrictDraggingOutOfDraggableArea() {
    const pointer = this.getPointer();

    pointer.drag = (e) => {

      if (pointer.isDown && this.isPointInsideCircle(e.x, e.y)) {

        this.bird.vx = this.calculateXVelocity(e.x, e.y);
        this.bird.vy = this.calculateYVelocity(e.x, e.y);

        this.drawFlyingRoute();
      } else if (pointer.isDown && !this.isPointInsideCircle(e.x, e.y)) {
        this.isReady = false;
      }
    };

    pointer.release = () => {
      this.removeRoute();
      this.dust.play();
      this.bird.draggable = true;
      this.isReady = true;
    };
  }

  drawFlyingRoute() {
    let route = [];
    this.removeRoute();
    this.calculateFlyingRoute(this.bird.x, this.bird.y, this.bird.vx,
        this.bird.vy, this.bird.frictionX, this.bird.gravity, route);

    route.forEach((point, i) => {
      let sprite = null;
      if(i === 0)
        sprite = line("white", 5, this.bird.centerX, this.bird.centerY, point.x, point.y, [5,5])
      else
        sprite = line("white", 5,route[i-1].x, route[i-1].y, point.x, point.y, [5,5])

      this.routeContainer.addChild(sprite);
    });
  }

  calculateFlyingRoute(x, y, vx, vy, fx, g, route){
    if(route.length >= 50) {
      return route;
    }

    vy += g;
    vx *= fx;
    x += vx;
    y += vy;
    fx = 1;
    route.push({ x: x + this.bird.width / 2, y : y + this.bird.height});
    return this.calculateFlyingRoute(x, y, vx, vy, fx, g, route);
  }

  getPointer() {
    return document.aBird.renderEngine.pointer;
  }

  isPointInsideCircle(x, y) {
    const distance = this.getDistanceBetweenPointAndCenter(x, y);
    return distance <= this.draggableArea.radius;
  }

  calculateXVelocity(x, y) {
    const distance = this.getDistanceBetweenPointAndCenter(x, y);
    return this.calculateXVelocitySign(x,y) * ((distance / this.draggableArea.radius) * 4);
  }

  calculateYVelocity(x, y) {
    const velocityX = this.calculateXVelocity(x, y)

    return this.calculateYVelocitySign(x, y) * velocityX * 5;
  }

  getDistanceBetweenPointAndCenter(x, y) {
    return Math.sqrt(
        (x - this.draggableArea.centerX) ** 2 + (y - this.draggableArea.centerY)
        ** 2);
  }

  removeRoute() {
    this.routeContainer.children = [];
  }

  setRouteContainer() {
    this.routeContainer = rectangle(320, 320, "none", "none");
    this.routeContainer.name = "route-container";
  }

  calculateYVelocitySign(x, y) {
    if (y < this.draggableArea.centerY)
      return 1;
    return -1;
  }

  calculateXVelocitySign(x, y) {
    if (x < this.draggableArea.centerX)
      return 1;
    return -1;
  }

  checkCollisionBetweenBirdAndKingdom() {
    const kingdomPieces = document.aBird.placerEngine.kingdom;
    document.aBird.physicEngine.setItems(kingdomPieces.children);
    document.aBird.physicEngine.run();

    kingdomPieces.children.forEach(brick => {

      if(movingCircleCollision(brick, this.bird, true)) {
        this.dust.stop();
        if(kingdomPieces) {
          kingdomPieces.removeChild(brick);
        }
      }
    });
  }

  setParticleEffect() {
    const dustFrames = [
      assets["images/star.png"],
      assets["images/red-star.png"]
    ];

    if(!this.bird) return;

    this.dust = emitter(
        10,
        () => particleEffect(
            this.bird.centerX,
            this.bird.centerY,
            () => sprite(dustFrames),
            10,
            0.1,
            true,
            2.4, 3.6,
            8, 12,
            2, 5,
            0.005, 0.01,
            0.005, 0.01,
            0.05, 0.1
        )
    );
  }

  updateParticles() {
    if (particles.length > 0) {
      for(let i = particles.length - 1; i >= 0; i--) {
        let particle = particles[i];
        particle.update();
      }
    }
  }

  removeCurrentBird() {
    wait(2000)
    .then(() => {
      this.bird.visible = false;
      return wait(200)
    })
    .then(() =>  {
      this.bird.vy = 0;
      this.setPlayer();
      this.bird.visible = true;

    })
  }

}