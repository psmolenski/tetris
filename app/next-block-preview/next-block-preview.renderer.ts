import {Block} from "../domain/block";
import {BlockRenderer} from "../game-board/game-board.renderer";
import {Canvas} from "../canvas";
import {Color} from "../color";
import {Position} from "../domain/position";

class NextBlockPreviewRenderer {
  private readonly canvas: Canvas;
  private readonly blockRenderer: BlockRenderer;

  constructor(canvasElement: HTMLCanvasElement){
    this.canvas = new Canvas(canvasElement);
    this.blockRenderer = new BlockRenderer(this.canvas);
  }

  render(block: Block) {
    this.clearCanvas();
    this.blockRenderer.render(block, this.getCenterPositionForBlock(block), Color.ACTIVE_BLOCK);
  }

  clearCanvas() {
    this.canvas.fillStyle = Color.BOARD;
    this.canvas.fillRect(0, 0, this.canvas.viewportWidth, this.canvas.viewportHeight);
  }

  getCenterPositionForBlock(block: Block) {
    const x = Math.floor((this.canvas.viewportWidth - block.width) / 2);
    const y = Math.floor((this.canvas.viewportHeight - block.height) / 2);

    return new Position(x, y);
  }
}

export {NextBlockPreviewRenderer};