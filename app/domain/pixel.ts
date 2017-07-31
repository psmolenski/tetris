import {Color} from "../color";

class Pixel {
  constructor(public color: Color, private filled : boolean = false){}

  isFilled() {
    return this.filled;
  }

  markAsFilled() {
    return this.filled = true;
  }
}

export {Pixel};