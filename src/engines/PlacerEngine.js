import {rectangle, sprite} from "../utils/Display";
import canvasConstants from "../constants/canvas-constants";
import {assets, randomInt} from "../utils/Asset";

export default class PlacerEngine {
  container;
  kingdom;
  players;

  constructor() {
    this.setShootingHillContainer();
  }

  initialActions() {
    this.setShootingHill();
    this.setWeapon();
    this.setKingdom();
    this.setPlayersContainer();
  }

  setPlayersContainer() {
    this.players = rectangle(450, 60, "none", "none");
    this.players.name = "player-container"
    this.players.x = 50;
    this.players.y = 150;
    this.setPlayers();
  }

  setPlayers() {
    const players = [sprite(assets["white-bird-1.png"], 0, 0),
      sprite(assets["black-bird-1.png"], 0, 0),
      sprite(assets["green-bird-1.png"], 0, 0)];

    players.forEach((sprite, i) => {
      const player = sprite;
      player.height = 80;
      player.width = 80;
      player.circular = true;
      player.radius = 40;
      player.mass = 0.02;
      player.vy = 0;
      player.gravity = 0.4;
      player.x = i * player.width + 10
      player.y = 0;
      this.players.addChild(player);
    });
  }

  setWeapon() {
    const childrenSize = this.container.children
    .filter(a => a.tilesetFrame.frame.name !== 'weapon')
    .filter((a, i) => i % 4 === 0)
    .reduce((s, c) => {
      s.height += c.height;
      s.width += c.width;
      return s;
    }, {height: 0, width: 0})

    const weapon = sprite(assets["weapon.png"], 1, 1);
    weapon.height = 100;
    weapon.width = 20;
    weapon.x = childrenSize.width - 40;
    weapon.y = this.container.height - childrenSize.height - weapon.height;
    this.container.addChild(weapon);
  }

  setShootingHill() {
    const woodFn = () => {
      const wood = sprite(assets["normal-wood-1.png"], 1, 1);
      wood.height = 50;
      wood.width = 50;
      wood.x = this.container.x;
      wood.y = this.container.height - wood.height;
      return wood;
    }

    new Array(16).fill(1)
    .map(() => woodFn())
    .map(this.setWeaponWoods.bind(this))
    .forEach(a => this.container.addChild(a));
  }

  setKingdom() {
    this.kingdom = rectangle(400, 320, "none", "none");
    this.kingdom.name = "target"
    this.kingdom.x = canvasConstants.CANVAS_WIDTH - 300;
    this.kingdom.y = canvasConstants.CANVAS_HEIGHT - this.container.height;
    this.setKingdomPieces();
  }

  setKingdomPieces() {
    const woodFn = () => {
      const displayElements = [
        assets["normal-stone-1.png"],
        assets["pig-3.png"],
        assets["pig-1.png"],
        assets["pig-2.png"],
        assets["pig-1.png"],
        assets["normal-stone-1.png"],
        assets["pig-2.png"],
        assets["normal-wood-1.png"],
        assets["pig-3.png"],
      ];

      const randomIndex = randomInt(0, displayElements.length - 1);
      const displayItem = sprite(displayElements[randomIndex], 1, 1);
      displayItem.height = 50;
      displayItem.width = 50;
      displayItem.circular = true;
      displayItem.radius = 25;
      displayItem.mass = 0.02;
      displayItem.vy = 0;
      displayItem.gravity = 0.4;
      displayItem.x = this.kingdom.x;
      displayItem.y = this.kingdom.height - displayItem.height;
      return displayItem;
    }

    const a = new Array(30).fill(1)
    .map(() => woodFn())
    .map(this.setKingdomSize.bind(this));

    a.forEach(a => this.kingdom.addChild(a));
  }

  setKingdomSize(wood, i) {
    const level = this.getWoodChunkLevel(i);
    const row = i % 5;
    wood.y = wood.y - level * wood.height;
    wood.x = row * wood.width;
    return wood;
  }

  setWeaponWoods(wood, i) {
    const level = this.getWoodChunkLevel(i);
    const row = i % 4;
    wood.y = wood.y - level * wood.height;
    wood.x = row * wood.width;
    return wood;
  }

  getWoodChunkLevel(i) {
    if (i < 0) {
      return 0;
    }
    return Math.floor(i / 5);
  }

  setShootingHillContainer() {
    this.container = rectangle(320, 320, "none", "none");
    this.container.name = "shooting-hill"
    this.container.x = 50;
    this.container.y = canvasConstants.CANVAS_HEIGHT - this.container.height;
  }

}