import Rx from 'rxjs/Rx';
import Snake from './Snake';

require('../sass/styles.scss');

const snake = new Snake(document.getElementById('snake'));

const startClick$ = Rx.Observable.fromEvent(document.getElementById('startBtn'), 'click');
const stopClick$ = Rx.Observable.fromEvent(document.getElementById('stopBtn'), 'click');

const startClickSub$ = startClick$.subscribe(() => {
    snake.start();
});

const stopClickSub$ = stopClick$.subscribe(() => {
    snake.stop();
});
