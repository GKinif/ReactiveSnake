class Canvas {
    /**
     * Creates an instance of Canvas.
     * 
     * @param {Node} container
     * 
     * @memberOf Canvas
     */
    constructor(container) {
        this.container = container;
        this.cellSize = 20;
        this.maxX = Math.floor(this.container.offsetWidth / this.cellSize);
        this.maxY = Math.floor(this.container.offsetHeight / this.cellSize);

        console.log(`max pos => X: ${this.maxX} Y: ${this.maxY}`)

        this.ctx = this.container.getContext('2d');
        this.ctx.strokeStyle = "#FFFFFF";
    }

    /**
     * Set the fill color of cell created by drawCell
     * 
     * @param {String} color
     * 
     * @memberOf Canvas
     */
    setCellColor(color) {
        this.ctx.fillStyle = color;
    };

    /**
     * Set the stroke color of cell created by drawCell
     * 
     * @param {String} color
     * 
     * @memberOf Canvas
     */
    setStrokeColor(color) {
        this.ctx.strokeStyle = color;
    };

    /**
     * draw a suare cell at the position [x, y]
     * [x, y] are not real dom position but an integer
     * representing the position of a cell of size this.cellSize
     * 
     * @param {Array} position
     * 
     * @memberOf Canvas
     */
    drawCell(position) {
        const [x, y] = position;

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

    /**
     * Clear the canva
     * 
     * @memberOf Canvas
     */
    clear() {
        this.ctx.clearRect(0, 0, this.container.offsetWidth, this.container.offsetHeight);
    }
}

export default Canvas;
