import * as _ from 'lodash';
import {Block, BlockGeometries} from "./block";
import {BehaviorSubject, Observable, Subject} from "@reactivex/rxjs";
import {Color} from "../utils/color";

const BLOCK_COLORS: Color[] = [
  Color.BLOCK_1,
  Color.BLOCK_2,
  Color.BLOCK_3,
  Color.BLOCK_4,
  Color.BLOCK_5
];

interface BlockProducer {
  readonly nextBlockPreview$: Observable<Block>;
  getNextBlock() : Block;
}

class RandomBlockProducer implements BlockProducer {
  private readonly blockTypes : string[] = Object.keys(BlockGeometries);
  private readonly blockColors: Color[] = BLOCK_COLORS;
  private nextBlock : Block;
  private nextBlockPreviewSubject: Subject<Block>;

  constructor() {
    this.nextBlock = this.getRandomBlock();
    this.nextBlockPreviewSubject = new BehaviorSubject(this.nextBlock);
  }

  get nextBlockPreview$() {
    return this.nextBlockPreviewSubject.asObservable();
  }

  getNextBlock(): Block {
    const nextBlock = this.nextBlock;
    this.nextBlock = this.getRandomBlock();
    this.nextBlockPreviewSubject.next(this.nextBlock);

    return nextBlock;
  }

  getRandomBlock(): Block {
    const randomBlockType = _.sample(this.blockTypes);
    const randomBlockColor = _.sample(this.blockColors);

    return Block.createBlockOfType(<string> randomBlockType, <Color> randomBlockColor);
  }

}

class SameBlockProducer implements BlockProducer {
  private readonly blockColors: Color[] = BLOCK_COLORS;
  private nextBlock: Block;
  private nextBlockPreviewSubject: Subject<Block>;

  constructor(private readonly blockType: string) {
    const randomBlockColor = _.sample(this.blockColors);
    this.nextBlock = Block.createBlockOfType(this.blockType, <Color> randomBlockColor)
  }

  getNextBlock(): Block {
    const nextBlock = this.nextBlock;
    const randomBlockColor = _.sample(this.blockColors);

    this.nextBlock = Block.createBlockOfType(this.blockType, <Color> randomBlockColor);
    this.nextBlockPreviewSubject.next(nextBlock);

    return nextBlock;
  }

  get nextBlockPreview$() {
    return this.nextBlockPreviewSubject.asObservable();
  }

}

export {
  BlockProducer,
  RandomBlockProducer,
  SameBlockProducer
};