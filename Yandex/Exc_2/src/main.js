// Не забудьте перед отправкой изменить в module.exports = function main(game, start) {
// Не деструктурируйте game, ваше решение не будет проходить тесты.

module.exports = function main(game, start) {
  let points = [];
  let totalResult = false;
  let mainResolve = undefined;

  function addPoint(x, y) {
    points.push(`${x};${y}`);
    return true;
  }

  function checkPoint(x, y) {
    return points.indexOf(`${x};${y}`) !== -1;
  }

  async function startFunc(x, y) {
    let result = true;
    if (checkPoint(x, y) || totalResult) return result;
    if (x < 0 || y < 0 || y > 150 || x > 150) return result;

    addPoint(x, y);

    new Promise(async () => {
      try {
        await game.up(x, y);
        startFunc(x, y - 1);
      } catch (e) {}
    });

    new Promise(async () => {
      try {
        await game.down(x, y);
        startFunc(x, y + 1);
      } catch (e) {}
    });
    new Promise(async () => {
      try {
        await game.right(x, y);
        startFunc(x + 1, y);
      } catch (e) {}
    });
    new Promise(async () => {
      try {
        await game.left(x, y);
        startFunc(x - 1, y);
      } catch (e) {}
    });
    game.state(x, y).then((obj) => {
      if (obj.finish) {
        mainResolve({ x, y });
        totalResult = true;
      }
    });

    return result;
  }

  return new Promise((resolve) => {
    mainResolve = resolve;
    startFunc(start.x, start.y);
  });
};
