import {CommandEmitter} from "../domain/command";
import {GameBoardRenderer} from "./game-board.renderer";
import {Game} from "../domain/game";
import {KeyboardCommandEmitter} from "./keyboard-command-emitter";
import {Pixel} from "../domain/pixel";
import {Observable} from "@reactivex/rxjs";
import {ButtonsCommandEmitter} from "./buttons-command-emitter";

class GameBoardController {
  private readonly game: Game;
  private readonly renderer: GameBoardRenderer;

  constructor(game: Game, canvasElement: HTMLCanvasElement) {
    this.game = game;

    canvasElement.width = this.game.boardWidth * Pixel.size;
    canvasElement.height = this.game.boardHeight * Pixel.size;

    this.renderer = new GameBoardRenderer(canvasElement);

    this.game.state$.subscribe(newGameState => {
      this.renderer.render(newGameState);
    });

    Observable.of(<CommandEmitter> new KeyboardCommandEmitter(), <CommandEmitter> new ButtonsCommandEmitter())
      .flatMap(commandEmitter => commandEmitter.command$)
      .subscribe(command => {
        this.game.sendCommand(command);
      });


  }

}

export {GameBoardController};