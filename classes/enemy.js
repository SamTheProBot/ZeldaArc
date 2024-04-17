class Enemy {
  constructor(imagesrc, hp, range, offsetX, offsetY, velocity) {
    this.image = new Image();
    this.image.src = imagesrc;
    this.hitEffectAni = new Image();
    this.hitEffectAni.src = `./NinjaAdventure/FX/SlashFx/CircularSlash/SpriteSheet.png`;
    this.playerX = canvasWidth / 2 - 16;
    this.playerY = canvasHeight / 2 - 16;
    this.positionX = 0;
    this.positionY = 0;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.width = this.image.width / 4;
    this.height = this.image.height / 4;
    this.hp = hp;
    this.attackDmg = 1;
    this.range = range;
    this.frame = 0;
    this.gameframe = 0;
    this.direction = 0;
    this.velocity = Math.floor(0.34 * velocity);
    this.knockback = 70;
    this.alive = true;
    this.hitCooldown = new Cooldown(500);
    this.angleofApproch = null;
  }

  movement() {
    let distance = distanceBtw(
      this.playerX,
      this.playerY,
      this.positionX,
      this.positionY
    );
    this.angleofApproch = Math.atan2(
      this.playerY - this.positionY,
      this.playerX - this.positionX
    );

    if (this.hp <= 0) {
      this.alive = false;
    }

    if (distance < this.range) {
      this.offsetX += Math.cos(this.angleofApproch) * this.velocity;
      this.offsetY += Math.sin(this.angleofApproch) * this.velocity;

      if (
        this.angleofApproch >= -Math.PI / 4 &&
        this.angleofApproch < Math.PI / 4
      ) {
        this.direction = 3;
      } else if (
        this.angleofApproch >= Math.PI / 4 &&
        this.angleofApproch < (3 * Math.PI) / 4
      ) {
        this.direction = 0;
      } else if (
        this.angleofApproch >= (-3 * Math.PI) / 4 &&
        this.angleofApproch < -Math.PI / 4
      ) {
        this.direction = 1;
      } else {
        this.direction = 2;
      }
      this.dmgTaken(
        player.attack(this.positionX, this.positionY),
        player.direction
      );

      if (this.gameframe % (this.velocity * 4) === 0) {
        if (this.frame < 3) this.frame++;
        else this.frame = 0;
      }
      this.gameframe++;
    }
  }

  dmgTaken(reciedDmg, direction) {
    if (reciedDmg !== undefined && this.hitCooldown.isCooldownElapsed()) {
      this.hitCooldown.updateActivationTime();
      this.hp -= reciedDmg;
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

  attack() {
    if (
      distanceBtw(this.positionX, this.positionY, this.playerX, this.playerY) <
      50
    ) {
      return this.attackDmg;
    }
  }

  // hitEffect() {
  //   let frame = 0;
  //   let gameframe = 0;

  //   const animationLoop = () => {
  //     ctx.clearRect(this.positionX, this.positionY, this.width * 4, this.height * 4);
  //     ctx.drawImage(
  //       this.hitEffectAni,
  //       frame * 32,
  //       0,
  //       this.width * 2,
  //       this.height * 2,
  //       this.positionX,
  //       this.positionY,
  //       this.width * 4,
  //       this.height * 4
  //     );

  //     if (gameframe % (this.velocity * 12) === 0) {
  //       if (frame < 3) frame++;
  //       else {
  //         cancelAnimationFrame(animationId);
  //         ctx.clearRect(this.positionX, this.positionY, this.width * 4, this.height * 4);
  //       }
  //     }
  //     gameframe++;
  //     animationId = requestAnimationFrame(animationLoop);
  //   };

  //   let animationId = requestAnimationFrame(animationLoop);
  // }

  draw() {
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
