import {NextBlockPreviewRenderer} from "./next-block-preview.renderer";
import {Game} from "../../domain/game";

class NextBlockPreviewController {
  private readonly game : Game;
  private readonly renderer: NextBlockPreviewRenderer;

  constructor(game: Game, canvasElement: HTMLCanvasElement){
    this.game = game;
    this.renderer = new NextBlockPreviewRenderer(canvasElement);

    this.game.blockProducer.nextBlockPreview$.subscribe(nextBlock => {
      this.renderer.render(nextBlock);
    })
  }
}

export {NextBlockPreviewController};