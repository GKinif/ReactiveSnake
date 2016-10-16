import Rx from 'rxjs/Rx';
import Canvas from './canvas';

class Snake {
    /**
     * Creates an instance of Snake.
     * 
     * @param {Node} canvas
     * 
     * @memberOf Snake
     */
    constructor(canvas) {
        this.canva = new Canvas(canvas);
        this.canva.setStrokeColor('#FFFFFF');

        this.loop$ = Rx.Observable.interval(500);
        this.keyDown$ = Rx.Observable.fromEvent(document, 'keydown').map(event => {
            event.preventDefault();
            return event.keyCode;
        })
        .distinctUntilChanged();

        this.loopSub$ = null;
        this.keySub$ = null;

        this.snakeDirection = 'right';

        this.snake = this.createBaseSnake(this.canva.maxX, this.canva.maxY);

        this.foods = [];
    };

    createBaseSnake(maxX, maxY) {
        return [
            [Math.round(maxX / 2) - 2, Math.round(maxY / 2)],
            [Math.round(maxX / 2) - 3, Math.round(maxY / 2)],
            [Math.round(maxX / 2) - 4, Math.round(maxY / 2)]
        ];
    }

    /**
     * subscribe to loop$ and keyDown$
     * 
     * @memberOf Snake
     */
    start() {
        this.loopSub$ = this.loop$.subscribe(turn => {
            this.loop(turn);
        })

        this.keySub$ = this.keyDown$.subscribe(keyCode => {
            switch(keyCode) {
                case 37:
                    this.snakeDirection = 'left';
                    break;
                case 38:
                    this.snakeDirection = 'up';
                    break;
                case 39:
                    this.snakeDirection = 'right';
                    break;
                case 40:
                    this.snakeDirection = 'down';
                    break;
            }
            console.log(this.snakeDirection);
        })
    };

    /**
     * unsubscribe from loop$, clear the canva and reset the snake
     * 
     * @memberOf Snake
     */
    stop() {
        this.loopSub$.unsubscribe();
        this.canva.clear();
        this.snake = this.createBaseSnake(this.canva.maxX, this.canva.maxY);
    };

    /**
     * return a new array for the head based on the first element
     * in snake array and the direction (left, up, rigth, down)
     * 
     * @param {String} direction
     * @returns {Array}
     * 
     * @memberOf Snake
     */
    createNewSnakeHead(direction) {
        const [currX, currY] = this.snake[0];
        let newHead;
        switch(direction) {
            case 'up':
                newHead = [currX, currY - 1];
                break;
            case 'down':
                newHead = [currX, currY + 1];
                break;
            case 'left':
                newHead = [currX - 1, currY];
                break;
            case 'right':
            default:
                newHead = [currX + 1, currY];
                break;
        }
        console.log('new Head: ', newHead);
        return newHead;
    };

    /**
     * create an array of position [x, y] at a valid position in the game
     * 
     * @returns
     * 
     * @memberOf Snake
     */
    createFood() {
        let isValidPosition = false;
        let food = null;
        let count = 0;
        while (!isValidPosition && count < this.canva.maxX * this.canva.maxY) {
            const [x, y] = [
                Math.round(Math.random() * this.canva.maxX),
                Math.round(Math.random() * this.canva.maxY),
            ];
            // return the number of body part that have the same position of food
            const samePosition = this.snake.filter(part => {
                return part[0] === x && part[1] === y;
            }).length;

            if (!samePosition) {
                isValidPosition = true;
                food = [x, y];
            }
            count++;
        }
        console.log('food: ', food);
        return food;
    }

    /**
     * check for collision on the border of the map or on the snake
     * 
     * @param {Array} head
     * @returns {Boolean}
     * 
     * @memberOf Snake
     */
    isCollision(head) {
        let isCollision = false;
        const [x, y] = head;
        if (x < 0 || x > this.canva.maxX) {
            isCollision = true;
        }
        if (!isCollision && y < 0 || y > this.canva.maxY) {
            isCollision = true;
        }
        if (!isCollision) {
            for (let part of this.snake) {
                if (head[0] === part[0] && head[1] === part[1]) {
                    isCollision = true;
                }
            }
        }
        return isCollision;
    }

    /**
     * executed on each loop of the game
     * 
     * @param {Number} turn
     * 
     * @memberOf Snake
     */
    loop(turn) {
        const newHead = this.createNewSnakeHead(this.snakeDirection);
        if (this.isCollision(newHead)) {
            console.log('collision');
            this.stop();
            return;
        }

        // if the snake don't eat a food on this turn, we remove the last part
        this.foods = this.foods.filter(food => {
            let isHeadNotOnFood = false;
            if (!(food[0] === newHead[0] && food[1] === newHead[1])) {
                isHeadNotOnFood = true;
                this.snake.pop();
            }
            // only keep the food that are not at the same place as the snakeHead
            return isHeadNotOnFood;
        });

        this.snake.unshift(newHead);

        this.canva.clear();

        this.canva.setCellColor('#FFA500');
        for (let part of this.snake) {
            this.canva.drawCell(part);
        };

        if (this.foods.length < 1) {
            this.foods.push(this.createFood());
        }

        this.canva.setCellColor('#00BB00');
        for (let food of this.foods) {
            this.canva.drawCell(food);
        };
    };
}

export default Snake;