class Canvas {
    constructor(container) {
        this.container = container;
        this.cellSize = 20;
        this.maxX = parseInt(this.container.offsetWidth / this.cellSize, 10);
        this.maxY = parseInt(this.container.offsetHeight / this.cellSize, 10);

        console.log(`max pos => X: ${this.maxX} Y: ${this.maxY}`)

        this.ctx = this.container.getContext('2d');
        this.ctx.strokeStyle = "#FFFFFF";
    }

    setCellColor(color) {
        this.ctx.fillStyle = color;
    };

    setStrokeColor(color) {
        this.ctx.strokeStyle = color;
    };

    drawCell(position) {
        const [x, y] = position;
        if (x > this.maxX || y > this.maxY) {
            console.log(`Out of range x:${x} y:${y}`);
            return;
        }

        const posX = x * this.cellSize;
        const posY = y * this.cellSize;

        this.ctx.fillRect(
            posX,
            posY,
            this.cellSize,
            this.cellSize
        );

        this.ctx.strokeRect(
            posX,
            posY,
            this.cellSize,
            this.cellSize
        );
    }

    clear() {
        this.ctx.clearRect(0, 0, this.container.offsetWidth, this.container.offsetHeight);
    }
}

export default Canvas;
