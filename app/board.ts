import {Block} from "./block";
import {Position} from "./position";
import * as _ from "lodash";

class Board {
  constructor(public geometry: number[][]) {}

  get width() : number {
    return this.geometry[0].length;
  }

  get height() : number {
    return this.geometry.length;
  }

  addBlock(block: Block, position: Position) : Board {
    const newGeometry = _.cloneDeep(this.geometry);

    _.times(block.height, blockRowIndex => {
      const boardRowIndex = position.y + blockRowIndex;
      _.times(block.width, blockColIndex => {
        const boardColIndex = position.x + blockColIndex;
        const blockPixel = block.geometry[blockRowIndex][blockColIndex];

        if (blockPixel === 0) {
          return;
        }

        const boardPixel = newGeometry[boardRowIndex][boardColIndex];
        newGeometry[boardRowIndex][boardColIndex] = boardPixel || blockPixel;
      });
    });

    return new Board(newGeometry);
  }

  isBlockFullyOnBoard(block: Block, position: Position) {

    if (this.isBlockCrossingLeftEdge(block, position)) {
      return false;
    }

    if (this.isBlockCrossingRightEdge(block, position)) {
      return false;
    }

    if (this.isBlockCrossingBottomEdge(block, position)) {
      return false;
    }

    return true;
  }

  isBlockCrossingLeftEdge(block: Block, position: Position) {
    if (position.x >= 0) {
      return false;
    }

    const numberOfColumnsOutsideBoard = Math.abs(position.x);

    return block.geometry.some(row => {
      return _(row)
        .take(numberOfColumnsOutsideBoard)
        .some((pixel:number) => pixel === 1);
    });

  }


  isBlockCrossingRightEdge(block: Block, position: Position) {
    if (position.x + block.width <= this.width) {
      return false;
    }

    const numberOfColumnsOutsideBoard = position.x + block.width - this.width;

    return block.geometry.some(row => {
      return _(row)
        .takeRight(numberOfColumnsOutsideBoard)
        .some((pixel:number) => pixel === 1);
    });
  }


  isBlockCrossingBottomEdge(block: Block, position: Position) {
    if (position.y + block.height <= this.height) {
      return false;
    }

    const numberOfRowsOutsideBoard = position.y + block.height - this.height;

    return _(block.geometry)
      .takeRight(numberOfRowsOutsideBoard)
      .some((row: number[]) => {
        return row.some((pixel: number) => pixel === 1);
      });
  }


  isBlockColiding(block: Block, blockPosition: Position) {
    const boardChunk = this.geometry
      .slice(blockPosition.y, blockPosition.y + block.height)
      .map(row => row.slice(blockPosition.x, blockPosition.x + block.width));

    const flatBlock = _.flatten(block.geometry);
    const flatBoardChunk = _.flatten(boardChunk);

    return _.zip(flatBlock, flatBoardChunk).some(([blockPixel, boardPixel]) => blockPixel === 1 && boardPixel === 1);
  }

  isFull() {
    return this.geometry[0].some(pixel => pixel === 1);
  }

  removeFullRows() : Board {
    const geometryWithoutFullRows = _.cloneDeep(this.geometry).filter(row => row.some(pixel => pixel === 0));
    const numberOfRemovedRows = this.height - geometryWithoutFullRows.length;
    const newRows = createEmptyGeometry(this.width, numberOfRemovedRows);
    const newGeometry = [...newRows, ...geometryWithoutFullRows];

    return new Board(newGeometry);
  }

  static createBoardWithSize(width: number, height: number) {
    const geometry = createEmptyGeometry(width, height);

    return new Board(geometry);
  }
}

function createEmptyGeometry(width: number, height: number) : number[][] {
  return Array(height).fill(0).map(() => Array(width).fill(0));
}

export {Board};