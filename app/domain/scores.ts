class Scores {

  constructor(public readonly current: number = 0){}

  add(pointsToAdd: number) : Scores {
    return new Scores(this.current + pointsToAdd);
  }

}

export {Scores};