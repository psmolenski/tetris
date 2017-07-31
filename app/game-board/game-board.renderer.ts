import {Color} from "../color";
import {GameState} from "../domain/game-state";
import {Canvas} from "../canvas";
import {BlockRenderer} from "../ui/block-renderer";
import {BoardRenderer} from "../ui/board-renderer";
import {PixelPosition} from "../ui/pixel-renderer";

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
      this.blockRenderer.render(gameState.activeBlock.block, new PixelPosition(gameState.finalActiveBlockPosition), Color.ACTIVE_BLOCK_PROJECTION);
      this.blockRenderer.render(gameState.activeBlock.block, new PixelPosition(gameState.activeBlock.position), gameState.activeBlock.block.color);
      this.boardRenderer.render(gameState.board);

      this.scheduledRenderHandle = null;
    });

  }

  clearCanvas() {
    this.canvas.fillStyle = Color.BOARD;
    this.canvas.fillRect(0, 0, this.canvas.viewportWidth, this.canvas.viewportHeight);
  }
}

export {
  GameBoardRenderer
}