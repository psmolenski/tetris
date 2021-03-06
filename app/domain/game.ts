import {BlockProducer, RandomBlockProducer} from "./block-producer";
import {GameState} from "./game-state";
import {BehaviorSubject, Subject} from "@reactivex/rxjs";
import {Command} from "./command";

class Game {
  public blockProducer: BlockProducer;
  private _state: GameState;

  private stateSubject: Subject<GameState>;
  private nextStateUpdateHandle: number;

  constructor(public readonly boardWidth: number, public readonly boardHeight: number) {
    this.blockProducer = new RandomBlockProducer();
    this._state = this.createGameState(boardWidth, boardHeight);
    this.stateSubject = new BehaviorSubject(this._state);
  }

  get state$() {
    return this.stateSubject.asObservable();
  }

  private get state() {
    return this._state;
  }

  private set state(newState: GameState) {
    this.stateSubject.next(newState);
    this._state = newState;
  }

  start() {
    this.gameStateLoop();
  }

  stop() {
    clearTimeout(this.nextStateUpdateHandle);
    this.state = this.state.endGame();
  }

  reset() {
    this.clearBoard();
  }

  sendCommand(command: Command) {
    switch(command) {
      case Command.MoveLeft:

        if (this.state.canMoveActiveBlockLeft()) {
          this.state = this.state.moveActiveBlockLeft();
        }

        break;

      case Command.MoveRight:

        if (this.state.canMoveActiveBlockRight()) {
          this.state = this.state.moveActiveBlockRight();
        }

        break;

      case Command.RotateClockwise:

        if (this.state.canRotateActiveBlock()) {
          this.state = this.state.rotateActiveBlock();
        }

        break;

      case Command.Drop:
        this.state = this.state.dropActiveBlock();
        break;
    }
  }

  private createGameState(boardWidth: number, boardHeight: number) {
    const firstBlock = this.blockProducer.getNextBlock();
    return GameState.createInitialState(firstBlock, boardWidth, boardHeight);
  }

  private gameStateLoop() {
    this.nextStateUpdateHandle = setTimeout(() => {
      this.updateGameState();

      if (this.state.board.isFull()) {
        this.stop();
      } else {
        this.gameStateLoop();
      }

    }, this.state.activeBlock.speed);
  }

  private updateGameState() {
    if (this.state.canMoveActiveBlockDown()) {
      this.state = this.state.moveActiveBlockDown();
      return;
    }

    this.addActiveBlockToBoard();
    this.removeFullRowsFromBoard();

    if (!this.state.board.isFull()) {
      this.addNewActiveBlock();
    }
  }

  private addActiveBlockToBoard() {
    this.state = this.state.addActiveBlockToBoard();
  }

  private addNewActiveBlock() {
    const newBlock = this.blockProducer.getNextBlock();
    this.state = this.state.addNewActiveBlock(newBlock);
  }

  private removeFullRowsFromBoard() {
    const numberOfFullRows = this.state.board.getNumberOfFullRows();

    if (numberOfFullRows === 0) {
      return;
    }

    this.state = this.state.removeFullRowsFromBoard().addScores(numberOfFullRows);
  }

  private clearBoard() {
    this.state = this.state.clearBoard();
  }
}

const game = new Game(15, 24);
export {
  game,
  Game
};