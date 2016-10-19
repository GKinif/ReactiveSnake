import Rx from 'rxjs/Rx';
import Snake from './Snake';

require('../sass/styles.scss');

const snake = new Snake(document.getElementById('snake'));

const startClick$ = Rx.Observable.fromEvent(document.getElementById('startBtn'), 'click');
const stopClick$ = Rx.Observable.fromEvent(document.getElementById('stopBtn'), 'click');

const startClickSub$ = startClick$.subscribe(() => {
    snake.start();
    document.getElementById('startBtn').style.display = 'none';
    // document.getElementById('stopBtn').style.display = 'block';
});

// const stopClickSub$ = stopClick$.subscribe(() => {
//     snake.stop();
//     document.getElementById('startBtn').style.display = 'block';
//     document.getElementById('stopBtn').style.display = 'none';
// });

const domScore = document.getElementById('score');
snake.score$.subscribe(score => {
    domScore.innerHTML = score;
});

snake.endGame$.subscribe(() => {
    document.getElementById('startBtn').style.display = 'block';
})