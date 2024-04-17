/** @type {HTMLCanvasElement} */
const canvas = document.querySelector(`#canvas1`);

const ctx = canvas.getContext(`2d`);

const canvasWidth = (canvas.width = 1000);
const canvasHeight = (canvas.height = 625);

// const offset = {
//   positionX: -200,
//   positionY: -150,
//   intialX: -200,
//   intialY: -150,
// };

const offset = {
  positionX: -540,
  positionY: -460,
  intialX: -540,
  intialY: -460,
};

const playerProperty = {
  velocity: 10,
};

const map = {
  collisionBoundary: HomeVillageCollisionarray,
  enemyLocation: HomeVillageEnemyArray,
  enemyLocationArray: [],
};

const keys = {
  PresssedW: false,
  PresssedA: false,
  PresssedS: false,
  PresssedD: false,
  PresssedSpace: false,
};

const player = new PlayerSpirit(
  `/NinjaAdventure/Actor/Characters/Princess/SpriteSheet.png`,
  `./NinjaAdventure/Items/Weapons/Sword2/Sprite.png`
);

map.enemyLocation.forEach((axisY, i) => {
  axisY.forEach((axisX, j) => {
    switch (axisX) {
      case 1:
        map.enemyLocationArray.push(
          new Enemy(
            `./NinjaAdventure/Actor/Monsters/Snake2/Snake2.png`,
            2,
            300,
            j * CollisionBlock.pixel + offset.positionX - offset.intialX,
            i * CollisionBlock.pixel + offset.positionY - offset.intialY,
            9
          )
        );
        break;
      case 2:
        map.enemyLocationArray.push(
          new Enemy(
            `./NinjaAdventure/Actor/Monsters/BambooYellow/SpriteSheet.png`,
            4,
            250,
            j * CollisionBlock.pixel + offset.positionX - offset.intialX,
            i * CollisionBlock.pixel + offset.positionY - offset.intialY,
            7
          )
        );
        break;
      case 3:
        map.enemyLocationArray.push(
          new Enemy(
            `./NinjaAdventure/Actor/Monsters/Mushroom/mushroom.png`,
            6,
            200,
            j * CollisionBlock.pixel + offset.positionX - offset.intialX,
            i * CollisionBlock.pixel + offset.positionY - offset.intialY,
            5
          )
        );
        break;
      case 4:
        map.enemyLocationArray.push(
          new Enemy(
            `./NinjaAdventure/Actor/Monsters/Beast2/Beast2.png`,
            9,
            200,
            j * CollisionBlock.pixel + offset.positionX - offset.intialX,
            i * CollisionBlock.pixel + offset.positionY - offset.intialY,
            5
          )
        );
        break;
      case 5:
        map.enemyLocationArray.push(
          new Enemy(
            `./NinjaAdventure/Actor/Monsters/SkullBlue/SpriteSheet.png`,
            7,
            200,
            j * CollisionBlock.pixel + offset.positionX - offset.intialX,
            i * CollisionBlock.pixel + offset.positionY - offset.intialY,
            9
          )
        );
        break;
      case 6:
        map.enemyLocationArray.push(
          new Enemy(
            `./NinjaAdventure/Actor/Monsters/Spirit/SpriteSheet.png`,
            8,
            300,
            j * CollisionBlock.pixel + offset.positionX - offset.intialX,
            i * CollisionBlock.pixel + offset.positionY - offset.intialY,
            7
          )
        );
        break;
    }
  });
});

console.log(map);
const animation = () => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  const Array = {
    collisionBoundaryArray: [],
  };

  const WorldMap = new Game(canvasWidth, canvasHeight);

  switch (WorldMap.backgroundType) {
    case `HomeVillage`:
      map.collisionBoundary = HomeVillageCollisionarray;
      map.enemyLocation = HomeVillageEnemyArray;
      break;
    case `MainHouse`:
      map.collisionBoundary = MainHousearray;
      map.enemyLocation = MainHouseEnemyarray;
      break;
  }

  map.collisionBoundary.forEach((axisY, i) => {
    axisY.forEach((axisX, j) => {
      switch (axisX) {
        case 1:
          Array.collisionBoundaryArray.push(
            new CollisionBlock(
              j * CollisionBlock.pixel + offset.positionX,
              i * CollisionBlock.pixel + offset.positionY
            )
          );
          break;
        case 2:
          break;
        case 3:
          break;
      }
    });
  });

  WorldMap.init(map.type);
  WorldMap.draw(offset);

  Array.collisionBoundaryArray.forEach((item) => item.draw());

  map.enemyLocationArray.map((enemy, index) => {
    if (enemy.alive === false) map.enemyLocationArray.splice(index, 1);
    enemy.positionX = offset.positionX + enemy.offsetX;
    enemy.positionY = offset.positionY + enemy.offsetY;
    enemy.draw();
    player.dmgTaken(enemy.attack(), enemy.angleofApproch, offset);
    enemy.movement();
  });

  player.drawWeapon();
  player.draw();
  player.health();

  if (!player.alive) {
    window.location.reload();
  }

  if (keys.PresssedW) {
    let collisionDetected = false;
    for (let i = 0; i < Array.collisionBoundaryArray.length; i++) {
      const boundry = Array.collisionBoundaryArray[i];
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
    for (let i = 0; i < Array.collisionBoundaryArray.length; i++) {
      const boundry = Array.collisionBoundaryArray[i];
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
    for (let i = 0; i < Array.collisionBoundaryArray.length; i++) {
      const boundry = Array.collisionBoundaryArray[i];
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
    for (let i = 0; i < Array.collisionBoundaryArray.length; i++) {
      const boundry = Array.collisionBoundaryArray[i];
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
