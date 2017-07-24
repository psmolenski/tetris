import {Block} from "./block";
import {Position} from "./position";
import {Board} from "./board";
import {Color} from "./color";
import {GameState} from "./game-state";

interface Renderer {
  render(gameState: GameState) : void;
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

  render(gameState: GameState) {
    this.clearCanvas();
    this.blockRenderer.render(gameState.activeBlock.block, gameState.finalActiveBlockPosition, Color.ACTIVE_BLOCK_PROJECTION);
    this.blockRenderer.render(gameState.activeBlock.block, gameState.activeBlock.position, Color.ACTIVE_BLOCK);
    this.boardRenderer.render(gameState.board, Color.BOARD_BLOCK);
  }

  clearCanvas() {
    this.graphicContext.fillStyle = Color.BOARD;
    this.graphicContext.fillRect(0, 0, 30, 50);
  }
}

class BlockRenderer {
  private readonly graphicContext: CanvasRenderingContext2D;

  constructor(private readonly canvas: HTMLCanvasElement){
    this.graphicContext = <CanvasRenderingContext2D> canvas.getContext('2d');
  }

  render(block: Block, blockPosition: Position, color: Color) {
    this.graphicContext.fillStyle = color;

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

  render(board: Board, color: Color) {
    this.graphicContext.fillStyle = color;

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