import {Color} from "../color";

let size = 15;
let strokeColor = Color.BOARD;
let strokeWidth = 0.7;

class Pixel {

  constructor(public color: Color, private filled : boolean = false){}

  static get size() {
    return size;
  }

  static get strokeColor() {
    return strokeColor;
  }

  static get strokeWidth() {
    return strokeWidth;
  }

  isFilled() {
    return this.filled;
  }

  markAsFilled() {
    return this.filled = true;
  }
}

export {Pixel};