class Enemy {
  constructor(imagesrc, hp, range, playerX, playerY) {
    this.image = new Image();
    this.image.src = imagesrc;
    this.damageEffect = new Image();
    this.damageEffect.src = `./NinjaAdventure/FX/SlashFx/CircularSlash/SpriteSheet.png`;
    this.playerX = playerX;
    this.playerY = playerY;
    this.positionX = 0;
    this.positionY = 0;
    this.width = this.image.width / 4;
    this.height = this.image.height / 4;
    this.hp = hp;
    this.prevHp = hp - 1;
    this.attackDmg = 1;
    this.range = range;
    this.frame = 0;
    this.gameframe = 0;
    this.direction = 0;
    this.velocity = 1.5;
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
      this.prevHp--;
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
