import * as _ from 'lodash';
import {Block, BlockGeometries} from "./block";
import {BehaviorSubject, Observable, Subject} from "@reactivex/rxjs";

interface BlockProducer {
  readonly nextBlockPreview$: Observable<Block>;
  getNextBlock() : Block;
}

class RandomBlockProducer implements BlockProducer {
  private readonly blockTypes : string[] = Object.keys(BlockGeometries);
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

    return Block.createBlockOfType(<string> randomBlockType);
  }

}

class SameBlockProducer implements BlockProducer {
  constructor(private readonly blockType: string) {}

  getNextBlock(): Block {
    return Block.createBlockOfType(this.blockType);
  }

  get nextBlockPreview$() {
    return Observable.of(Block.createBlockOfType(this.blockType));
  }

}

export {
  BlockProducer,
  RandomBlockProducer,
  SameBlockProducer
};