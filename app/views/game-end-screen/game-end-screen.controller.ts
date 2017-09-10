import {game} from "../../domain/game";
import {Router} from "../../ui/router";
import template from './game-end-screen.template.html';
import {FromEventObservable} from "@reactivex/rxjs/dist/cjs/observable/FromEventObservable";

class GameEndScreenController {
  static template = template;

  constructor(element: HTMLElement, router: Router, params: any) {
    const gameResult = <HTMLElement> element.querySelector('#game-result');

    gameResult.innerText = params.score;

    const restartBtn = <HTMLElement> element.querySelector("#game-restart-btn");

    FromEventObservable.create(restartBtn, 'click')
      .first()
      .subscribe(() => {
        game.reset();
        router.go('game-screen');
      });
  }
}

export {GameEndScreenController};