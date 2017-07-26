import {Block} from "../domain/block";
import {Position} from "../domain/position";
import {Board} from "../domain/board";
import {Color} from "../color";
import {GameState} from "../domain/game-state";
import {Canvas} from "../canvas";

class GameBoardRenderer {
  private readonly canvas: Canvas;
  private readonly blockRenderer: BlockRenderer;
  private readonly boardRenderer: BoardRenderer;
  private scheduledRenderHandle : number | null;


  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = new Canvas(canvasElement);
    this.blockRenderer = new BlockRenderer(this.canvas);
    this.boardRenderer = new BoardRenderer(this.canvas);
  }

  render(gameState: GameState) {
    if (this.scheduledRenderHandle !== null) {
      cancelAnimationFrame(this.scheduledRenderHandle);
    }

    this.scheduledRenderHandle = requestAnimationFrame(() => {
      this.clearCanvas();
      this.blockRenderer.render(gameState.activeBlock.block, gameState.finalActiveBlockPosition, Color.ACTIVE_BLOCK_PROJECTION);
      this.blockRenderer.render(gameState.activeBlock.block, gameState.activeBlock.position, Color.ACTIVE_BLOCK);
      this.boardRenderer.render(gameState.board, Color.BOARD_BLOCK);

      this.scheduledRenderHandle = null;
    });

  }

  clearCanvas() {
    this.canvas.fillStyle = Color.BOARD;
    this.canvas.fillRect(0, 0, this.canvas.viewportWidth, this.canvas.viewportHeight);
  }
}

class BlockRenderer {
  constructor(private readonly canvas: Canvas){}

  render(block: Block, blockPosition: Position, color: Color) {
    this.canvas.fillStyle = color;

    block.geometry.forEach((row, y) => {
      row.forEach((pixel, x) => {
        if (pixel) {
          this.canvas.fillRect(blockPosition.x + x, blockPosition.y + y, 1, 1);
        }
      });
    });
  }
}

class BoardRenderer {
  constructor(private readonly canvas: Canvas){}

  render(board: Board, color: Color) {
    this.canvas.fillStyle = color;

    board.geometry.forEach((row, y) => {
      row.forEach((pixel, x) => {
        if (pixel) {
          this.canvas.fillRect(x, y, 1, 1);
        }
      });
    });
  }
}

export {
  GameBoardRenderer,
  BoardRenderer,
  BlockRenderer
}