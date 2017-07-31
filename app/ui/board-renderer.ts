import {Canvas} from "../canvas";
import {Board} from "../domain/board";
import {PixelPosition, PixelRenderer} from "./pixel-renderer";
import {Position} from "../domain/position";

class BoardRenderer {
  private readonly pixelRenderer: PixelRenderer;

  constructor(private readonly canvas: Canvas){
    this.pixelRenderer = new PixelRenderer(canvas);
  }

  render(board: Board) {
    board.geometry.forEach((row, y) => {
      row.forEach((pixel, x) => {
        if (pixel.isFilled()) {
          const position = new Position(x, y);

          this.pixelRenderer.render(pixel.color, new PixelPosition(position));
        }
      });
    });
  }
}

export {BoardRenderer};