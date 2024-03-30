class Enemy {
  constructor(imagesrc, hp, range, playerX, playerY) {
    this.image = new Image();
    this.image.src = imagesrc;
    this.hitEffectAni = new Image();
    this.hitEffectAni.src = `./NinjaAdventure/FX/SlashFx/CircularSlash/SpriteSheet.png`;
    this.playerX = playerX;
    this.playerY = playerY;
    this.positionX = 0;
    this.positionY = 0;

    this.offsetX = 0;
    this.offsetY = 0;
    this.width = this.image.width / 4;
    this.height = this.image.height / 4;
    this.hp = hp;
    this.attackDmg = 1;
    this.range = range;
    this.frame = 0;
    this.gameframe = 0;
    this.direction = 0;
    this.velocity = 1.5;
    this.alive = true;
    this.hitCooldown = new Cooldown(500);
  }

  movement() {
    if (
      distanceBtw(this.playerX, this.playerY, this.positionX, this.positionY) < this.range &&
      this.alive === true
    ) {
      if (this.playerX >= this.positionX) {
        this.offsetX += this.velocity;
        this.direction = 3;
      }
      if (this.playerX < this.positionX) {
        this.offsetX -= this.velocity;
        this.direction = 2;
      }
      if (this.playerY >= this.positionY) {
        this.offsetY += this.velocity;
        this.direction = 0;
      }
      if (this.playerY < this.positionY) {
        this.offsetY -= this.velocity;
        this.direction = 1;
      }
      this.dmgTaken(player.attack(this.positionX, this.positionY));
    }
  }

  dmgTaken(reciedDmg) {
    if (reciedDmg !== undefined && this.hitCooldown.isCooldownElapsed()) {
      console.log(this.hp);
      this.hitCooldown.updateActivationTime();
      this.hp -= reciedDmg;
      if (Math.abs(this.positionX > this.playerX)) this.offsetX += 50;
      else this.offsetX -= 50;
      if (Math.abs(this.positionY > this.playerY)) this.offsetY += 50;
      else this.offsetY -= 50;
    }
  }

  hitEffect() {
    ctx.drawImage(
      this.hitEffectAni,
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

  draw() {
    if (this.hp > 0) {
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
      if (this.gameframe % 6 === 0) {
        if (this.frame < 3) this.frame++;
        else this.frame = 0;
      }
      this.gameframe++;
    } else {
      this.alive = false;
    }
  }
}
