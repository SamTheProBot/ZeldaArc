class PlayerSpirit {
  constructor(imagesrc, weaponsrc) {
    this.image = new Image();
    this.image.src = imagesrc;
    this.weapon = new Image();
    this.weapon.src = weaponsrc;
    this.hearts = new Image();
    this.hearts.src = `./NinjaAdventure/HUD/Heart.png`;
    this.positionY = canvasHeight / 2 - 16;
    this.positionX = canvasWidth / 2 - 16;
    this.weaponPosition = {
      angle: 0,
      x: 32,
      y: 0,
    };
    this.width = this.image.width / 4;
    this.height = this.image.height / 6.5;
    this.hp = 4;
    this.attackDmg = 1;
    this.frame = 0;
    this.gameframe = 0;
    this.moving = false;
    this.direction = null;
    this.attackAnimation = false;
    this.attackRange = 50;
    this.attackCoolDown = 500;
    this.lastAttackTime = 0;
    this.lastAttackTime = 0;
    this.alive = true;
    this.hitCooldown = new Cooldown(500);
    this.knockback = 70;
  }

  health() {
    ctx.drawImage(
      this.hearts,
      this.hp * 16,
      0,
      this.width,
      this.height,
      this.positionX - 325,
      this.positionY - 210,
      this.width * 4,
      this.height * 4
    );
    if (this.hp <= 0) {
      this.alive = false;
    }
  }

  drawWeapon() {
    ctx.save();
    switch (this.direction) {
      case 0:
        this.weaponPosition = {
          angle: 3.15,
          x: 25,
          y: 120,
          a: 3,
          b: 30,
        };
        break;
      case 1:
        this.weaponPosition = {
          angle: 0,
          x: 25,
          y: -60,
          a: -5,
          b: 40,
        };
        break;
      case 2:
        this.weaponPosition = {
          angle: -1.575,
          x: -60,
          y: 25,
          a: -22,
          b: 34,
        };
        break;
      case 3:
        this.weaponPosition = {
          angle: 1.575,
          x: 120,
          y: 25,
          a: 22,
          b: 34,
        };
        break;
    }

    ctx.translate(this.positionX + this.weaponPosition.x, this.positionY + this.weaponPosition.y);
    ctx.rotate(this.weaponPosition.angle);
    if (this.attackAnimation) {
      this.frame = 4;
      ctx.drawImage(
        this.weapon,
        0,
        0,
        this.width,
        this.height,
        -this.weapon.width * 2 + this.weaponPosition.a,
        -this.weapon.height * 2 + this.weaponPosition.b,
        this.width * 4,
        this.height * 4
      );
    }
    ctx.restore();
  }

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
    if (this.moving && this.gameframe % Math.floor(6) === 0) {
      if (this.frame < 3) this.frame++;
      else this.frame = 0;
    }
    this.gameframe++;
  }

  dmgTaken(reciedDmg, angle, offset) {
    if (reciedDmg !== undefined && this.hitCooldown.isCooldownElapsed()) {
      this.hitCooldown.updateActivationTime();
      this.hp -= reciedDmg;
      offset.positionX -= Math.cos(angle) * this.knockback;
      offset.positionY -= Math.sin(angle) * this.knockback;
    }
  }

  attack(enemyX, enemyY) {
    if (
      this.attackAnimation === true &&
      distanceBtw(this.positionX + this.weaponPosition.x, this.positionY + +this.weaponPosition.y, enemyX, enemyY) <
        this.attackRange
    ) {
      return this.attackDmg;
    }
  }
}
