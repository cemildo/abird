import {rectangle, sprite, stage, text} from "../utils/Display";
import canvasConstants from "../constants/canvas-constants";
import {assets, randomInt} from "../utils/Asset";

export default class PlacerEngine {
  container;
  kingdom;
  playersContainer;
  players;
  weapon;
  deadBirds = [];

  constructor() {
    this.setShootingHillContainer();
  }

  initialActions() {
    this.setShootingHill();
    this.setKingdom();
    this.setWeapon();
    this.setPlayersContainer();
  }

  setPlayersContainer() {
    if (this.playersContainer) {
      stage.remove(this.playersContainer);
    }

    this.playersContainer = rectangle(450, 60, "none", "none");
    this.playersContainer.name = "player-container"
    this.playersContainer.x = 50;
    this.playersContainer.y = 150;
    this.setPlayers();
  }

  setPlayers() {
    let players = [
      {
        sprite: assets["white-bird-1.png"],
        mass: 3
      },
      {
        sprite: assets["black-bird-1.png"],
        mass: 4
      },
      {
        sprite: assets["green-bird-1.png"],
        mass: 2
      },
      {
        sprite: assets["red-bird-1.png"],
        mass: 5
      }
    ];

    this.players = players.map((item, i) => {
      const player = this.deadBirds.includes(i)
          ? sprite(assets["white-cloud"], 0, 0)
          : sprite(item.sprite, 0, 0);

      player.height = 80;
      player.width = 80;
      player.circular = true;
      player.radius = 40;
      player.mass = item.mass;
      player.vy = 0;
      player.gravity = 0.4;
      player.x = i * 80 + 10
      player.y = 0;
      return player;
    });

    this.players.forEach(a => this.playersContainer.addChild(a));
  }

  markBirdAsDead(index) {
    this.deadBirds.push(index);
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

    this.weapon = sprite(assets["weapon.png"], 1, 1);
    this.weapon.height = 100;
    this.weapon.width = 20;
    this.weapon.x = childrenSize.width - 40;
    this.weapon.y = this.container.height - childrenSize.height
        - this.weapon.height;
    this.container.addChild(this.weapon);
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
      displayItem.isPig = [1,2,3,4,6,8].includes(randomIndex)
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

  resultMessage(message) {
    this.resultContainer = rectangle(400, 320, "white", "none");
    this.resultContainer.name = "result-container"
    this.resultContainer.x = canvasConstants.CANVAS_WIDTH / 2 - this.resultContainer.width/2;
    this.resultContainer.y = canvasConstants.CANVAS_HEIGHT / 2 - this.resultContainer.height/2;

    const result = text(message, "28px sans-serif", "black");
    result.x = 20;
    result.y = (this.resultContainer.height / 2) - 16;
    this.resultContainer.addChild(result);
  }
}