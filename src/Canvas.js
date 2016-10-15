class Canvas {
    constructor(container) {
        this.container = container;
        this.cellSize = 20;
        this.maxX = parseInt(this.container.offsetWidth / this.cellSize, 10);
        this.maxY = parseInt(this.container.offsetHeight / this.cellSize, 10);

        console.log(`max pos => X: ${this.maxX} Y: ${this.maxY}`)

        this.ctx = this.container.getContext('2d');
        this.ctx.fillStyle = "#FFA500";
        this.ctx.strokeStyle = "#FFFFFF";
    }

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
}

export default Canvas;
