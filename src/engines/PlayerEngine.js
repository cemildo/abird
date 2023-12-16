import {
  circle,
  emitter,
  line,
  particleEffect,
  particles,
  rectangle,
  sprite,
  stage
} from "../utils/Display";
import {assets, contain, wait} from "../utils/Asset";
import {movingCircleCollision} from "../utils/Collision";

export default class PlayerEngine {
  bird;
  draggableArea;
  isReady = false;
  dust;
  restarted = false;
  playerIndex = 3;
  gameOver = false;

  initialActions() {
    this.setRouteContainer();
    this.setGame();
    this.setDraggableAreaLine();
    this.restrictDraggingOutOfDraggableArea();
  }

  setGame() {
    document.aBird.soundEngine.playForest();
    this.restarted = true;
    this.setBird();
    this.setParticleEffect();
    document.aBird.placerEngine.setPlayersContainer();
  }

  setBird() {
    if (this.bird != null) {
      stage.removeChild(this.bird);
    }
    const weapon = document.aBird.placerEngine.weapon;
    const players = document.aBird.placerEngine.players;
    const playersContainer = document.aBird.placerEngine.playersContainer;
    const bird = players[this.playerIndex];
    this.bird = bird;
    playersContainer.removeChild(bird);
    stage.addChild(bird);

    this.bird.height = 60;
    this.bird.width = 60;
    this.bird.diameter = 30;

    this.bird.x = weapon.gx - this.bird.width;
    this.bird.y = weapon.gy;

    this.bird.draggable = true;
    this.bird.radius = 30;

    //Set the ball's velocity
    this.bird.vx = 0;
    this.bird.vy = 0;

    //Set the ball's gravity, friction and mass
    this.bird.gravity = 0.4;
    this.bird.frictionX = 5;
    this.bird.frictionY = 5;
  }

  move() {
    if (this.gameOver) {
      return;
    }

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

      if (this.restarted) {
        this.bird.vy = 0;
        this.removeCurrentBird();
        this.restarted = false;
        this.isReady = false;
      }

    } else {
      this.bird.frictionX = 1;
    }
  }

  setDraggableAreaLine() {
    const diameter = 300;
    const weapon = document.aBird.placerEngine.weapon;
    let x = weapon.gx;
    let y = weapon.gy;

    const x_start = x - diameter / 2;
    const y_start = y - diameter / 2 + 30;

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
      document.aBird.soundEngine.playFlying();
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
      if (i === 0) {
        sprite = line("white", 5, this.bird.centerX, this.bird.centerY, point.x,
            point.y, [5, 5])
      } else {
        sprite = line("white", 5, route[i - 1].x, route[i - 1].y, point.x,
            point.y, [5, 5])
      }

      this.routeContainer.addChild(sprite);
    });
  }

  calculateFlyingRoute(x, y, vx, vy, fx, g, route) {
    if (route.length >= 50) {
      return route;
    }

    vy += g;
    vx *= fx;
    x += vx;
    y += vy;
    fx = 1;
    route.push({x: x + this.bird.width / 2, y: y + this.bird.height});
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
    return this.calculateXVelocitySign(x, y) * ((distance
        / this.draggableArea.radius) * 4);
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
    if (y < this.draggableArea.centerY) {
      return 1;
    }
    return -1;
  }

  calculateXVelocitySign(x, y) {
    if (x < this.draggableArea.centerX) {
      return 1;
    }
    return -1;
  }

  checkCollisionBetweenBirdAndKingdom() {
    const kingdomPieces = document.aBird.placerEngine.kingdom;
    document.aBird.physicEngine.setItems(kingdomPieces.children);
    document.aBird.physicEngine.run();
    kingdomPieces.children.forEach(brick => {

      if (movingCircleCollision(this.bird, brick, true)) {
        this.dust.stop();
        if (kingdomPieces) {
          document.aBird.soundEngine.stopFlying();
          document.aBird.soundEngine.playBounce();
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

    if (!this.bird) {
      return;
    }

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
      for (let i = particles.length - 1; i >= 0; i--) {
        let particle = particles[i];
        particle.update();
      }
    }
  }

  removeCurrentBird() {
    wait(1000)
    .then(() => {
      this.bird.visible = false;
      return wait(200)
    })
    .then(() => {
      this.bird.vy = 0;
      document.aBird.placerEngine.markBirdAsDead(this.playerIndex);
      this.playerIndex--;
      this.checkGameStatus();
      if (!this.gameOver) {
        this.setGame();
        this.bird.visible = true;
      }
    })
  }

  checkGameStatus() {
    if (this.playerIndex < 0 && this.checkIfStillPigsAreAvailable()) {
      this.gameOver = true;
      document.aBird.soundEngine.playCompleted();
      document.aBird.placerEngine.resultMessage("You have lost the game!");
    } else if (!this.checkIfStillPigsAreAvailable()) {
      document.aBird.soundEngine.playCompleted();
      this.gameOver = true;
      document.aBird.placerEngine.resultMessage("You have won the game!");
    }
  }

  checkIfStillPigsAreAvailable() {
    return document.aBird.placerEngine.kingdom.children
    .some(a => a.isPig);
  }
}