class Game {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.offset;
    this.background = null;
    this.toplayerBackground = null;
    this.npc = [];
    this.enemy = [];
  }
  // init(backgroundType, topLayer, NpcLayer, enemyLayer) {
  init(backgroundType) {
    switch (backgroundType) {
      case `overworld`:
        this.background = new Image();
        this.background.src = `./Images/HomeVIllage/HomeVillage.png`;

        break;
      case `home`:
        this.background = new Image();
        this.background.src = `./Images/HomeVIllage/HomeRoom.png`;
        break;
    }
  }
  draw(offset) {
    ctx.drawImage(this.background, offset.positionX, offset.positionY);
  }
}
