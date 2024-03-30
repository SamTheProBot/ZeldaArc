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
    this.velocity = 2;
    this.knockback = 70;
    this.alive = true;
    this.hitCooldown = new Cooldown(500);
  }

  movement() {
    let distance = distanceBtw(this.playerX, this.playerY, this.positionX, this.positionY);
    let angle = Math.atan2(this.playerY - this.positionY, this.playerX - this.positionX);

    if (distance < this.range && this.alive === true) {
      this.offsetX += Math.cos(angle) * this.velocity;
      this.offsetY += Math.sin(angle) * this.velocity;

      if (angle >= -Math.PI / 4 && angle < Math.PI / 4) {
        this.direction = 3;
      } else if (angle >= Math.PI / 4 && angle < (3 * Math.PI) / 4) {
        this.direction = 0;
      } else if (angle >= (-3 * Math.PI) / 4 && angle < -Math.PI / 4) {
        this.direction = 1;
      } else {
        this.direction = 2;
      }
      this.dmgTaken(player.attack(this.positionX, this.positionY), player.direction);

      if (this.gameframe % (this.velocity * 4) === 0) {
        if (this.frame < 3) this.frame++;
        else this.frame = 0;
      }
      this.gameframe++;
    }
  }

  dmgTaken(reciedDmg, direction) {
    if (reciedDmg !== undefined && this.hitCooldown.isCooldownElapsed()) {
      console.log(this.hp);
      this.hitCooldown.updateActivationTime();
      this.hp -= reciedDmg;
      this.hitEffect();
      switch (direction) {
        case 0:
          this.offsetY += this.knockback;
          break;
        case 1:
          this.offsetY -= this.knockback;
          break;
        case 2:
          this.offsetX -= this.knockback;
          break;
        case 3:
          this.offsetX += this.knockback;
          break;
      }
    }
  }

  hitEffect() {
    let frame = 0;
    let gameframe = 0;
    ctx.drawImage(
      this.hitEffectAni,
      frame * 32,
      0,
      this.width * 2,
      this.height * 2,
      this.positionX,
      this.positionY,
      this.width * 4,
      this.height * 4
    );
    if (gameframe % (this.velocity * 4) === 0) {
      if (frame < 3) frame++;
      else frame = 0;
    }
    gameframe++;
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
    } else {
      this.alive = false;
    }
  }
}
