import {Block} from "../domain/block";
import {Canvas} from "../canvas";
import {Color} from "../color";
import {Position} from "../domain/position";

class NextBlockPreviewRenderer {
  private readonly canvas: Canvas;
  private readonly blockRenderer: BlockRenderer;
  private readonly blockSize: number = 10;

  constructor(canvasElement: HTMLCanvasElement){
    this.canvas = new Canvas(canvasElement, 1);
    this.blockRenderer = new BlockRenderer(this.canvas, this.blockSize);
  }

  render(block: Block) {
    this.clearCanvas();
    this.blockRenderer.render(block, this.getCenterPositionForBlock(block), block.color);
  }

  clearCanvas() {
    this.canvas.fillStyle = Color.BOARD;
    this.canvas.fillRect(0, 0, this.canvas.viewportWidth, this.canvas.viewportHeight);
  }

  getCenterPositionForBlock(block: Block) {
    const blockWidth = block.width * this.blockSize;
    const blockHeight = block.height * this.blockSize;
    const x = Math.floor((this.canvas.viewportWidth - blockWidth) / 2);
    const y = Math.floor((this.canvas.viewportHeight - blockHeight) / 2);

    return new Position(x, y);
  }
}
class BlockRenderer {
  constructor(private readonly canvas: Canvas, private readonly blockSize: number){}

  render(block: Block, blockPosition: Position, color: Color) {
    this.canvas.fillStyle = color;
    this.canvas.strokeStyle = Color.BOARD;
    this.canvas.lineWidth = 1;

    block.geometry.forEach((row, y) => {
      row.forEach((pixel, x) => {
        if (pixel.isFilled()) {
          this.canvas.strokeRect(blockPosition.x + (x * this.blockSize), blockPosition.y + (y * this.blockSize), this.blockSize, this.blockSize);
          this.canvas.fillRect(blockPosition.x + (x * this.blockSize), blockPosition.y + (y * this.blockSize), this.blockSize - 1, this.blockSize-1);
        }
      });
    });
  }
}

export {NextBlockPreviewRenderer};