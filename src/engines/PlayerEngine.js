
export default class PlayerEngine { 
    move(coordinates){ 
        const player = this.getCurrentPlayer();
        player.x = player.getWidth() + coordinates.x;
        player.y = player.getHeight() + coordinates.y;
    }
 
    getCurrentPlayer() {
        return document.aBird.renderEngine.getCurrentPlayer();
    } 
}