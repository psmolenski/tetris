import {GameBoardRenderer} from "./game-board.renderer";
import {Game} from "../../domain/game";
import {Pixel} from "../../domain/pixel";

class GameBoardController {
  private readonly game: Game;
  private readonly renderer: GameBoardRenderer;


  constructor(game: Game, canvasElement: HTMLCanvasElement) {
    this.game = game;

    canvasElement.width = this.game.boardWidth * Pixel.size;
    canvasElement.height = this.game.boardHeight * Pixel.size;

    this.renderer = new GameBoardRenderer(canvasElement);

    this.game.state$
      .takeWhile(state => !state.isEnded)
      .subscribe(newGameState => {
        this.renderer.render(newGameState);
      });

  }
}

export {GameBoardController};