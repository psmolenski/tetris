import {Canvas} from "../canvas";
import {Pixel} from "../domain/pixel";
import {Position} from "../domain/position";
import {Color} from "../color";

class PixelRenderer {
  constructor(private readonly canvas: Canvas){}

  render(color: Color, position: Position) {
    this.canvas.fillStyle = color;
    this.canvas.strokeStyle = Pixel.strokeColor;
    this.canvas.lineWidth = Pixel.strokeWidth;

    this.canvas.strokeRect(position.x, position.y, Pixel.size, Pixel.size);
    this.canvas.fillRect(position.x + Pixel.strokeWidth, position.y + Pixel.strokeWidth, Pixel.size - Pixel.strokeWidth, Pixel.size - Pixel.strokeWidth);
  }
}

class PixelPosition extends Position {
  constructor(position: Position) {
    super(position.x * Pixel.size, position.y * Pixel.size);
  }
}

export {
  PixelRenderer,
  PixelPosition
};