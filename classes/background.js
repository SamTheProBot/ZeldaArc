class Game {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.backgroundType = `HomeVillage`;
    this.background = null;
    this.enemyArray = [];
    this.collisionBoundary = [];
  }

  init() {
    switch (this.backgroundType) {
      case `HomeVillage`:
        this.background = new Image();
        this.background.src = `./Images/Homevillage/HomeVillage.png`;
        break;

      case `MainHouse`:
        this.background = new Image();
        this.background.src = `./Images/Homevillage/MainHouse.png`;
        break;
    }
  }
  draw(offset) {
    ctx.drawImage(this.background, offset.positionX, offset.positionY);
  }
}
