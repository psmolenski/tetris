import {Block} from "./block";
import {Position} from "./position";
import * as _ from "lodash";
import {Color} from "../color";
import {Pixel} from "./pixel";

class Board {
  constructor(public geometry: Pixel[][]) {}

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

        if (!blockPixel.isFilled()) {
          return;
        }

        const boardPixel = newGeometry[boardRowIndex][boardColIndex];
        boardPixel.color = block.color;
        boardPixel.markAsFilled();
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
        .some((pixel:Pixel) => pixel.isFilled());
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
        .some((pixel:Pixel) => pixel.isFilled());
    });
  }


  isBlockCrossingBottomEdge(block: Block, position: Position) {
    if (position.y + block.height <= this.height) {
      return false;
    }

    const numberOfRowsOutsideBoard = position.y + block.height - this.height;

    return _(block.geometry)
      .takeRight(numberOfRowsOutsideBoard)
      .some((row: Pixel[]) => {
        return row.some((pixel: Pixel) => pixel.isFilled());
      });
  }


  isBlockColiding(block: Block, blockPosition: Position) {
    const boardChunk = this.geometry
      .slice(blockPosition.y, blockPosition.y + block.height)
      .map(row => row.slice(blockPosition.x, blockPosition.x + block.width));

    const flatBlock = _.flatten(block.geometry);
    const flatBoardChunk = _.flatten(boardChunk);

    return _.zip(flatBlock, flatBoardChunk).some(([blockPixel, boardPixel]) => blockPixel.isFilled() && boardPixel.isFilled());
  }

  isFull() {
    return this.geometry[0].some(pixel => pixel.isFilled());
  }

  getNumberOfFullRows() : number {
    return this.geometry.filter(row => row.every(pixel => pixel.isFilled())).length;
  }

  removeFullRows() : Board {
    const geometryWithoutFullRows = _.cloneDeep(this.geometry).filter(row => row.some(pixel => !pixel.isFilled()));
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

function createEmptyGeometry(width: number, height: number) : Pixel[][] {
  return _.range(height).map(() => _.range(width).map(() => new Pixel(Color.BOARD)));
}

export {Board};