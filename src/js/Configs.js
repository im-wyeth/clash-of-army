export const CANVAS_SIZE = {
  WIDTH: 1200,
  HEIGHT: 780,
};

export const SPRITE_SHEETS = {
  TANKS: "tanks",
  RSZO: "rszo",
  ARTILLERY: "artillery",
  ICONS: "icons",
  EFFECTS: "effects",
  TILES: "tiles",
  BUILDINGS: "buildings",
};

// test
export const EFFECTS = {
  TURRET_SHOOT_SMOKE: "turret_shoot_smoke",
};

// merge or not?
export const EFFECTS_DATA = {
  turret_shoot_smoke: {
    frames: [
      { x: 0, y: 0, w: 67, h: 25 },
      { x: 67, y: 0, w: 36, h: 25 },
      { x: 103, y: 0, w: 30, h: 25 },
      { x: 133, y: 0, w: 15, h: 25 },
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
];

export const TANKS_DATA = {
  1: {
    w: 86,
    h: 52,
    img_data: {
      x: 0,
      y: 0,
    },
    turret: {
      w: 101,
      h: 52,
      img_data: {
        x: 87,
        y: 0,
      },
      animations: {
        shoot: [
          { x: 0, y: 52, w: 101, h: 52 },
          { x: 102, y: 52, w: 101, h: 52 },
          { x: 203, y: 52, w: 101, h: 52 },
          { x: 304, y: 52, w: 101, h: 52 },
          { x: 405, y: 52, w: 101, h: 52 },
          { x: 506, y: 52, w: 101, h: 52 },
        ],
      },
    },
    details: [
      { type: "гусеница", x: 0, y: 0, w: 84, h: 9 },
      { type: "гусеница", x: 0, y: 260, w: 84, h: 9 },
      { type: "двигатель", x: 3, y: 12, w: 20, h: 28 },
      { type: "боеукладка", x: 23, y: 12, w: 20, h: 28 },
      { type: "механизм_башни", x: 43, y: 12, w: 20, h: 28 },
      { type: "трансмиссия", x: 63, y: 12, w: 20, h: 28 },
    ],
  },
};
