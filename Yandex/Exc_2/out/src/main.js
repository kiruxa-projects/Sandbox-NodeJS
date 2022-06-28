// Не забудьте перед отправкой изменить в module.exports = function main(game, start) {
// Не деструктурируйте game, ваше решение не будет проходить тесты.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    function startFunc(x, y) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = true;
            if (checkPoint(x, y) || totalResult)
                return result;
            if (x < 0 || y < 0 || y > 150 || x > 150)
                return result;
            addPoint(x, y);
            new Promise(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield game.up(x, y);
                    startFunc(x, y - 1);
                }
                catch (e) {
                }
            }));
            new Promise(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield game.down(x, y);
                    startFunc(x, y + 1);
                }
                catch (e) {
                }
            }));
            new Promise(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield game.right(x, y);
                    startFunc(x + 1, y);
                }
                catch (e) {
                }
            }));
            new Promise(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield game.left(x, y);
                    startFunc(x - 1, y);
                }
                catch (e) {
                }
            }));
            game.state(x, y).then((obj) => {
                if (obj.finish) {
                    mainResolve({ x, y });
                    totalResult = true;
                }
            });
            // let obj = game.state(x,y)
            // 	.then(async (obj) => {
            // 		if(obj.finish){
            // 			mainResolve({x,y})
            // 		}
            // 		if (obj.top) {
            // 			new Promise(async () => {
            // 				await game.up(x, y)
            // 				startFunc(x, y - 1)
            // 			})
            // 		}
            // 		if (obj.bottom) {
            // 			new Promise(async () => {
            // 				await game.down(x, y)
            // 				startFunc(x, y + 1)
            // 			})
            // 		}
            // 		if (obj.right) {
            // 			new Promise(async () => {
            // 				await game.right(x, y)
            // 				startFunc(x + 1, y)
            // 			})
            // 		}else{
            // 			if(y===0){
            // 				maxX=x
            // 			}
            // 		}
            //
            // 		if (obj.left) {
            // 			new Promise(async () => {
            // 				await game.left(x, y)
            // 				startFunc(x - 1, y)
            // 			})
            // 		}
            // 	})
            return result;
        });
    }
    return new Promise((resolve) => {
        mainResolve = resolve;
        startFunc(start.x, start.y);
    });
};
