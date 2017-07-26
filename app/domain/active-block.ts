import {Block} from "./block";
import {Position} from "./position";

class ActiveBlock {
  constructor(
    public readonly block: Block,
    public readonly position: Position,
    public readonly speed: number
  ){};

  updateBlock(newBlock: Block) : ActiveBlock {
    return new ActiveBlock(newBlock, this.position, this.speed);
  }

  updatePosition(newCurrentPosition: Position) : ActiveBlock {
    return new ActiveBlock(this.block, newCurrentPosition, this.speed);
  }

  updateSpeed(newSpeed: number) : ActiveBlock {
    return new ActiveBlock(this.block, this.position, newSpeed)
  }
}

export {ActiveBlock}