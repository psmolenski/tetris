import * as _ from "lodash";
import {Color} from "../utils/color";
import {Pixel} from "./pixel";

class Block {
  public color: Color;
  public geometry: Pixel[][];
  private squareGeometry: Pixel[][]; //square geometry is needed only for rotation. For everything else use geometry

  constructor(squareGeometry: Pixel[][], color: Color) {
    this.squareGeometry = squareGeometry;
    this.geometry = this.removeEmptyRowsAndColumns(this.squareGeometry);
    this.color = color;
  }

  get height() {
    return this.geometry.length;
  }

  get width() {
    return this.geometry[0].length;
  }

  rotateClockwise() {
    const reversedGeometry = _.clone(this.squareGeometry).reverse();
    const rotatedGeometry = _.zip(...reversedGeometry);
    return new Block(rotatedGeometry, this.color);
  }

  private removeEmptyRowsAndColumns(geometry: Pixel[][]) : Pixel[][] {
    const geometryWithoutEmptyRows = geometry.filter(row => row.some(pixel => pixel.isFilled()));
    const geometryWithoutEmptyColumns = _.zip(...geometryWithoutEmptyRows).filter(col => col.some(pixel => pixel.isFilled()));

    return _.unzip(geometryWithoutEmptyColumns);
  }

  static createBlockOfType(type: string, color: Color) {
    return new Block(BlockGeometries[type], color);
  }

  static convertNumbersToPixels(geometry: number[][]) {
    return geometry.map(row => row.map(pixel => new Pixel(Color.BLOCK_1, pixel === 1)));
  }

}

const BlockGeometries : {[name: string]: Pixel[][]} = {
  T: Block.convertNumbersToPixels([
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ]),
  I: Block.convertNumbersToPixels([
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ]),
  J: Block.convertNumbersToPixels([
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
  ]),
  L: Block.convertNumbersToPixels([
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 0]
  ]),
  O: Block.convertNumbersToPixels([
    [1, 1],
    [1, 1]
  ]),
  Z: Block.convertNumbersToPixels([
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ]),
  S: Block.convertNumbersToPixels([
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ])
};


export {
  Block,
  BlockGeometries
}