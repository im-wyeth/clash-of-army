import Sprite from "./Sprite";
import Vector2 from "./Vector2";

export function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}

export function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

export function normalizeDegrees(deg) {
  return deg < 0 || deg > 360 ? (deg + 360) % 360 : deg;
}

export function rotateTo(rad, radTo, rotationSpeed) {
  let curr = normalizeDegrees(radToDeg(rad));
  let to = normalizeDegrees(radToDeg(radTo));

  let res = rad;

  if (curr < to) {
    if (Math.abs(curr - to) < 180) {
      res += rotationSpeed;
    } else {
      res -= rotationSpeed;
    }
  } else {
    if (Math.abs(curr - to) < 180) {
      res -= rotationSpeed;
    } else {
      res += rotationSpeed;
    }
  }

  if (Math.abs(rad - radTo) <= rotationSpeed) {
    res = radTo;
  }

  return res;
}

export function radToVec(rad) {
  return new Vector2(Math.cos(rad), Math.sin(rad));
}

export function vecToRad(vec) {
  return Math.atan2(vec.y, vec.x);
}

// test
export function convertSpriteDataToSpriteModels(spritesInfo, spriteSheetName) {
  const sprites = [];

  for (const spriteInfo of spritesInfo) {
    sprites.push(
      new Sprite(
        spriteSheetName,
        spriteInfo.sX,
        spriteInfo.sY,
        spriteInfo.w,
        spriteInfo.h
      )
    );
  }

  return sprites;
}

export function convertMousePointToWorld(mouseX, mouseY, cameraX, cameraY) {
  return {
    worldX: mouseX + cameraX,
    worldY: mouseY + cameraY,
  };
}
