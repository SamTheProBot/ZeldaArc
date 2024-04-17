class Game {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.location = ['MainHouse', 'Route2', 'HomeVillage'];
    this.currentIndex = 0;
    this.prevIndex = -1;
    this.background = new Image();
    this.offset = {
      positionX: -540,
      positionY: -460,
      intialX: -540,
      intialY: -460,
    };
    this.init();
  }
  nextLocation() {
    if (
      this.currentIndex < this.location.length - 1 &&
      this.currentIndex !== this.prevIndex
    ) {
      this.prevIndex++;
      this.currentIndex++;
      this.init();
    } else {
      this.init();
    }
  }
  prevLocation() {
    if (this.currentIndex > 0) {
      this.prevIndex--;
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
        offset = {
          positionX: -250,
          positionY: -740,
          intialX: -250,
          intialY: -740,
        };
        break;
      case 'HomeVillage':
        this.background.src = `./Images/HomeVillage.png`;
        offset = {
          positionX: -220,
          positionY: -110,
          intialX: -220,
          intialY: -110,
        };
        break;
      case 'Route2':
        this.background.src = `./Images/Route2.png`;
        offset = {
          positionX: -220,
          positionY: 170,
          intialX: -220,
          intialY: 170,
        };
        break;
    }
  }
  draw(offset) {
    ctx.drawImage(this.background, offset.positionX, offset.positionY);
  }
}
