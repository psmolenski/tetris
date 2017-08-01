import {Game} from "../domain/game";

class CurrentScoreController {

  constructor(game: Game, container: HTMLDivElement) {
    game.state$.subscribe(state => {
      container.innerText = state.scores.current.toString();
    });
  }


}

export {CurrentScoreController};