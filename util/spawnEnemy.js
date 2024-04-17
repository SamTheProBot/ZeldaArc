const spawnEnemy = (Array1, Array2, offset) => {
  Array1.forEach((axisY, i) => {
    axisY.forEach((axisX, j) => {
      switch (axisX) {
        case 1:
          Array2.push(
            new Enemy(
              `../assets/Actor/Monsters/Snake2/Snake2.png`,
              2,
              300,
              j * CollisionBlock.pixel + offset.positionX - offset.intialX,
              i * CollisionBlock.pixel + offset.positionY - offset.intialY,
              9
            )
          );
          break;
        case 2:
          Array2.push(
            new Enemy(
              `../assets/Actor/Monsters/BambooYellow/SpriteSheet.png`,
              4,
              250,
              j * CollisionBlock.pixel + offset.positionX - offset.intialX,
              i * CollisionBlock.pixel + offset.positionY - offset.intialY,
              7
            )
          );
          break;
        case 3:
          Array2.push(
            new Enemy(
              `../assets/Actor/Monsters/Mushroom/mushroom.png`,
              6,
              200,
              j * CollisionBlock.pixel + offset.positionX - offset.intialX,
              i * CollisionBlock.pixel + offset.positionY - offset.intialY,
              5
            )
          );
          break;
        case 4:
          Array2.push(
            new Enemy(
              `../assets/Actor/Monsters/Beast2/Beast2.png`,
              9,
              200,
              j * CollisionBlock.pixel + offset.positionX - offset.intialX,
              i * CollisionBlock.pixel + offset.positionY - offset.intialY,
              5
            )
          );
          break;
        case 5:
          Array2.push(
            new Enemy(
              `../assets/Actor/Monsters/SkullBlue/SpriteSheet.png`,
              7,
              200,
              j * CollisionBlock.pixel + offset.positionX - offset.intialX,
              i * CollisionBlock.pixel + offset.positionY - offset.intialY,
              9
            )
          );
          break;
        case 6:
          Array2.push(
            new Enemy(
              `../assets/Actor/Monsters/Spirit/SpriteSheet.png`,
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
};
