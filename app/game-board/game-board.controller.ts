import {CommandEmitter} from "../domain/command";
import {GameBoardRenderer} from "./game-board.renderer";
import {Game} from "../domain/game";
import {KeyboardCommandEmitter} from "./keyboard-command-emitter";

class GameBoardController {
  private readonly game: Game;
  private readonly renderer: GameBoardRenderer;
  private readonly commandEmitter: CommandEmitter;

  constructor(game: Game, canvasElement: HTMLCanvasElement) {
    this.game = game;
    this.renderer = new GameBoardRenderer(canvasElement);
    this.commandEmitter = new KeyboardCommandEmitter();

    this.game.state$.subscribe(newGameState => {
      this.renderer.render(newGameState);
    });

    this.commandEmitter.command$
      .subscribe(command => {
        this.game.sendCommand(command);
      });
  }

}

export {GameBoardController};