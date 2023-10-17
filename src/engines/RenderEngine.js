import NormalPig from "../characters/normal-pig";
import Weapon from "../characters/weapon";
import RedBird from "../characters/red-bird";
import canvasConstants from "../constants/canvas-constants";
import Wood from "../characters/wood";
import SwingArc from "../characters/swing-arc";

export default class RenderEngine {
  canvas;
  context;
  players;

  constructor() {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.arc = new SwingArc();
  }

  initialActions() {
    this.setBackground();
    this.setPlayers();
    this.setShootingHill();
    this.render();
    
  }

  setBackground() {
    var image = new window.Image();
    image.addEventListener("load", () => {
      this.canvas.width = canvasConstants.CANVAS_WIDTH;
      this.canvas.height = canvasConstants.CANVAS_HEIGHT;
      this.context.drawImage(
        image,
        0,
        0,
        canvasConstants.CANVAS_WIDTH,
        canvasConstants.CANVAS_HEIGHT
      );
    });

    image.setAttribute("src", "./images/background_images.jpeg");
  }

  setArc() {
    this.arc.draw(this.context);
  }

  setShootingHill(){
    new Array(16).fill(1)
    .map(() => new Wood())
    .map(this.setWepaonWoods.bind(this))
    .forEach(a => a.draw(this.context));
  }

  setPlayers() {
    this.players = new Array(10).fill(1).map(() => new NormalPig());
    this.players.push(new Weapon());
    
    this.players.push(new RedBird());
     
    document.aBird.physicEngine.setItems(this.players);
  }

  setWepaonWoods(wood, i) {
      const level = this.getWoodChunkLevel(i);
      const row = i % 4;
      wood.y = wood.y - level * 50;
      wood.x = wood.x + (row * 50);
      return wood;
  }

  getWoodChunkLevel(i) {
    if (i < 0) return 0;
    return Math.floor(i / 5);
  }

  render(){
    this.clearCanvas;
    this.setBackground();
    this.setShootingHill();
    this.setArc();
    document.aBird.physicEngine.run(this.context);
    requestAnimationFrame(this.render.bind(this));
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getContext() {
    return this.context;
  }

  getCanvas() {
    return this.canvas;
  }

  getCurrentPlayer() {
    return this.players.find(player => player.current);
  }
}
