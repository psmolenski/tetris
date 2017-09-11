import {Block} from "../../domain/block";
import {Canvas} from "../../canvas";
import {Color} from "../../color";
import {Position} from "../../domain/position";
import {Pixel} from "../../domain/pixel";
import {BlockRenderer} from "../../ui/block-renderer";

class NextBlockPreviewRenderer {
  private readonly canvas: Canvas;
  private readonly blockRenderer: BlockRenderer;

  constructor(canvasElement: HTMLCanvasElement){
    this.canvas = new Canvas(canvasElement);
    this.blockRenderer = new BlockRenderer(this.canvas);
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
    const blockWidth = block.width * Pixel.size;
    const blockHeight = block.height * Pixel.size;
    const x = Math.floor((this.canvas.viewportWidth - blockWidth) / 2);
    const y = Math.floor((this.canvas.viewportHeight - blockHeight) / 2);

    return new Position(x, y);
  }
}

export {NextBlockPreviewRenderer};