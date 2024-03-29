class Enemy {
  constructor(imagesrc, frame, hp, range, playerX, playerY) {
    this.image = new Image();
    this.image.src = imagesrc;
    this.damageEffect = new Image();
    this.damageEffect.src = `./NinjaAdventure/FX/SlashFx/CircularSlash/SpriteSheet.png`;
    this.hp = hp;
    this.prevHp = hp - 1;
    this.range = range;
    this.frame = frame;
    this.direction = 0;
    this.width = this.image.width / 4;
    this.height = this.image.height / 4;
    this.playerX = playerX;
    this.playerY = playerY;
    this.positionX = 0;
    this.positionY = 0;
    this.disX = 0;
    this.disY = 0;
    this.velocity = 1.5;
    this.gameframe = 0;
    this.damage = null;
  }

  updatePosition() {
    if (distanceBtw(this.playerX, this.playerY, this.positionX, this.positionY) < this.range) {
      return true;
    }
  }
  movement() {
    if (this.gameframe % 6 === 0) {
      if (this.frame < 3) this.frame++;
      else this.frame = 0;
    }
    this.gameframe++;
  }
  draw() {
    if (this.hp === this.prevHp) {
      // if (this.hp) {
      ctx.drawImage(
        this.damageEffect,
        this.frame * 32,
        0,
        this.width * 2,
        this.height * 2,
        this.positionX,
        this.positionY,
        this.width * 4,
        this.height * 4
      );
    }
    ctx.drawImage(
      this.image,
      this.direction * 16,
      this.frame * 16,
      this.width,
      this.height,
      this.positionX,
      this.positionY,
      this.width * 4,
      this.height * 4
    );
  }
}
