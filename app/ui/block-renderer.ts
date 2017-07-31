import {Canvas} from "../canvas";
import {Block} from "../domain/block";
import {Color} from "../color";
import {Pixel} from "../domain/pixel";
import {Position} from "../domain/position";
import {PixelRenderer} from "./pixel-renderer";

class BlockRenderer {
  private readonly pixelRenderer: PixelRenderer;

  constructor(private readonly canvas: Canvas){
    this.pixelRenderer = new PixelRenderer(canvas);
  }

  render(block: Block, blockPosition: Position, color: Color) {
    block.geometry.forEach((row, y) => {
      row.forEach((pixel, x) => {
        if (pixel.isFilled()) {
          const renderedX = blockPosition.x  + (x * Pixel.size);
          const renderedY = blockPosition.y + (y * Pixel.size);

          this.pixelRenderer.render(color, new Position(renderedX, renderedY));
        }
      });
    });
  }
}

export {BlockRenderer};