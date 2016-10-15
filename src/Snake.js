import Rx from 'rxjs/Rx';
import Canvas from './canvas';

class Snake {
    constructor(canvas) {
        this.canva = new Canvas(canvas);

        this.loop$ = Rx.Observable.interval(1000);
        this.keyDown$ = Rx.Observable.fromEvent(document, 'keydown').map(event => {
            event.preventDefault();
            return event.keyCode;
        })
        .distinctUntilChanged();

        this.loopSub$ = null;
        this.keySub$ = null;

        this.snakeDirection = 'right';

        this.canva.setCellColor('#FFA500');
        this.canva.setStrokeColor('#FFFFFF');

        this.snake = [
            [Math.round(this.canva.maxX / 2) - 2, Math.round(this.canva.maxY / 2)],
            [Math.round(this.canva.maxX / 2) - 3, Math.round(this.canva.maxY / 2)],
            [Math.round(this.canva.maxX / 2) - 4, Math.round(this.canva.maxY / 2)]
        ];
    };

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

    stop() {
        this.loopSub$.unsubscribe();
        this.canva.clear();
    };

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
        return newHead;
    };

    loop(turn) {
        console.log('turn: ', turn);

        this.snake.pop();
        this.snake.unshift(
            this.createNewSnakeHead(this.snakeDirection)
        );

        this.canva.clear();
        for (let part of this.snake) {
            this.canva.drawCell(part);
        }
    };
}

export default Snake;