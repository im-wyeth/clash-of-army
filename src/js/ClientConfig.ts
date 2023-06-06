export const WORLD_ENTITY_DATA_PATH = "./data/WorldEntity";

export const TANKS_DATA_JSON_NAME = "tanks";

export const CANVAS_SIZE = {
  WIDTH: window.innerWidth,
  HEIGHT: window.innerHeight,
};

export const SPRITE_SHEETS = {
  TANKS: "tanks",
  RSZO: "rszo",
  ARTILLERY: "artillery",
  TANK_DESTROYER: "tank_destroyer",
  ICONS: "icons",
  EFFECTS: "effects",
  TILES: "tiles",
  BUILDINGS: "buildings",
};

export const EFFECTS_DATA = {
  turret_shoot_smoke_1: {
    frames: [
      { sX: 0, sY: 0, w: 67, h: 25 },
      { sX: 67, sY: 0, w: 36, h: 25 },
      { sX: 103, sY: 0, w: 30, h: 25 },
      { sX: 133, sY: 0, w: 15, h: 25 },
    ],
  },
};

export const SPRITES = [
  {
    name: "tanks",
    src: "../assets/tank-sprites.png",
  },
  {
    name: "icons",
    src: "../assets/icon-sprites.png",
  },
  {
    name: "effects",
    src: "../assets/effect-sprites.png",
  },
  {
    name: "tiles",
    src: "../assets/tiles.png",
  },
];

// replace from, and move to other file
export const TANKS_DATA = {
  1: {
    w: 86,
    h: 52,
    img_data: {
      sX: 0,
      sY: 0,
    },
    hitbox_data: {},
    turret: {
      w: 101,
      h: 52,
      centerShiftX: 21,
      centerShiftY: 0,
      img_data: {
        sX: 87,
        sY: 0,
      },
      hitbox_data: {},
      animations: {
        shoot: [
          { sX: 0, sY: 52, w: 101, h: 52 },
          { sX: 102, sY: 52, w: 101, h: 52 },
          { sX: 203, sY: 52, w: 101, h: 52 },
          { sX: 304, sY: 52, w: 101, h: 52 },
          { sX: 405, sY: 52, w: 101, h: 52 },
          { sX: 506, sY: 52, w: 101, h: 52 },
        ],
      },
    },
    details: [
      { type: "гусеница", tX: 0, tY: 0, w: 84, h: 9 },
      { type: "гусеница", tX: 0, tY: 260, w: 84, h: 9 },
      { type: "двигатель", tX: 3, tY: 12, w: 20, h: 28 },
      { type: "боеукладка", tX: 23, tY: 12, w: 20, h: 28 },
      { type: "механизм_башни", tX: 43, tY: 12, w: 20, h: 28 },
      { type: "трансмиссия", tX: 63, tY: 12, w: 20, h: 28 },
    ],
  },
};

export const TILES_DATA = [
  {
    sX: 0,
    sY: 0,
    w: 32,
    h: 32,
  },
  {
    sX: 32,
    sY: 0,
    w: 32,
    h: 32,
  },
  {
    sX: 64,
    sY: 0,
    w: 32,
    h: 32,
  },
  {
    sX: 0,
    sY: 32,
    w: 16,
    h: 13,
  },
  {
    sX: 16,
    sY: 33,
    w: 53,
    h: 48,
  },
];

const BUILDINGS_DATA = {};

export const LOOP_TIME_STEP = 1000 / 60;
