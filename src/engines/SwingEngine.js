
const MOVING = {
    UP: 'Up',
    DOWN: 'Down',
    RIGHT: 'Right',
    LEFT: 'Left'
  };

export default class SwingEngine{
  
    x;
    y;
    isInArea;
    direction;

    constructor() {
      this.x = -5;
      this.y = -5;
      this.isInArea = true;
      this.currentDirection = MOVING.LEFT;
      this.lastDirection = MOVING.LEFT;
    }

    moveLeft(){ 
        this.currentDirection = MOVING.LEFT;
        if(this.isInTheArea()) {
            this.x -= 5;
            this.lastDirection = MOVING.LEFT;
        } 
    }

    moveUp(){ 
        this.currentDirection = MOVING.UP;
        if(this.isInTheArea()) {
            this.y -= 5;
            this.lastDirection = MOVING.UP;
        }
    }

    moveDown(){ 
        this.currentDirection = MOVING.DOWN;
        if(this.isInTheArea()) {
            this.y += 5;
            this.lastDirection = MOVING.DOWN;
        } 
    }

    moveRight(){ 
        this.currentDirection = MOVING.RIGHT;
        if(this.isInTheArea()) {
            this.x += 5;
            this.lastDirection = MOVING.RIGHT;
        }
    }

    getArc() {
        return document.aBird.renderEngine.arc;
    } 

    getCurrentPlayer() {
        return document.aBird.renderEngine.getCurrentPlayer();
    } 
 
    isInTheArea(){
        const arc = this.getArc(); 
        const player = this.getCurrentPlayer();
        const distance = Math.sqrt((this.x) ** 2 + (this.y) ** 2);

        document.aBird.playerEngine.move({x: this.x, y: this.y});

        if(this.currentDirection !== this.lastDirection){
            return true;
        }
        
        return distance <= (arc.radius - player.radius) && this.x <= 0  && this.isInAngles();
    }

    isInAngles() {
        return this.y < 0
            ? Math.atan2(this.y, this.x) + Math.PI <= Math.PI / 4
            : Math.atan2(this.y, this.x) >= Math.PI * 3/4; 
    }


}