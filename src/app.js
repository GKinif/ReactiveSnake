import Rx from 'rxjs/Rx';
import Canvas from './canvas';

require('../sass/styles.scss');

const canvas = new Canvas(document.getElementById('snake'));

for (let i = 0; i < 25; i++) {
    canvas.drawCell([i, i], "#FFA500");
}

canvas.drawCell([2, 3], "#00FF00");

document.getElementById('clearBtn').addEventListener('click', () => {
    canvas.clear();
});
