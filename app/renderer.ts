import {Block} from "./block";
import {Position} from "./position";
import {Board} from "./board";

interface Renderer {
  render(block: Block, blockPosition: Position, board: Board) : void;
  getViewportWidth() : number;
  getViewportHeight() : number;
}

class CanvasRenderer implements Renderer{
  private readonly canvas: HTMLCanvasElement;
  private readonly graphicContext: CanvasRenderingContext2D;
  private readonly scale: number = 10;
  private readonly blockRenderer: BlockRenderer;
  private readonly boardRenderer: BoardRenderer;
  private readonly viewportWidth: number;
  private readonly viewportHeight: number;


  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.graphicContext = <CanvasRenderingContext2D> canvas.getContext('2d');
    this.graphicContext.scale(this.scale, this.scale);

    this.viewportWidth = this.canvas.width / this.scale;
    this.viewportHeight = this.canvas.height / this.scale;

    this.blockRenderer = new BlockRenderer(canvas);
    this.boardRenderer = new BoardRenderer(canvas);
  }

  getViewportWidth() {
    return this.viewportWidth;
  }

  getViewportHeight() {
    return this.viewportHeight;
  }

  render(block: Block, blockPosition: Position, board: Board) {
    this.clearCanvas();
    this.blockRenderer.render(block, blockPosition);
    this.boardRenderer.render(board);
  }

  clearCanvas() {
    this.graphicContext.fillStyle = '#000';
    this.graphicContext.fillRect(0, 0, 30, 50);
  }
}

class BlockRenderer {
  private readonly graphicContext: CanvasRenderingContext2D;

  constructor(private readonly canvas: HTMLCanvasElement){
    this.graphicContext = <CanvasRenderingContext2D> canvas.getContext('2d');
  }

  render(block: Block, blockPosition: Position) {
    this.graphicContext.fillStyle = '#f00';

    block.geometry.forEach((row, y) => {
      row.forEach((pixel, x) => {
        if (pixel) {
          this.graphicContext.fillRect(blockPosition.x + x, blockPosition.y + y, 1, 1);
        }
      });
    });
  }
}

class BoardRenderer {
  private readonly graphicContext: CanvasRenderingContext2D;

  constructor(private readonly canvas: HTMLCanvasElement){
    this.graphicContext = <CanvasRenderingContext2D> canvas.getContext('2d');
  }

  render(board: Board) {
    this.graphicContext.fillStyle = '#0f0';

    board.geometry.forEach((row, y) => {
      row.forEach((pixel, x) => {
        if (pixel) {
          this.graphicContext.fillRect(x, y, 1, 1);
        }
      });
    });
  }
}

export {
  Renderer,
  CanvasRenderer,
  BoardRenderer,
  BlockRenderer
}