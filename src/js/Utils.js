import Sprite from "./Sprite";
import Vector2 from "./Vector2";

const TWO_PI = 2 * Math.PI;

export function radToDeg(rad) {
  return (rad * 180) / Math.PI;
}

export function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

export function normalizeDegree(deg) {
  return deg < 0 || deg > 360 ? (deg + 360) % 360 : deg;
}

export function normalizeRadian(rad) {
  return rad < 0 || rad > TWO_PI ? (rad + TWO_PI) % TWO_PI : rad;
}

export function rotateTo(rad, radTo, rotationSpeed) {
  if (Math.abs(rad - radTo) <= rotationSpeed) {
    return radTo;
  }

  if (rad < radTo) {
    if (Math.abs(rad - radTo) < Math.PI) {
      rad += rotationSpeed;
    } else {
      rad -= rotationSpeed;
    }
  } else {
    if (Math.abs(rad - radTo) < Math.PI) {
      rad -= rotationSpeed;
    } else {
      rad += rotationSpeed;
    }
  }

  return rad;
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
