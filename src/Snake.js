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

        this.canva.setCellColor('#FFA500');
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

        this.snake = [
            [Math.round(this.canva.maxX / 2) - 2, Math.round(this.canva.maxY / 2)],
            [Math.round(this.canva.maxX / 2) - 3, Math.round(this.canva.maxY / 2)],
            [Math.round(this.canva.maxX / 2) - 4, Math.round(this.canva.maxY / 2)]
        ];

        this.collision = false;
    };

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
     * unsubscribe from loop$ and clear the canva
     * 
     * @memberOf Snake
     */
    stop() {
        this.loopSub$.unsubscribe();
        this.canva.clear();
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
        console.log('turn: ', turn);

        this.snake.pop();

        const newHead = this.createNewSnakeHead(this.snakeDirection);
        if (this.isCollision(newHead)) {
            console.log('collision');
            this.stop();
            return;
        }

        this.snake.unshift(newHead);

        this.canva.clear();
        for (let part of this.snake) {
            this.canva.drawCell(part);
        };
    };
}

export default Snake;