import * as _ from "lodash";

class Block {
  public geometry: number[][];

  constructor(geometry: number[][]) {
    this.geometry = geometry;
  }

  get height() {
    return this.geometry.length;
  }

  get width() {
    return this.geometry[0].length;
  }

  static rotateClockwise(block: Block) {
    const reversedGeometry = _.clone(block.geometry).reverse();
    const rotatedGeometry = _.zip(...reversedGeometry);
    return new Block(rotatedGeometry);
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