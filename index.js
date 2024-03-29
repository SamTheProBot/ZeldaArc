/** @type {HTMLCanvasElement} */
const canvas = document.querySelector(`#canvas1`);
const ctx = canvas.getContext(`2d`);

const canvasWidth = (canvas.width = 1250);
const canvasHeight = (canvas.height = 900);

const offset = {
  positionX: -500,
  positionY: -800,
};

const playerProperty = {
  playerVelocity: 5,
  positionX: canvasWidth / 2 - 16,
  positionY: canvasHeight / 2 - 16,
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
  4,
  250,
  playerProperty.positionX,
  playerProperty.positionY
);

const player = new PlayerSpirit(
  `./NinjaAdventure/Actor/Characters/BlueNinja/SpriteSheet.png`,
  `./NinjaAdventure/Items/Weapons/Lance2/Sprite.png`,
  playerProperty.positionX,
  playerProperty.positionY,
  playerProperty.playerVelocity
);

const animation = () => {
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

  player.draw();
  player.movement();

  snake.positionX = offset.positionX + 1800 + snake.disX;
  snake.positionY = offset.positionY + 550 + snake.disY;
  snake.draw();
  player.drawWeapon();

  if (snake.updatePosition()) {
    snake.movement();
    if (playerProperty.positionX > snake.positionX) {
      snake.disX += snake.velocity;
      snake.direction = 3;
    }
    if (playerProperty.positionX < snake.positionX) {
      snake.disX -= snake.velocity;
      snake.direction = 2;
    }
    if (playerProperty.positionY > snake.positionY) {
      snake.disY += snake.velocity;
      snake.direction = 0;
    }
    if (playerProperty.positionY < snake.positionY) {
      snake.disY -= snake.velocity;
      snake.direction = 1;
    }
  }

  if (keys.PresssedW) {
    let collisionDetected = false;
    for (let i = 0; i < collisionBoundary.length; i++) {
      const boundry = collisionBoundary[i];
      if (
        CollisionDetection(player, {
          positionX: boundry.positionX,
          positionY: boundry.positionY + playerProperty.playerVelocity,
        })
      ) {
        collisionDetected = true;
        break;
      }
    }
    if (!collisionDetected) {
      offset.positionY += playerProperty.playerVelocity;
    }
  }
  if (keys.PresssedA) {
    let collisionDetected = false;
    for (let i = 0; i < collisionBoundary.length; i++) {
      const boundry = collisionBoundary[i];
      if (
        CollisionDetection(player, {
          positionX: boundry.positionX + playerProperty.playerVelocity,
          positionY: boundry.positionY,
        })
      ) {
        collisionDetected = true;
        break;
      }
    }
    if (!collisionDetected) {
      offset.positionX += playerProperty.playerVelocity;
    }
  }
  if (keys.PresssedS) {
    let collisionDetected = false;
    for (let i = 0; i < collisionBoundary.length; i++) {
      const boundry = collisionBoundary[i];
      if (
        CollisionDetection(player, {
          positionX: boundry.positionX,
          positionY: boundry.positionY - playerProperty.playerVelocity,
        })
      ) {
        collisionDetected = true;
        break;
      }
    }
    if (!collisionDetected) {
      offset.positionY -= playerProperty.playerVelocity;
    }
  }
  if (keys.PresssedD) {
    let collisionDetected = false;
    for (let i = 0; i < collisionBoundary.length; i++) {
      const boundry = collisionBoundary[i];
      if (
        CollisionDetection(player, {
          positionX: boundry.positionX - playerProperty.playerVelocity,
          positionY: boundry.positionY,
        })
      ) {
        collisionDetected = true;
        break;
      }
    }
    if (!collisionDetected) {
      offset.positionX -= playerProperty.playerVelocity;
    }
  }
  if (keys.PresssedSpace) {
    console.log(`space`);
  }
  requestAnimationFrame(animation);
};
animation();

window.addEventListener(`keypress`, function (e) {
  switch (e.key) {
    case `w`:
      keys.PresssedW = true;
      player.moving = true;
      player.direction = 1;
      break;
    case `a`:
      keys.PresssedA = true;
      player.moving = true;
      player.direction = 2;
      break;
    case `s`:
      keys.PresssedS = true;
      player.moving = true;
      player.direction = 0;
      break;
    case `d`:
      keys.PresssedD = true;
      player.moving = true;
      player.direction = 3;
      break;
    case ` `:
      keys.PresssedSpace = true;
      player.attackAnimation = true;
      break;
  }
});

window.addEventListener(`keyup`, function (e) {
  switch (e.key) {
    case `w`:
      keys.PresssedW = false;
      player.moving = false;
      break;
    case `a`:
      keys.PresssedA = false;
      player.moving = false;
      break;
    case `s`:
      keys.PresssedS = false;
      player.moving = false;
      break;
    case `d`:
      keys.PresssedD = false;
      player.moving = false;
      break;
    case ` `:
      keys.PresssedSpace = false;
      player.attackAnimation = false;
      break;
  }
});
