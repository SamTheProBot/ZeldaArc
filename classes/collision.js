class CollisionBlock {
  static pixel = 32;
  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.width = CollisionBlock.pixel;
    this.height = CollisionBlock.pixel;
  }
  draw() {
    ctx.fillStyle = `rgba(255,0,0,0)`;
    ctx.fillRect(this.positionX, this.positionY, this.width, this.height);
  }
}
