export default class InputEngine {
  listeners = [];

  initialActions() {
    this.setEventListener();
    this.setGameListners();
  }

  setGameListners() {
    this.listeners = [
      document.aBird.playerEngine,
      document.aBird.swingEngine
    ];

  }

  setEventListener() {
    window.addEventListener("keydown", this.setSpeed.bind(this), false);
  }

  setSpeed(evt) {
    switch (evt.keyCode) {
      case 37:
        this.moveLeft();
        break;
      case 38:
        this.moveUp();
        break;
      case 39:
        this.moveRight();
        break;
      case 40:
        this.moveDown();
        break;
    }
  }

  moveLeft() {
    this.listeners.forEach(a => a.moveLeft());
  }

  moveUp() {
    this.listeners.forEach(a => a.moveUp());
  }

  moveDown() {
    this.listeners.forEach(a => a.moveDown());
  }

  moveRight() {
    this.listeners.forEach(a => a.moveRight());
  }
}
