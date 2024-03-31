/** @type {HTMLCanvasElement} */
const canvas = document.querySelector(`#canvas1`);
const ctx = canvas.getContext(`2d`);

const canvasWidth = (canvas.width = 1300);
const canvasHeight = (canvas.height = 850);

const offset = {
  positionX: 0,
  positionY: -50,
};

const playerProperty = {
  velocity: 4,
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
  `./NinjaAdventure/Actor/Monsters/Beast/Beast.png`,
  // `/NinjaAdventure/Actor/Monsters/Snake3/Snake3.png`,
  10,
  300,
  playerProperty.positionX,
  playerProperty.positionY
);

const player = new PlayerSpirit(
  `/NinjaAdventure/Actor/Characters/Princess/SpriteSheet.png`,
  `./NinjaAdventure/Items/Weapons/Sword2/Sprite.png`,
  playerProperty,
  offset
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

  snake.positionX = offset.positionX + 1200 + snake.offsetX;
  snake.positionY = offset.positionY + 1100 + snake.offsetY;

  player.drawWeapon();
  snake.draw();
  snake.movement();
  player.draw();
  player.dmgTaken(snake.attack(), snake.angleofApproch, offset);
  player.health();

  if (!player.alive) {
    window.location.reload();
  }

  if (keys.PresssedW) {
    let collisionDetected = false;
    for (let i = 0; i < collisionBoundary.length; i++) {
      const boundry = collisionBoundary[i];
      if (
        CollisionDetection(player, {
          positionX: boundry.positionX,
          positionY: boundry.positionY + playerProperty.velocity,
        })
      ) {
        collisionDetected = true;
        break;
      }
    }
    if (!collisionDetected) {
      offset.positionY += playerProperty.velocity;
    }
  }
  if (keys.PresssedA) {
    let collisionDetected = false;
    for (let i = 0; i < collisionBoundary.length; i++) {
      const boundry = collisionBoundary[i];
      if (
        CollisionDetection(player, {
          positionX: boundry.positionX + playerProperty.velocity,
          positionY: boundry.positionY,
        })
      ) {
        collisionDetected = true;
        break;
      }
    }
    if (!collisionDetected) {
      offset.positionX += playerProperty.velocity;
    }
  }
  if (keys.PresssedS) {
    let collisionDetected = false;
    for (let i = 0; i < collisionBoundary.length; i++) {
      const boundry = collisionBoundary[i];
      if (
        CollisionDetection(player, {
          positionX: boundry.positionX,
          positionY: boundry.positionY - playerProperty.velocity,
        })
      ) {
        collisionDetected = true;
        break;
      }
    }
    if (!collisionDetected) {
      offset.positionY -= playerProperty.velocity;
    }
  }
  if (keys.PresssedD) {
    let collisionDetected = false;
    for (let i = 0; i < collisionBoundary.length; i++) {
      const boundry = collisionBoundary[i];
      if (
        CollisionDetection(player, {
          positionX: boundry.positionX - playerProperty.velocity,
          positionY: boundry.positionY,
        })
      ) {
        collisionDetected = true;
        break;
      }
    }
    if (!collisionDetected) {
      offset.positionX -= playerProperty.velocity;
    }
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
      player.frame = 0;

      break;
    case `a`:
      keys.PresssedA = false;
      player.moving = false;
      player.frame = 0;

      break;
    case `s`:
      keys.PresssedS = false;
      player.moving = false;
      player.frame = 0;

      break;
    case `d`:
      keys.PresssedD = false;
      player.moving = false;
      player.frame = 0;
      break;
    case ` `:
      keys.PresssedSpace = false;
      player.attackAnimation = false;
      player.frame = 0;
      break;
  }
});
