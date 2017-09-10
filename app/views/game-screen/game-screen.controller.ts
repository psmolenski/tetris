import {NextBlockPreviewController} from "../../next-block-preview/next-block-preview.controller";
import {CurrentScoreController} from "../../current-score/current-score.controller";
import {GameBoardController} from "../../game-board/game-board.controller";
import {game} from "../../domain/game";
import template from "./game-screen.template.html";
import {Observable, Subscription} from "@reactivex/rxjs";
import {CommandEmitter} from "../../domain/command";
import {KeyboardCommandEmitter} from "../../game-board/keyboard-command-emitter";
import {ButtonsCommandEmitter} from "../../game-board/buttons-command-emitter";
import {Router} from "../../ui/router";
import {GameState} from "../../domain/game-state";

class GameScreenController {
  static template = template;

  private readonly commandEmitterSubscription: Subscription;

  constructor(element: HTMLElement, router: Router) {
    const gameBoardCanvas = <HTMLCanvasElement> element.querySelector('#gameCanvas');
    const gameBoardController = new GameBoardController(game, gameBoardCanvas);

    const nextBlockPreviewCanvas = <HTMLCanvasElement> element.querySelector('#nextBlockPreviewCanvas');
    const nextBlockPreviewController = new NextBlockPreviewController(game, nextBlockPreviewCanvas);

    const currentScoreElement = <HTMLDivElement> element.querySelector("#currentScore");
    const currentScoreController = new CurrentScoreController(game, currentScoreElement);


    this.commandEmitterSubscription = Observable.of(<CommandEmitter> new KeyboardCommandEmitter(element), <CommandEmitter> new ButtonsCommandEmitter(element))
      .flatMap(commandEmitter => commandEmitter.command$)
      .subscribe(command => {
        game.sendCommand(command);
      });

    game.state$
      .first(state => state.isEnded)
      .subscribe((state: GameState) => {
        router.go('game-end-screen', {score: state.scores.current});
      });

    game.start();

  }

  dispose() {
    this.commandEmitterSubscription.unsubscribe();
  }
}

export {GameScreenController};