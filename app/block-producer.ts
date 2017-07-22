import * as _ from 'lodash';
import {Block, BlockGeometries} from "./block";

interface BlockProducer {
  getNextBlock() : Block;
}

class RandomBlockProducer implements BlockProducer {
  private readonly blockTypes : string[] = Object.keys(BlockGeometries);

  getNextBlock(): Block {
    return this.getRandomBlock();
  }

  getRandomBlock(): Block {
    const randomBlockType = _.sample(this.blockTypes);

    return Block.createBlockOfType(<string> randomBlockType);
  }

}

class SameBlockProducer implements BlockProducer {
  constructor(private readonly blockType: string) {}

  getNextBlock(): Block {
    return Block.createBlockOfType(this.blockType);
  }

}

export {
  BlockProducer,
  RandomBlockProducer,
  SameBlockProducer
};