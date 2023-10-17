
export default class PlayerEngine { 
    moveLeft(){
        if(!this.isInTheArea()) return;

        const player = this.getCurrentPlayer();
        player.x -= 5; 
    }

    moveUp(){
        if(!this.isInTheArea()) return;
        const player = this.getCurrentPlayer();
        player.y -= 5; 
    }

    moveDown(){
        if(!this.isInTheArea()) return;
        const player = this.getCurrentPlayer();
        player.y += 5; 
    }

    moveRight(){
        if(!this.isInTheArea()) return;
        const player = this.getCurrentPlayer();
        player.x += 5; 
    }

    getCurrentPlayer() {
        return document.aBird.renderEngine.getCurrentPlayer();
    }

 
    isInTheArea(){
        return document.aBird.swingEngine.isInTheArea();
    }
}