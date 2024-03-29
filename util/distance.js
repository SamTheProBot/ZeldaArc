const distanceBtw = (playerX, playerY, positionX, positionY) => {
  const dx = playerX - positionX;
  const dy = playerY - positionY;
  return Math.sqrt(dx * dx + dy * dy);
};
