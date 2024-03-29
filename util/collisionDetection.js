const CollisionDetection = (rect1, rect2) => {
  if (
    rect1.positionX + 48 > rect2.positionX &&
    rect1.positionX - 16 < rect2.positionX &&
    rect1.positionY + 48 > rect2.positionY &&
    rect1.positionY < rect2.positionY
  ) {
    return true;
  }
  return false;
};
