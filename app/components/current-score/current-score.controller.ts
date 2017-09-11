import {Game} from "../../domain/game";
import * as _ from "lodash";

class CurrentScoreController {

  constructor(game: Game, container: HTMLDivElement) {
    game.state$.subscribe(state => {
      container.innerText = _.padStart(state.scores.current.toString(), 9, '0');
    });
  }


}

export {CurrentScoreController};