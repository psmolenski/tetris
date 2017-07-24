import {Board} from "./board";
import {ActiveBlock} from "./active-block";
import {Block} from "./block";
import {Position} from "./position";

class GameState {
  constructor(public readonly activeBlock: ActiveBlock,
              public readonly finalActiveBlockPosition: Position,
              public readonly board: Board) {
  }

  canMoveActiveBlockDown() {
    const newPosition = Position.moveDown(this.activeBlock.position);

    return this.isBlockPositionAvailable(this.activeBlock.block, newPosition);
  }

  moveActiveBlockDown() {
    const position = Position.moveDown(this.activeBlock.position);
    const activeBlock = this.activeBlock.updatePosition(position);

    return this.updateActiveBlock(activeBlock);
  }

  canMoveActiveBlockRight() {
    const newPosition = Position.moveRight(this.activeBlock.position);

    return this.isBlockPositionAvailable(this.activeBlock.block, newPosition);
  }

  moveActiveBlockRight() {
    const position = Position.moveRight(this.activeBlock.position);
    const activeBlock = this.activeBlock.updatePosition(position);

    return this.updateActiveBlock(activeBlock);
  }

  canMoveActiveBlockLeft(): Boolean {
    const newPosition = Position.moveLeft(this.activeBlock.position);

    return this.isBlockPositionAvailable(this.activeBlock.block, newPosition);
  }

  moveActiveBlockLeft() {
    const position = Position.moveLeft(this.activeBlock.position);
    const activeBlock = this.activeBlock.updatePosition(position);

    return this.updateActiveBlock(activeBlock);
  }

  canRotateActiveBlock() {
    const rotatedBlock = Block.rotateClockwise(this.activeBlock.block);

    return this.isBlockPositionAvailable(rotatedBlock, this.activeBlock.position);
  }

  rotateActiveBlock() {
    const block = Block.rotateClockwise(this.activeBlock.block);
    const activeBlock = this.activeBlock.updateBlock(block);

    return this.updateActiveBlock(activeBlock);
  }

  dropActiveBlock() {
    const activeBlock = this.activeBlock.updateSpeed(5);

    return this.updateActiveBlock(activeBlock);
  }

  isBlockPositionAvailable(block: Block, position: Position) {
    return isBlockPositionAvailable(block, position, this.board);
  }

  addActiveBlockToBoard() {
    const board = this.board.addBlock(this.activeBlock.block, this.activeBlock.position);

    return this.updateBoard(board);
  }

  removeFullRowsFromBoard() {
    const board = this.board.removeFullRows();

    return this.updateBoard(board);
  }

  addNewActiveBlock(newBlock: Block) {
    const position = getStartPositionForBlock(newBlock, this.board);
    const speed = 200;
    const activeBlock = new ActiveBlock(newBlock, position, speed);

    return this.updateActiveBlock(activeBlock);
  }

  clearBoard() {
    const board = Board.createBoardWithSize(this.board.width, this.board.height);

    return this.updateBoard(board);
  }

  updateActiveBlock(newActiveBlock: ActiveBlock): GameState {
    const newFinalActiveBlockPosition = getFinalPositionForBlock(newActiveBlock.block, newActiveBlock.position, this.board);
    return new GameState(newActiveBlock, newFinalActiveBlockPosition, this.board);
  }

  updateBoard(newBoard: Board) {
    return new GameState(this.activeBlock, this.finalActiveBlockPosition, newBoard);
  }

  static createInitialState(firstBlock: Block, board: Board): GameState {
    const position = getStartPositionForBlock(firstBlock, board);
    const finalPosition = getFinalPositionForBlock(firstBlock, position, board);
    const speed = 200;
    const activeBlock = new ActiveBlock(firstBlock, position, speed);

    return new GameState(activeBlock, finalPosition, board);
  }

}

function getStartPositionForBlock(block: Block, board: Board): Position {
  const x = Math.floor((board.width - block.width) / 2);
  const y = 0;

  return new Position(x, y);
}

function getFinalPositionForBlock(block: Block, position: Position, board: Board) {
  let currentPosition = position;
  let nextPosition = currentPosition;

  while (isBlockPositionAvailable(block, nextPosition, board)) {
    currentPosition = nextPosition;
    nextPosition = Position.moveDown(currentPosition);
  }

  return currentPosition;
}

function isBlockPositionAvailable(block: Block, position: Position, board: Board) {
  return board.isBlockFullyOnBoard(block, position) && !board.isBlockColiding(block, position);
}

export {GameState};