import * as _ from "lodash";

class Block {
  public geometry: number[][];
  private squareGeometry: number[][]; //square geometry is needed only for rotation. For everything else use geometry

  constructor(squareGeometry: number[][]) {
    this.squareGeometry = squareGeometry;
    this.geometry = this.removeEmptyRowsAndColumns(squareGeometry);
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
    return new Block(rotatedGeometry);
  }

  private removeEmptyRowsAndColumns(geometry: number[][]) : number[][] {
    const geometryWithoutEmptyRows = geometry.filter(row => row.some(pixel => pixel === 1));
    const geometryWithoutEmptyColumns = _.zip(...geometryWithoutEmptyRows).filter(col => col.some(pixel => pixel === 1));

    return _.unzip(geometryWithoutEmptyColumns);
  }

  static createBlockOfType(type: string) {
    return new Block(BlockGeometries[type]);
  }

}

const BlockGeometries : {[name: string]: number[][]} = {
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  I: [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0]
  ],
  J: [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0]
  ],
  L: [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 0]
  ],
  O: [
    [1, 1],
    [1, 1]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ]
};


export {
  Block,
  BlockGeometries
}