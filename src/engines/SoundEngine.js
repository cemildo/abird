import {assets} from "../utils/Asset";

export default class SoundEngine {
  forest;
  completed;
  bounce;
  flying;

  playForest() {
    this.forest = assets["sounds/forest.mp3"];
    this.forest.loop = false;
    this.forest.pan = -0.8;
    this.forest.volume = 1;
    this.forest.play();
  }

  playCompleted() {
    this.completed = assets["sounds/completed.mp3"];
    this.completed.loop = false;
    this.completed.pan = -0.8;
    this.completed.volume = 2;
    this.completed.play();
  }

  playBounce() {
    this.bounce = assets["sounds/bounce.mp3"];
    this.bounce.loop = false;
    this.bounce.pan = -0.8;
    this.bounce.volume = 2;
    this.bounce.play();
  }

  playFlying() {
    if (!this.flying) {
      this.flying = assets["sounds/flying.mp3"];
      this.flying.loop = false;
      this.flying.pan = -0.8;
      this.flying.volume = 2;
    }

    if (!this.flying.playing) {
      this.flying.restart();
    }
  }

  stopFlying() {
    this.flying.pause();
  }
}
