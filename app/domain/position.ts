class Position {
  constructor(public x: number, public y: number){

  }

  static moveDown(positionToChange: Position) : Position {
    return new Position(positionToChange.x, positionToChange.y + 1);
  }

  static moveRight(positionToChange: Position) {
    return new Position(positionToChange.x + 1, positionToChange.y);
  }

  static moveLeft(positionToChange: Position) {
    return new Position(positionToChange.x - 1, positionToChange.y);
  }
}

export {Position};