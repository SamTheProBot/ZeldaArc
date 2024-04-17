class Game {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.location = ['MainHouse', 'HomeVillage'];
    this.currentIndex = 0;
    this.background = new Image();
    this.init();
  }
  nextLocation() {
    if (this.currentIndex < this.location.length - 1) {
      this.currentIndex++;
      this.init();
    } else {
      this.init();
    }
  }
  prevLocation() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.init();
    } else {
      this.init();
    }
  }
  init() {
    switch (this.location[this.currentIndex]) {
      case 'MainHouse':
        this.background.src = `./Images/MainHouse.png`;
        break;
      case 'HomeVillage':
        this.background.src = `./Images/HomeVillage.png`;
        break;
    }
  }
  draw(offset) {
    ctx.drawImage(this.background, offset.positionX, offset.positionY);
  }
}
