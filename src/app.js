import Rx from 'rxjs/Rx';
import Canvas from './canvas';

require('../sass/styles.scss');

const canvas = new Canvas(document.getElementById('snake'));

for (let i = 0; i < 50; i++) {
    canvas.drawCell([i, i]);
}
