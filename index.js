/** @type {HTMLCanvasElement} */
const canvas = document.querySelector(`#canvas1`);
const ctx = canvas.getContext(`2d`);

const canvasWidth = (canvas.width = 1300);
const canvasHeight = (canvas.height = 800);
// const canvasWidth = (canvas.width = 900);
// const canvasHeight = (canvas.height = 750);

const offset = {
  positionX: -500,
  positionY: -800,
};

const playerProperty = {
  speed: 5,
  frame: 0,
  direction: 0,
  gameframe: 0,
  weaponX: 0,
  weaponY: 0,
  positionX: canvasWidth / 2 - 16,
  positionY: canvasHeight / 2 - 16,
  moving: false,
  attackAnimation: false,
};

const map = {
  type: `overworld`,
  collisionBoundary: null,
};

const keys = {
  PresssedW: false,
  PresssedA: false,
  PresssedS: false,
  PresssedD: false,
  PresssedSpace: false,
};

const snake = new Enemy(
  `/NinjaAdventure/Actor/Monsters/Snake3/Snake3.png`,
  playerProperty.frame,
  4,
  250,
  playerProperty.positionX,
  playerProperty.positionY
);
const animation = () => {
  const player = new PlayerSpirit(
    `./NinjaAdventure/Actor/Characters/BlueNinja/SpriteSheet.png`,
    `./NinjaAdventure/Items/Weapons/Lance2/Sprite.png`,
    playerProperty.positionX,
    playerProperty.positionY,
    playerProperty.frame,
    playerProperty.direction,
    playerProperty.attackAnimation
  );

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  switch (map.type) {
    case `overworld`:
      map.collisionBoundary = CollisionPositionArray;
      break;
    case `home`:
      map.collisionBoundary = CollisionPositionArray;
      break;
  }

  const collisionBoundary = [];
  map.collisionBoundary.forEach((axisY, i) => {
    axisY.forEach((axisX, j) => {
      if (axisX != 0) {
        collisionBoundary.push(
          new CollisionBlock(
            j * CollisionBlock.pixel + offset.positionX,
            i * CollisionBlock.pixel + offset.positionY
          )
        );
      }
    });
  });

  const Background = new Game(canvasWidth, canvasHeight);
  Background.init(map.type);
  Background.draw(offset);

  collisionBoundary.forEach((item) => item.draw());
  if (playerProperty.moving && playerProperty.gameframe % (playerProperty.speed * 1.2) === 0) {
    if (playerProperty.frame < 3) playerProperty.frame++;
    else playerProperty.frame = 0;
  }
  playerProperty.gameframe++;

  player.drawWeapon();
  player.draw();

  snake.positionX = offset.positionX + 1800 + snake.disX;
  snake.positionY = offset.positionY + 550 + snake.disY;
  snake.draw();
  if (snake.updatePosition()) {
    snake.movement();
    if (playerProperty.positionX > snake.positionX) {
      snake.direction = 3;
      snake.disX += snake.velocity;
    }
    if (playerProperty.positionX < snake.positionX) {
      snake.direction = 2;
      snake.disX -= snake.velocity;
    }
    if (playerProperty.positionY > snake.positionY) {
      snake.direction = 0;
      snake.disY += snake.velocity;
    }
    if (playerProperty.positionY < snake.positionY) {
      snake.direction = 1;
      snake.disY -= snake.velocity;
    }
  }

  if (keys.PresssedW) {
    let collisionDetected = false;
    for (let i = 0; i < collisionBoundary.length; i++) {
      const boundry = collisionBoundary[i];
      if (
        CollisionDetection(player, {
          positionX: boundry.positionX,
          positionY: boundry.positionY + playerProperty.speed,
        })
      ) {
        collisionDetected = true;
        break;
      }
    }
    if (!collisionDetected) {
      offset.positionY += playerProperty.speed;
    }
  }
  if (keys.PresssedA) {
    let collisionDetected = false;
    for (let i = 0; i < collisionBoundary.length; i++) {
      const boundry = collisionBoundary[i];
      if (
        CollisionDetection(player, {
          positionX: boundry.positionX + playerProperty.speed,
          positionY: boundry.positionY,
        })
      ) {
        collisionDetected = true;
        break;
      }
    }
    if (!collisionDetected) {
      offset.positionX += playerProperty.speed;
    }
  }
  if (keys.PresssedS) {
    let collisionDetected = false;
    for (let i = 0; i < collisionBoundary.length; i++) {
      const boundry = collisionBoundary[i];
      if (
        CollisionDetection(player, {
          positionX: boundry.positionX,
          positionY: boundry.positionY - playerProperty.speed,
        })
      ) {
        collisionDetected = true;
        break;
      }
    }
    if (!collisionDetected) {
      offset.positionY -= playerProperty.speed;
    }
  }
  if (keys.PresssedD) {
    let collisionDetected = false;
    for (let i = 0; i < collisionBoundary.length; i++) {
      const boundry = collisionBoundary[i];
      if (
        CollisionDetection(player, {
          positionX: boundry.positionX - playerProperty.speed,
          positionY: boundry.positionY,
        })
      ) {
        collisionDetected = true;
        break;
      }
    }
    if (!collisionDetected) {
      offset.positionX -= playerProperty.speed;
    }
  }
  if (keys.PresssedSpace) {
    console.log(player.passWeaponCoordinate());
  }
  requestAnimationFrame(animation);
};
animation();

window.addEventListener(`keypress`, function (e) {
  switch (e.key) {
    case `w`:
      keys.PresssedW = true;
      playerProperty.moving = true;
      playerProperty.direction = 1;
      break;
    case `a`:
      keys.PresssedA = true;
      playerProperty.moving = true;
      playerProperty.direction = 2;
      break;
    case `s`:
      keys.PresssedS = true;
      playerProperty.moving = true;
      playerProperty.direction = 0;
      break;
    case `d`:
      keys.PresssedD = true;
      playerProperty.moving = true;
      playerProperty.direction = 3;
      break;
    case ` `:
      keys.PresssedSpace = true;
      playerProperty.attackAnimation = true;
      break;
  }
});

window.addEventListener(`keyup`, function (e) {
  switch (e.key) {
    case `w`:
      keys.PresssedW = false;
      playerProperty.moving = false;
      break;
    case `a`:
      keys.PresssedA = false;
      playerProperty.moving = false;
      break;
    case `s`:
      keys.PresssedS = false;
      playerProperty.moving = false;
      break;
    case `d`:
      keys.PresssedD = false;
      playerProperty.moving = false;
      break;
    case ` `:
      keys.PresssedSpace = false;
      playerProperty.attackAnimation = false;
      break;
  }
});
