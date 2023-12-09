import canvasConstants from "../constants/canvas-constants";
import {draggableSprites, makeCanvas, render, stage} from "../utils/Display";
import {makePointer} from "../utils/Interactive";

export default class RenderEngine {
  canvas;
  context;
  players;
  pointer;

  constructor() {
    this.canvas = makeCanvas(canvasConstants.CANVAS_WIDTH,
        canvasConstants.CANVAS_HEIGHT);
    stage.width = canvasConstants.CANVAS_WIDTH;
    stage.height = canvasConstants.CANVAS_HEIGHT;
    this.context = this.canvas.ctx
    this.pointer = makePointer(this.canvas);
  }

  initialActions() {
    this.setBackground();
    document.aBird.placerEngine.initialActions();
    document.aBird.playerEngine.initialActions();

    this.render();
  }

  setBackground() {
    this.canvas.style.background = 'url(images/background_images.jpeg) center/cover no-repeat';
  }

  render() {
    requestAnimationFrame(this.render.bind(this));
    this.pointer.updateDragAndDrop(draggableSprites);
    document.aBird.playerEngine.move();
    this.play();
  }

  play() {
    render(this.canvas)
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
