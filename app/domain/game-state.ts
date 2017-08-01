import {Board} from "./board";
import {ActiveBlock} from "./active-block";
import {Block} from "./block";
import {Position} from "./position";
import {Scores} from "./scores";

class GameState {
  public readonly activeBlock: ActiveBlock;
  public readonly board: Board;
  public readonly finalActiveBlockPosition: Position;
  public readonly scores: Scores;

  constructor(block: ActiveBlock | Block, board: Board, finalActiveBlockPosition?: Position, scores?: Scores) {
    this.board = board;

    if (block instanceof ActiveBlock) {
      this.activeBlock = block;
    } else {
      this.activeBlock = this.createNewActiveBlock(block);
    }

    if (finalActiveBlockPosition === undefined) {
      this.finalActiveBlockPosition = this.getFinalPositionForBlock(this.activeBlock.block, this.activeBlock.position);
    } else {
      this.finalActiveBlockPosition = finalActiveBlockPosition;
    }

    if (scores === undefined) {
      this.scores = new Scores();
    } else {
      this.scores = scores;
    }
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
    const rotatedBlock = this.activeBlock.block.rotateClockwise();

    return this.isBlockPositionAvailable(rotatedBlock, this.activeBlock.position);
  }

  rotateActiveBlock() {
    const block = this.activeBlock.block.rotateClockwise();
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

  getFinalPositionForBlock(block: Block, position: Position) {
    return getFinalPositionForBlock(block, position, this.board);
  }

  addActiveBlockToBoard() {
    const board = this.board.addBlock(this.activeBlock.block, this.activeBlock.position);

    return this.updateBoard(board);
  }

  removeFullRowsFromBoard() {
    const board = this.board.removeFullRows();

    return this.updateBoard(board);
  }

  createNewActiveBlock(block: Block) {
    const position = getStartPositionForBlock(block, this.board);
    const speed = 200;

    return new ActiveBlock(block, position, speed);
  }

  addNewActiveBlock(newBlock: Block) {
    const newActiveBlock = this.createNewActiveBlock(newBlock);

    return this.updateActiveBlock(newActiveBlock);
  }

  clearBoard() {
    const board = Board.createBoardWithSize(this.board.width, this.board.height);

    return this.updateBoard(board);
  }

  addScores(numberOfRemovedRows: number) {
    const numberOfRemovedPixels = numberOfRemovedRows * this.board.width;
    const newScores = this.scores.add(numberOfRemovedPixels);

    return this.updateScores(newScores);
  }

  updateActiveBlock(newActiveBlock: ActiveBlock): GameState {
    const newFinalActiveBlockPosition = this.getFinalPositionForBlock(newActiveBlock.block, newActiveBlock.position);
    return new GameState(newActiveBlock, this.board, newFinalActiveBlockPosition, this.scores);
  }

  updateBoard(newBoard: Board) {
    return new GameState(this.activeBlock, newBoard, this.finalActiveBlockPosition, this.scores);
  }

  updateScores(newScores: Scores): GameState {
    return new GameState(this.activeBlock, this.board, this.finalActiveBlockPosition, newScores);
  }

  static createInitialState(firstBlock: Block, boardWidth: number, boardHeight: number): GameState {
    const board = Board.createBoardWithSize(boardWidth, boardHeight);

    return new GameState(firstBlock, board);
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