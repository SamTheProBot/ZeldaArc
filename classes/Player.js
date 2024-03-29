class PlayerSpirit {
  constructor(imagesrc, weaponsrc, positionX, positionY, frame, direction, attackAnimation) {
    this.image = new Image();
    this.image.src = imagesrc;
    this.weapon = new Image();
    this.weapon.src = weaponsrc;
    this.positionY = positionY;
    this.positionX = positionX;
    this.weaponPosition = {
      angle: 0,
      x: 32,
      y: 0,
    };
    this.imagesrc = imagesrc;
    this.frame = frame * 16;
    this.direction = direction;
    this.width = this.image.width / 4;
    this.height = this.image.height / 6.5;
    this.attackAnimation = attackAnimation;
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
      this.frame = 4 * 16;
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
      this.frame,
      this.width,
      this.height,
      this.positionX,
      this.positionY,
      this.width * 4,
      this.height * 4
    );
  }
  passWeaponCoordinate() {
    return {
      x: this.positionX + this.weaponPosition.x,
      y: this.positionY + this.weaponPosition.y,
    };
  }
}
