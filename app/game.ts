import {Block} from './block';
import {BlockProducer} from "./block-producer";
import {Position} from "./position";
import {Board} from "./board";
import {Renderer} from "./renderer";
import {Controller} from "./controller";
import {Command} from "./command";

class Game {
  private readonly blockProducer: BlockProducer;
  private readonly renderer: Renderer;
  private readonly controller: Controller;
  private activeBlock: Block;
  private activeBlockPosition: Position;
  private activeBlockSpeed: number;
  private board: Board;

  constructor(configuration: GameConfiguration) {
    this.blockProducer = configuration.blockProducer;
    this.renderer = configuration.renderer;
    this.controller = configuration.controller;
  }

  start() {
    this.init();
    this.gameStateLoop();
    this.renderingLoop();
  }

  init() {
    this.controller.getCommandStream()
      .filter(command => command === Command.MoveLeft)
      .subscribe(() => {
        if (this.canMoveActiveBlockLeft()) {
          this.moveActiveBlockLeft();
        }
      });

    this.controller.getCommandStream()
      .filter(command => command === Command.MoveRight)
      .subscribe(() => {
        if (this.canMoveActiveBlockRight()) {
          this.moveActiveBlockRight();
        }
      });

    this.controller.getCommandStream()
      .filter(command => command === Command.Drop)
      .subscribe(() => {
        this.dropActiveBlock();
      });

    this.controller.getCommandStream()
      .filter(command => command === Command.RotateClockwise)
      .subscribe(() => {
        if (this.canRotateActiveBlock()) {
          this.rotateActiveBlock();
        }
      });

    this.createNewBoard();
    this.addBlock();
  }

  createNewBoard() {
    this.board = new Board(this.renderer.getViewportWidth(), this.renderer.getViewportHeight());
  }

  gameStateLoop() {
    setTimeout(() => {
      this.updateGameState();
      this.gameStateLoop();
    }, this.activeBlockSpeed);
  }

  renderingLoop() {
    requestAnimationFrame(() => {
      this.render();
      this.renderingLoop();
    });
  }

  render() {
    this.renderer.render(this.activeBlock, this.activeBlockPosition, this.board);
  }

  updateGameState() {
    if (this.canMoveActiveBlockDown()) {
      this.moveActiveBlockDown();
      return;
    }

    this.addActiveBlockToBoard();
    this.removeFullRowsFromBoard();
    this.addBlock();
  }

  canMoveActiveBlockDown() {
    const newPosition = Position.moveDown(this.activeBlockPosition);

    return this.board.isBlockFullyOnBoard(this.activeBlock, newPosition) && !this.board.isBlockColiding(this.activeBlock, newPosition);
  }

  moveActiveBlockDown() {
    this.activeBlockPosition = Position.moveDown(this.activeBlockPosition);
  }

  canMoveActiveBlockRight() {
    const newPosition = Position.moveRight(this.activeBlockPosition);

    return this.board.isBlockFullyOnBoard(this.activeBlock, newPosition) && !this.board.isBlockColiding(this.activeBlock, newPosition);
  }

  moveActiveBlockRight() {
    this.activeBlockPosition = Position.moveRight(this.activeBlockPosition);
  }

  canMoveActiveBlockLeft() : Boolean {
    const newPosition = Position.moveLeft(this.activeBlockPosition);

    return this.board.isBlockFullyOnBoard(this.activeBlock, newPosition) && !this.board.isBlockColiding(this.activeBlock, newPosition);
  }

  moveActiveBlockLeft() {
    this.activeBlockPosition = Position.moveLeft(this.activeBlockPosition);
  }

  dropActiveBlock() {
    this.activeBlockSpeed = 16;
  }

  canRotateActiveBlock() {
    const rotatedBlock = Block.rotateClockwise(this.activeBlock);

    return this.board.isBlockFullyOnBoard(rotatedBlock, this.activeBlockPosition) && !this.board.isBlockColiding(rotatedBlock, this.activeBlockPosition)
  }

  rotateActiveBlock() {
    this.activeBlock = Block.rotateClockwise(this.activeBlock);
  }

  addBlock() {
    this.activeBlock = this.blockProducer.getNextBlock();
    this.activeBlockPosition = this.getStartPositionForBlock(this.activeBlock);
    this.activeBlockSpeed = 200;
  }

  addActiveBlockToBoard() {
    this.board.addBlock(this.activeBlock, this.activeBlockPosition);

    if (this.board.isFull()) {
      this.createNewBoard();
    }
  }

  getStartPositionForBlock(block: Block) : Position {
    const x = Math.floor((this.board.width - block.width) / 2);
    const y = 0;

    return new Position(x, y);
  }

  removeFullRowsFromBoard() {
    this.board.removeFullRows();
  }
}

interface GameConfiguration {
  renderer: Renderer;
  blockProducer: BlockProducer;
  controller: Controller;
}

export default Game;