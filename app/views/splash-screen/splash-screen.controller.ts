import {Router} from "../../router";
import template from "./splash-screen.template.html";


class SplashScreenController {
  static template = template;

  constructor(element: HTMLElement, router: Router) {
    const startBtn = <HTMLElement> element.querySelector('#game-start-btn');

    if (startBtn != null) {
      startBtn.style.display = 'block';
    }

    const startGame = function() {
      router.go('game-screen');
    };

    startBtn.addEventListener("click", startGame);
  }

}

export {SplashScreenController};