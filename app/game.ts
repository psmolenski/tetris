import {BlockProducer} from "./block-producer";
import {Renderer} from "./renderer";
import {Controller} from "./controller";
import {Command} from "./command";
import {GameState} from "./game-state";

class Game {
  private readonly blockProducer: BlockProducer;
  private readonly renderer: Renderer;
  private readonly controller: Controller;
  private _state: GameState;

  constructor(configuration: GameConfiguration) {
    this.blockProducer = configuration.blockProducer;
    this.renderer = configuration.renderer;
    this.controller = configuration.controller;
    this.state = this.createInitialState();
  }

  get state() : GameState {
    return this._state;
  }

  set state(newState: GameState) {
    if (this._state === newState) {
      return;
    }

    this._state = newState;
    this.render();
  }

  createInitialState() {
    const boardWidth = this.renderer.getViewportWidth();
    const boardHeight = this.renderer.getViewportHeight();
    const firstBlock = this.blockProducer.getNextBlock();

    return GameState.createInitialState(firstBlock, boardWidth, boardHeight);
  }

  start() {
    this.init();
    this.gameStateLoop();
  }

  init() {
    this.controller.getCommandStream()
      .filter(command => command === Command.MoveLeft)
      .subscribe(() => {
        if (this.state.canMoveActiveBlockLeft()) {
          this.state = this.state.moveActiveBlockLeft();
        }
      });

    this.controller.getCommandStream()
      .filter(command => command === Command.MoveRight)
      .subscribe(() => {
        if (this.state.canMoveActiveBlockRight()) {
          this.state = this.state.moveActiveBlockRight();
        }
      });

    this.controller.getCommandStream()
      .filter(command => command === Command.Drop)
      .subscribe(() => {
        this.state = this.state.dropActiveBlock();
      });

    this.controller.getCommandStream()
      .filter(command => command === Command.RotateClockwise)
      .subscribe(() => {
        if (this.state.canRotateActiveBlock()) {
          this.state = this.state.rotateActiveBlock();
        }
      });

  }

  gameStateLoop() {
    setTimeout(() => {
      this.updateGameState();
      this.gameStateLoop();
    }, this.state.activeBlock.speed);
  }

  render() {
    this.renderer.render(this.state);
  }

  updateGameState() {
    if (this.state.canMoveActiveBlockDown()) {
      this.state = this.state.moveActiveBlockDown();
      return;
    }

    this.addActiveBlockToBoard();
    this.removeFullRowsFromBoard();

    if (this.state.board.isFull()) {
      this.clearBoard();
    }

    this.addNewActiveBlock();
  }

  addActiveBlockToBoard() {
    this.state = this.state.addActiveBlockToBoard();
  }

  addNewActiveBlock() {
    const newBlock = this.blockProducer.getNextBlock();
    this.state = this.state.addNewActiveBlock(newBlock);
  }

  removeFullRowsFromBoard() {
    this.state = this.state.removeFullRowsFromBoard();
  }

  clearBoard() {
    this.state = this.state.clearBoard();
  }

}

interface GameConfiguration {
  renderer: Renderer;
  blockProducer: BlockProducer;
  controller: Controller;
}

export default Game;